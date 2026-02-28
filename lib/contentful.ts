import { createClient } from 'contentful'

export const NEWS_CONTENT_TYPE = 'newsArtikel'
export const GALLERY_CONTENT_TYPE = 'galleryImage'

// Delivery Client (read-only, für öffentliche Website)
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

export type GalleryImage = {
  id: string
  title: string
  src: string
  alt: string
  category: string
  order: number
  description?: string
  width?: number
  height?: number
}

export type JobEntry = {
  id: string
  title: string
  department?: string
  location?: string
  type?: string
  description?: string
  requirements?: string[]
  benefits?: string[]
  contactEmail?: string
  postedDate?: string
  isActive: boolean
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
  if (!process.env.CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID === 'TODO') {
    return [{
      id: 'env-error',
      title: '🚨 Server-Fehler: Contentful Variablen fehlen',
      slug: 'fehlende-konfiguration',
      excerpt: 'Die Umgebungsvariablen CONTENTFUL_SPACE_ID und CONTENTFUL_ACCESS_TOKEN sind auf Vercel/Coolify nicht gesetzt. Bitte im Dashboard eintragen und einen Rebuild anstoßen!',
      date: new Date().toISOString(),
    }]
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: NEWS_CONTENT_TYPE,
      order: ['-fields.datum'],
      limit,
    })

    return (entries.items.map(mapNewsEntry).filter(Boolean) as NewsEntry[]) || []
  } catch (error: any) {
    console.error('Error fetching news:', error)
    return [{
      id: 'api-error',
      title: '🚨 Verbindung zu Contentful fehlgeschlagen',
      slug: 'api-error',
      excerpt: `Der Server konnte die News nicht von Contentful laden. Details: ${error?.message || 'Unbekannter Fehler'}. Prüfe ob die Zugangsdaten im Server Dashboard korrekt sind.`,
      date: new Date().toISOString(),
    }]
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
  if (!process.env.CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID === 'TODO') {
    return [{
      id: 'env-error',
      title: '🚨 Server-Fehler: Contentful Variablen fehlen',
      slug: 'fehlende-konfiguration',
      excerpt: 'Die Umgebungsvariablen CONTENTFUL_SPACE_ID und CONTENTFUL_ACCESS_TOKEN sind auf Vercel/Coolify nicht gesetzt. Bitte im Dashboard eintragen und einen Rebuild anstoßen!',
      date: new Date().toISOString(),
    }]
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: NEWS_CONTENT_TYPE,
      order: ['-fields.datum'],
      limit: count,
    })

    return (entries.items.map(mapNewsEntry).filter(Boolean) as NewsEntry[]) || []
  } catch (error: any) {
    console.error('Error fetching latest news:', error)
    return [{
      id: 'api-error',
      title: '🚨 Verbindung zu Contentful fehlgeschlagen',
      slug: 'api-error',
      excerpt: `Der Server konnte die News nicht von Contentful laden. Details: ${error?.message || 'Unbekannter Fehler'}. Prüfe ob die Zugangsdaten im Server Dashboard korrekt sind.`,
      date: new Date().toISOString(),
    }]
  }
}

function mapTeamEntry(entry: any): TeamEntry | null {
  const fields = entry.fields as Record<string, any>

  const name = fields.name || fields.titel || fields.vorname || fields.fullName
  const role = fields.funktion || fields.role || fields.rolle || fields.position
  let bio = fields.bio || fields.beschreibung || fields.text
  const order = fields.order ?? fields.reihenfolge
  const photoAsset = fields.photo || fields.foto || fields.bild

  if (!name || !role) return null

  // Extract simple text if bio is a Rich Text object
  if (bio && typeof bio === 'object' && bio.nodeType === 'document') {
    try {
      bio = bio.content
        .map((c: any) => c.content?.map((cc: any) => cc.value || '').join(''))
        .join('\n')
    } catch (e) {
      bio = ''
    }
  }

  const photoFile = photoAsset?.fields?.file

  return {
    id: entry.sys.id,
    name,
    role,
    bio: typeof bio === 'string' ? bio : undefined,
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

function mapGalleryImage(entry: any): GalleryImage | null {
  const fields = entry.fields as Record<string, any>

  const title = fields.titel
  const category = fields.kategorie || 'Allgemein'
  const order = fields.reihenfolge ?? 0
  
  // Handle bild array (Contentful Asset array)
  // Contentful resolves linked assets automatically when using include
  const bildArray = fields.bild
  let imageAsset = null
  
  if (Array.isArray(bildArray) && bildArray.length > 0) {
    // Asset is already resolved by Contentful client
    imageAsset = bildArray[0]
  }

  const imageFile = imageAsset?.fields?.file

  if (!title || !imageFile) {
    console.warn('Gallery image missing title or file:', entry.sys.id)
    return null
  }

  const imageUrl = imageFile.url?.startsWith('http') ? imageFile.url : `https:${imageFile.url}`

  return {
    id: entry.sys.id,
    title,
    src: imageUrl,
    alt: title,
    category,
    order: typeof order === 'number' ? order : 0,
    width: imageFile.details?.image?.width,
    height: imageFile.details?.image?.height,
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

export async function getTeamMemberById(id: string): Promise<TeamEntry | null> {
  try {
    const entry = await contentfulClient.getEntry(id)
    return mapTeamEntry(entry)
  } catch (error) {
    console.error(`Error fetching team member ${id}:`, error)
    return null
  }
}

export async function getGalleryImages(limit = 50): Promise<GalleryImage[]> {
  if (!process.env.CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID === 'TODO') {
    console.warn('⚠️ Gallery: CONTENTFUL_SPACE_ID not set, returning empty array')
    return []
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: GALLERY_CONTENT_TYPE,
      order: ['fields.reihenfolge'],
      limit,
      include: 1, // Include linked assets
    })

    return (entries.items.map(mapGalleryImage).filter(Boolean) as GalleryImage[])
      .sort((a, b) => a.order - b.order)
  } catch (error: any) {
    console.error('Error fetching gallery images:', error)
    return []
  }
}

function mapJobEntry(entry: any): JobEntry | null {
  const fields = entry.fields as Record<string, any>

  const title = fields.titel || fields.title || fields.jobTitle
  const department = fields.abteilung || fields.department
  const location = fields.standort || fields.location || 'Wien'
  const type = fields.art || fields.type || fields.employmentType
  let description = fields.beschreibung || fields.description || fields.jobDescription
  const requirements = fields.anforderungen || fields.requirements || []
  const benefits = fields.benefits || fields.vorteile || []
  const contactEmail = fields.kontaktEmail || fields.contactEmail
  const postedDate = fields.eingestelltAm || fields.postedDate || fields.date
  const isActive = fields.aktiv !== false && fields.isActive !== false

  if (!title) return null

  // Extract simple text if description is a Rich Text object
  if (description && typeof description === 'object' && description.nodeType === 'document') {
    try {
      description = description.content
        .map((c: any) => c.content?.map((cc: any) => cc.value || '').join(''))
        .join('\n')
    } catch (e) {
      description = ''
    }
  }

  return {
    id: entry.sys.id,
    title,
    department,
    location,
    type,
    description: typeof description === 'string' ? description : undefined,
    requirements: Array.isArray(requirements) ? requirements : [],
    benefits: Array.isArray(benefits) ? benefits : [],
    contactEmail,
    postedDate,
    isActive,
  }
}

export async function getJobListings(): Promise<JobEntry[]> {
  const contentTypes = ['stellenanzeige', 'jobPosting', 'job']

  for (const contentType of contentTypes) {
    try {
      const entries = await contentfulClient.getEntries({
        content_type: contentType,
        limit: 50,
      })

      const mapped = entries.items.map(mapJobEntry).filter(Boolean) as JobEntry[]
      if (mapped.length > 0) {
        // Only return active jobs, sorted by posted date
        return mapped
          .filter(job => job.isActive)
          .sort((a, b) => {
            if (a.postedDate && b.postedDate) {
              return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
            }
            return 0
          })
      }
    } catch (error) {
      // Check if error is due to unknown content type
      const err = error as any
      if (err?.name === 'unknownContentType') {
        // Content type doesn't exist, try the next one
        continue
      }
      console.error(`Error fetching job listings for ${contentType}:`, error)
    }
  }

  return []
}

export async function getJobById(id: string): Promise<JobEntry | null> {
  try {
    const entry = await contentfulClient.getEntry(id)
    return mapJobEntry(entry)
  } catch (error) {
    console.error(`Error fetching job ${id}:`, error)
    return null
  }
}
