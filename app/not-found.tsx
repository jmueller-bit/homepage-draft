import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-9xl font-sans font-extrabold text-charcoal/10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-sans font-bold text-primary">
              404
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="font-sans text-3xl font-bold text-charcoal mb-4">
          Seite nicht gefunden
        </h1>
        <p className="font-serif text-lg text-charcoal/70 mb-8 max-w-md mx-auto">
          Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben. 
          Kehren Sie zur Startseite zurück oder nutzen Sie die Navigation.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-sans font-bold">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="h-5 w-5" />
              Zur Startseite
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="font-sans font-bold">
            <Link href="/kontakt" className="inline-flex items-center gap-2">
              <Search className="h-5 w-5" />
              Kontakt aufnehmen
            </Link>
          </Button>
        </div>

        {/* Suggestions */}
        <div className="mt-12 pt-8 border-t border-charcoal/10">
          <h2 className="font-sans text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-4">
            Vielleicht suchen Sie nach:
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Schule', 'Über uns', 'News', 'Kontakt', 'Karriere'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 bg-white rounded-full text-sm font-sans text-charcoal/70 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
