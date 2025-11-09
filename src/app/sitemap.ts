import { MetadataRoute } from 'next'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sekaaltyapi.com' // Sitenizin gerçek domain'i ile değiştirin
  
  // Statik sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/hizmetlerimiz`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hizmet-bolgelerimiz`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeri`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/haberler`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Dinamik sayfalar - Haberler
  let newsPages: MetadataRoute.Sitemap = []
  try {
    const newsSnapshot = await getDocs(
      query(collection(db, 'haberler'), where('isActive', '==', true))
    )
    
    newsPages = newsSnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        url: `${baseUrl}/haberler/${doc.id}`,
        lastModified: data.updatedAt ? new Date(data.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }
    })
  } catch (error) {
    console.error('Haberler sitemap hatası:', error)
  }

  // Dinamik sayfalar - Hizmet detayları
  const servicePages = [
    {
      url: `${baseUrl}/hizmetlerimiz/kanalizasyon`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetlerimiz/kanalizasyon-tunel`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetlerimiz/banyo-mutfak`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetlerimiz/acil-servis`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hizmetlerimiz/yeni-tesisat`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetlerimiz/tesisat-kontrolu`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Dinamik sayfalar - Hizmet bölgeleri
  const serviceAreaPages = [
    {
      url: `${baseUrl}/hizmet-bolgelerimiz/uskudar`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hizmet-bolgelerimiz/kadikoy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hizmet-bolgelerimiz/besiktas`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hizmet-bolgelerimiz/sisli`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hizmet-bolgelerimiz/beyoglu`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  return [...staticPages, ...newsPages, ...servicePages, ...serviceAreaPages]
}
