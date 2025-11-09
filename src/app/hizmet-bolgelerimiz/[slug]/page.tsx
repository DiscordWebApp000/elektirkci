'use client'
import React, { useState, useEffect, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ServiceArea {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  isActive: boolean;
  order: number;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ServiceAreaDetailPage = ({ params }: PageProps) => {
  const { slug } = use(params);
  const [serviceArea, setServiceArea] = useState<ServiceArea | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceArea = async () => {
      try {
        setLoading(true);
        
        const docRef = doc(db, 'service_areas', slug);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as ServiceArea;
          if (data.isActive) {
            setServiceArea(data);
          } else {
            notFound();
          }
        } else {
          notFound();
        }
        
      } catch (error) {
        console.error('Hizmet bölgesi yüklenirken hata:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchServiceArea();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Sayfa yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!serviceArea) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 text-white">
        <div className="absolute inset-0">
          {serviceArea.imageUrl ? (
            <Image
              src={serviceArea.imageUrl}
              alt={serviceArea.title}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              quality={85}
            />
          ) : (
            <Image
              src="/img/sayfa1.jpg"
              alt="Hizmet Bölgesi Arka Plan"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              quality={85}
            />
          )}
        </div>
        <div className="absolute inset-0 bg-black opacity-75"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium mb-6">
            <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
            <span>HİZMET BÖLGESİ</span>
            <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {serviceArea.title}
          </h1>
          {serviceArea.description && (
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {serviceArea.description}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-amber-600 transition-colors">
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link href="/hizmet-bolgelerimiz" className="hover:text-amber-600 transition-colors">
              Hizmet Bölgelerimiz
            </Link>
            <span>/</span>
            <span className="text-gray-900">{serviceArea.title}</span>
          </nav>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            {serviceArea.content ? (
              <div 
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: serviceArea.content }}
              />
            ) : (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">İçerik henüz eklenmemiş</h3>
                <p className="text-gray-600">
                  Bu hizmet bölgesi için detaylı içerik yakında eklenecek.
                </p>
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="text-center mt-16">
            <Link 
              href="/hizmet-bolgelerimiz"
              className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Tüm Hizmet Bölgelerine Dön
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreaDetailPage;
