'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  children?: { name: string; href: string }[]
}

const navigation: NavItem[] = [
  { name: 'Startseite', href: '/' },
  {
    name: 'Über uns',
    href: '/ueber-uns',
    children: [
      { name: 'Übersicht', href: '/ueber-uns' },
      { name: 'Pädagogisches Konzept', href: '/ueber-uns#paedagogisches-konzept' },
      { name: 'Philosophie', href: '/ueber-uns#philosophie' },
      { name: 'Unser Team', href: '/ueber-uns#unser-team' },
    ],
  },
  {
    name: 'Schule',
    href: '/schule',
    children: [
      { name: 'Übersicht', href: '/schule' },
      { name: 'Anmeldung', href: '/schule/anmeldung' },
    ],
  },
  { name: 'News', href: '/news' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'Fördern', href: '/foerdern' },
  { name: 'Karriere', href: '/karriere' },
  { name: 'Kontakt', href: '/kontakt' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const pathname = usePathname()

  React.useEffect(() => {
    setIsOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream border-b border-primary/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Hauptnavigation">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Astrid Lindgren Zentrum Startseite">
            <div className="relative h-12 w-12 flex-shrink-0">
              <Image
                src="/images/logos/alz-logo.png"
                alt="ALZ Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-sans text-xl font-bold text-charcoal hidden sm:inline-block">
              Astrid Lindgren Zentrum
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.slice(0, -1).map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={cn(
                        'font-sans text-sm font-semibold flex items-center gap-1 hover:text-primary',
                        pathname?.startsWith(item.href)
                          ? 'text-primary'
                          : 'text-charcoal/70'
                      )}
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    >
                      {item.name}
                      <ChevronDown className={cn('h-4 w-4 transition-transform', openDropdown === item.name && 'rotate-180')} />
                    </button>
                    {openDropdown === item.name && item.children && (
                      <div className="absolute top-full left-0 pt-2">
                        <div className="bg-white rounded-lg shadow-lg border border-primary/10 py-2 min-w-[160px]">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                'block px-4 py-2 text-sm font-sans hover:bg-primary/5',
                                pathname === child.href
                                  ? 'text-primary font-semibold'
                                  : 'text-charcoal/70'
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'font-sans text-sm font-semibold hover:text-primary',
                      pathname === item.href
                        ? 'text-primary'
                        : 'text-charcoal/70'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild>
              <Link href="/kontakt">Jetzt anmelden</Link>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-md text-charcoal"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block rounded-md px-3 py-2 font-sans text-base font-semibold',
                        pathname === item.href
                          ? 'bg-primary/10 text-primary'
                          : 'text-charcoal/70 hover:bg-primary/5 hover:text-primary'
                      )}
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              'block rounded-md px-3 py-2 font-sans text-sm',
                              pathname === child.href
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'text-charcoal/60 hover:bg-primary/5 hover:text-primary'
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/kontakt">Jetzt anmelden</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
