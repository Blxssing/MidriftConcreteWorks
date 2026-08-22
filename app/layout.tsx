import { Analytics } from '@vercel/analytics/next'
import { DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-ibm-plex-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://midrift.co.ke'),
  title: {
    default: 'Midrift Concrete Works | Precast Concrete Manufacturers Kenya',
    template: '%s | Midrift Concrete Works',
  },
  description: 'Midrift Concrete Works manufactures and supplies cabro, paving blocks, concrete blocks, ventilation blocks, road kerbs, culverts and custom precast concrete for projects in Kenya.',
  keywords: [
    'precast concrete Kenya', 'precast concrete manufacturers Kenya', 'cabro suppliers Kenya',
    'cabro blocks Kenya', 'paving blocks Kenya', 'concrete blocks Kenya', 'hollow blocks Kenya',
    'solid concrete blocks Kenya', 'ventilation blocks Kenya', 'road kerbs Kenya',
    'concrete culverts Kenya', 'wholesale cabro Kenya', 'bulk cabro suppliers',
    'construction materials supplier Kenya', 'concrete products suppliers Kenya',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: 'Midrift Concrete Works',
    title: 'Midrift Concrete Works | Precast Concrete Manufacturers Kenya',
    description: 'Quality precast concrete. Built for strength. Designed for performance.',
    url: 'https://midrift.co.ke',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Midrift Concrete Works | Precast Concrete Manufacturers Kenya',
    description: 'Quality precast concrete, project supply and custom concrete solutions in Kenya.',
  },
  generator: 'v0.app',
  robots: { index: true, follow: true },
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
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${dmSans.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
