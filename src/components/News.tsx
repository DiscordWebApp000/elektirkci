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

const News = () => {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch news from Firestore
        const newsSnapshot = await getDocs(collection(db, 'haberler'));
        const newsData = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Haber[];
        
        // Filter active news and sort by order, then take only the latest 3
        const activeNews = newsData.filter(haber => haber.isActive);
        activeNews.sort((a, b) => (a.order || 0) - (b.order || 0));
        const latestNews = activeNews.slice(0, 3);
        
        setHaberler(latestNews);
      } catch (error) {
        console.error('Haber verisi yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Haberler yükleniyor...</p>
          </div>
        </div>
      </section>
    );
  }

  if (haberler.length === 0) {
    return null; // Don't show anything if no news
  }

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-amber-600 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 px-4 py-2 bg-amber-50 rounded-full">
            <span>⚡</span>
            <span>GÜNCEL HABERLERİMİZ</span>
            <span>⚡</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-amber-600 to-gray-900 bg-clip-text text-transparent">
            Blog & Haberler
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Elektrik sektöründen en güncel haberler, teknoloji gelişmeleri ve uzman önerileri.
          </p>
        </div>

        {/* News Grid - Creative Mixed Layout */}
        <div className="space-y-6 sm:space-y-8">
          {/* First Card - Split Design */}
          {haberler[0] && (
            <Link href={`/haberler/${haberler[0].id}`} className="group block">
              <article className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative h-48 sm:h-64 lg:h-auto overflow-hidden bg-gradient-to-br from-amber-100 to-amber-200">
                    {haberler[0].imageUrl ? (
                      <Image
                        src={haberler[0].imageUrl}
                        alt={haberler[0].title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-7xl text-amber-400">📰</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent lg:from-transparent"></div>
                    
                    {/* Badges on Image */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                      {haberler[0].featured && (
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl">
                          ⭐ ÖNE ÇIKAN
                        </div>
                      )}
                      {haberler[0].tags && haberler[0].tags.length > 0 && (
                        <div className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/30">
                          #{haberler[0].tags[0]}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-gradient-to-br from-gray-50 to-white">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs sm:text-sm text-gray-500 font-medium">
                          {new Date(haberler[0].createdAt).toLocaleDateString('tr-TR', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-base group-hover:scale-110 transition-transform duration-300">
                          →
                        </div>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900 mb-3 group-hover:text-amber-600 transition-colors leading-tight">
                        {haberler[0].title}
                      </h3>
                      
                      {haberler[0].subtitle && (
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 font-medium">
                          {haberler[0].subtitle}
                        </p>
                      )}
                      
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {haberler[0].description}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-xs sm:text-sm group-hover:gap-4 transition-all duration-300">
                        <span>Devamını Oku</span>
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Other Cards - Side by Side */}
          {haberler.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {haberler.slice(1).map((haber) => (
                <Link key={haber.id} href={`/haberler/${haber.id}`} className="group block">
                  <article className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full">
                    {/* Image */}
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                      {haber.imageUrl ? (
                        <Image
                          src={haber.imageUrl}
                          alt={haber.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="text-6xl text-blue-400">📰</span>
                        </div>
                      )}
                      
                      {/* Diagonal Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                        <div className="flex flex-col gap-2">
                          {haber.featured && (
                            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                              ⭐ ÖNE ÇIKAN
                            </div>
                          )}
                          {haber.tags && haber.tags.length > 0 && (
                            <div className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30">
                              #{haber.tags[0]}
                            </div>
                          )}
                        </div>
                        <div className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                          {new Date(haber.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 pb-6 pt-20 text-white bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                        <h3 className="text-lg sm:text-xl font-black text-white mb-2 group-hover:text-amber-300 transition-colors leading-tight line-clamp-2">
                          {haber.title}
                        </h3>
                        
                        {haber.subtitle && (
                          <p className="text-white/90 text-xs mb-3 line-clamp-1">
                            {haber.subtitle}
                          </p>
                        )}
                        
                        <p className="text-white/80 text-xs line-clamp-2 mb-4">
                          {haber.description}
                        </p>

                        {/* Read More Button */}
                        <div className="inline-flex items-center gap-2 text-white font-semibold text-xs group-hover:gap-3 transition-all duration-300">
                          <span>Devamını Oku</span>
                          <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:bg-amber-500/20 transition-colors duration-500"></div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link 
            href="/haberler"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <span>Tüm Haberleri Gör</span>
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;

