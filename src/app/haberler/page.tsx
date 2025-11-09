'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Haber {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const NewsPage = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch news from Firestore
        const newsSnapshot = await getDocs(collection(db, 'haberler'));
        const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
        
        // Filter active news and sort by order
        const activeNews = newsData.filter(haber => haber.isActive);
        activeNews.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        setHaberler(activeNews);
      } catch (error) {
        console.error('Haber verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get all unique tags from news
  const allTags = Array.from(new Set(haberler.flatMap(haber => haber.tags || [])));

  
  // Get featured news (should be only 1)
  const featuredNews = haberler.filter(haber => haber.featured).slice(0, 1);
  
  // Get other news (non-featured)
  const otherNews = haberler.filter(haber => !haber.featured);
  
  // Pagination calculations
  const totalPages = Math.ceil(otherNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNews = otherNews.slice(startIndex, endIndex);
  
  // Reset to page 1 when news changes
  useEffect(() => {
    setCurrentPage(1);
  }, [otherNews.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Haberler yükleniyor...</p>
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
            src="https://www.knoweasytool.com/cdn/shop/articles/6-reasons-to-enter-the-electrical-trade-become-a-good-electrician-knoweasy_2048x.progressive.jpg?v=1661132256"
            alt="Elektrik Haberleri Arka Plan"
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
              <span>HABERLER</span>
              <div className="w-8 h-0.5 bg-amber-500 rounded-full"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              Güncel <span className="text-amber-400">Haberler</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 sm:mb-10 leading-relaxed">
              Elektrik sektöründen güncel haberler, teknoloji gelişmeleri, ipuçları ve faydalı bilgiler.
            </p>
            
            {/* Stats - Modern Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-amber-400 mb-1">{haberler.length}</div>
                <div className="text-[10px] sm:text-xs text-gray-300 font-medium">Toplam Haber</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-amber-400 mb-1">{allTags.length}</div>
                <div className="text-[10px] sm:text-xs text-gray-300 font-medium">Etiket</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-amber-400 mb-1">{featuredNews.length}</div>
                <div className="text-[10px] sm:text-xs text-gray-300 font-medium">Öne Çıkan</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section - Modern Design */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Article - Modern Card */}
          {featuredNews.map((haber) => (
            <div key={haber.id} className="mb-12 sm:mb-16 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 sm:h-80 lg:h-auto overflow-hidden">
                  {haber.imageUrl ? (
                    <Image
                      src={haber.imageUrl}
                      alt={haber.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-5xl sm:text-6xl text-gray-400">📰</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-lg shadow-lg">
                      ⭐ ÖNE ÇIKAN
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(haber.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <Link href={`/haberler/${haber.id}`}>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 hover:text-amber-600 transition-colors cursor-pointer leading-tight">
                      {haber.title}
                    </h3>
                  </Link>
                  {haber.subtitle && (
                    <p className="text-base sm:text-lg text-gray-600 mb-4 font-medium">{haber.subtitle}</p>
                  )}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 line-clamp-3">{haber.description}</p>
                  
                  {/* Tags */}
                  {haber.tags && haber.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {haber.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 text-xs sm:text-sm rounded-full font-semibold border border-amber-200"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <Link 
                    href={`/haberler/${haber.id}`}
                    className="self-start inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>Devamını Oku</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Other Articles Grid - Modern Cards */}
          {otherNews.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Diğer Haberler</h2>
                <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                  {otherNews.length} haber
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {paginatedNews.map((haber) => (
              <Link 
                key={haber.id}
                href={`/haberler/${haber.id}`}
                className="group block"
              >
                <article className="h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:border-amber-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col relative group">
                  {/* Image with Overlay */}
                  <div className="relative h-52 sm:h-60 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {haber.imageUrl ? (
                      <Image
                        src={haber.imageUrl}
                        alt={haber.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl sm:text-6xl text-gray-400">📰</span>
                      </div>
                    )}
                    
                    {/* Simple Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-white rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-md">
                        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-semibold text-gray-800">
                          {new Date(haber.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    </div>

                    {/* Hover Arrow Icon */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    {/* Category/Tags */}
                    {haber.tags && haber.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {haber.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] sm:text-xs rounded-md font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2 leading-tight">
                      {haber.title}
                    </h3>

                    {/* Subtitle */}
                    {haber.subtitle && (
                      <p className="text-sm text-gray-600 mb-3 font-medium line-clamp-1">{haber.subtitle}</p>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                      {haber.description?.replace(/<[^>]*>/g, '')}
                    </p>
                    
                    {/* Read More Button */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="inline-flex items-center gap-2 text-amber-600 group-hover:text-amber-700 font-semibold text-xs sm:text-sm transition-colors group-hover:gap-3">
                        <span>Detayları Gör</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
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

          {otherNews.length === 0 && featuredNews.length === 0 && (
            <div className="text-center py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">📰</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Henüz haber eklenmemiş</h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto px-4">
                Yakında güzel haberlerimizi görebileceksiniz.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription - Modern Design */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                Haber Bültenimize Abone Olun
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
                Elektrik sektöründen en son haberler, teknoloji gelişmeleri, ipuçları ve özel indirimlerden haberdar olmak için 
                e-posta adresinizi bırakın.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-xs sm:text-sm transition-all duration-200"
                />
                <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm">
                  Abone Ol
                </button>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-4">
                İstediğiniz zaman abonelikten çıkabilirsiniz. Gizlilik politikamızı okuyun.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
