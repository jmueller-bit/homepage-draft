import { NextRequest, NextResponse } from 'next/server'
import { contentfulClient, getManagementClient, NEWS_CONTENT_TYPE } from '@/lib/contentful'
import { triggerVercelDeploy } from '@/lib/deploy'

export async function GET() {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: NEWS_CONTENT_TYPE,
      order: ['-fields.datum'],
      limit: 50,
    })

    const news = entries.items.map((entry: any) => ({
      id: entry.sys.id,
      title: entry.fields.titel || entry.fields.title,
      slug: entry.fields.slug,
      excerpt: entry.fields.vorschautext || entry.fields.excerpt || '',
      date: entry.fields.datum || entry.fields.publishDate || entry.fields.date,
      category: entry.fields.kategorie || entry.fields.category,
      image: entry.fields.titelbild?.fields?.file?.url 
        ? { url: `https:${entry.fields.titelbild.fields.file.url}` }
        : null,
    }))

    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der News' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Prüfe ob Management Client verfügbar
    const managementClient = await getManagementClient()
    if (!managementClient) {
      return NextResponse.json(
        { error: 'Admin-Panel nicht konfiguriert. CONTENTFUL_MANAGEMENT_TOKEN fehlt.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    
    // Validierung
    if (!body.title || !body.slug || !body.excerpt || !body.content) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen' },
        { status: 400 }
      )
    }

    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment('master')

    // Prüfe ob slug bereits existiert
    const existing = await contentfulClient.getEntries({
      content_type: NEWS_CONTENT_TYPE,
      'fields.slug': body.slug,
      limit: 1,
    })

    if (existing.items.length > 0) {
      return NextResponse.json(
        { error: 'Dieser URL-Slug existiert bereits' },
        { status: 400 }
      )
    }

    // Erstelle Entry
    const entry = await environment.createEntry(NEWS_CONTENT_TYPE, {
      fields: {
        titel: { 'en-US': body.title },
        slug: { 'en-US': body.slug },
        vorschautext: { 'en-US': body.excerpt },
        inhalt: { 
          'en-US': {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: body.content,
                    marks: [],
                    data: {}
                  }
                ]
              }
            ]
          }
        },
        datum: { 'en-US': new Date().toISOString() },
        ...(body.category && { kategorie: { 'en-US': body.category } }),
      }
    })

    // Publizieren
    await entry.publish()

    // Vercel Deployment triggern
    const deployResult = await triggerVercelDeploy()

    return NextResponse.json({ 
      success: true, 
      id: entry.sys.id,
      message: 'News erfolgreich erstellt',
      deploy: deployResult.success ? 'Deployment gestartet' : 'Deployment übersprungen'
    })
  } catch (error: any) {
    console.error('Error creating news:', error)
    return NextResponse.json(
      { error: error.message || 'Fehler beim Erstellen der News' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Prüfe ob Management Client verfügbar
    const managementClient = await getManagementClient()
    if (!managementClient) {
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

    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const environment = await space.getEnvironment('master')

    // Entry holen
    const entry = await environment.getEntry(id)
    
    // Falls publiziert, erst unpublizieren
    if (entry.isPublished()) {
      await entry.unpublish()
    }
    
    // Löschen
    await entry.delete()

    // Vercel Deployment triggern
    const deployResult = await triggerVercelDeploy()

    return NextResponse.json({
      success: true,
      message: 'News erfolgreich gelöscht',
      deploy: deployResult.success ? 'Deployment gestartet' : 'Deployment übersprungen'
    })
  } catch (error: any) {
    console.error('Error deleting news:', error)
    return NextResponse.json(
      { error: error.message || 'Fehler beim Löschen der News' },
      { status: 500 }
    )
  }
}
