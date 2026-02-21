'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Startseite', href: '/' },
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Schule', href: '/schule' },
  { name: 'News', href: '/news' },
  { name: 'Galerie', href: '/galerie' },
  { name: 'Kontakt', href: '/kontakt' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-primary/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Hauptnavigation">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Astrid Lindgren Zentrum Startseite">
            <div className="relative h-12 w-[46px] flex-shrink-0">
              <Image
                src="/ALZ_Logo_Header_Retina.png"
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
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'font-sans text-sm font-semibold transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-charcoal/70'
                )}
              >
                {item.name}
              </Link>
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
                  <Link
                    key={item.name}
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
