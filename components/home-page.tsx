'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn, formatDate } from '@/lib/utils'
import type { NewsEntry, GalleryImage } from '@/lib/contentful'

const features = [
  {
    icon: Sparkles,
    title: 'Kreativ',
    description: 'Kunst, Musik und Theater fördern die kreative Entfaltung jedes Kindes.',
  },
  {
    icon: Heart,
    title: 'Individuell',
    description: 'Jedes Kind wird nach seinen eigenen Stärken und Interessen gefördert.',
  },
  {
    icon: Leaf,
    title: 'Ganzheitlich',
    description: 'Körper, Geist und Seele werden gleichermaßen angesprochen.',
  },
]

const stats = [
  { value: '350+', label: 'Schülerinnen & Schüler' },
  { value: '25+', label: 'Jahre Erfahrung' },
  { value: '9', label: 'Schulstufen' },
]

// Fallback images für den Alltag-Abschnitt wenn keine Contentful Bilder vorhanden
const fallbackAlltagImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
    alt: 'Kinder beim Lernen',
    category: 'unterricht',
    title: 'Kinder beim Lernen',
    order: 1,
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=500&fit=crop',
    alt: 'Schulhof',
    category: 'unterricht',
    title: 'Schulhof',
    order: 2,
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&h=400&fit=crop',
    alt: 'Kinder beim Spielen',
    category: 'events',
    title: 'Kinder beim Spielen',
    order: 3,
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600&h=500&fit=crop',
    alt: 'Musikunterricht',
    category: 'unterricht',
    title: 'Musikunterricht',
    order: 4,
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1566251037378-5e04e3bec343?w=600&h=400&fit=crop',
    alt: 'Gartenprojekt',
    category: 'Natur',
    title: 'Gartenprojekt',
    order: 5,
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&h=500&fit=crop',
    alt: 'Sport',
    category: 'Sport',
    title: 'Sport',
    order: 6,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

interface Props {
  latestNews: NewsEntry[]
  alltagImages: GalleryImage[]
}

export function HomePage({ latestNews, alltagImages }: Props) {
  return (
    <>
      <section className="relative h-[calc(100vh-5rem)] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&h=1080&fit=crop"
            alt="Kinder beim Lernen in der Schule"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-2xl"
          >
            <motion.h1
              variants={itemVariants}
              className="font-sans text-4xl font-extrabold tracking-tight text-cream sm:text-5xl lg:text-6xl"
            >
              Lernen mit Freude
              <span className="block text-secondary">und ganzheitlich</span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 font-serif text-lg text-cream/80 sm:text-xl"
            >
              Das Astrid Lindgren Zentrum ist eine moderne Privatschule in Wien,
              die Kindern einen kreativen, individuellen und zukunftsorientierten
              Bildungsweg bietet.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button size="lg" asChild>
                <Link href="/kontakt">
                  Jetzt anmelden
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-cream text-cream hover:bg-cream hover:text-charcoal">
                <Link href="/ueber-uns">Mehr erfahren</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="h-full border-0 shadow-lg bg-white">
                  <CardContent className="p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <feature.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 font-sans text-xl font-bold text-charcoal">
                      {feature.title}
                    </h3>
                    <p className="mt-3 font-serif text-charcoal/70">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-sans text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
                Bildung mit Herz und Verstand
              </h2>
              <p className="mt-6 font-serif text-lg text-charcoal/70">
                Seit über 25 Jahren begleiten wir Kinder und Jugendliche auf ihrem
                Bildungsweg. Unser pädagogisches Konzept verbindet akademische
                Exzellenz mit sozialer Kompetenz und kreativer Entfaltung.
              </p>
              <p className="mt-4 font-serif text-charcoal/70">
                In kleinen Klassen und mit individueller Förderung schaffen wir
                eine Lernatmosphäre, in der sich jedes Kind entfalten kann.
              </p>
              <Button className="mt-8" asChild>
                <Link href="/ueber-uns">
                  Mehr über uns
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop"
                alt="Kinder in der Schule"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 font-serif text-cream/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
                Aktuelles
              </h2>
              <p className="mt-2 font-serif text-charcoal/70">
                Neuigkeiten aus unserem Schulalltag
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/news">Alle News</Link>
            </Button>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {(latestNews.length === 0 ? [] : latestNews).map((news) => (
              <motion.div key={news.id} variants={itemVariants}>
                <Link href={`/news/${news.slug}`} className="group block">
                  <Card className="h-full overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
                    {news.image && (
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={news.image.url}
                          alt={news.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <time className="font-sans text-sm text-primary">
                        {formatDate(news.date)}
                      </time>
                      <h3 className="mt-2 font-sans text-lg font-bold text-charcoal group-hover:text-primary transition-colors">
                        {news.title}
                      </h3>
                      {news.excerpt && (
                        <p className="mt-2 font-serif text-sm text-charcoal/70 line-clamp-2">
                          {news.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}

            {latestNews.length === 0 && (
              <motion.div variants={itemVariants} className="md:col-span-3">
                <div className="rounded-xl border border-charcoal/10 bg-white p-8 text-center shadow-sm">
                  <p className="font-sans text-lg text-charcoal">Derzeit sind keine News veröffentlicht.</p>
                  <p className="mt-2 font-serif text-charcoal/70">Sobald neue Artikel in Contentful veröffentlicht werden, erscheinen sie hier automatisch.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              Ein Blick in unseren Alltag
            </h2>
            <p className="mt-4 font-serif text-lg text-charcoal/70">
              Entdecken Sie unsere Räume, Aktivitäten und glückliche Kinder
            </p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3"
          >
            {(alltagImages.length > 0 ? alltagImages : fallbackAlltagImages).map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-lg',
                  index % 3 === 0 ? 'md:row-span-2' : ''
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link href="/galerie">Zur Galerie</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-sans text-3xl font-bold tracking-tight text-charcoal sm:text-4xl">
              Interessiert?
            </h2>
            <p className="mt-4 font-serif text-lg text-charcoal/80 max-w-2xl mx-auto">
              Wir freuen uns darauf, Sie und Ihr Kind kennenzulernen.
              Kontaktieren Sie uns für einen persönlichen Termin.
            </p>
            <Button
              size="lg"
              className="mt-8 bg-charcoal text-cream hover:bg-charcoal/90"
              asChild
            >
              <Link href="/kontakt">Kontakt aufnehmen</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
