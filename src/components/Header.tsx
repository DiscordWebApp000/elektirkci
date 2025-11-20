'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin') || false;

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // İlk yüklemede scroll pozisyonunu kontrol et
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Admin sayfasında Header'ı gösterme
  if (isAdminPage) {
    return null;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-xl shadow-xl border-b border-gray-200/60' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <div className="relative">
              {/* Mobile Logo - Her zaman normal logo */}
              <Image 
                src="/logo.png"
                alt="Mervenur Elektirikk Logo"
                width={200}
                height={60}
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 lg:hidden"
                priority
              />
              {/* Desktop Logo - Scroll'a göre değişir */}
              <Image 
                src={isScrolled ? "/logo.png" : "/logo-dark.png"}
                alt="Mervenur Elektirikk Logo"
                width={200}
                height={60}
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 hidden lg:block"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link 
              href="/" 
              className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/')
                  ? isScrolled 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-white bg-white/20'
                  : isScrolled 
                    ? 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive('/') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"></span>
              )}
              Ana Sayfa
            </Link>
            <Link 
              href="/hizmetlerimiz" 
              className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/hizmetlerimiz')
                  ? isScrolled 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-white bg-white/20'
                  : isScrolled 
                    ? 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive('/hizmetlerimiz') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"></span>
              )}
              Hizmetlerimiz
            </Link>
            <Link 
              href="/hizmet-bolgelerimiz" 
              className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/hizmet-bolgelerimiz')
                  ? isScrolled 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-white bg-white/20'
                  : isScrolled 
                    ? 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive('/hizmet-bolgelerimiz') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"></span>
              )}
              Hizmet Bölgelerimiz
            </Link>
            <Link 
              href="/galeri" 
              className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/galeri')
                  ? isScrolled 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-white bg-white/20'
                  : isScrolled 
                    ? 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive('/galeri') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"></span>
              )}
              Galeri
            </Link>
            <Link 
              href="/haberler" 
              className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/haberler')
                  ? isScrolled 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-white bg-white/20'
                  : isScrolled 
                    ? 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive('/haberler') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"></span>
              )}
              Haberler
            </Link>
            <Link 
              href="/hakkimizda" 
              className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/hakkimizda')
                  ? isScrolled 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-white bg-white/20'
                  : isScrolled 
                    ? 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive('/hakkimizda') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"></span>
              )}
              Hakkımızda
            </Link>
            <Link 
              href="/iletisim" 
              className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/iletisim')
                  ? isScrolled 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-white bg-white/20'
                  : isScrolled 
                    ? 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive('/iletisim') && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full"></span>
              )}
              İletişim
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:05327899182" className="group">
              <button className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden touch-button ${
                isScrolled 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl' 
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/30 hover:border-white/50'
              }`}>
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Hemen Ara
                </span>
                {isScrolled && (
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2.5 z-50 rounded-xl transition-all duration-300 touch-button relative ${
              isMenuOpen 
                ? 'bg-amber-100' 
                : isScrolled 
                  ? 'hover:bg-gray-100' 
                  : 'hover:bg-white/10'
            }`}
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 transition-all duration-300 absolute ${
                isMenuOpen 
                  ? 'rotate-45 bg-amber-600' 
                  : `translate-y-[-6px] ${isScrolled ? 'bg-gray-700' : 'bg-white'}`
              }`}></span>
              <span className={`block w-5 h-0.5 transition-all duration-300 ${
                isMenuOpen 
                  ? 'opacity-0' 
                  : `${isScrolled ? 'bg-gray-700' : 'bg-white'}`
              }`}></span>
              <span className={`block w-5 h-0.5 transition-all duration-300 absolute ${
                isMenuOpen 
                  ? '-rotate-45 bg-amber-600' 
                  : `translate-y-[6px] ${isScrolled ? 'bg-gray-700' : 'bg-white'}`
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden fixed inset-x-0 top-16 sm:top-20 bg-white backdrop-blur-xl shadow-2xl border-t border-gray-200 z-40 transition-all duration-500 ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <nav className="py-4 space-y-1 px-4">
            <Link 
              href="/" 
              className={`block px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/')
                  ? 'text-amber-600 bg-amber-50 border-l-4 border-amber-600'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
              }`}
              onClick={closeMenu}
            >
              Ana Sayfa
            </Link>
            <Link 
              href="/hizmetlerimiz" 
              className={`block px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/hizmetlerimiz')
                  ? 'text-amber-600 bg-amber-50 border-l-4 border-amber-600'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
              }`}
              onClick={closeMenu}
            >
              Hizmetlerimiz
            </Link>
            <Link 
              href="/hizmet-bolgelerimiz" 
              className={`block px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/hizmet-bolgelerimiz')
                  ? 'text-amber-600 bg-amber-50 border-l-4 border-amber-600'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
              }`}
              onClick={closeMenu}
            >
              Hizmet Bölgelerimiz
            </Link>
            <Link 
              href="/galeri" 
              className={`block px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/galeri')
                  ? 'text-amber-600 bg-amber-50 border-l-4 border-amber-600'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
              }`}
              onClick={closeMenu}
            >
              Galeri
            </Link>
            <Link 
              href="/haberler" 
              className={`block px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/haberler')
                  ? 'text-amber-600 bg-amber-50 border-l-4 border-amber-600'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
              }`}
              onClick={closeMenu}
            >
              Haberler
            </Link>
            <Link 
              href="/hakkimizda" 
              className={`block px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/hakkimizda')
                  ? 'text-amber-600 bg-amber-50 border-l-4 border-amber-600'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
              }`}
              onClick={closeMenu}
            >
              Hakkımızda
            </Link>
            <Link 
              href="/iletisim" 
              className={`block px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive('/iletisim')
                  ? 'text-amber-600 bg-amber-50 border-l-4 border-amber-600'
                  : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
              }`}
              onClick={closeMenu}
            >
              İletişim
            </Link>
            
            {/* Mobile CTA Button */}
            <div className="pt-4 border-t border-gray-200 mt-4">
              <a href="tel:05327899182" className="block">
                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Hemen Ara
                </button>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;