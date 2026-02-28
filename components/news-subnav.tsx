'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

const subNavItems = [
  {
    name: 'Alle News',
    href: '/news',
    category: null,
  },
  {
    name: 'Allgemein',
    href: '/news?category=allgemein',
    category: 'allgemein',
  },
  {
    name: 'Veranstaltungen',
    href: '/news?category=veranstaltungen',
    category: 'veranstaltungen',
  },
  {
    name: 'Ausflüge',
    href: '/news?category=ausfluege',
    category: 'ausfluege',
  },
]

export function NewsSubnav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  return (
    <div className="bg-white border-b border-primary/10 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 py-3 overflow-x-auto">
          <Link
            href="/news"
            className="text-sm font-sans text-charcoal/60 hover:text-primary transition-colors whitespace-nowrap flex items-center gap-1"
          >
            News
          </Link>
          <ChevronRight className="h-4 w-4 text-charcoal/40 shrink-0" />

          <div className="flex items-center gap-2 ml-2">
            {subNavItems.map((item) => {
              const isActive = currentCategory === item.category || (item.category === null && !currentCategory)

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
