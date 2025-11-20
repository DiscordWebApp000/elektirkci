'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchServiceAreas } from '@/store/slices/serviceAreasSlice';
import { fetchFeaturedGalleryItems } from '@/store/slices/gallerySlice';

const HizmetBolgelerimizPage = () => {
  const dispatch = useAppDispatch();
  const { areas: serviceAreas, isLoading: areasLoading, error: areasError } = useAppSelector((state) => state.serviceAreas);
  const { featuredItems: galleryItems, isLoading: galleryLoading, error: galleryError } = useAppSelector((state) => state.gallery);
  
  const loading = areasLoading || galleryLoading;
  const error = areasError || galleryError;

  useEffect(() => {
    // Fetch data on mount
    dispatch(fetchServiceAreas());
    dispatch(fetchFeaturedGalleryItems(3));
  }, [dispatch]);

  // Debug: Log errors
  useEffect(() => {
    if (error) {
      console.error('Redux Error:', error);
    }
  }, [error]);

  // Show error message if there's an error
  if (error && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️ Veri yüklenirken bir hata oluştu</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              dispatch(fetchServiceAreas());
              dispatch(fetchFeaturedGalleryItems(3));
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Sayfa yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/img/slider3.jpg"
            alt="Hizmet Bölgelerimiz Arka Plan"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
          />
        </div>
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-amber-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <div className="w-8 h-0.5 bg-amber-500 rounded-full"></div>
              <span className='text-xl'>HİZMET BÖLGELERİMİZ</span>
              <div className="w-8 h-0.5 bg-amber-500 rounded-full"></div>
            </div>
           
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              İstanbul&apos;un tüm ilçelerinde profesyonel elektrik hizmetleri sunuyoruz
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Hizmet Verdiğimiz Bölgelerimiz
            </h2>
            <p className="text-base sm:text-md md:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              İstanbul&apos;un her köşesinde profesyonel hizmet kalitesi ile yanınızdayız
            </p>
          </div>

          {/* Service Areas Grid */}
          {serviceAreas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {serviceAreas.map((area) => (
                <div
                  key={area.id}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {area.imageUrl ? (
                      <Image
                        src={area.imageUrl}
                        alt={area.title}
                        fill
                        className="object-cover transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-4xl text-gray-400">🏢</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {area.title}
                    </h3>
                    
                    {area.description && (
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {area.description}
                      </p>
                    )}
                    
                    {/* View Details Link */}
                    <Link 
                      href={`/hizmet-bolgelerimiz/${area.id}`}
                      className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold text-xs sm:text-sm transition-colors duration-200"
                    >
                      Detayları Gör
                      <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🏢</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Henüz hizmet bölgesi eklenmemiş</h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                Yakında hizmet verdiğimiz bölgeleri görebileceksiniz.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      {galleryItems.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                Proje Örneklerimiz
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                Başarıyla tamamladığımız projelerden örnekler
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-64 overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-4xl text-gray-400">📷</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    {item.description && (
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>
                    )}
                    
                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-10 sm:mt-12">
              <Link 
                href="/galeri"
                className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300"
              >
                <span>Tüm Galeriyi Gör</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HizmetBolgelerimizPage;
