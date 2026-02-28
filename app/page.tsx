import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { getLatestNews, getSchuleAllgemeinImages, type GalleryImage } from '@/lib/contentful'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://alz5.thesolution.at',
  },
}

export const revalidate = 120

export default async function Page() {
  const [latestNews, alltagImages] = await Promise.all([
    getLatestNews(3),
    getSchuleAllgemeinImages(6), // Lade 6 Bilder für den Alltag-Abschnitt
  ])
  
  return <HomePage latestNews={latestNews} alltagImages={alltagImages} />
}
