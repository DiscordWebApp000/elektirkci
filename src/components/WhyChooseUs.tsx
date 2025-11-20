'use client';

import React from 'react';
import Link from 'next/link';

const WhyChooseUs = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Geniş Ürün Yelpazesi ve Uyumlu Çözümler",
      description: "Elektrik malzemelerinden aydınlatma çözümlerine, iş güvenliği ekipmanlarından hırdavat ürünlerine kadar geniş bir yelpazeyle hizmet veriyoruz."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Kaliteli Markalarla Güvenli Alışveriş",
      description: "Mervenur Elektirikk olarak sadece güvenilir markaları tercih ediyor, uzun ömürlü ve güvenli kullanım sağlayan ürünler sunuyoruz."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Hızlı Tedarik ve Lojistik Desteği",
      description: "İhtiyacınız olan ürünler, zamanında kapınızda. İstanbul içi hızlı teslimat ve şehir dışı kargo seçenekleriyle projelerinizi bekletmeden destekliyoruz."
    }
  ];

  return (
    <section id="hakkimizda" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch overflow-hidden rounded-3xl shadow-2xl bg-white">
          {/* Left side - Content */}
          <div className="order-2 lg:order-1 bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8 sm:p-10 lg:p-12 xl:p-16 relative">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              {/* Üst Başlık */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 mb-2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                  <h3 className="text-[10px] sm:text-xs font-bold text-gray-600 uppercase tracking-[0.2em]">
                    NEDEN BİZ?
                  </h3>
                  <div className="w-8 h-0.5 bg-gradient-to-l from-amber-500 to-amber-600 rounded-full"></div>
                </div>
              </div>

              {/* Ana Başlık */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-[1.1] bg-gradient-to-r from-gray-900 via-amber-600 to-gray-900 bg-clip-text text-transparent">
                Neden Mervenur Elektirikk?
              </h2>

              {/* Açıklama */}
              <p className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed max-w-xl">
                İstanbul&apos;da elektrik, aydınlatma, iş güvenliği ve hırdavat ihtiyaçlarınıza tek noktadan çözüm sunuyoruz. 25 yılı aşkın deneyimimiz, kaliteli ürün çeşitliliğimiz ve güvenilir lojistik desteğimizle hem bireysel hem kurumsal müşterilerimize hızlı, ekonomik ve profesyonel hizmet sağlıyoruz.
              </p>

              {/* Teklif Al Butonu */}
              <Link 
                href="/iletisim"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-6 py-3 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <span>Teklif Al!</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right side - Features Cards */}
          <div className="order-1 lg:order-2 bg-white p-8 sm:p-10 lg:p-12 xl:p-16 space-y-5 sm:space-y-6 relative">
            {/* Decorative Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-blue-50/50 pointer-events-none"></div>
            
            <div className="relative z-10 space-y-5 sm:space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-7 border border-gray-100 hover:border-amber-200/50 shadow-md hover:shadow-2xl transition-all duration-500 flex items-start gap-5 sm:gap-6 hover:-translate-y-1"
                >
                  {/* Icon Box */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {React.cloneElement(feature.icon, { className: "w-6 h-6 sm:w-7 sm:h-7" })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
