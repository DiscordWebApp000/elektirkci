import React from 'react';
import Link from 'next/link';

const Contact = () => {
  return (
    <section id="iletisim" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Hemen <span className="text-amber-600">İletişime</span> Geçin
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
          Tesisat sorunlarınız için uzman ekibimizle iletişime geçin. 
          7/24 hizmetinizdeyiz!
        </p>

        {/* Simple Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">📞</div>
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">7/24 Acil Servis</h3>
            <p className="text-amber-600 font-bold text-sm sm:text-base">+90 532 789 91 82</p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">📧</div>
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">E-posta</h3>
            <p className="text-amber-600 font-semibold text-sm sm:text-base">info@sekaaltyapi.com</p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 sm:col-span-2 md:col-span-1">
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">📍</div>
            <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Adres</h3>
            <p className="text-gray-600 text-xs sm:text-sm">İstanbul, Üsküdar</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link 
          href="/iletisim"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl touch-button"
        >
          📋 Detaylı İletişim Formu
        </Link>
      </div>
    </section>
  );
};

export default Contact;
