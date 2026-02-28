import type { Metadata } from 'next'
import GalerieClient from './galerie-client'
import { getGalleryImagesByCategory, type GalleryImage } from '@/lib/contentful'

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Bildergalerie des Astrid Lindgren Zentrums - Ein Blick in Unterricht, Events und Sport.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 300

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function GaleriePage({ searchParams }: Props) {
  // Hole Kategorie aus URL-Parametern, default: 'all'
  const category = (searchParams.category as 'unterricht' | 'events' | 'sport' | 'all') || 'all'
  
  const galleryImages = await getGalleryImagesByCategory(category)
  
  return <GalerieClient initialImages={galleryImages} currentCategory={category} />
}
