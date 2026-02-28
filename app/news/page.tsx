import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getNews, type NewsEntry } from '@/lib/contentful'
import { formatDate } from '@/lib/utils'
import { NewsSubnav } from '@/components/news-subnav'

export const metadata: Metadata = {
  title: 'News',
  description: 'Aktuelle Neuigkeiten und Termine vom Astrid Lindgren Zentrum.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 120

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function NewsPage({ searchParams }: Props) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined
  const newsItems: NewsEntry[] = await getNews(20, category)

  return (
    <>
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Neuigkeiten
          </h1>
          <p className="mt-4 font-serif text-xl text-cream/80 max-w-2xl">
            Aktuelle Informationen aus unserem Schulalltag
          </p>
        </div>
      </section>

      <NewsSubnav />

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {newsItems.length === 0 ? (
            <div className="rounded-xl border border-charcoal/10 bg-white p-10 text-center shadow-sm">
              <p className="font-sans text-lg text-charcoal">Derzeit sind keine News veröffentlicht.</p>
              <p className="mt-2 font-serif text-charcoal/70">Sobald neue Artikel in Contentful veröffentlicht werden, erscheinen sie hier automatisch.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {newsItems.map((news) => (
                <Link key={news.id} href={`/news/${news.slug}`}>
                  <Card className="h-full overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
                    {news.image && (
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={news.image.url}
                          alt={news.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <time className="font-sans text-sm text-primary">
                        {formatDate(news.date)}
                      </time>
                      <h2 className="mt-2 font-sans text-xl font-bold text-charcoal hover:text-primary transition-colors">
                        {news.title}
                      </h2>
                      {news.excerpt && (
                        <p className="mt-2 font-serif text-charcoal/70 line-clamp-3">
                          {news.excerpt}
                        </p>
                      )}
                      <Button variant="link" className="mt-4 h-auto p-0 text-primary">
                        Weiterlesen →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
