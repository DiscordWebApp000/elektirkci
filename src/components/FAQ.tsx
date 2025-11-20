'use client'
import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "7/24 acil elektrik servisi hizmeti veriyor musunuz?",
      answer: "Evet, 7 gün 24 saat acil elektrik servisi hizmeti veriyoruz. Elektrik kesintisi, sigorta atması, elektrik kaçağı gibi acil durumlarınızda hemen bizi arayabilirsiniz. Gece gündüz demeden yanınızdayız."
    },
    {
      question: "Elektrik işlerinizde garanti veriyor musunuz?",
      answer: "Elbette! Tüm elektrik işlerimizde 2 yıl garanti veriyoruz. Kullandığımız malzemeler de üretici garantisi kapsamındadır. Herhangi bir sorun yaşarsanız ücretsiz müdahale ediyoruz."
    },
    {
      question: "Fiyat teklifi almak için ne yapmam gerekiyor?",
      answer: "Ücretsiz keşif ve fiyat teklifi için bizi arayabilir veya iletişim formundan mesaj gönderebilirsiniz. Uzman ekibimiz gelip işi yerinde inceleyerek size detaylı fiyat teklifi sunar."
    },
    {
      question: "Hangi bölgelerde hizmet veriyorsunuz?",
      answer: "İstanbul'nın tüm ilçelerinde hizmet veriyoruz. Özellikle Muratpaşa, Konyaaltı, Kepez ve Döşemealtı bölgelerinde daha hızlı müdahale edebiliyoruz."
    },
    {
      question: "Elektrik malzemelerini siz mi temin ediyorsunuz?",
      answer: "Evet, kaliteli ve garantili elektrik malzemelerini biz temin ediyoruz. TSE standartlarına uygun malzemeler kullanıyoruz. İsterseniz kendi malzemenizi de getirebilirsiniz. Sadece işçilik ücreti alırız."
    },
    {
      question: "Elektrik arızası tespiti nasıl yapılır?",
      answer: "Modern test cihazları ile elektrik arızası tespiti yapıyoruz. Multimetre, toprak direnci ölçüm cihazları ve termal kamera ile arızanın yerini tespit ediyoruz. Güvenli şekilde sorunun kaynağını bulup çözüyoruz."
    },
    {
      question: "Elektrik bakımı ne sıklıkla yapılmalı?",
      answer: "Elektrik bakımı yılda en az bir kez yapılmalıdır. Özellikle yaz öncesi ve kış öncesi bakım önemlidir. Düzenli bakım sayesinde elektrik sisteminizin ömrü uzar ve arıza riski azalır."
    },
    {
      question: "Ödeme nasıl yapabilirim?",
      answer: "Nakit, kredi kartı (taksitli), banka kartı ve havale ile ödeme kabul ediyoruz. İş tamamlandıktan sonra ödeme alıyoruz. Büyük projeler için peşin indirim uyguluyoruz."
    }
  ];

  return (
    <section id="sss" className="pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24 bg-gradient-to-b from-white via-gray-50 to-white relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-amber-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <div className="w-8 h-0.5 bg-amber-600 rounded-full"></div>
            <span>SİK SORULAN SORULAR</span>
            <div className="w-8 h-0.5 bg-amber-600 rounded-full"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-3 bg-gradient-to-r from-gray-900 via-amber-600 to-gray-900 bg-clip-text text-transparent">
            Merak Ettikleriniz
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Müşterilerimizin en sık sorduğu soruları ve yanıtlarını derledik. Aradığınız cevabı bulamıyorsanız bizimle iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left - FAQ List */}
          <div className="space-y-4 sm:space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl border transition-all duration-500 overflow-hidden ${
                  activeIndex === index 
                    ? 'border-amber-500 shadow-xl shadow-amber-500/20' 
                    : 'border-gray-200 hover:border-amber-300 hover:shadow-lg'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 sm:p-6 text-left focus:outline-none"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xs sm:text-sm font-black transition-all duration-300 flex-shrink-0 ${
                        activeIndex === index 
                          ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white scale-110' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-amber-100 group-hover:text-amber-600'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className={`text-sm sm:text-base font-bold leading-tight flex-1 transition-colors ${
                        activeIndex === index ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-amber-500 text-white rotate-180' 
                        : 'bg-gray-100 text-gray-400 group-hover:bg-amber-100 group-hover:text-amber-600'
                    }`}>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <div className="bg-gradient-to-br from-amber-50 to-white p-4 sm:p-5 rounded-xl border border-amber-100">
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Contact Card */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white rounded-2xl border border-gray-200 p-7 sm:p-9 lg:p-10 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5">
                    Hemen Destek Alın
                  </h3>
                  <p className="text-sm text-gray-500">
                    7/24 Hizmet
                  </p>
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 mb-7 leading-relaxed">
                Acil durumlarınızda uzman ekibimiz en kısa sürede yanınızda.
              </p>
              
              <a
                href="tel:+905327899182"
                className="group w-full inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Hemen Ara</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
