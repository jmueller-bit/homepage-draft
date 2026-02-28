import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum des Astrid Lindgren Zentrums - Rechtliche Informationen und Kontaktdaten gemäß §5 E-Commerce Gesetz.',
}

export default function ImpressumPage() {
  return (
    <>
      <section className="bg-charcoal py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Impressum
          </h1>
          <p className="mt-4 font-serif text-xl text-cream/80 max-w-3xl">
            Informationspflicht laut §5 E-Commerce Gesetz, §14 Unternehmensgesetzbuch, §63 Gewerbeordnung und Offenlegungspflicht laut §25 Mediengesetz.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Medieninhaber */}
          <Card className="mb-8 bg-white border-none shadow-md">
            <CardContent className="p-8">
              <h2 className="font-sans text-2xl font-bold text-charcoal mb-6">Medieninhaber</h2>
              <div className="prose prose-lg font-serif text-charcoal/80">
                <p className="text-lg font-semibold text-charcoal">
                  Astrid Lindgren Zentrum – Verein für Pädagogik und Kultur
                </p>
                <p>
                  Breitenfurter Straße 401-413/1/R02<br />
                  1230 Wien
                </p>
                <div className="mt-4 space-y-2">
                  <p>
                    <span className="font-semibold">Tel.:</span>{' '}
                    <a href="tel:+4318874053" className="text-primary hover:underline">
                      +43 1 887 40 53
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Fax:</span> +43 1 887 40 53
                  </p>
                  <p>
                    <span className="font-semibold">E-Mail:</span>{' '}
                    <a href="mailto:office@astrid-lindgren-zentrum.at" className="text-primary hover:underline">
                      office@astrid-lindgren-zentrum.at
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">ZVR:</span> 960385266
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organschaftliche Vertreter */}
          <Card className="mb-8 bg-white border-none shadow-md">
            <CardContent className="p-8">
              <h2 className="font-sans text-2xl font-bold text-charcoal mb-6">Organschaftliche Vertreter</h2>
              <div className="prose prose-lg font-serif text-charcoal/80">
                <ul className="space-y-2 list-none pl-0">
                  <li>
                    <span className="font-semibold">Obmann:</span> Inno Fail
                  </li>
                  <li>
                    <span className="font-semibold">Kassiererin:</span> Vanessa Spielauer
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Vereinszweck */}
          <Card className="mb-8 bg-white border-none shadow-md">
            <CardContent className="p-8">
              <h2 className="font-sans text-2xl font-bold text-charcoal mb-6">Vereinszweck</h2>
              <div className="prose prose-lg font-serif text-charcoal/80">
                <p>
                  Der Verein bezweckt u.a. die Förderung, Bildung und Persönlichkeitsentwicklung von Kindern, 
                  Jugendlichen und Erwachsenen, die Verbreitung und Förderung reformpädagogischer Ansätze 
                  und des Modells des ganzheitlichen Lernens, sowie die Vermittlung von Kunst und Kreativität, 
                  die Förderung von Künstler*innen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Haftung für Inhalte */}
          <Card className="mb-8 bg-white border-none shadow-md">
            <CardContent className="p-8">
              <h2 className="font-sans text-2xl font-bold text-charcoal mb-6">Haftung für Inhalte dieser Webseite</h2>
              <div className="prose prose-lg font-serif text-charcoal/80">
                <p>
                  Wir entwickeln die Inhalte dieser Webseite ständig weiter und bemühen uns korrekte und aktuelle Informationen bereitzustellen. 
                  Leider können wir keine Haftung für die Korrektheit aller Inhalte auf dieser Webseite übernehmen, 
                  speziell für jene die seitens Dritter bereitgestellt wurden.
                </p>
                <p>
                  Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen, bitte wir Sie uns umgehend zu kontaktieren, 
                  Sie finden die Kontaktdaten oben und auf der{' '}
                  <Link href="/kontakt" className="text-primary hover:underline">
                    Kontaktseite
                  </Link>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Haftung für Links */}
          <Card className="mb-8 bg-white border-none shadow-md">
            <CardContent className="p-8">
              <h2 className="font-sans text-2xl font-bold text-charcoal mb-6">Haftung für Links auf dieser Webseite</h2>
              <div className="prose prose-lg font-serif text-charcoal/80">
                <p>
                  Unsere Webseite enthält Links zu anderen Webseiten für deren Inhalt wir nicht verantwortlich sind. 
                  Haftung für verlinkte Websites besteht laut{' '}
                  <a 
                    href="https://www.ris.bka.gv.at/Dokument.wxe?Abfrage=Bundesnormen&Dokumentnummer=NOR40025813" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    § 17 ECG
                  </a>{' '}
                  für uns nicht, da wir keine Kenntnis rechtswidriger Tätigkeiten hatten und haben, 
                  uns solche Rechtswidrigkeiten auch bisher nicht aufgefallen sind und wir Links sofort entfernen würden, 
                  wenn uns Rechtswidrigkeiten bekannt werden.
                </p>
                <p>
                  Wenn Ihnen rechtswidrige Links auf unserer Website auffallen, bitten wir Sie uns zu kontaktieren, 
                  Sie finden die Kontaktdaten oben und auf der{' '}
                  <Link href="/kontakt" className="text-primary hover:underline">
                    Kontaktseite
                  </Link>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Urheberrecht */}
          <Card className="mb-8 bg-white border-none shadow-md">
            <CardContent className="p-8">
              <h2 className="font-sans text-2xl font-bold text-charcoal mb-6">Urheberrechtshinweis</h2>
              <div className="prose prose-lg font-serif text-charcoal/80">
                <p>
                  Alle Inhalte dieser Webseite (Bilder, Fotos, Texte, Videos) unterliegen dem Urheberrecht. 
                  Jegliche Nutzung, Verwertung, Bearbeitung und Veränderung ist nur mit Zustimmung der 
                  Seitenurheberin bzw. des Seitenurhebers zulässig.
                </p>
                <div className="mt-4 space-y-2">
                  <p>
                    <span className="font-semibold">Fotos:</span> © Astrid Lindgren Zentrum
                  </p>
                  <p>
                    <span className="font-semibold">Gestaltungsbilder:</span> ©{' '}
                    <a 
                      href="https://www.lehnerdesign.at" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Petra Lehner
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Website Layout:</span> Petra Lehner
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datenschutz Link */}
          <Card className="bg-primary text-cream border-none shadow-md">
            <CardContent className="p-8">
              <h2 className="font-sans text-2xl font-bold mb-4">Datenschutz</h2>
              <p className="font-serif text-cream/90 mb-4">
                Informationen zum Datenschutz finden Sie auf unserer Datenschutzseite.
              </p>
              <Link 
                href="/datenschutz" 
                className="inline-block bg-cream text-primary px-6 py-3 rounded-lg font-sans font-semibold hover:bg-white transition-colors"
              >
                Zur Datenschutzerklärung
              </Link>
            </CardContent>
          </Card>

        </div>
      </section>
    </>
  )
}
