import { createClient } from 'contentful'

const NEWS_CONTENT_TYPE = 'newsArtikel'

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'TODO',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'TODO',
})

export type NewsEntry = {
  id: string
  title: string
  slug: string
  excerpt: string
  date: string
  content?: unknown
  image?: {
    url: string
    width?: number
    height?: number
  }
  category?: string
}

export interface TeamMember {
  sys: {
    id: string
  }
  fields: {
    name: string
    role: string
    bio?: string
    photo?: {
      fields: {
        file: {
          url: string
          details: {
            image: {
              width: number
              height: number
            }
          }
        }
      }
    }
  }
}

function mapNewsEntry(entry: any): NewsEntry | null {
  const fields = entry.fields as Record<string, any>

  const title = fields.titel || fields.title
  const slug = fields.slug
  const excerpt = fields.vorschautext || fields.excerpt || ''
  const date = fields.datum || fields.publishDate || fields.date
  const content = fields.inhalt || fields.content
  const category = fields.kategorie || fields.category
  const imageAsset = fields.titelbild || fields.coverImage

  if (!title || !slug || !date) {
    return null
  }

  const imageFile = imageAsset?.fields?.file

  return {
    id: entry.sys.id,
    title,
    slug,
    excerpt,
    date,
    content,
    category,
    image: imageFile
      ? {
          url: imageFile.url?.startsWith('http') ? imageFile.url : `https:${imageFile.url}`,
          width: imageFile.details?.image?.width,
          height: imageFile.details?.image?.height,
        }
      : undefined,
  }
}

export async function getNews(limit = 10): Promise<NewsEntry[]> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: NEWS_CONTENT_TYPE,
      order: ['-fields.datum', '-fields.publishDate'],
      limit,
    })

    return (entries.items.map(mapNewsEntry).filter(Boolean) as NewsEntry[]) || []
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsEntry | null> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: NEWS_CONTENT_TYPE,
      'fields.slug': slug,
      limit: 1,
    })

    const mapped = mapNewsEntry(entries.items[0])
    return mapped || null
  } catch (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }
}

export async function getLatestNews(count: number = 3): Promise<NewsEntry[]> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: NEWS_CONTENT_TYPE,
      order: ['-fields.datum', '-fields.publishDate'],
      limit: count,
    })

    return (entries.items.map(mapNewsEntry).filter(Boolean) as NewsEntry[]) || []
  } catch (error) {
    console.error('Error fetching latest news:', error)
    return []
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'teamMember',
      order: ['fields.order'],
    })
    return entries.items as unknown as TeamMember[]
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}
