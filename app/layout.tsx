import type { Metadata } from 'next'
import { Nunito, Merriweather } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://astrid-lindgren-zentrum.at'),
  title: {
    default: 'Astrid Lindgren Zentrum - Privatschule Wien',
    template: '%s | Astrid Lindgren Zentrum',
  },
  description: 'Eine moderne Privatschule in Wien, die Kindern einen kreativen, individuellen und ganzheitlichen Bildungsweg bietet. Von der Vorschule bis zur Oberstufe.',
  keywords: ['Privatschule', 'Wien', 'Astrid Lindgren', 'Bildung', 'Ganzheitlich', 'Kreativ'],
  authors: [{ name: 'Astrid Lindgren Zentrum' }],
  creator: 'Astrid Lindgren Zentrum',
  publisher: 'Astrid Lindgren Zentrum',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    url: 'https://astrid-lindgren-zentrum.at',
    siteName: 'Astrid Lindgren Zentrum',
    title: 'Astrid Lindgren Zentrum - Privatschule Wien',
    description: 'Eine moderne Privatschule in Wien, die Kindern einen kreativen, individuellen und ganzheitlichen Bildungsweg bietet.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Astrid Lindgren Zentrum',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astrid Lindgren Zentrum - Privatschule Wien',
    description: 'Eine moderne Privatschule in Wien',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'TODO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${nunito.variable} ${merriweather.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
