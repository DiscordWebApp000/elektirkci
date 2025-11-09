'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  // Admin sayfasında Footer'ı gösterme
  if (isAdminPage) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        {/* 4 Sütunlu Ana İçerik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          
          {/* Sütun 1: Şirket */}
          <div>
            <h3 className="text-base sm:text-lg font-black mb-5 text-white">
              Şirket
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/hakkimizda" className="text-gray-400 hover:text-amber-400 transition-colors text-xs sm:text-sm inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-400 hover:text-amber-400 transition-colors text-xs sm:text-sm inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-gray-400 hover:text-amber-400 transition-colors text-xs sm:text-sm inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/haberler" className="text-gray-400 hover:text-amber-400 transition-colors text-xs sm:text-sm inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Haberler
                </Link>
              </li>
            </ul>
          </div>

          {/* Sütun 2: Hizmetler */}
          <div>
            <h3 className="text-base sm:text-lg font-black mb-5 text-white">
              Hizmetler
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-400 hover:text-amber-400 transition-colors text-xs sm:text-sm inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Elektrik Tesisatı
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-400 hover:text-amber-400 transition-colors text-xs sm:text-sm inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Elektrik Arıza Giderme
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-400 hover:text-amber-400 transition-colors text-xs sm:text-sm inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Aydınlatma Sistemleri
                </Link>
              </li>
              <li>
                <Link href="/hizmetlerimiz" className="text-gray-400 hover:text-amber-400 transition-colors text-xs sm:text-sm inline-flex items-center gap-2 group">
                  <span className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Acil Elektrik Servisi
                </Link>
              </li>
            </ul>
          </div>

          {/* Sütun 3: İletişim */}
          <div>
            <h3 className="text-base sm:text-lg font-black mb-5 text-white">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-xs sm:text-sm flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Antalya, Türkiye</span>
              </li>
              <li className="text-gray-400 text-xs sm:text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+905327899182" className="hover:text-amber-400 transition-colors">+90 532 789 91 82</a>
              </li>
              <li className="text-gray-400 text-xs sm:text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@debuelektrik.com" className="hover:text-amber-400 transition-colors">info@debuelektrik.com</a>
              </li>
              <li className="text-gray-400 text-xs sm:text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>7/24 Hizmet</span>
              </li>
            </ul>
          </div>

          {/* Sütun 4: Bizi Takip Edin */}
          <div>
            <h3 className="text-base sm:text-lg font-black mb-5 text-white">
              Bizi Takip Edin
            </h3>
            <div className="flex gap-3">
              <a 
                href="https://wa.me/905327899182" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800/50 hover:bg-green-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50"
                title="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.86 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
              </a>
              
              <a 
                href="tel:+905327899182" 
                className="w-11 h-11 bg-gray-800/50 hover:bg-blue-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                title="Telefon"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </a>
              
              <a 
                href="https://instagram.com/debuelektrik" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-gray-800/50 hover:bg-pink-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50"
                title="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a 
                href="/iletisim" 
                className="w-11 h-11 bg-gray-800/50 hover:bg-amber-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/50"
                title="İletişim"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Alt Kısım - Logo ve Copyright */}
        <div className="border-t border-gray-800/50 pt-8 sm:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image 
                src="/logo-dark.png"
                alt="Debu Elektrik Logo"
                width={120}
                height={40}
                className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
              <span className="text-gray-500 text-xs">Profesyonel Elektrik Hizmetleri</span>
            </div>
            
            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-xs">
                © 2025 <span className="text-amber-500 font-semibold">Debu Elektrik</span>. 
                Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
