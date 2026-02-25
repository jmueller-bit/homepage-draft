'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Send,
  Check,
  ImageIcon,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { isAuthenticated } from '@/lib/admin-auth'
import { sendTelegramMessage, formatNewsNotification } from '@/lib/telegram'

export default function NewNewsPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
  })

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin')
    }
  }, [router])

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[äöüß]/g, (char) => ({'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss'}[char] || char))
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50)
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Sende Telegram Benachrichtigung
        await sendTelegramMessage(
          formatNewsNotification(formData.title, formData.excerpt, formData.author || 'ALZ Team')
        )
        
        setIsSuccess(true)
        setTimeout(() => {
          router.push('/admin/news')
        }, 1500)
      } else {
        const data = await response.json()
        setError(data.error || 'Fehler beim Speichern')
      }
    } catch (err) {
      setError('Verbindungsfehler')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="font-sans text-xl font-bold text-charcoal">
              News veröffentlicht!
            </h2>
            <p className="text-charcoal/60 font-serif mt-2">
              Die Nachricht wurde gespeichert und per Telegram benachrichtigt.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-charcoal/10 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/news">
              <ArrowLeft className="w-5 h-5 text-charcoal" />
            </Link>
            <h1 className="font-sans font-bold text-charcoal">Neue News</h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-lg mx-auto px-4 py-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-charcoal">
              Titel <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="z.B. Sommerfest 2024"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="slug" className="text-charcoal">
              URL-Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              placeholder="sommerfest-2024"
              className="mt-1"
              required
            />
            <p className="text-xs text-charcoal/50 mt-1 font-serif">
              Wird automatisch aus dem Titel erstellt
            </p>
          </div>

          <div>
            <Label htmlFor="category" className="text-charcoal">
              Kategorie
            </Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              placeholder="z.B. Veranstaltung"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="author" className="text-charcoal">
              Autor
            </Label>
            <Input
              id="author"
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              placeholder="Ihr Name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="excerpt" className="text-charcoal">
              Kurzbeschreibung <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              placeholder="Kurze Zusammenfassung für die Übersicht..."
              className="mt-1 min-h-[80px]"
              maxLength={200}
              required
            />
            <p className="text-xs text-charcoal/50 mt-1 font-serif">
              {formData.excerpt.length}/200 Zeichen
            </p>
          </div>

          <div>
            <Label htmlFor="content" className="text-charcoal">
              Inhalt <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Der vollständige Artikel..."
              className="mt-1 min-h-[200px]"
              required
            />
          </div>

          {/* Bild Upload Hinweis */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-start gap-2">
              <ImageIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 font-serif">
                <strong>Bild:</strong> Laden Sie das Bild direkt in Contentful hoch 
                oder fügen Sie später ein Bild-URL hinzu.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <p className="font-sans text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.push('/admin/news')}
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting || !formData.title || !formData.excerpt || !formData.content}
            >
              {isSubmitting ? (
                'Wird gespeichert...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Veröffentlichen
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
