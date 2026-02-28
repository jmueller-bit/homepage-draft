import type { Metadata } from 'next'
import { HomePage } from '@/components/home-page'
import { getLatestNews } from '@/lib/contentful'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://alz5.thesolution.at',
  },
}

export const revalidate = 120

export default async function Page() {
  const latestNews = await getLatestNews(3)
  return <HomePage latestNews={latestNews} />
}
