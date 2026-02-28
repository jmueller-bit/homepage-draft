'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Send,
  Check,
  AlertCircle,
  X,
  Upload
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
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    publishedAt: new Date().toISOString().split('T')[0],
    imageUrl: '',
  })

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin')
    }
  }, [router])

  useEffect(() => {
    if (!slugManuallyEdited && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[äöüß]/g, (char) => (
          { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' }[char] || char
        ))
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50)
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, slugManuallyEdited])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError('Bild zu groß (max. 5MB)')
      return
    }
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    setFormData(prev => ({ ...prev, imageUrl: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      let imageUrl = formData.imageUrl

      if (imageFile) {
        const uploadRes = await fetch(
          `/api/admin/upload?filename=${encodeURIComponent(imageFile.name)}`,
          {
            method: 'POST',
            body: imageFile,
          }
        )

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json()
          imageUrl = uploadData.url
        } else {
          const errData = await uploadRes.json()
          setError(errData.error || 'Bild-Upload fehlgeschlagen')
          setIsSubmitting(false)
          return
        }
      }

      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, imageUrl }),
      })

      if (response.ok) {
        await sendTelegramMessage(
          formatNewsNotification(formData.title, formData.excerpt, formData.author || 'ALZ Team')
        )
        setIsSuccess(true)
        setTimeout(() => router.push('/admin/news'), 1500)
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
              onChange={(e) => {
                setSlugManuallyEdited(true)
                handleChange('slug', e.target.value)
              }}
              placeholder="sommerfest-2024"
              className="mt-1"
              required
            />
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-charcoal/50 font-serif">
                Wird automatisch aus dem Titel erstellt
              </p>
              {slugManuallyEdited && (
                <button
                  type="button"
                  className="text-xs text-blue-500 underline"
                  onClick={() => setSlugManuallyEdited(false)}
                >
                  Reset (Auto)
                </button>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="publishedAt" className="text-charcoal">Datum</Label>
            <Input
              id="publishedAt"
              type="date"
              value={formData.publishedAt}
              onChange={(e) => handleChange('publishedAt', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-charcoal">Kategorie</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              placeholder="z.B. Veranstaltung"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="author" className="text-charcoal">Autor</Label>
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

          <div>
            <Label className="text-charcoal">Bild</Label>
            {!imagePreview ? (
              <label className="mt-1 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-charcoal/20 rounded-lg cursor-pointer hover:border-charcoal/40 hover:bg-charcoal/5 transition-colors">
                <Upload className="w-6 h-6 text-charcoal/40 mb-2" />
                <span className="text-sm text-charcoal/50 font-serif">Klicken zum Hochladen</span>
                <span className="text-xs text-charcoal/30 font-serif mt-1">PNG, JPG bis 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="mt-1 relative rounded-lg overflow-hidden">
                <img src={imagePreview} alt="Vorschau" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-1">
                  <p className="text-white text-xs font-serif truncate">{imageFile?.name}</p>
                </div>
              </div>
            )}
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