import { createClient } from 'contentful'

export const NEWS_CONTENT_TYPE = 'newsArtikel'
export const GALLERY_CONTENT_TYPE = 'galleryImage'
export const SCHULE_ALLGEMEIN_CONTENT_TYPE = 'schuleAllgemein'
export const SCHULE_EVENT_CONTENT_TYPE = 'schuleEvent'

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
  entryId?: string  // Referenz zum Original-Eintrag
  imageIndex?: number  // Index innerhalb des Eintrags
  totalImages?: number  // Anzahl der Bilder im Eintrag
}

export type JobEntry = {
  id: string
  title: string
  department?: string
  location?: string
  type?: string
  description?: string
  descriptionRichText?: any // Contentful RichText Document für formatierte Darstellung
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

function mapGalleryEntry(entry: any): GalleryImage[] {
  const fields = entry.fields as Record<string, any>

  const title = fields.titel
  const category = fields.kategorie || 'Allgemein'
  const order = fields.reihenfolge ?? 0
  
  // Handle bild array (Contentful Asset array)
  const bildArray = fields.bild
  
  if (!title || !Array.isArray(bildArray) || bildArray.length === 0) {
    console.warn('Gallery entry missing title or images:', entry.sys.id)
    return []
  }

  const totalImages = bildArray.length
  
  // Erstelle für jedes Bild einen GalleryImage Eintrag
  return bildArray
    .filter((imageAsset: any) => imageAsset?.fields?.file)
    .map((imageAsset: any, index: number) => {
      const imageFile = imageAsset.fields.file
      const imageUrl = imageFile.url?.startsWith('http') ? imageFile.url : `https:${imageFile.url}`
      
      // Für einzelne Bilder einfacher Titel, für mehrere nummeriert
      const imageTitle = totalImages > 1 ? `${title} (${index + 1}/${totalImages})` : title
      
      return {
        id: `${entry.sys.id}-${index}`,  // Eindeutige ID für jedes Bild
        title: imageTitle,
        src: imageUrl,
        alt: imageTitle,
        category,
        order: (typeof order === 'number' ? order : 0) * 100 + index,  // Sortierung
        width: imageFile.details?.image?.width,
        height: imageFile.details?.image?.height,
        entryId: entry.sys.id,  // Referenz zum Original-Eintrag
        imageIndex: index,  // Index innerhalb des Eintrags
        totalImages: totalImages,  // Anzahl der Bilder im Eintrag
      }
    })
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

    // Flatten: Ein Eintrag kann mehrere Bilder haben
    return entries.items
      .flatMap(mapGalleryEntry)
      .sort((a, b) => a.order - b.order)
  } catch (error: any) {
    console.error('Error fetching gallery images:', error)
    return []
  }
}

function extractRichTextContent(richText: any): string {
  if (!richText || typeof richText !== 'object') return ''
  if (richText.nodeType !== 'document') return String(richText)
  
  try {
    const extractNodes = (nodes: any[]): string => {
      return nodes.map((node: any) => {
        if (node.nodeType === 'text') {
          return node.value || ''
        }
        if (node.content && Array.isArray(node.content)) {
          const content = extractNodes(node.content)
          // Füge Zeilenumbrüche für bestimmte Block-Typen hinzu
          if (['paragraph', 'list-item', 'heading-1', 'heading-2', 'heading-3'].includes(node.nodeType)) {
            return content + '\n'
          }
          return content
        }
        return ''
      }).join('')
    }
    
    return extractNodes(richText.content).trim()
  } catch (e) {
    console.warn('Error extracting rich text content:', e)
    return ''
  }
}

function mapJobEntry(entry: any): JobEntry | null {
  const fields = entry.fields as Record<string, any>

  // Unterstütze verschiedene Feldnamen aus verschiedenen Content-Typen
  const title = fields.titel || fields.title || fields.jobTitle || fields.position
  const department = fields.abteilung || fields.department
  const location = fields.standort || fields.location || 'Wien'
  const type = fields.art || fields.type || fields.employmentType
  
  // Beschreibung: Zuerst versuchen wir die lange Beschreibung (RichText), dann kurz
  let description: string | undefined
  let descriptionRichText: any = undefined
  
  // Speichere das RichText-Objekt für formatierte Darstellung
  if (fields.beschreibungLang && typeof fields.beschreibungLang === 'object') {
    descriptionRichText = fields.beschreibungLang
    description = extractRichTextContent(fields.beschreibungLang)
  }
  if (!description && fields.beschreibungKurz) {
    description = fields.beschreibungKurz
  }
  if (!description) {
    const rawDesc = fields.beschreibung || fields.description || fields.jobDescription
    if (typeof rawDesc === 'object' && rawDesc !== null) {
      descriptionRichText = rawDesc
      description = extractRichTextContent(rawDesc)
    } else {
      description = rawDesc
    }
  }
  
  const requirements = fields.anforderungen || fields.requirements || []
  const benefits = fields.benefits || fields.vorteile || []
  const contactEmail = fields.kontaktEmail || fields.contactEmail
  const postedDate = fields.eingestelltAm || fields.postedDate || fields.date
  // Wenn kein 'aktiv' Feld vorhanden ist, nehmen wir an der Job ist aktiv
  const isActive = fields.aktiv !== false && fields.isActive !== false && fields.aktiv !== 'false'

  if (!title) return null

  return {
    id: entry.sys.id,
    title,
    department,
    location,
    type,
    description: typeof description === 'string' ? description : undefined,
    descriptionRichText,
    requirements: Array.isArray(requirements) ? requirements : [],
    benefits: Array.isArray(benefits) ? benefits : [],
    contactEmail,
    postedDate,
    isActive,
  }
}

export async function getJobListings(): Promise<JobEntry[]> {
  // Versuche verschiedene Content-Typen (ältere und neue Namen)
  const contentTypes = ['stellen', 'stellenanzeige', 'jobPosting', 'job']
  const allJobs: JobEntry[] = []

  for (const contentType of contentTypes) {
    try {
      const entries = await contentfulClient.getEntries({
        content_type: contentType,
        limit: 50,
      })

      const mapped = entries.items.map(mapJobEntry).filter(Boolean) as JobEntry[]
      allJobs.push(...mapped)
    } catch (error) {
      // Check if error is due to unknown content type
      const err = error as any
      if (err?.name === 'unknownContentType' || err?.details?.errors?.[0]?.name === 'unknownContentType') {
        // Content type doesn't exist, try the next one
        continue
      }
      console.error(`Error fetching job listings for ${contentType}:`, error)
    }
  }

  // Filter aktive Jobs und sortiere nach Datum
  return allJobs
    .filter(job => job.isActive)
    .sort((a, b) => {
      if (a.postedDate && b.postedDate) {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      }
      return 0
    })
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

// Neue Funktionen für Schule-Galerie Content-Typen
export async function getSchuleAllgemeinImages(limit = 50): Promise<GalleryImage[]> {
  if (!process.env.CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID === 'TODO') {
    console.warn('⚠️ Schule Allgemein: CONTENTFUL_SPACE_ID not set, returning empty array')
    return []
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: SCHULE_ALLGEMEIN_CONTENT_TYPE,
      order: ['fields.reihenfolge'],
      limit,
      include: 1,
    })

    return entries.items
      .flatMap(mapGalleryEntry)
      .sort((a, b) => a.order - b.order)
  } catch (error: any) {
    console.error('Error fetching schule allgemein images:', error)
    return []
  }
}

export async function getSchuleEventImages(limit = 50): Promise<GalleryImage[]> {
  if (!process.env.CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID === 'TODO') {
    console.warn('⚠️ Schule Events: CONTENTFUL_SPACE_ID not set, returning empty array')
    return []
  }

  try {
    const entries = await contentfulClient.getEntries({
      content_type: SCHULE_EVENT_CONTENT_TYPE,
      order: ['fields.reihenfolge'],
      limit,
      include: 1,
    })

    return entries.items
      .flatMap(mapGalleryEntry)
      .sort((a, b) => a.order - b.order)
  } catch (error: any) {
    console.error('Error fetching schule event images:', error)
    return []
  }
}

// Kombinierte Funktion für Galerie mit Filter
export async function getGalleryImagesByCategory(category: 'unterricht' | 'events' | 'sport' | 'all' = 'all', limit = 50): Promise<GalleryImage[]> {
  if (!process.env.CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID === 'TODO') {
    console.warn('⚠️ Gallery: CONTENTFUL_SPACE_ID not set, returning empty array')
    return []
  }

  const allImages: GalleryImage[] = []

  // Lade alle Bilder aus allen Content-Typen
  const allgemeinImages = await getSchuleAllgemeinImages(limit)
  const eventImages = await getSchuleEventImages(limit)
  
  allImages.push(...allgemeinImages, ...eventImages)

  // Fallback: alte galleryImage Content-Typ für Abwärtskompatibilität
  try {
    const entries = await contentfulClient.getEntries({
      content_type: GALLERY_CONTENT_TYPE,
      order: ['fields.reihenfolge'],
      limit,
      include: 1,
    })

    const galleryImages = entries.items
      .flatMap(mapGalleryEntry)
      .sort((a, b) => a.order - b.order)
    
    allImages.push(...galleryImages)
  } catch (error) {
    console.warn('Fallback galleryImage type not available:', error)
  }

  // Filtere nach Kategorie wenn nicht 'all'
  if (category !== 'all') {
    return allImages
      .filter(img => img.category?.toLowerCase() === category)
      .sort((a, b) => a.order - b.order)
  }

  return allImages.sort((a, b) => a.order - b.order)
}
