import type { Metadata } from 'next'
import { Quote, Heart, Gift, Users, Building2, CreditCard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fördern',
  description: 'Unterstützen Sie das Astrid Lindgren Zentrum durch Spenden, Patenschaften oder fördernde Mitgliedschaft. Ihre Unterstützung ermöglicht individuelle Förderung von Kindern und Jugendlichen.',
}

export default function FoerdernPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Fördern
          </h1>
          <p className="mt-4 font-serif text-xl text-cream/80 max-w-2xl">
            Helfen Sie mit, die Zukunft von Kindern und Jugendlichen zu gestalten.
          </p>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-white p-8 shadow-xl sm:p-12">
            <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/20" />
            <blockquote className="relative">
              <p className="font-serif text-xl italic text-charcoal sm:text-2xl text-center">
                "Alles, was an Großem in der Welt geschah, vollzog sich zuerst in der Phantasie eines Menschen."
              </p>
              <footer className="mt-8 text-center">
                <cite className="not-italic font-sans font-bold text-primary">
                  Astrid Lindgren
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
              Fördern und Spenden
            </h2>
            <div className="mt-6 space-y-4 font-serif text-lg text-charcoal/70">
              <p>
                Ihre Spende kommt zu 100% dem Astrid Lindgren Zentrum zu Gute. Kinder, Jugendliche und junge Erwachsene werden hier entsprechend ihrer Diversität individuell gefördert und gefordert, so dass sie ihre Potentiale ihren Möglichkeiten entsprechend entfalten können.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spendenbegünstigung */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
                Spendenbegünstigung
              </h2>
              <div className="mt-6 space-y-4 font-serif text-lg text-charcoal/70">
                <p>
                  Das Astrid Lindgren Zentrum ist seit dem Jahr 2025 spendenbegünstigt. Spenden können steuerlich abgesetzt werden.
                </p>
                <p>
                  Überweisung des gewünschten Betrages an:
                </p>
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <p className="font-sans text-charcoal">
                    <strong className="text-primary">Kontoinhaber:</strong> Astrid Lindgren Zentrum
                  </p>
                  <p className="font-sans text-charcoal mt-2">
                    <strong className="text-primary">IBAN:</strong> AT54 2011 1282 1039 8806
                  </p>
                </div>
                <p className="text-sm">
                  Für die Zuordnung beim Finanzamt, im Feld "Verwendungszweck" das Geburtsdatum sowie Vor- und Zunamen (der Name muss mit dem Namen auf dem Meldezettel ident sein).
                </p>
                <p>
                  Spenden von Unternehmen können wir als Betriebsausgaben berücksichtigen. In diesem Fall stellen wir auf Anfrage gerne eine Spendenbestätigung aus.
                </p>
                <a 
                  href="https://www.bmf.gv.at/public/informationen/spendenservice.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 font-semibold underline underline-offset-4"
                >
                  Ausführliche Informationen zur Spendenabsetzbarkeit
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-primary/10 p-8">
              <CreditCard className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-sans text-xl font-bold text-charcoal">
                Bankverbindung
              </h3>
              <div className="mt-4 space-y-2 font-sans text-charcoal/70">
                <p><strong>Astrid Lindgren Zentrum - Verein für Pädagogik und Kultur</strong></p>
                <p>Erste Bank</p>
                <p><strong>IBAN:</strong> AT54 2011 1282 1039 8806</p>
                <p><strong>BIC:</strong> GIBAATWWXXX</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unterstützungsmöglichkeiten */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl text-center">
            Helfen Sie mit, unsere Ziele zu erreichen
          </h2>
          <p className="mt-4 font-serif text-lg text-charcoal/70 text-center max-w-2xl mx-auto">
            Es gibt verschiedene Möglichkeiten, das Astrid Lindgren Zentrum zu unterstützen.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Einmalige Förderung */}
            <div className="rounded-xl bg-cream p-8 shadow-sm hover:shadow-md transition-shadow">
              <Gift className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-sans text-xl font-bold text-charcoal">
                Einmalige Förderung bzw. regelmäßige Spende
              </h3>
              <p className="mt-4 font-serif text-charcoal/70">
                Mit einer einmaligen finanziellen Zuwendung bzw. durch Ihre regelmäßige Spende an den Verein Astrid Lindgren Zentrum fördern Sie:
              </p>
              <ul className="mt-4 space-y-2 font-serif text-charcoal/70 list-disc list-inside">
                <li>die individuelle Betreuung von Kindern und Jugendlichen</li>
                <li>besondere Projekte</li>
                <li>den Ankauf von speziellen Unterrichtsmaterialien</li>
                <li>die Weiterentwicklung der pädagogischen Qualität</li>
              </ul>
            </div>

            {/* Patenschaft */}
            <div className="rounded-xl bg-cream p-8 shadow-sm hover:shadow-md transition-shadow">
              <Heart className="h-12 w-12 text-accent mb-4" />
              <h3 className="font-sans text-xl font-bold text-charcoal">
                Patenschaft für Schulplatz
              </h3>
              <p className="mt-4 font-serif text-charcoal/70">
                Einigen Familien fällt es schwer, das Schulgeld zu finanzieren. Wir möchten auch Kindern dieser Familien einen Schulbesuch ermöglichen und so einen Beitrag zu sozialem Ausgleich in unserer Gesellschaft leisten.
              </p>
              <p className="mt-4 font-serif text-charcoal/70">
                Daher sind wir immer auf der Suche nach Stipendiengeber*innen, die einen Schulplatz (teil-)finanzieren.
              </p>
            </div>

            {/* Fördernde Mitgliedschaft */}
            <div className="rounded-xl bg-cream p-8 shadow-sm hover:shadow-md transition-shadow">
              <Users className="h-12 w-12 text-secondary mb-4" />
              <h3 className="font-sans text-xl font-bold text-charcoal">
                Fördernde Mitgliedschaft
              </h3>
              <p className="mt-4 font-serif text-charcoal/70">
                Auch durch eine fördernde Mitgliedschaft im Verein Astrid Lindgren Zentrum können Sie kontinuierlich die hochwertige Arbeit im Astrid Lindgren Zentrum unterstützen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bildungskonzept */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
                Ihr Beitrag zum Bildungskonzept
              </h2>
              <div className="mt-6 space-y-4 font-serif text-lg text-charcoal/70">
                <p>
                  Privatpersonen und Unternehmen leisten mit Ihrem finanziellen Engagement einen wesentlichen Beitrag zur Umsetzung unseres innovativen reformpädagogischen Bildungskonzepts, das bereits seit 2003 erfolgreich umgesetzt wird.
                </p>
                <p>
                  Ein wesentlicher Grundpfeiler der Astrid Lindgren Schule ist die individuelle Begleitung jeder bzw. jedes Einzelnen, sowie die Arbeit in Kleingruppen und Projekten.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="font-sans text-xl font-bold text-primary mb-4">
                Was Ihre Spende bewirkt
              </h3>
              <ul className="space-y-3 font-serif text-charcoal/70">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Finanzierung des pädagogischen Personals
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Anschaffung von Unterrichtsmaterialien
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Raumausstattung und -gestaltung
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Durchführung besonderer Projekte
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  Weiterentwicklung des Bildungskonzepts
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 rounded-xl bg-primary/10 p-8">
            <p className="font-serif text-lg text-charcoal/70 text-center">
              Um unser modernes reformpädagogisches Bildungskonzept umzusetzen und die Kinder und Jugendlichen gleich ihrer individuellen Bedürfnisse in ihrem Lernprozess zu begleiten, haben wir einen <strong className="text-primary">Betreuungsschlüssel von 8–12 Schüler*innen pro Pädagogin bzw. Pädagogen</strong>, wodurch sich ein erhöhter Gehaltsaufwand ergibt.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsoren */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
              Sponsoren
            </h2>
            <p className="mt-4 font-serif text-lg text-charcoal/70 max-w-2xl mx-auto">
              Gerne gehen wir mit Firmen individuelle Kooperationen ein und freuen uns auf eine Zusammenarbeit, die wir gerne in einem persönlichen Gespräch erarbeiten. Generell können Sponsor*innen sämtliche Medien des Astrid Lindgren Zentrums nutzen und sich in Zusammenarbeit mit dem Verein präsentieren.
            </p>
          </div>

          <h3 className="font-sans text-xl font-bold text-charcoal text-center mb-8">
            Aktuelle Sponsoren
          </h3>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Oetinger Verlag', url: 'https://www.oetinger.de' },
              { name: 'MA 13 - Stadt Wien', url: 'https://www.wien.gv.at/bildung/schulen' },
              { name: 'Ströck-Brot G.m.b.H', url: 'https://stroeck.at/de' },
              { name: 'Octapharma Austria', url: 'https://www.octapharma.at' },
              { name: 'Huthansl Althaussanierung & Bau Ges.m.b.H.', url: 'https://www.huthansl.at' },
              { name: 'Theater am Alsergrund', url: 'https://kabarett-wien.at' },
            ].map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl bg-cream p-6 text-center shadow-sm hover:shadow-md transition-all hover:bg-primary/5"
              >
                <h4 className="font-sans font-bold text-charcoal group-hover:text-primary transition-colors">
                  {sponsor.name}
                </h4>
                <p className="mt-2 text-sm text-charcoal/50 font-mono">
                  {sponsor.url.replace('https://', '').replace('www.', '')}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sans text-3xl font-bold text-cream sm:text-4xl">
            Werden Sie Teil unserer Gemeinschaft
          </h2>
          <p className="mt-4 font-serif text-xl text-cream/80">
            Jede Unterstützung zählt. Gemeinsam können wir die Zukunft von Kindern und Jugendlichen gestalten.
          </p>
          <div className="mt-8">
            <a
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-full bg-cream px-8 py-4 font-sans font-bold text-primary transition-all hover:bg-white hover:scale-105"
            >
              Kontaktieren Sie uns
            </a>
          </div>
        </div>
      </section>
    </>
  )
}