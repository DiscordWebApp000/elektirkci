import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ReduxProvider from "@/components/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seka Altyapı - Profesyonel Tesisat Hizmetleri | İstanbul",
  description: "İstanbul'da 20 yıllık deneyimle profesyonel kanalizasyon açma, kanalizasyon görüntüleme, banyo mutfak gideri açma işlemleri ve 7/24 acil servis. Üsküdar, Kadıköy, Beşiktaş ve tüm İstanbul'a hizmet.",
  keywords: [
    "tesisat",
    "kanalizasyon açma",
    "kanalizasyon görüntüleme",
    "gider açma",
    "banyo tesisatı",
    "mutfak tesisatı",
    "acil tesisat",
    "İstanbul tesisat",
    "Üsküdar tesisat",
    "Kadıköy tesisat",
    "Beşiktaş tesisat",
    "Seka Altyapı"
  ],
  authors: [{ name: "Seka Altyapı" }],
  creator: "Seka Altyapı",
  publisher: "Seka Altyapı",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sekaaltyapi.com'), // Gerçek domain ile değiştirin
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Seka Altyapı - Profesyonel Tesisat Hizmetleri",
    description: "İstanbul'da 20 yıllık deneyimle profesyonel tesisat hizmetleri. Kanalizasyon açma, gider açma, acil servis.",
    url: 'https://sekaaltyapi.com',
    siteName: 'Seka Altyapı',
    images: [
      {
        url: '/img/slider.jpg',
        width: 1200,
        height: 630,
        alt: 'Seka Altyapı Tesisat Hizmetleri',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Seka Altyapı - Profesyonel Tesisat Hizmetleri",
    description: "İstanbul'da 20 yıllık deneyimle profesyonel tesisat hizmetleri.",
    images: ['/img/slider.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Google Search Console'dan alın
    // yandex: 'your-yandex-verification-code', // Yandex için
  },
  icons: {
    icon: '/ico.png',
    shortcut: '/ico.png',
    apple: '/ico.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Seka Altyapı",
              "description": "İstanbul'da 20 yıllık deneyimle profesyonel tesisat hizmetleri",
              "url": "https://sekaaltyapi.com",
              "telephone": "+905327899182",
              "email": "info@sekaaltyapi.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bulgurlu, Milli Sk. No:2",
                "addressLocality": "Üsküdar",
                "addressRegion": "İstanbul",
                "postalCode": "34696",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "41.0214",
                "longitude": "29.0411"
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "priceRange": "$$",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "41.0082",
                  "longitude": "28.9784"
                },
                "geoRadius": "50000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Tesisat Hizmetleri",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Kanalizasyon Açma",
                      "description": "Kanalizasyon görüntüleme ve açma hizmetleri"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Banyo & Mutfak Tesisatı",
                      "description": "Banyo ve mutfak gider açma hizmetleri"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Acil Servis",
                      "description": "7/24 acil tesisat müdahale hizmeti"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })
          }}
        />
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KZKXK4KN');`,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KZKXK4KN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ReduxProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </ReduxProvider>
      </body>
    </html>
  );
}

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  // Admin sayfalarında Header, Footer ve FloatingContact gösterme
  // Bu kontrol client-side'da yapılacak
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingContact />
    </>
  );
}
