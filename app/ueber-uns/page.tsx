import type { Metadata } from 'next'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import { getTeamMembers, type TeamEntry } from '@/lib/contentful'
import { UeberUnsSubnav } from '@/components/ueber-uns-subnav'

export const metadata: Metadata = {
  title: 'Über uns',
  description: 'Das Astrid Lindgren Zentrum - Eine Privatschule mit Tradition und Innovation. Erfahren Sie mehr über unsere Geschichte, unser pädagogisches Konzept und unser Team.',
  alternates: {
    canonical: 'https://alz5.thesolution.at/ueber-uns',
  },
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

      <UeberUnsSubnav />

      <section id="paedagogisches-konzept" className="py-16 sm:py-24 bg-white">
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

      <section id="philosophie" className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
            Philosophie
          </h2>
          <p className="mt-4 font-sans text-xl text-primary font-semibold">
            Was uns wichtig ist
          </p>
          
          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <blockquote className="border-l-4 border-primary pl-6 italic">
                <p className="font-serif text-lg text-charcoal/80 leading-relaxed">
                  „Freie und unautoritäre Erziehung bedeutet nicht, dass man die Kinder sich selbst überlässt, 
                  dass sie tun und lassen dürfen, was sie wollen. Es bedeutet nicht, dass sie ohne Normen aufwachsen sollen, 
                  was sie selber übrigens gar nicht wünschen. (...) Ganz gewiss sollen Kinder Achtung vor ihren Eltern haben, 
                  aber ganz gewiss sollen auch Eltern Achtung vor ihren Kindern haben, und niemals dürfen sie ihre natürliche 
                  Überlegenheit missbrauchen. Liebevolle Achtung voreinander, das möchte man allen Eltern und Kindern wünschen."
                </p>
                <footer className="mt-4">
                  <cite className="not-italic font-sans font-bold text-primary">
                    — Astrid Lindgren
                  </cite>
                </footer>
              </blockquote>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-sans text-2xl font-bold text-secondary">
                Präambel der europäischen Astrid Lindgren Schulen
              </h3>
              <div className="font-serif text-charcoal/70 space-y-4 leading-relaxed">
                <p>
                  Die Vertreter der Astrid-Lindgren-Schulen Deutschlands haben sich auf der gemeinsamen 
                  Konferenz im Mai 1999 auf diese gemeinsame Einleitung ihrer Schulordnung für alle 
                  Astrid-Lindgren-Schulen verständigt:
                </p>
                <p>
                  Unsere Schule ist stolz darauf, den Namen „Astrid-Lindgren" zu tragen. Die Erziehung 
                  zu Toleranz, Fairness, Verständnis, Verantwortung und Mut muss auch immer unser Ziel sein. 
                  Jeder und jede an unserer Schule soll bereit sein, sozial und tolerant zu handeln und sich 
                  für andere einzusetzen.
                </p>
                <p>
                  Konflikte und Meinungsverschiedenheiten treten überall auf. Jede und jeder muss sich bemühen, 
                  solche Situationen angemessen und gewaltfrei zu bewältigen. Jeder und jede soll sich mit der 
                  Lernumgebung der Astrid-Lindgren-Schule identifizieren und mit ihr verantwortungsvoll und 
                  pfleglich umgehen.
                </p>
                <p>
                  Im Unterricht herrscht ein vertrauensvoller Umgangston aller Beteiligten. Der Unterricht 
                  vermittelt den Schülern und Schülerinnen eine grundlegende Allgemeinbildung. Dabei wird Wert 
                  darauf gelegt zu vermitteln, wofür sie das Gelernte anwenden können.
                </p>
                <p>
                  Lehrerinnen, Lehrer und Mitschüler, Mitschülerinnen würdigen und belohnen gute Leistungen. 
                  Dazu werden die Anforderungen entsprechend der Begabung differenziert. So erhalten alle 
                  Anerkennung, auch Schwächere. Schülerinnen und Schüler werden befähigt und motiviert, 
                  selbständig und kooperativ zu arbeiten.
                </p>
              </div>
              
              <div className="pt-6 border-t border-charcoal/10">
                <p className="font-serif text-sm text-charcoal/60">
                  Mehr zu Astrid Lindgren (Lebenslauf, Fotos, usw.) unter{' '}
                  <a 
                    href="http://www.astridlindgren.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.astridlindgren.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="unser-team" className="py-16 sm:py-24 bg-cream">
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
