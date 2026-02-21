import { createClient } from 'contentful'

const NEWS_CONTENT_TYPE = 'newsArtikel'

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'TODO',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'TODO',
})

// Validate that environment variables are actually present at runtime
if (process.env.CONTENTFUL_SPACE_ID === 'TODO' || !process.env.CONTENTFUL_SPACE_ID) {
  console.warn('⚠️ WARNING: CONTENTFUL_SPACE_ID is not set in environment variables! Contentful API will fail.');
}

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

export type TeamEntry = {
  id: string
  name: string
  role: string
  bio?: string
  order?: number
  photo?: {
    url: string
    width?: number
    height?: number
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
      order: ['-fields.datum'],
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
      order: ['-fields.datum'],
      limit: count,
    })

    return (entries.items.map(mapNewsEntry).filter(Boolean) as NewsEntry[]) || []
  } catch (error) {
    console.error('Error fetching latest news:', error)
    return []
  }
}

function mapTeamEntry(entry: any): TeamEntry | null {
  const fields = entry.fields as Record<string, any>

  const name = fields.name || fields.titel || fields.vorname || fields.fullName
  const role = fields.funktion || fields.role || fields.rolle || fields.position
  const bio = fields.bio || fields.beschreibung || fields.text
  const order = fields.order ?? fields.reihenfolge
  const photoAsset = fields.photo || fields.foto || fields.bild

  if (!name || !role) return null

  const photoFile = photoAsset?.fields?.file

  return {
    id: entry.sys.id,
    name,
    role,
    bio,
    order: typeof order === 'number' ? order : undefined,
    photo: photoFile
      ? {
          url: photoFile.url?.startsWith('http') ? photoFile.url : `https:${photoFile.url}`,
          width: photoFile.details?.image?.width,
          height: photoFile.details?.image?.height,
        }
      : undefined,
  }
}

export async function getTeamMembers(): Promise<TeamEntry[]> {
  const contentTypes = ['teamMitglied']

  for (const contentType of contentTypes) {
    try {
      const entries = await contentfulClient.getEntries({
        content_type: contentType,
        limit: 50,
      })

      const mapped = entries.items.map(mapTeamEntry).filter(Boolean) as TeamEntry[]
      if (mapped.length > 0) {
        return mapped.sort((a, b) => {
          const aOrder = a.order ?? Number.MAX_SAFE_INTEGER
          const bOrder = b.order ?? Number.MAX_SAFE_INTEGER
          if (aOrder !== bOrder) return aOrder - bOrder
          return a.name.localeCompare(b.name)
        })
      }
    } catch (error) {
      console.error(`Error fetching team members for ${contentType}:`, error)
    }
  }

  return []
}
