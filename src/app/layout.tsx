import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { StructuredData } from '@/components/seo/StructuredData'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://strelitzia515.co.uk'),
  title: {
    default: 'Strelitzia — Neighbourhood Café, Specialty Coffee & Deli | Dalston, London',
    template: '%s | Strelitzia',
  },
  description: 'Strelitzia is a neighbourhood café and deli on Kingsland Road, Dalston. Specialty coffee from independent roasters, fresh deli sandwiches, salads, pastries & curated retail.',
  keywords: [
    'coffee shop Dalston',
    'café Kingsland Road',
    'specialty coffee London',
    'deli sandwiches Dalston',
    'breakfast brunch East London',
    'coffee beans retail London',
  ],
  authors: [{ name: 'Strelitzia' }],
  creator: 'Strelitzia',
  publisher: 'Strelitzia',
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
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://strelitzia515.co.uk',
    siteName: 'Strelitzia',
    title: 'Strelitzia — Neighbourhood Café, Specialty Coffee & Deli',
    description: 'Specialty coffee, fresh deli food & curated retail on Kingsland Road, Dalston.',
    images: [
      {
        url: '/images/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Strelitzia café interior',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strelitzia — Neighbourhood Café, Specialty Coffee & Deli',
    description: 'Specialty coffee, fresh deli food & curated retail on Kingsland Road, Dalston.',
    images: ['/images/og-default.svg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body className="min-h-screen flex flex-col">
        <StructuredData />
        <Navbar />
        <main className="flex-1 pt-16 sm:pt-18" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}