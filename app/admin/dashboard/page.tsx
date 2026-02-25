'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Newspaper, 
  Image as ImageIcon, 
  LogOut, 
  Users,
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { isAuthenticated, clearAuthCookie } from '@/lib/admin-auth'

const menuItems = [
  {
    title: 'News verwalten',
    description: 'Neue Artikel erstellen und bestehende bearbeiten',
    icon: Newspaper,
    href: '/admin/news',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Galerie',
    description: 'Bilder hochladen und verwalten',
    icon: ImageIcon,
    href: '/admin/galerie',
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Zur Website',
    description: 'Öffentliche Ansicht öffnen',
    icon: ExternalLink,
    href: '/',
    external: true,
    color: 'bg-gray-100 text-gray-600',
  },
]

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin')
    }
  }, [router])

  const handleLogout = () => {
    clearAuthCookie()
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-charcoal/10 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-sans font-bold text-charcoal">Admin</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-charcoal/60"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Abmelden
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="font-sans text-xl font-bold text-charcoal">
            Willkommen!
          </h2>
          <p className="text-charcoal/60 font-serif text-sm mt-1">
            Was möchten Sie heute tun?
          </p>
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <Card key={item.title} className="border-0 shadow-sm">
              <Link href={item.href} target={item.external ? '_blank' : undefined}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-semibold text-charcoal">
                      {item.title}
                    </h3>
                    <p className="text-sm text-charcoal/60 font-serif">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-charcoal/30 flex-shrink-0" />
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <Card className="border-0 shadow-sm bg-primary/5">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary font-sans">News</p>
              <p className="text-xs text-charcoal/60 font-serif mt-1">
                im Contentful CMS
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm bg-secondary/20">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-charcoal font-sans">Bilder</p>
              <p className="text-xs text-charcoal/60 font-serif mt-1">
                in der Galerie
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Hilfe Box */}
        <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800 font-serif">
            <strong>Tipp:</strong> Alle Änderungen werden direkt im Contentful CMS gespeichert und sind sofort auf der Website sichtbar.
          </p>
        </div>
      </main>
    </div>
  )
}
