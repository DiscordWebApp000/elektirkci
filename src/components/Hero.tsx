'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
}

const Hero = () => {
  // Slider resimleri ve içerikleri
  const slides: Slide[] = [
    {
      id: 1,
      image: "/img/slider1.jpg",
      title: 'Mervenur',
      subtitle: 'Elektrik',
      description: '2017\'den bu yana İstanbulda\'da hizmet veren Mervenur Elektirikk; elektrik malzemeleri, aydınlatma çözümleri, iş güvenliği ekipmanları ve hırdavat ürünlerinde geniş ürün yelpazesi, kaliteli markalar ve hızlı tedarik desteğiyle öne çıkar. Toptan ve perakende satışta güvenilir çözümler sunar.',
      badge: 'İstanbul'
    },
    {
      id: 2,
      image: 'https://rmi.org/wp-content/uploads/2020/04/woman_electrician-istock_1151364453-scaled.jpg',
      title: 'Profesyonel',
      subtitle: 'Elektrik Hizmetleri',
      description: 'Uzman kadromuz ve modern ekipmanlarımızla tüm elektrik ihtiyaçlarınızı karşılıyoruz. Kurulum, bakım ve onarım hizmetlerinde yılların deneyimi.',
      badge: 'Uzman Ekip'
    },
    {
      id: 3,
      image: 'https://caddcentre.com/blog/wp-content/uploads/2025/07/freepik__add-more-electrician-is-stading-in-working-area-an__50722.jpeg',
      title: 'Güvenilir',
      subtitle: 'Elektrik Çözümleri',
      description: 'Kaliteli malzemeler ve işçilik garantisi ile elektrik tesisatı, aydınlatma sistemleri ve elektrik panosu kurulum hizmetleri sunuyoruz.',
      badge: 'Kalite Garantisi'
    },
    {
      id: 4,
      image: 'https://images.squarespace-cdn.com/content/v1/64ec711678b09f2c3dd9d69b/2e800e5f-6ace-4695-897e-22ffeebdbae7/1.png',
      title: 'Hızlı',
      subtitle: 'Acil Elektrik Servisi',
      description: '7/24 acil elektrik arıza müdahale hizmetimizle yanınızdayız. Hızlı ve güvenli çözümler için bize ulaşın.',
      badge: '7/24 Hizmet'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Otomatik geçiş
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 saniyede bir değişir

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Önceki slide
  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Sonraki slide
  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Belirli bir slide'a git
  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <section className="relative text-white h-screen flex items-center justify-center overflow-hidden">
      {/* Slider Images Container */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 z-10 scale-100' 
                : 'opacity-0 z-0 scale-110'
            }`}
          >
            <div className={`absolute inset-0 transition-transform duration-[1500ms] ease-in-out ${
              index === currentSlide ? 'scale-100' : 'scale-110'
            }`}>
              <Image
                src={slide.image}
                alt={`${slide.title} ${slide.subtitle}`}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
                quality={90}
                unoptimized={slide.image.startsWith('http')}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/40 to-transparent z-20"></div>
      
      {/* Navigation Buttons - Bottom on Mobile, Left Side on Desktop */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-30 flex flex-row sm:flex-col gap-3">
        <button
          onClick={goToPrevious}
          className="group relative bg-white/10 backdrop-blur-md hover:bg-white/25 text-white p-3.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl"
          aria-label="Önceki slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:-translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="group relative bg-white/10 backdrop-blur-md hover:bg-white/25 text-white p-3.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30 hover:border-white/50 shadow-lg hover:shadow-xl"
          aria-label="Sonraki slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="max-w-5xl mx-auto text-center sm:text-left">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-[1500ms] ease-out ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95 absolute pointer-events-none'
              }`}
            >
              {slide.badge && (
                <div className={`mb-4 sm:mb-6 transition-all duration-[1500ms] delay-200 ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4'
                }`}>
                  <span className="bg-amber-600 text-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg inline-block shadow-lg">
                    {slide.badge}
                  </span>
                </div>
              )}
              
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight transition-all duration-[1500ms] delay-300 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}>
                <span className="text-white block sm:inline">{slide.title}</span>
                <br className="hidden sm:block" />
                <span className="text-amber-500 font-black block sm:inline">{slide.subtitle}</span>
              </h1>
              
              <p className={`text-sm sm:text-base md:text-lg mb-6 sm:mb-8 font-medium text-gray-200 max-w-lg mx-auto sm:mx-0 leading-relaxed transition-all duration-[1500ms] delay-500 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}>
                {slide.description}
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center sm:justify-start transition-all duration-[1500ms] delay-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}>
                <Link
                  href="/iletisim"
                  className="group relative bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-4 px-10 sm:py-4.5 sm:px-12 rounded-2xl text-sm sm:text-base hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50 transform hover:scale-[1.05] active:scale-[0.97] inline-flex items-center justify-center gap-3 overflow-hidden border border-amber-400/20"
                >
                  <span className="relative z-10 flex items-center gap-3 font-semibold tracking-wide">
                    İletişim
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-5 sm:w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
                </Link>
                <Link
                  href="/hizmetlerimiz"
                  className="group relative border-2 border-white/80 text-white font-bold py-4 px-10 sm:py-4.5 sm:px-12 rounded-2xl text-sm sm:text-base bg-white/10 backdrop-blur-md hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-2xl hover:shadow-white/30 transform hover:scale-[1.05] active:scale-[0.97] inline-flex items-center justify-center gap-3 overflow-hidden hover:border-white"
                >
                  <span className="relative z-10 flex items-center gap-3 font-semibold tracking-wide">
                    Hizmetlerimiz
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-5 sm:w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]"></span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 ease-out rounded-full ${
              index === currentSlide
                ? 'bg-amber-600 w-8 h-2 shadow-lg scale-110'
                : 'bg-white/40 hover:bg-white/60 w-2 h-2 hover:scale-110'
            }`}
            aria-label={`Slide ${index + 1}'e git`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;