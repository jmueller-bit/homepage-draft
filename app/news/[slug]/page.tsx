import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { getNewsBySlug, type NewsEntry } from '@/lib/contentful'
import { formatDate } from '@/lib/utils'
import { ArticleSchema, BreadcrumbSchema } from '@/components/seo/json-ld-schema'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news = await getNewsBySlug(params.slug)
  
  if (!news) {
    return {
      title: 'News nicht gefunden',
      description: 'Der angeforderte Artikel konnte nicht gefunden werden.',
    }
  }

  const baseUrl = 'https://alz5.thesolution.at'
  
  return {
    title: news.title,
    description: news.excerpt || news.title,
    keywords: [news.category || 'News', 'Astrid Lindgren Zentrum'].filter((k): k is string => Boolean(k)),
    authors: [{ name: 'Astrid Lindgren Zentrum' }],
    alternates: {
      canonical: `${baseUrl}/news/${news.slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'de_AT',
      url: `${baseUrl}/news/${news.slug}`,
      siteName: 'Astrid Lindgren Zentrum',
      title: news.title,
      description: news.excerpt || news.title,
      publishedTime: news.date,
      modifiedTime: news.date,
      authors: ['Astrid Lindgren Zentrum'],
      tags: news.category ? [news.category] : [],
      images: news.image
        ? [
            {
              url: news.image.url,
              width: news.image.width || 1200,
              height: news.image.height || 630,
              alt: news.title,
            },
          ]
        : [
            {
              url: '/og-image.svg',
              width: 1200,
              height: 630,
              alt: 'Astrid Lindgren Zentrum',
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description: news.excerpt || news.title,
      images: news.image ? [news.image.url] : ['/og-image.svg'],
    },
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 120

function renderRichText(content: any) {
  if (!content) return null

  // If the editor is plain text or already a string
  if (typeof content === 'string') {
    return content.split('\n').map((line, idx) => (
      <p key={idx} className="mt-3 font-serif text-lg text-charcoal/80">
        {line}
      </p>
    ))
  }

  // Minimal renderer for Contentful Rich Text (paragraphs and headings)
  const blocks = Array.isArray(content.content) ? content.content : []

  return blocks.map((block: any, blockIndex: number) => {
    if (block.nodeType === 'paragraph') {
      const text = (block.content || []).map((c: any) => c.value || '').join('')
      if (!text.trim()) return null
      return (
        <p key={blockIndex} className="mt-3 font-serif text-lg text-charcoal/80">
          {text}
        </p>
      )
    }

    if (block.nodeType === 'heading-2' || block.nodeType === 'heading-3') {
      const text = (block.content || []).map((c: any) => c.value || '').join('')
      const Tag = block.nodeType === 'heading-2' ? 'h2' : 'h3'
      return (
        <Tag key={blockIndex} className="mt-6 font-sans text-2xl font-bold text-charcoal">
          {text}
        </Tag>
      )
    }

    return null
  })
}

export default async function NewsDetailPage({ params }: Props) {
  const news: NewsEntry | null = await getNewsBySlug(params.slug)

  if (!news) {
    return notFound()
  }

  const baseUrl = 'https://alz5.thesolution.at'
  const articleUrl = `${baseUrl}/news/${news.slug}`

  return (
    <>
      <ArticleSchema
        title={news.title}
        description={news.excerpt || news.title}
        url={articleUrl}
        image={news.image?.url}
        datePublished={news.date}
        category={news.category}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Startseite', item: baseUrl },
          { name: 'News', item: `${baseUrl}/news` },
          { name: news.title, item: articleUrl },
        ]}
      />
      <section className="bg-primary py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild className="text-cream hover:text-cream hover:bg-primary/20 -ml-3">
            <Link href="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zu den News
            </Link>
          </Button>
        </div>
      </section>

      <article className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {news.image && (
            <div className="relative aspect-[2/1] overflow-hidden rounded-xl mb-8">
              <Image
                src={news.image.url}
                alt={news.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-charcoal/60 mb-4">
            <time>{formatDate(news.date)}</time>
            {news.category && (
              <>
                <span>•</span>
                <span className="font-sans text-xs uppercase tracking-wide text-primary">{news.category}</span>
              </>
            )}
          </div>

          <h1 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
            {news.title}
          </h1>

          <div className="mt-8 font-serif text-lg text-charcoal/80 space-y-3">
            {renderRichText(news.content) || (
              <p className="font-serif text-charcoal/70">Der Inhalt dieses Artikels folgt in Kürze.</p>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-charcoal/10">
            <Button asChild>
              <Link href="/news">← Alle News anzeigen</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
