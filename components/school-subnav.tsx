'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ChevronRight, ArrowLeft } from 'lucide-react'

interface SchoolSubnavProps {
  showBackToSection?: boolean
  backToSectionLabel?: string
  backToSectionHref?: string
}

const subNavItems = [
  { 
    name: 'Übersicht', 
    href: '/schule',
  },
  { 
    name: 'Anmeldung', 
    href: '/schule/anmeldung',
  },
]

export function SchoolSubnav({ 
  showBackToSection = false,
  backToSectionLabel = 'Zurück',
  backToSectionHref = '/schule'
}: SchoolSubnavProps) {
  const pathname = usePathname()
  
  // Prüfe, ob wir auf einer Detailseite sind (z.B. /schule/[slug] aber nicht /schule/anmeldung)
  const isDetailPage = pathname && 
    pathname.startsWith('/schule/') && 
    pathname !== '/schule' && 
    !subNavItems.some(item => item.href === pathname)

  // Für Detailseiten zeigen wir einen vereinfachten Navigationsbereich mit Breadcrumbs und Zurück-Button
  if (isDetailPage || showBackToSection) {
    // Extrahiere den aktuellen Seitentitel aus dem Pfad
    const currentPageName = pathname?.split('/').pop() || ''
    const displayName = currentPageName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return (
    <div className="bg-white border-b border-primary/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 py-3 overflow-x-auto">
            <Link
              href="/schule"
              className="text-sm font-sans text-charcoal/60 hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
            >
              Schule
            </Link>
            <ChevronRight className="h-4 w-4 text-charcoal/40 shrink-0" />
            <span className="text-sm font-sans font-semibold text-primary whitespace-nowrap">
              {displayName || backToSectionLabel}
            </span>

            <div className="ml-auto">
              <Link
                href={backToSectionHref}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans font-semibold text-charcoal/70 hover:bg-primary/10 hover:text-primary whitespace-nowrap"
              >
                <ArrowLeft className="h-4 w-4" />
                {backToSectionLabel}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-b border-primary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 py-3 overflow-x-auto">
          <Link
            href="/schule"
            className={cn(
              'text-sm font-sans transition-colors whitespace-nowrap flex items-center gap-1',
              pathname === '/schule' 
                ? 'text-primary font-semibold' 
                : 'text-charcoal/60 hover:text-primary'
            )}
          >
            Schule
          </Link>
          <ChevronRight className="h-4 w-4 text-charcoal/40 shrink-0" />

          <div className="flex items-center gap-2 ml-2">
            {subNavItems.map((item) => {
              const isActive = pathname === item.href ||
                (pathname?.startsWith(item.href) && item.href !== '/schule')

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans font-semibold whitespace-nowrap',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-charcoal/70 hover:bg-primary/10 hover:text-primary'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
