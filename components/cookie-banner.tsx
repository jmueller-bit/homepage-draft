'use client'

import * as React from 'react'
import { X, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CookieBanner() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookies-accepted')
    if (!hasAccepted) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookies-accepted', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookies-accepted', 'false')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-charcoal/10 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-sans font-semibold text-charcoal">
                Cookie-Hinweis
              </h3>
              <p className="font-serif text-sm text-charcoal/70 mt-1 max-w-2xl">
                Diese Website verwendet Cookies, um Ihre Erfahrung zu verbessern. 
                Wenn Sie die Website weiter nutzen, gehen wir von Ihrem Einverständnis aus.{' '}
                <Link 
                  href="/datenschutz" 
                  className="text-primary hover:underline font-semibold"
                >
                  Mehr erfahren
                </Link>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="flex-1 sm:flex-none"
            >
              Ablehnen
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 sm:flex-none bg-primary hover:bg-primary/90"
            >
              Akzeptieren
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 text-charcoal/50 hover:text-charcoal transition-colors"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
