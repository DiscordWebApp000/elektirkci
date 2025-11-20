'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '../../store';
import { sendContactMessage, fetchContactInfo, clearError } from '../../store/slices/contactSlice';
import { FiPhone, FiMail, FiMapPin, FiClock, FiZap } from 'react-icons/fi';

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  urgency: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    urgency: 'normal',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();
  const { isSending, error, contactInfo } = useAppSelector((state: RootState) => state.contact) as { 
    isSending: boolean; 
    error: string | null;
    contactInfo: {
      phone: string;
      email: string;
      address: string;
      workingHours: string;
    } | null;
  };

  useEffect(() => {
    dispatch(fetchContactInfo());
    dispatch(clearError());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    // Form validasyonu
    if (!formData.name || !formData.phone || !formData.email || !formData.serviceType || !formData.message) {
      return;
    }

    try {
      const messageData = {
        ...formData,
        subject: `${formData.serviceType} - ${formData.urgency}`,
        priority: formData.urgency === 'cok-acil' ? 'high' as const : formData.urgency === 'acil' ? 'medium' as const : 'low' as const,
      };

      await dispatch(sendContactMessage(messageData)).unwrap();

      // Formu temizle
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceType: '',
        urgency: 'normal',
        message: ''
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Mesaj gönderilirken hata:', err);
      // Error is handled by Redux
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://www.centuracollege.edu/wp-content/uploads/2025/05/5_19-CEN-Electrical1-min-1024x683.jpg"
            alt="Elektrik İletişim Arka Plan"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
            unoptimized
          />
        </div>
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-amber-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <div className="w-8 h-0.5 bg-amber-500 rounded-full"></div>
              <span className='text-lg'>İLETİŞİM</span>
              <div className="w-8 h-0.5 bg-amber-500 rounded-full"></div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Elektrik sorunlarınız için uzman ekibimizle iletişime geçin. 7/24 hizmetinizdeyiz!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Map Section - Side by Side */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Mesaj Gönderin
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Elektrik ihtiyaçlarınız için profesyonel çözümler sunuyoruz. Hemen iletişime geçin!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* Contact Form */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-50 rounded-full opacity-70 z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-50 rounded-full opacity-70 z-0"></div>
              
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 relative z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-t-xl"></div>
                
                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</span>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{error}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Telefon *
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        placeholder="Telefon numaranız"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="E-posta adresiniz"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Hizmet Türü *
                    </label>
                    <select 
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Hizmet seçiniz</option>
                      <option value="elektrik-tesisati">Elektrik Tesisatı</option>
                      <option value="elektrik-ariza">Elektrik Arıza Onarım</option>
                      <option value="aydinlatma">Aydınlatma Sistemleri</option>
                      <option value="elektrik-panosu">Elektrik Panosu Montajı</option>
                      <option value="bakim-kontrol">Elektrik Bakım ve Kontrol</option>
                      <option value="acil-servis">Acil Elektrik Servisi</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Aciliyet Durumu
                    </label>
                    <div className="flex flex-wrap gap-4 sm:gap-6">
                      <label className="flex items-center gap-2 hover:text-amber-600 cursor-pointer transition-colors">
                        <input 
                          type="radio" 
                          name="urgency" 
                          value="normal" 
                          checked={formData.urgency === 'normal'}
                          onChange={handleInputChange}
                          className="text-amber-600" 
                        />
                        <span className="text-xs sm:text-sm text-gray-700">Normal</span>
                      </label>
                      <label className="flex items-center gap-2 hover:text-amber-600 cursor-pointer transition-colors">
                        <input 
                          type="radio" 
                          name="urgency" 
                          value="acil" 
                          checked={formData.urgency === 'acil'}
                          onChange={handleInputChange}
                          className="text-amber-600" 
                        />
                        <span className="text-xs sm:text-sm text-gray-700">Acil</span>
                      </label>
                      <label className="flex items-center gap-2 hover:text-amber-600 cursor-pointer transition-colors">
                        <input 
                          type="radio" 
                          name="urgency" 
                          value="cok-acil" 
                          checked={formData.urgency === 'cok-acil'}
                          onChange={handleInputChange}
                          className="text-amber-600" 
                        />
                        <span className="text-xs sm:text-sm text-gray-700">Çok Acil</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Mesajınız *
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Sorununuzu detaylı olarak açıklayın, adres bilgisi ekleyin..."
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      required
                      className="text-amber-600 rounded focus:ring-amber-500"
                    />
                    <label className="text-xs sm:text-sm text-gray-600">
                      <a href="#" className="text-amber-600 hover:underline">Gizlilik Politikası</a>&apos;nı ve{' '}
                      <a href="#" className="text-amber-600 hover:underline">Kullanım Şartları</a>&apos;nı kabul ediyorum
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {isSending ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Gönderiliyor...</span>
                      </div>
                    ) : (
                      'Mesaj Gönder'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-4 sm:space-y-5">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                <FiMapPin className="text-amber-600 w-5 h-5" />
                <span>Konumumuz</span>
              </h3>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg h-80 sm:h-96 border border-gray-100">
                <iframe
                  src="https://www.google.com/maps?q=İstanbul%2C%20Türkiye&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mervenur Elektirikk Konum"
                ></iframe>
              </div>
              
              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-3 p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                    <FiZap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-gray-900">Hızlı Servis</p>
                    <p className="text-gray-600 text-xs sm:text-sm">Her zaman yanınızda</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-gray-900">Çalışma Saatleri</p>
                    <p className="text-gray-600 text-xs sm:text-sm">7/24 Hizmet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section - Elegant Minimal Design */}
      <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-5 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full text-amber-200">
            <path d="M50,50 Q100,20 150,50 T250,50" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M30,100 Q100,70 170,100 T310,100" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full text-amber-200">
            <path d="M50,150 Q100,180 150,150 T250,150" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M30,100 Q100,130 170,100 T310,100" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Phone */}
            <div className="text-center">
              <div className="mb-5 sm:mb-6 flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <FiPhone className="w-12 h-12 text-amber-600/40" strokeWidth="1" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 sm:mb-3">
                Telefon Arayın
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 leading-relaxed">
                Genel sorularınız için bizi arayın.
              </p>
              <a
                href={contactInfo?.phone ? `tel:${contactInfo.phone.replace(/\s/g, '')}` : "tel:+905327899182"}
                className="text-amber-600 font-medium text-sm sm:text-base hover:text-amber-700 transition-colors inline-block"
              >
                {contactInfo?.phone || '+90 532 789 91 82'}
              </a>
            </div>

            {/* Email */}
            <div className="text-center">
              <div className="mb-5 sm:mb-6 flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <FiMail className="w-12 h-12 text-amber-600/40" strokeWidth="1" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 sm:mb-3">
                E-posta Gönderin
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 leading-relaxed">
                Genel sorularınız için bize yazın.
              </p>
              <a
                href={contactInfo?.email ? `mailto:${contactInfo.email}` : "mailto:info@debuelektrik.com"}
                className="text-amber-600 font-medium text-xs sm:text-sm hover:text-amber-700 transition-colors inline-block break-all"
              >
                {contactInfo?.email || 'info@debuelektrik.com'}
              </a>
            </div>

            {/* Address */}
            <div className="text-center">
              <div className="mb-5 sm:mb-6 flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <FiMapPin className="w-12 h-12 text-amber-600/40" strokeWidth="1" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 mb-2 sm:mb-3">
                Adresimiz
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 leading-relaxed">
                Ofisimize uğrayabilirsiniz.
              </p>
              <p className="text-amber-600 font-medium text-xs sm:text-sm leading-relaxed">
                {contactInfo?.address || 'İstanbul, Türkiye'}
              </p>
            </div>
          </div>

          {/* Working Hours - Centered Below */}
          {contactInfo?.workingHours && (
            <div className="mt-12 sm:mt-16 text-center">
              <div className="inline-flex items-center gap-3">
                <FiClock className="w-5 h-5 text-amber-600/60" strokeWidth="1.5" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Çalışma Saatleri</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">{contactInfo.workingHours}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
