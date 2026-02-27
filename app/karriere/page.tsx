import type { Metadata } from 'next'
import Link from 'next/link'
import { Briefcase, MapPin, Clock, ArrowRight, Users, Heart, GraduationCap } from 'lucide-react'
import { getJobListings, type JobEntry } from '@/lib/contentful'

export const metadata: Metadata = {
  title: 'Karriere',
  description: 'Werden Sie Teil unseres Teams! Entdecken Sie offene Stellen und Karrieremöglichkeiten am Astrid Lindgren Zentrum.',
}

export const revalidate = 300

export default async function KarrierePage() {
  const jobs: JobEntry[] = await getJobListings()

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Karriere
          </h1>
          <p className="mt-4 font-serif text-xl text-cream/80 max-w-2xl">
            Werden Sie Teil unseres engagierten Teams und gestalten Sie mit uns die Zukunft von Kindern und Jugendlichen.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl text-center">
            Warum am Astrid Lindgren Zentrum arbeiten?
          </h2>
          <p className="mt-4 font-serif text-lg text-charcoal/70 text-center max-w-3xl mx-auto">
            Wir bieten einzigartige Arbeitsbedingungen in einem innovativen reformpädagogischen Umfeld.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <Heart className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-sans text-xl font-bold text-charcoal">
                Sinnstiftende Arbeit
              </h3>
              <p className="mt-4 font-serif text-charcoal/70">
                Gestalten Sie jeden Tag die Zukunft von Kindern und Jugendlichen. Ihre Arbeit hat direkten positiven Einfluss auf junge Menschen.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <Users className="h-12 w-12 text-secondary mb-4" />
              <h3 className="font-sans text-xl font-bold text-charcoal">
                Kleine Gruppen
              </h3>
              <p className="mt-4 font-serif text-charcoal/70">
                Arbeiten Sie mit maximal 8-12 Schüler*innen pro Klasse. Das ermöglicht individuelle Förderung und echte Beziehungsarbeit.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <GraduationCap className="h-12 w-12 text-accent mb-4" />
              <h3 className="font-sans text-xl font-bold text-charcoal">
                Weiterbildung
              </h3>
              <p className="mt-4 font-serif text-charcoal/70">
                Regelmäßige Fortbildungen und Entwicklungsmöglichkeiten. Wir investieren in die fachliche und persönliche Entwicklung unseres Teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
            Offene Stellen
          </h2>
          <p className="mt-4 font-serif text-lg text-charcoal/70 max-w-2xl">
            Werden Sie Teil unseres Teams. Wir freuen uns auf Ihre Bewerbung!
          </p>

          {jobs.length === 0 ? (
            <div className="mt-8 rounded-xl bg-cream p-8 text-center">
              <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-sans text-xl font-bold text-charcoal">
                Aktuell keine offenen Stellen
              </h3>
              <p className="mt-2 font-serif text-charcoal/70">
                Wir freuen uns aber jederzeit über Ihre Initiativbewerbung!
              </p>
              <Link 
                href="/kontakt"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-sans font-bold text-cream transition-all hover:bg-primary/90"
              >
                Initiativbewerbung senden
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {jobs.map((job) => (
                <div 
                  key={job.id}
                  className="group rounded-xl bg-cream p-6 sm:p-8 transition-all hover:bg-primary/5 hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-sans text-xl font-bold text-charcoal group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-charcoal/60">
                        {job.department && (
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.department}
                          </span>
                        )}
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                        )}
                        {job.type && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </span>
                        )}
                      </div>
                      {job.description && (
                        <p className="mt-4 font-serif text-charcoal/70 line-clamp-2">
                          {job.description}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <Link 
                        href={`/karriere/${job.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-sans font-bold text-cream transition-all hover:bg-primary/90 hover:scale-105"
                      >
                        Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Initiative Application */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sans text-3xl font-bold text-cream sm:text-4xl">
            Keine passende Stelle gefunden?
          </h2>
          <p className="mt-4 font-serif text-xl text-cream/80">
            Wir freuen uns jederzeit über Ihre Initiativbewerbung. Werden Sie Teil unseres engagierten Teams!
          </p>
          <div className="mt-8">
            <Link 
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-full bg-cream px-8 py-4 font-sans font-bold text-primary transition-all hover:bg-white hover:scale-105"
            >
              Jetzt bewerben
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}