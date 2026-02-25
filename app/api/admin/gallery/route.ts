import { NextRequest, NextResponse } from 'next/server'
import { contentfulClient, contentfulManagementClient, GALLERY_CONTENT_TYPE } from '@/lib/contentful'

export async function GET() {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: GALLERY_CONTENT_TYPE,
      order: ['fields.reihenfolge'],
      limit: 100,
    })

    const images = entries.items.map((entry: any) => ({
      id: entry.sys.id,
      title: entry.fields.titel,
      src: entry.fields.bild?.[0]?.fields?.file?.url 
        ? `https:${entry.fields.bild[0].fields.file.url}`
        : '',
      alt: entry.fields.titel,
      category: entry.fields.kategorie || 'Allgemein',
      order: entry.fields.reihenfolge || 0,
    }))

    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching gallery:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Galerie' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Prüfe ob Management Client verfügbar
    if (!contentfulManagementClient) {
      return NextResponse.json(
        { error: 'Admin-Panel nicht konfiguriert. CONTENTFUL_MANAGEMENT_TOKEN fehlt.' },
        { status: 503 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const category = formData.get('category') as string || 'Allgemein'

    if (!file || !title) {
      return NextResponse.json(
        { error: 'Bild und Titel erforderlich' },
        { status: 400 }
      )
    }

    const space = await contentfulManagementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment('master')

    // Upload Asset zu Contentful
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const upload = await environment.createUpload({
      file: buffer,
    })

    const asset = await environment.createAsset({
      fields: {
        title: { 'en-US': title },
        file: {
          'en-US': {
            contentType: file.type,
            fileName: file.name,
            uploadFrom: {
              sys: {
                type: 'Link',
                linkType: 'Upload',
                id: upload.sys.id,
              },
            },
          },
        },
      },
    })

    // Asset verarbeiten und publizieren
    await asset.processForAllLocales()
    const publishedAsset = await asset.publish()

    // Gallery Entry erstellen
    const entry = await environment.createEntry(GALLERY_CONTENT_TYPE, {
      fields: {
        titel: { 'en-US': title },
        kategorie: { 'en-US': category },
        reihenfolge: { 'en-US': Date.now() },
        bild: {
          'en-US': [
            {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: publishedAsset.sys.id,
              },
            },
          ],
        },
      },
    })

    await entry.publish()

    return NextResponse.json({
      success: true,
      id: entry.sys.id,
      message: 'Bild erfolgreich hochgeladen',
    })
  } catch (error: any) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { error: error.message || 'Fehler beim Hochladen' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Prüfe ob Management Client verfügbar
    if (!contentfulManagementClient) {
      return NextResponse.json(
        { error: 'Admin-Panel nicht konfiguriert. CONTENTFUL_MANAGEMENT_TOKEN fehlt.' },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID erforderlich' },
        { status: 400 }
      )
    }

    const space = await contentfulManagementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment('master')

    // Entry unpublizieren und löschen
    const entry = await environment.getEntry(id)
    if (entry.isPublished()) {
      await entry.unpublish()
    }
    await entry.delete()

    return NextResponse.json({
      success: true,
      message: 'Bild gelöscht',
    })
  } catch (error: any) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: error.message || 'Fehler beim Löschen' },
      { status: 500 }
    )
  }
}
