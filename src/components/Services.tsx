'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import servicesData from '@/data/services.json';

const Services = () => {
  const router = useRouter();

  // Helper function to create slug from title
  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/ş/g, 's')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/ı/g, 'i')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Filter services by title
  const serviceTitles = ['Kaçak Tespiti', 'Uydu Kurulumu', 'Akıllı Ev Değişimi', 'Priz Değişimi'];
  const services = servicesData.services.filter(service => 
    serviceTitles.includes(service.title)
  );

  const handleServiceClick = (service: { title: string }) => {
    const slug = createSlug(service.title);
    router.push(`/hizmetlerimiz/${slug}`);
  };

  return (
    <>
      <section id="hizmetler" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Hizmetlerimiz
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Profesyonel elektrikçi ekibimizle tüm elektrik ihtiyaçlarınız için kapsamlı çözümler sunuyoruz.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {services.map((service) => (
              <div 
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="group bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-amber-400 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full h-36 sm:h-40 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 25vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                  {service.description}
                </p>

                {/* Learn More Button */}
                <div className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold text-xs sm:text-sm transition-colors duration-200 group-hover:gap-1.5 gap-1">
                  Detayları Gör
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
