'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { School, ClipboardList, ChevronRight } from 'lucide-react'

const subNavItems = [
  { 
    name: 'Übersicht', 
    href: '/schule',
    icon: School,
  },
  { 
    name: 'Anmeldung', 
    href: '/schule/anmeldung',
    icon: ClipboardList,
  },
]

export function SchoolSubnav() {
  const pathname = usePathname()

  return (
    <div className="bg-white border-b border-schule/10 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 py-3 overflow-x-auto">
          <Link 
            href="/schule" 
            className="text-sm font-sans text-charcoal/60 hover:text-schule transition-colors whitespace-nowrap flex items-center gap-1"
          >
            Schule
          </Link>
          <ChevronRight className="h-4 w-4 text-charcoal/40 shrink-0" />
          
          <div className="flex items-center gap-2 ml-2">
            {subNavItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans font-semibold transition-all whitespace-nowrap',
                    isActive
                      ? 'bg-schule text-white shadow-md'
                      : 'text-charcoal/70 hover:bg-schule/10 hover:text-schule'
                  )}
                >
                  <Icon className="h-4 w-4" />
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
