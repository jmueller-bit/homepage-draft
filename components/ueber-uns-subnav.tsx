'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

interface UeberUnsSubnavProps {
  showBackToTeam?: boolean
}

const subNavItems = [
  {
    name: 'Übersicht',
    href: '/ueber-uns',
  },
  {
    name: 'Pädagogisches Konzept',
    href: '/ueber-uns#paedagogisches-konzept',
  },
  {
    name: 'Philosophie',
    href: '/ueber-uns#philosophie',
  },
  {
    name: 'Unser Team',
    href: '/ueber-uns#unser-team',
  },
]

export function UeberUnsSubnav({ showBackToTeam = false }: UeberUnsSubnavProps) {
  const pathname = usePathname()
  const isTeamDetailPage = pathname?.startsWith('/ueber-uns/team/') && pathname !== '/ueber-uns/team'

  // Für Team-Detailseiten zeigen wir einen vereinfachten Navigationsbereich
  if (isTeamDetailPage || showBackToTeam) {
    return (
      <div className="bg-white border-b border-primary/10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 py-3 overflow-x-auto">
            <Link
              href="/ueber-uns"
              className="text-sm font-sans text-charcoal/60 hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
            >
              Über uns
            </Link>
            <ChevronRight className="h-4 w-4 text-charcoal/40 shrink-0" />
            <Link
              href="/ueber-uns#unser-team"
              className="text-sm font-sans text-charcoal/60 hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
            >
              Unser Team
            </Link>
            <ChevronRight className="h-4 w-4 text-charcoal/40 shrink-0" />
            <span className="text-sm font-sans font-semibold text-primary whitespace-nowrap">
              Teammitglied
            </span>

            <div className="ml-auto">
              <Link
                href="/ueber-uns#unser-team"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans font-semibold text-charcoal/70 hover:bg-primary/10 hover:text-primary transition-all whitespace-nowrap"
              >
                Zurück zum Team
              </Link>
            </div>
          </nav>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-b border-primary/10 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 py-3 overflow-x-auto">
          <Link
            href="/ueber-uns"
            className="text-sm font-sans text-charcoal/60 hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
          >
            Über uns
          </Link>
          <ChevronRight className="h-4 w-4 text-charcoal/40 shrink-0" />

          <div className="flex items-center gap-2 ml-2">
            {subNavItems.map((item) => {
              const isActive = pathname === item.href ||
                (pathname === '/ueber-uns' && item.href === '/ueber-uns')

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans font-semibold transition-all whitespace-nowrap',
                    isActive
                      ? 'bg-primary text-white shadow-md'
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
