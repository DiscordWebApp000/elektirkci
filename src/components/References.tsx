'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const References = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const references = [
    {
      name: "Ahmet Yılmaz",
      company: "Konut Sahibi",
      location: "İstanbul, Muratpaşa",
      rating: 5,
      comment: "Çok profesyonel bir ekip. Elektrik tesisatı kurulumunu çok kaliteli yaptılar. 2 yıldır hiç sorun yaşamadık. Kesinlikle tavsiye ederim!",
      image: "/img/ahmet.avif"
    },
    {
      name: "Banu Demirkul",
      company: "İş Yeri Sahibi",
      location: "İstanbul, Konyaaltı",
      rating: 5,
      comment: "İş yerimizdeki elektrik arızasını çok hızlı çözdüler. 7/24 acil servis hizmeti gerçekten çok değerli. Teşekkürler!",
      image: "/img/ayşe.avif"
    },
    {
      name: "Ayşe Demir",
      company: "Apartman Yöneticisi",
      location: "İstanbul, Kepez",
      rating: 5,
      comment: "Apartmanımızda yapılan elektrik panosu modernizasyonu çok kaliteli. Tüm daireler memnun. Profesyonel hizmet!",
      image: "/img/banu.avif"
    },
    {
      name: "Ali Öztürk",
      company: "Ev Sahibi",
      location: "İstanbul, Döşemealtı",
      rating: 5,
      comment: "Gece yarısı elektrik kesintisi yaşadık, 1 saatte geldiler ve sorunu çözdüler. 7/24 hizmet harika!",
      image: "/img/ali.avif"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % references.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + references.length) % references.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % references.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [references.length]);

  return (
    <section id="referanslar" className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 bg-gradient-to-r from-gray-900 via-amber-600 to-gray-900 bg-clip-text text-transparent">
            Müşteri Yorumları
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Müşterilerimizin memnuniyeti bizim en büyük başarımızdır.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative">
          <div className="relative flex items-center gap-6 sm:gap-8 lg:gap-12">
            {/* Background Image/Video Area */}
            <div className="absolute left-0 top-0 bottom-0 w-[45%] sm:w-[40%] lg:w-[35%] rounded-3xl overflow-hidden opacity-20 blur-sm">
              <div className="relative w-full h-full bg-gradient-to-br from-amber-100 to-amber-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-amber-500/80 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Testimonial Card */}
            <div 
              key={currentIndex}
              className="relative z-10 w-full sm:w-[60%] lg:w-[55%] bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-700 ease-out animate-[slideIn_0.7s_ease-out]"
            >
              <style jsx>{`
                @keyframes slideIn {
                  from {
                    opacity: 0;
                    transform: translateX(30px) scale(0.95);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                  }
                }
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                @keyframes starPop {
                  0% {
                    opacity: 0;
                    transform: scale(0);
                  }
                  50% {
                    transform: scale(1.2);
                  }
                  100% {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
              `}</style>
              <div className="mb-6">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 animate-[fadeInUp_0.5s_ease-out_0.1s_both]">
                  &quot;{references[currentIndex].comment}&quot;
                </p>
                
                <div className="flex items-center gap-4 animate-[fadeInUp_0.5s_ease-out_0.3s_both]">
                  <Image 
                    src={references[currentIndex].image} 
                    alt={references[currentIndex].name}
                    width={60}
                    height={60}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                      {references[currentIndex].name.toUpperCase()}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      {references[currentIndex].company}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(references[currentIndex].rating)].map((_, i) => (
                        <svg 
                          key={i} 
                          className="w-4 h-4 text-amber-500" 
                          style={{ 
                            animation: `starPop 0.4s ease-out ${0.4 + i * 0.05}s both`
                          }} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Testimonial Card (Faded) */}
            {references.length > 1 && (
              <div 
                key={`next-${currentIndex}`}
                className="hidden sm:block relative z-0 w-[35%] lg:w-[30%] bg-white rounded-3xl p-6 sm:p-8 opacity-75 shadow-lg transform scale-[0.92] transition-all duration-700 ease-in-out"
              >
                <div className="mb-4">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
                    &quot;{references[(currentIndex + 1) % references.length].comment}&quot;
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <Image 
                      src={references[(currentIndex + 1) % references.length].image} 
                      alt={references[(currentIndex + 1) % references.length].name}
                      width={50}
                      height={50}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                        {references[(currentIndex + 1) % references.length].name.toUpperCase()}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-gray-600">
                        {references[(currentIndex + 1) % references.length].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls - Bottom on Mobile, Top Right on Desktop */}
          <div className="absolute bottom-4 right-4 sm:bottom-auto sm:top-6 sm:right-6 z-20 flex flex-col items-end gap-4">
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white hover:bg-amber-500 text-gray-700 hover:text-white shadow-lg flex items-center justify-center transition-all duration-300 group"
                aria-label="Önceki"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 group"
                aria-label="Sonraki"
              >
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex gap-1.5">
              {references.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-6 h-1.5 bg-amber-500'
                      : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 bg-gray-50 p-4 sm:p-6 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1 sm:mb-2">500+</div>
              <p className="text-xs sm:text-sm text-gray-600">Tamamlanan İş</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1 sm:mb-2">1000+</div>
              <p className="text-xs sm:text-sm text-gray-600">Mutlu Müşteri</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1 sm:mb-2">20+</div>
              <p className="text-xs sm:text-sm text-gray-600">Yıl Deneyim</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1 sm:mb-2">24/7</div>
              <p className="text-xs sm:text-sm text-gray-600">Hizmet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
