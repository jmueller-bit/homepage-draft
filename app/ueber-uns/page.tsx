import type { Metadata } from 'next'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import { getTeamMembers, type TeamEntry } from '@/lib/contentful'

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Das Astrid Lindgren Zentrum - Eine Privatschule mit Tradition und Innovation. Erfahren Sie mehr über unsere Geschichte, unser pädagogisches Konzept und unser Team.',
}

export const revalidate = 300

export default async function UeberUnsPage() {
  const teamMembers: TeamEntry[] = await getTeamMembers()

  return (
    <>
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Über uns
          </h1>
          <p className="mt-4 font-serif text-xl text-cream/80 max-w-2xl">
            Wir gestalten die Zukunft von Kindern durch Bildung, Kreativität und Menschlichkeit.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
                Unsere Geschichte
              </h2>
              <div className="mt-6 space-y-4 font-serif text-lg text-charcoal/70">
                <p>
                  Das Astrid Lindgren Zentrum wurde 1999 mit der Vision gegründet, 
                  eine Schule zu schaffen, die Kindern nicht nur Wissen vermittelt, 
                  sondern sie auch als whole Person fördert.
                </p>
                <p>
                  Benannt nach der berühmten schwedischen Kinderbuchautorin Astrid Lindgren, 
                  teilen wir ihre Werte: Liebe zum Kind, Fantasie und die Überzeugung, 
                  dass jedes Kind einzigartig ist.
                </p>
                <p>
                  Was als kleine Grundschule begann, ist heute eine anerkannte 
                  Privatschule mit über 350 Schülerinnen und Schülern von der 
                  Vorschule bis zur 9. Schulstufe.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&h=600&fit=crop"
                alt="Historische Aufnahme der Schule"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
            Pädagogisches Konzept
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-cream p-8">
              <h3 className="font-sans text-xl font-bold text-primary">
                Individuelle Förderung
              </h3>
              <p className="mt-4 font-serif text-charcoal/70">
                Jedes Kind lernt in seinem eigenen Tempo. Wir identifizieren 
                Stärken und entwickeln個人liche Lernpläne.
              </p>
            </div>
            <div className="rounded-xl bg-cream p-8">
              <h3 className="font-sans text-xl font-bold text-primary">
                Ganzheitliche Bildung
              </h3>
              <p className="mt-4 font-serif text-charcoal/70">
                Neben akademischem Wissen fördern wir soziale Kompetenzen, 
                kreative Fähigkeiten und körperliche Gesundheit.
              </p>
            </div>
            <div className="rounded-xl bg-cream p-8">
              <h3 className="font-sans text-xl font-bold text-primary">
                Progressive Pädagogik
              </h3>
              <p className="mt-4 font-serif text-charcoal/70">
                Wir verbinden bewährte Methoden mit modernsten pädagogischen 
                Erkenntnissen und digitalen Innovationen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-white p-8 shadow-xl sm:p-12">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/20" />
            <blockquote className="relative">
              <p className="font-serif text-xl italic text-charcoal sm:text-2xl">
                „Alle Kinder sind Begabungen. Unsere Aufgabe ist es, diese zu entdecken 
                und zum Blühen zu bringen. Jedes Kind verdient eine Schule, die an 
                seine Zukunft glaubt."
              </p>
              <footer className="mt-8">
                <cite className="not-italic font-sans font-bold text-primary">
                  Aus unserem Leitbild
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
            Unser Team
          </h2>
          <p className="mt-4 font-serif text-lg text-charcoal/70">
            Lernen Sie die Menschen kennen, die jeden Tag für Ihre Kinder da sind.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.length === 0 && (
              <div className="sm:col-span-2 lg:col-span-3 rounded-xl border border-charcoal/10 bg-white p-8 text-center shadow-sm">
                <p className="font-sans text-lg text-charcoal">Aktuell sind keine Teammitglieder veröffentlicht.</p>
                <p className="mt-2 font-serif text-charcoal/70">Sobald Inhalte in Contentful bereitstehen, erscheinen sie hier.</p>
              </div>
            )}

            {teamMembers.map((member) => (
              <a
                key={member.id}
                href={`/ueber-uns/team/${member.id}`}
                className="group block rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="relative aspect-square overflow-hidden rounded-full">
                  {member.photo ? (
                    <Image
                      src={member.photo.url}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="200px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                      <span className="font-sans font-bold">{member.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <h3 className="mt-6 font-sans text-xl font-bold text-charcoal">
                  {member.name}
                </h3>
                <p className="font-sans text-sm font-semibold text-primary">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="mt-2 font-serif text-sm text-charcoal/70 line-clamp-3">
                    {member.bio}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                  <span>Mehr erfahren</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
