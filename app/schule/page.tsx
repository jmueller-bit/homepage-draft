import type { Metadata } from 'next'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SchoolSubnav } from '@/components/school-subnav'
import { School, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Schule',
  description: 'Alle Schulstufen von der Vorschule bis zur 9. Klasse. Erfahren Sie mehr über unser Bildungsangebot und den Tagesablauf.',
}

const schoolLevels = [
  {
    id: 'item-1',
    title: 'Vorschule (4-6 Jahre)',
    content: 'In unserer Vorschule werden Kinder spielerisch auf die Schulzeit vorbereitet. Wir fördern Feinmotorik, Sozialverhalten und erste mathematische Konzepte durch altersgerechte Aktivitäten.',
    colorClass: 'data-[state=open]:text-primaria1'
  },
  {
    id: 'item-2',
    title: '1. Schulstufe (6-7 Jahre)',
    content: 'Der Übergang vom Kindergarten zur Schule wird sanft gestaltet. Lesen, Schreiben und Rechnen werden mit viel Bewegung und Kreativität verbunden.',
    colorClass: 'data-[state=open]:text-primaria1'
  },
  {
    id: 'item-3',
    title: '2. Schulstufe (7-8 Jahre)',
    content: 'Die Kinder vertiefen ihre Grundkenntnisse und entdecken erste naturwissenschaftliche Themen. Projektarbeit spielt eine zentrale Rolle.',
    colorClass: 'data-[state=open]:text-primaria1'
  },
  {
    id: 'item-4',
    title: '3. Schulstufe (8-9 Jahre)',
    content: 'Selbstständiges Lernen wird gefördert. Die Kinder lernen, eigene Projekte zu planen und durchzuführen.',
    colorClass: 'data-[state=open]:text-primaria1'
  },
  {
    id: 'item-5',
    title: '4. Schulstufe (9-10 Jahre)',
    content: 'Vorbereitung auf den Übertritt in die Sekundarstufe. Besonderer Fokus auf Lernstrategien und Selbstorganisation.',
    colorClass: 'data-[state=open]:text-primaria2'
  },
  {
    id: 'item-6',
    title: '5.-6. Schulstufe (10-12 Jahre)',
    content: 'Die Sekundarstufe beginnt. Neben vertieftem Fachwissen werden auch soziale Kompetenzen und kritisches Denken gefördert.',
    colorClass: 'data-[state=open]:text-sekundaria1'
  },
  {
    id: 'item-7',
    title: '7.-8. Schulstufe (12-14 Jahre)',
    content: 'Pubertätsbegleitung ist uns wichtig. Die Schüler werden in ihrer Entwicklung unterstützt und auf weiterführende Schulen vorbereitet.',
    colorClass: 'data-[state=open]:text-sekundaria2'
  },
  {
    id: 'item-8',
    title: '9. Schulstufe (14-15 Jahre)',
    content: 'Abschluss der Pflichtschule. Berufsorientierung und Vorbereitung auf die Oberstufe stehen im Mittelpunkt.',
    colorClass: 'data-[state=open]:text-sekundaria2'
  },
]

const dailySchedule = [
  { time: '07:30', activity: 'Betreuung beginnt' },
  { time: '08:00', activity: 'Beginn des Unterrichts' },
  { time: '10:00', activity: 'Pause mit Obst & Getränken' },
  { time: '10:30', activity: 'Unterricht' },
  { time: '12:00', activity: 'Mittagessen' },
  { time: '13:00', activity: 'Nachmittagsunterricht / AGs' },
  { time: '15:30', activity: 'Ende der Regularstunden' },
  { time: '17:00', activity: 'Späte Betreuung (optional)' },
]

const activities = [
  {
    title: 'Kunst & Gestalten',
    description: 'Malen, Basteln, Töpfern und Textilgestaltung fördern die Kreativität.',
  },
  {
    title: 'Musik',
    description: 'Singen, Instrumentalunterricht und Chor sind fester Bestandteil.',
  },
  {
    title: 'Sport',
    description: 'Sportunterricht, Schwimmen und diverse Sport-AGs.',
  },
  {
    title: 'Natur & Umwelt',
    description: 'Gartenarbeit, Tierpflege und Umweltprojekte.',
  },
  {
    title: 'Theater',
    description: 'Regelmäßige Theaterproduktionen fördern Selbstbewusstsein.',
  },
  {
    title: 'Fremdsprachen',
    description: 'Englisch ab der 1. Klasse, Latein ab der 5. Klasse.',
  },
]

export default function SchulePage() {
  return (
    <>
      <section className="bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <School className="h-8 w-8 text-charcoal" />
            <span className="text-charcoal/60 font-sans text-sm uppercase tracking-wider">
              Bildungsangebot
            </span>
          </div>
          <h1 className="font-sans text-4xl font-extrabold text-charcoal sm:text-5xl">
            Unsere Schule
          </h1>
          <p className="mt-4 font-serif text-xl text-charcoal/80 max-w-2xl">
            Von der Vorschule bis zur 9. Schulstufe - ein kompletter Bildungsweg
          </p>
          
          {/* Quick Link to Anmeldung */}
          <div className="mt-8">
            <Link 
              href="/schule/anmeldung"
              className="inline-flex items-center gap-2 bg-schule text-white px-6 py-3 rounded-lg font-sans font-semibold hover:bg-schule/90 transition-colors shadow-md"
            >
              Zur Anmeldung
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      <SchoolSubnav />

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
            Schulstufen im Überblick
          </h2>
          <p className="mt-4 font-serif text-lg text-charcoal/70">
            Klicken Sie auf eine Schulstufe, um mehr zu erfahren.
          </p>
          <div className="mt-8 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {schoolLevels.map((level) => (
                <AccordionItem key={level.id} value={level.id}>
                  <AccordionTrigger className={cn("font-sans text-lg font-semibold text-charcoal transition-colors hover:text-charcoal/80", level.colorClass)}>
                    {level.title}
                  </AccordionTrigger>
                  <AccordionContent className="font-serif text-charcoal/70">
                    {level.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
            Ein typischer Tag
          </h2>
          <p className="mt-4 font-serif text-lg text-charcoal/70">
            Unser Tagesablauf bietet Struktur und Raum für individuelle Entfaltung.
          </p>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-charcoal/10">
                  <th className="py-4 pr-4 text-left font-sans text-sm font-semibold text-charcoal">Uhrzeit</th>
                  <th className="py-4 text-left font-sans text-sm font-semibold text-charcoal">Aktivität</th>
                </tr>
              </thead>
              <tbody>
                {dailySchedule.map((item, index) => (
                  <tr key={index} className="border-b border-charcoal/5">
                    <td className="py-4 pr-4 font-sans font-bold text-schule">{item.time}</td>
                    <td className="py-4 font-serif text-charcoal/80">{item.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-schule-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
            Unser Angebot
          </h2>
          <p className="mt-4 font-serif text-lg text-charcoal/70">
            Neben dem regulären Unterricht bieten wir viele zusätzliche Aktivitäten.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <div key={activity.title} className="rounded-xl bg-white p-8 shadow-md">
                <h3 className="font-sans text-xl font-bold text-schule">
                  {activity.title}
                </h3>
                <p className="mt-2 font-serif text-charcoal/70">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sans text-3xl font-bold text-charcoal sm:text-4xl">
            Haben Sie Fragen?
          </h2>
          <p className="mt-4 font-serif text-lg text-charcoal/80 max-w-2xl mx-auto">
            Wir beraten Sie gerne persönlich zu unserem Schulangebot.
          </p>
          <Button className="mt-8 bg-charcoal text-cream hover:bg-charcoal/90" asChild>
            <Link href="/kontakt">Kontakt aufnehmen</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
