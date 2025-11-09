'use client'
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';

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

const GaleriPage = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [selectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchGalleryData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.categoryId === selectedCategory));
    }
    // Reset to page 1 when category changes
    setCurrentPage(1);
  }, [selectedCategory, galleryItems]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories - index hatası olmaması için orderBy kaldırıldı
      const categoriesSnapshot = await getDocs(collection(db, 'gallery_categories'));
      const categoriesData = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryCategory[];
      
      // Client-side sıralama
      categoriesData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCategories(categoriesData);

      // Fetch gallery items - index hatası olmaması için orderBy kaldırıldı
      const itemsSnapshot = await getDocs(collection(db, 'gallery_items'));
      const itemsData = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryItem[];
      
      // Client-side sıralama
      itemsData.sort((a, b) => (a.order || 0) - (b.order || 0));
      setGalleryItems(itemsData);
      setFilteredItems(itemsData);
      
      // Debug bilgisi
      console.log('📁 Kategoriler:', categoriesData);
      console.log('🖼️ Galeri Resimleri:', itemsData);
      console.log('🔍 Aktif resimler:', itemsData.filter(item => item.isActive));
      
      // Resim URL'lerini kontrol et
      itemsData.forEach((item, index) => {
        console.log(`Resim ${index + 1}:`, {
          title: item.title,
          imageUrl: item.imageUrl,
          hasImage: !!item.imageUrl,
          imageLength: item.imageUrl?.length || 0
        });
      });
      
    } catch (error) {
      console.error('Galeri verisi yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Kategori Yok';
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : '📷';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Galeri yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Modern Design */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://www.lincolntech.edu/sites/default/files/styles/16_9_1600x900/public/2024-03/0124_Hero-Electrician-6_CR3743%20%282%29.jpg?h=c71d0c67&itok=UQhPoCmQ"
            alt="Elektrik Projeleri Galeri Arka Plan"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-amber-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <div className="w-8 h-0.5 bg-amber-500 rounded-full"></div>
              <span>GALERİ</span>
              <div className="w-8 h-0.5 bg-amber-500 rounded-full"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              Projelerimizi <span className="text-amber-400">Keşfedin</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 sm:mb-10 leading-relaxed">
              Tamamladığımız elektrik projelerinden örnekler ve başarı hikayelerimiz
            </p>
            
            {/* Stats - Modern Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-amber-400 mb-1">{categories.length}</div>
                <div className="text-[10px] sm:text-xs text-gray-300 font-medium">Kategori</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-amber-400 mb-1">{galleryItems.length}</div>
                <div className="text-[10px] sm:text-xs text-gray-300 font-medium">Proje</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-amber-400 mb-1">{galleryItems.filter(i => i.isFeatured).length}</div>
                <div className="text-[10px] sm:text-xs text-gray-300 font-medium">Öne Çıkan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Modern Design */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters - Modern Sticky Design */}
          

          {/* Gallery Grid - Modern Masonry Style */}
          <div>
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? 'Tüm Projeler' : getCategoryName(selectedCategory)}
              </h3>
              <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                {filteredItems.length} proje
              </span>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
                <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🖼️</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Proje bulunamadı</h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto px-4">
                  {selectedCategory === 'all' 
                    ? 'Henüz elektrik projesi eklenmemiş. Yakında tamamladığımız elektrik projelerimizi görebileceksiniz.' 
                    : 'Bu kategoride henüz elektrik projesi bulunmuyor. Diğer kategorileri kontrol edebilirsiniz.'}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {paginatedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          onError={(e) => {
                            console.log('Image load error:', item.imageUrl);
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                          onLoad={() => {
                            console.log('Image loaded successfully:', item.imageUrl);
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl sm:text-6xl text-gray-300">🖼️</span>
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg text-[10px] sm:text-xs font-semibold text-gray-700 shadow-lg">
                          <span>{getCategoryIcon(item.categoryId)}</span>
                          <span className="hidden sm:inline">{getCategoryName(item.categoryId)}</span>
                        </span>
                      </div>
                      
                      {/* Featured Badge */}
                      {item.isFeatured && (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-[10px] sm:text-xs font-semibold shadow-lg">
                            ⭐ <span className="hidden sm:inline ml-1">Öne Çıkan</span>
                          </span>
                        </div>
                      )}
                      
                      {/* Hover Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1 line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3">
                            {item.description?.replace(/<[^>]*>/g, '').substring(0, 60)}...
                          </p>
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs sm:text-sm font-semibold py-2 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Detayları Gör
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200 hover:border-amber-300 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Önceki
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Show first page, last page, current page, and pages around current
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                currentPage === page
                                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg scale-105'
                                  : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200 hover:border-amber-300 shadow-sm hover:shadow-md'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span key={page} className="px-2 text-gray-400">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200 hover:border-amber-300 shadow-sm hover:shadow-md'
                      }`}
                    >
                      Sonraki
                      <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Image Modal - Modern Design */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:rotate-90"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg">
                    {selectedItem.imageUrl ? (
                      <Image
                        src={selectedItem.imageUrl}
                        alt={selectedItem.title}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl text-gray-300">🖼️</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-5">
                    {/* Category */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Kategori</h3>
                      <div className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl border border-amber-200">
                        <span className="text-2xl sm:text-3xl">{getCategoryIcon(selectedItem.categoryId)}</span>
                        <span className="text-base sm:text-lg font-bold text-gray-900">
                          {getCategoryName(selectedItem.categoryId)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Açıklama</h3>
                      <div 
                        className="text-sm sm:text-base text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl"
                        dangerouslySetInnerHTML={{ __html: selectedItem.description }}
                      />
                    </div>
                    
                    {/* Tags */}
                    {selectedItem.tags && selectedItem.tags.length > 0 && (
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Etiketler</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 text-xs sm:text-sm rounded-full font-semibold border border-amber-200"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriPage;
