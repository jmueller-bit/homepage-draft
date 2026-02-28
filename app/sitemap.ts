import { MetadataRoute } from 'next'
import { getNews, getJobListings } from '@/lib/contentful'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alz5.thesolution.at'
  
  // Static routes
  const staticRoutes = [
    '',
    '/ueber-uns',
    '/schule',
    '/schule/anmeldung',
    '/news',
    '/galerie',
    '/foerdern',
    '/karriere',
    '/kontakt',
    '/impressum',
    '/datenschutz',
  ]
  
  // Get dynamic content
  const [news, jobs] = await Promise.all([
    getNews(100),
    getJobListings(),
  ])
  
  // Build sitemap entries
  const sitemapEntries: MetadataRoute.Sitemap = [
    // Static pages
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    
    // News articles
    ...news.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    
    // Job listings
    ...jobs.map((job) => ({
      url: `${baseUrl}/karriere/${job.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
  
  return sitemapEntries
}
