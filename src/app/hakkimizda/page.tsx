'use client'
import React from 'react';
import Image from 'next/image';
import { FiAward, FiCheck } from 'react-icons/fi';

const AboutPage = () => {
  // Sertifikalar
  const certifications = [
    { name: 'TSE Belgeli', year: '2020' },
    { name: 'Meslek Odası Üyesi', year: '2017' },
    { name: 'ISO 9001 Kalite', year: '2018' },
    { name: 'Çevre Dostu Uygulama', year: '2021' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/img/slider5.jpg"
            alt="Hakkımızda Arka Plan"
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
              <span className='text-lg'>HAKKIMIZDA</span>
              <div className="w-8 h-0.5 bg-amber-500 rounded-full"></div>
            </div>
           
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              25 yılı aşkın deneyimimizle İstanbul&apos;da güvenilir elektrik hizmetleri sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: About our firm - Left Text, Right Image */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-amber-100 rounded-full mb-4">
                <span className="text-amber-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                  HAKKIMIZDA
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Hikayemiz
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                2017 yılında İstanbul&apos;da başlayan hikayemiz, bugün bölgenin 
                en güvenilir elektrik firmaları arasında yer almamızla devam ediyor. 
                &quot;Kaliteli hizmet, mutlu müşteri&quot; mottosuyla başladığımız bu yolculukta, 
                her geçen gün daha da büyüdük. Bugün uzman ekibimizle, modern teknolojileri 
                geleneksel ustalıkla birleştirerek, İstanbul&apos;nın dört bir yanında hizmet veriyoruz.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a 
                  href="/iletisim"
                  className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300"
                >
                  <span>İletişime Geçin</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a 
                  href="/galeri"
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-300 hover:border-amber-600 text-gray-900 hover:text-amber-600 px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300"
                >
                  <span>Projelerimizi Görün</span>
                </a>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
                <Image
                  src="https://www.samedaytrades.com.au/wp-content/uploads/2022/06/electrician-2.webp"
                  alt="Elektrik Ekibi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Stats Below - 3 items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-600 mb-2">
                95%
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Tam Müşteri Memnuniyeti
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-600 mb-2">
                25+
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Yıl Deneyim
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-600 mb-2">
                1000+
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Tamamlanan Proje
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Unlock our expertise - Left Image, Right Text with Checkboxes */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left - Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
                <Image
                  src="https://austincareerinstitute.edu/wp-content/uploads/2023/12/electrician-skills-scaled.jpg"
                  alt="Elektrik Hizmetleri"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-3 py-1 bg-amber-100 rounded-full mb-4">
                <span className="text-amber-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                  HAKKIMIZDA
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Elektrik İhtiyaçlarınız İçin Profesyonel Çözümler
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                Elektrik sektöründeki derin bilgimiz ve modern teknolojilerle ev ve iş yerlerinizin 
                elektrik ihtiyaçlarını karşılıyoruz. Özelleştirilmiş çözümlerimiz, güvenli ve 
                verimli elektrik sistemleri kurarak müşterilerimize hizmet sağlar.
              </p>
              
              {/* Checkbox Lists - 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center mt-0.5">
                      <FiCheck className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700">TSE standartlarına uygun kurulum</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center mt-0.5">
                      <FiCheck className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700">Kaliteli malzeme kullanımı</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center mt-0.5">
                      <FiCheck className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700">Güvenli elektrik sistemleri</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center mt-0.5">
                      <FiCheck className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700">Enerji verimli çözümler</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center mt-0.5">
                      <FiCheck className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700">Garantili işçilik</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center mt-0.5">
                      <FiCheck className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700">7/24 acil servis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Milestones */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-amber-100 rounded-full mb-4">
              <span className="text-amber-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                MİLESTONELAR
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Yolculuğumuz: Önemli Kilometre Taşları ve Başarılar
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Firmamızı şekillendiren önemli kilometre taşlarını keşfedin. Her başarı, 
              elektrik sektöründe mükemmellik ve büyüme taahhüdümüzü yansıtır.
            </p>
          </div>

          {/* Milestone Cards - Modern Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Milestone 1 - Featured (2 columns) */}
            <div className="md:col-span-2 lg:col-span-2 group relative bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 sm:p-8 text-white overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FiAward className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="text-xs sm:text-sm text-white/80 font-semibold mb-2">2017</div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">
                  Kuruluş
                </h3>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  İstanbul&apos;da elektrik hizmetleri verme vizyonuyla yolculuğumuza başladık. İlk müşteri projemiz 
                  gelecekteki başarılar için sahneyi hazırladı.
                </p>
              </div>
            </div>

            {/* Other Milestones - First 2 cards */}
            {certifications.slice(0, 2).map((cert, index) => (
              <div key={index} className="group relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-amber-50/0 group-hover:from-amber-50/50 group-hover:to-transparent transition-all duration-300"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:from-amber-200 group-hover:to-amber-100 transition-all duration-300">
                    <FiAward className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />
                  </div>
                  <div className="text-xs sm:text-sm text-amber-600 font-semibold mb-2">{cert.year}</div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Kaliteli hizmet sunmak için sahip olduğumuz belgeler ve sertifikalar.
                  </p>
                </div>
              </div>
            ))}

            {/* Remaining Milestones - Next 2 cards (centered on second row) */}
            {certifications.slice(2).map((cert, index) => (
              <div key={index + 2} className={`group relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300 overflow-hidden ${index === 0 ? 'md:col-start-1 lg:col-start-2' : ''}`}>
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-amber-50/0 group-hover:from-amber-50/50 group-hover:to-transparent transition-all duration-300"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:from-amber-200 group-hover:to-amber-100 transition-all duration-300">
                    <FiAward className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600" />
                  </div>
                  <div className="text-xs sm:text-sm text-amber-600 font-semibold mb-2">{cert.year}</div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Kaliteli hizmet sunmak için sahip olduğumuz belgeler ve sertifikalar.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">Misyonumuz</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
              &quot;İstanbul&apos;da yaşayan her ailenin ve işletmenin elektrik ihtiyaçlarını en hızlı, en kaliteli 
              ve en uygun fiyatla karşılamak. Modern teknoloji ile geleneksel ustalığı birleştirerek, 
              müşterilerimize 7/24 güvenilir elektrik hizmetleri sunmak bizim misyonumuz.&quot;
            </p>
            <div className="text-xs sm:text-sm text-amber-600 font-semibold">
              - Mervenur Elektirikk Ekibi
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Bizimle Çalışmak İster misiniz?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Deneyimli ekibimizle elektrik sorunlarınızı çözmek için bizi arayın.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a 
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Hemen İletişime Geçin</span>
              </a>
              <a 
                href="/galeri"
                className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-300 hover:border-amber-600 text-gray-900 hover:text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Çalışmalarımızı Görün</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
