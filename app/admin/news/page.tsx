'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Plus, 
  ExternalLink,
  RefreshCw,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { isAuthenticated } from '@/lib/admin-auth'
import type { NewsEntry } from '@/lib/contentful'

export default function AdminNewsPage() {
  const router = useRouter()
  const [news, setNews] = useState<NewsEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin')
      return
    }
    loadNews()
  }, [router])

  const loadNews = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/news')
      if (response.ok) {
        const data = await response.json()
        setNews(data)
      } else {
        setError('Fehler beim Laden der News')
      }
    } catch (err) {
      setError('Verbindungsfehler')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-charcoal/10 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard">
              <ArrowLeft className="w-5 h-5 text-charcoal" />
            </Link>
            <h1 className="font-sans font-bold text-charcoal">News</h1>
          </div>
          <Button
            size="sm"
            onClick={() => router.push('/admin/news/new')}
          >
            <Plus className="w-4 h-4 mr-1" />
            Neu
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 py-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <RefreshCw className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <p className="font-sans">{error}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadNews}
              className="mt-3"
            >
              Erneut versuchen
            </Button>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-charcoal/60 font-serif">
              Noch keine News vorhanden
            </p>
            <Button 
              className="mt-4" 
              onClick={() => router.push('/admin/news/new')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Erste News erstellen
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {news.map((item) => (
              <Card key={item.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {item.image && (
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.image.url} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans font-semibold text-charcoal line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-charcoal/50 font-serif mt-1">
                        {new Date(item.date).toLocaleDateString('de-DE')}
                      </p>
                      {item.category && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <Link 
                      href={`/news/${item.slug}`}
                      target="_blank"
                      className="flex-shrink-0 p-2 text-charcoal/40 hover:text-primary"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Hinweis */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-serif">
            <strong>Hinweis:</strong> News werden im Contentful CMS verwaltet. 
            Klicken Sie auf "Neu" um eine News zu erstellen.
          </p>
        </div>
      </main>
    </div>
  )
}
