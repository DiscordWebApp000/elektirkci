'use client'
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  imageUrl: string;
  thumbnailUrl: string;
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

const Gallery = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesSnapshot = await getDocs(collection(db, 'gallery_categories'));
        const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryCategory[];
        
        // Client-side sorting
        categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(categoriesData);

        // Fetch gallery items
        const itemsSnapshot = await getDocs(collection(db, 'gallery_items'));
        const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryItem[];
        
        // Filter active items, sort by order, and take only the latest 6
        const activeItems = itemsData.filter(item => item.isActive);
        activeItems.sort((a, b) => (a.order || 0) - (b.order || 0));
        const latestItems = activeItems.slice(0, 6);
        
        setGalleryItems(latestItems);
        
      } catch (error) {
        console.error('Galeri verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Kategori Yok';
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : '📷';
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, galleryItems.length - 3);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, galleryItems.length - 3);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    const maxIndex = Math.max(0, galleryItems.length - 3);
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Auto-play slider
  useEffect(() => {
    if (galleryItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, galleryItems.length - 3);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryItems.length]);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Galeri yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  if (galleryItems.length === 0) {
    return null; // Don't show anything if no gallery items
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 text-amber-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <div className="w-8 h-0.5 bg-amber-600 rounded-full"></div>
            <span>ÇALIŞMA ÖRNEKLERİMİZ</span>
            <div className="w-8 h-0.5 bg-amber-600 rounded-full"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 bg-gradient-to-r from-gray-900 via-amber-600 to-gray-900 bg-clip-text text-transparent">
            Galeri & Projeler
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Başarıyla tamamladığımız projelerden örnekler ve çalışma alanlarımız.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Slider Wrapper */}
          <div className="relative overflow-hidden">
            {/* Slides */}
            <div 
              className="flex transition-transform duration-700 ease-in-out gap-4 sm:gap-6"
              style={{ 
                transform: `translateX(calc(-${currentIndex * (100 / 3)}% - ${currentIndex * 1.5}rem))`
              }}
            >
              {galleryItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/galeri`}
                  className="w-[calc(33.333%-1rem)] sm:w-[calc(33.333%-1.5rem)] aspect-video relative block group flex-shrink-0"
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover rounded-2xl"
                      sizes="(max-width: 640px) 33vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
                      <span className="text-6xl text-gray-400">📷</span>
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-2xl"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6">
                    {item.isFeatured && (
                      <div className="inline-block mb-2 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        ⭐
                      </div>
                    )}
                    <h3 className="text-xs sm:text-sm font-bold text-white mb-1.5 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="text-[10px] text-white/80 flex items-center gap-1.5">
                      <span>{getCategoryIcon(item.categoryId)}</span>
                      <span className="line-clamp-1">{getCategoryName(item.categoryId)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Navigation Arrows */}
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 hover:text-amber-600 shadow-xl flex items-center justify-center transition-all duration-300 z-10 group"
                  aria-label="Önceki"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 hover:text-amber-600 shadow-xl flex items-center justify-center transition-all duration-300 z-10 group"
                  aria-label="Sonraki"
                >
                  <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {galleryItems.length > 3 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {Array.from({ length: Math.max(1, galleryItems.length - 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-amber-600'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Slide Counter */}
          {galleryItems.length > 3 && (
            <div className="text-center mt-4">
              <span className="text-xs text-gray-600">
                {Math.min(currentIndex + 1, galleryItems.length - 2)} / {Math.max(1, galleryItems.length - 2)}
              </span>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-12">
          <Link 
            href="/galeri"
            className="group inline-flex items-center gap-2 text-gray-700 hover:text-amber-600 font-medium text-xs sm:text-sm transition-colors duration-300"
          >
            <span>Tüm Galeriyi Gör</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

