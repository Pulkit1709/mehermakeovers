import type { Metadata, Viewport } from 'next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
  weight: ['400', '500', '700']
})

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  variable: '--font-heading',
  weight: ['300', '400', '600', '700'],
  style: ['italic', 'normal']
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://mehermakeover.com'),
  title: {
    default: 'Meher Makeover | Luxury Salon in Agra',
    template: '%s | Meher Makeover',
  },
  description: 'Premium unisex salon in Agra for bridal makeup, hair styling, nail art, skin rituals, and luxury beauty appointments. 10+ years of excellence.',
  keywords: ['luxury salon Agra', 'bridal makeup Agra', 'Meher Makeover', 'hair salon Agra', 'nail art Agra', 'skin treatment Agra', 'beauty salon Agra', 'makeup artist Agra'],
  authors: [{ name: 'Meher Makeover' }],
  creator: 'Meher Makeover',
  publisher: 'Meher Makeover',
  alternates: {
    canonical: 'https://mehermakeover.com',
  },
  openGraph: {
    title: 'Meher Makeover | Luxury Salon in Agra',
    description: 'Premium unisex salon for bridal, hair, makeup, nails, and skin rituals in Agra.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Meher Makeover',
    images: [
      {
        url: '/ai-saloon-interior.png',
        width: 1200,
        height: 630,
        alt: 'AI-generated luxury salon interior image for Meher Makeover',
        type: 'image/png',
      },
    ],
    url: 'https://mehermakeover.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meher Makeover | Luxury Salon in Agra',
    description: 'Premium unisex salon for bridal, hair, makeup, nails, and skin rituals.',
    images: ['/ai-saloon-interior.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow',
  },
  category: 'Beauty & Wellness',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BeautySalon',
              name: 'Meher Makeover',
              image: '/ai-saloon-interior.png',
              telephone: '+918057067771',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '20, Church Road, Next to Mansi Store, Surya Nagar',
                addressLocality: 'Agra',
                postalCode: '282002',
                addressCountry: 'IN',
              },
              openingHours: 'Mo-Su 10:00-20:00',
              priceRange: 'RsRs',
              sameAs: ['https://instagram.com/makeoverbymeher'],
            }),
          }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
