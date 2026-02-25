'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Upload,
  X,
  ImageIcon,
  RefreshCw,
  AlertCircle,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { isAuthenticated } from '@/lib/admin-auth'
import type { GalleryImage } from '@/lib/contentful'

export default function AdminGaleriePage() {
  const router = useRouter()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Allgemein',
    file: null as File | null,
  })

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin')
      return
    }
    loadImages()
  }, [router])

  const loadImages = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/gallery')
      if (response.ok) {
        const data = await response.json()
        setImages(data)
      } else {
        setError('Fehler beim Laden der Bilder')
      }
    } catch (err) {
      setError('Verbindungsfehler')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Bild zu groß (max. 5MB)')
        return
      }
      setUploadForm(prev => ({ ...prev, file }))
      // Auto-fill title from filename
      if (!uploadForm.title) {
        const fileName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
        setUploadForm(prev => ({ ...prev, title: fileName }))
      }
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadForm.file || !uploadForm.title) return

    setIsUploading(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('file', uploadForm.file)
      formData.append('title', uploadForm.title)
      formData.append('category', uploadForm.category)

      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setSuccess('Bild erfolgreich hochgeladen!')
        setUploadForm({ title: '', category: 'Allgemein', file: null })
        loadImages()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Fehler beim Hochladen')
      }
    } catch (err) {
      setError('Upload fehlgeschlagen')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bild wirklich löschen?')) return

    try {
      const response = await fetch(`/api/admin/gallery?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setImages(prev => prev.filter(img => img.id !== id))
        setSuccess('Bild gelöscht')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError('Fehler beim Löschen')
      }
    } catch (err) {
      setError('Löschen fehlgeschlagen')
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
            <h1 className="font-sans font-bold text-charcoal">Galerie</h1>
          </div>
          <button 
            onClick={loadImages}
            className="p-2 text-charcoal/60 hover:text-primary"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 py-4">
        {/* Upload Form */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-4">
            <h2 className="font-sans font-semibold text-charcoal mb-4">
              Bild hochladen
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <Label htmlFor="image" className="text-charcoal">
                  Bild auswählen
                </Label>
                <div className="mt-1">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
                <p className="text-xs text-charcoal/50 mt-1 font-serif">
                  Max. 5MB (JPG, PNG, WebP)
                </p>
              </div>

              <div>
                <Label htmlFor="title" className="text-charcoal">
                  Titel
                </Label>
                <Input
                  id="title"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Bildtitel..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-charcoal">
                  Kategorie
                </Label>
                <Input
                  id="category"
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="z.B. Unterricht, Ausflug..."
                  className="mt-1"
                />
              </div>

              {uploadForm.file && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-8 h-8 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {uploadForm.file.name}
                      </p>
                      <p className="text-xs text-charcoal/50">
                        {(uploadForm.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadForm(prev => ({ ...prev, file: null }))}
                      className="p-1 text-charcoal/40 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <p className="text-sm">{success}</p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isUploading || !uploadForm.file || !uploadForm.title}
              >
                {isUploading ? (
                  'Wird hochgeladen...'
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Hochladen
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Image List */}
        <div>
          <h2 className="font-sans font-semibold text-charcoal mb-3">
            Vorhandene Bilder ({images.length})
          </h2>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-8 text-charcoal/60 font-serif">
              Noch keine Bilder vorhanden
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {images.map((image) => (
                <Card key={image.id} className="border-0 shadow-sm overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <CardContent className="p-2">
                    <p className="text-xs font-medium text-charcoal truncate">
                      {image.title}
                    </p>
                    <p className="text-[10px] text-charcoal/50">
                      {image.category}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Hinweis */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-serif">
            <strong>Tipp:</strong> Bilder werden im Contentful CMS gespeichert 
            und sind sofort in der Galerie sichtbar.
          </p>
        </div>
      </main>
    </div>
  )
}
