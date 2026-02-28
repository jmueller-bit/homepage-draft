import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  FileText, 
  CheckCircle, 
  Clock,
  MapPin,
  ArrowRight,
  School
} from 'lucide-react'
import { SchoolSubnav } from '@/components/school-subnav'

export const metadata: Metadata = {
  title: 'Anmeldung',
  description: 'Informationen zur Anmeldung neuer Schüler am Astrid Lindgren Zentrum. Erfahren Sie mehr über den Aufnahmeprozess, Informationsveranstaltungen und Kontaktmöglichkeiten.',
}

const admissionSteps = [
  {
    step: 1,
    title: 'Erstkontakt',
    description: 'Infoabend, Tag der offenen Tür oder Erstgespräch',
    icon: Users,
  },
  {
    step: 2,
    title: 'Persönliches Gespräch',
    description: 'Gespräch mit Eltern und Kind',
    icon: Users,
  },
  {
    step: 3,
    title: 'Hospitation Eltern',
    description: 'Hospitation für einen Vormittag (7:45-13:45 Uhr)',
    icon: Clock,
  },
  {
    step: 4,
    title: 'Hospitation Kind',
    description: 'Hospitation des Kindes für eine ganze Woche (Mo-Fr 8-13:30 Uhr)',
    icon: School,
  },
  {
    step: 5,
    title: 'Abschlussgespräch',
    description: 'Gespräch mit der Schulleitung und dem Vorstand',
    icon: CheckCircle,
  },
  {
    step: 6,
    title: 'Vertragsunterzeichnung',
    description: 'Offizielle Aufnahme nach positivem Verlauf',
    icon: FileText,
  },
]

const infoEvents = [
  {
    title: 'Tage der offenen Tür',
    description: 'Oktober und März - jeweils ein Tag im Schuljahr',
  },
  {
    title: 'Info-Nachmittage',
    description: 'Regelmäßig im Schuljahr - Termine unter Aktuelles',
  },
  {
    title: 'Persönliche Termine',
    description: 'Nach Vereinbarung für Erstgespräche und Hospitationen',
  },
]

export default function AnmeldungPage() {
  return (
    <>
      <SchoolSubnav />
      
      {/* Hero Section */}
      <section className="bg-schule py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <School className="h-8 w-8 text-white" />
            <span className="text-white/80 font-sans text-sm uppercase tracking-wider">
              Schule
            </span>
          </div>
          <h1 className="font-sans text-4xl font-extrabold text-white sm:text-5xl">
            Anmeldung
          </h1>
          <p className="mt-4 font-serif text-xl text-white/90 max-w-2xl">
            Wir begleiten Sie und Ihr Kind auf dem Weg zu uns - Schritt für Schritt
          </p>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto mb-8 grid grid-cols-3 bg-white p-1 rounded-xl">
              <TabsTrigger value="info" className="font-sans font-semibold data-[state=active]:bg-schule data-[state=active]:text-white rounded-lg">
                Informationen
              </TabsTrigger>
              <TabsTrigger value="process" className="font-sans font-semibold data-[state=active]:bg-schule data-[state=active]:text-white rounded-lg">
                Aufnahmeprozess
              </TabsTrigger>
              <TabsTrigger value="contact" className="font-sans font-semibold data-[state=active]:bg-schule data-[state=active]:text-white rounded-lg">
                Kontakt
              </TabsTrigger>
            </TabsList>

            {/* Info Tab */}
            <TabsContent value="info" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-sans text-2xl text-charcoal flex items-center gap-2">
                      <Calendar className="h-6 w-6 text-schule" />
                      Infos zur Anmeldung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="font-serif text-charcoal/80 space-y-4">
                    <p>
                      Die erste Kontaktaufnahme kann telefonisch, per E-Mail, an einem Tag der offenen Tür, 
                      einem Informationsabend oder ähnlichem erfolgen.
                    </p>
                    <p>
                      Unsere Kontaktdaten finden Sie unten oder auf der{' '}
                      <Link href="/kontakt" className="text-schule hover:underline font-semibold">
                        Kontaktseite
                      </Link>.
                    </p>
                    <div className="bg-schule/10 rounded-lg p-4 mt-4">
                      <p className="font-semibold text-schule mb-2">
                        Wichtige Information:
                      </p>
                      <p>
                        Anmeldungen für das neue Schuljahr sind grundsätzlich bis März möglich. 
                        Nach Rücksprache ist auch eine Anmeldung im laufenden Schuljahr möglich.
                      </p>
                    </div>
                    <p>
                      Für ein Erstgespräch oder bei Interesse an einer Hospitation vereinbaren Sie bitte einen Termin.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-sans text-2xl text-charcoal flex items-center gap-2">
                      <Clock className="h-6 w-6 text-schule" />
                      Termine für Informationsveranstaltungen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {infoEvents.map((event, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-cream rounded-lg">
                        <CheckCircle className="h-5 w-5 text-schule mt-0.5 shrink-0" />
                        <div>
                          <h4 className="font-sans font-semibold text-charcoal">{event.title}</h4>
                          <p className="font-serif text-charcoal/70 text-sm">{event.description}</p>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 p-4 bg-schule/10 rounded-lg">
                      <p className="font-serif text-charcoal/80 text-sm">
                        Aktuelle Termine finden Sie unter{' '}
                        <Link href="/news" className="text-schule hover:underline font-semibold">
                          Aktuelles
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Process Tab */}
            <TabsContent value="process" className="mt-0">
              <Card className="bg-white border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="font-sans text-2xl text-charcoal text-center">
                    Unser Aufnahmeverfahren
                  </CardTitle>
                  <p className="font-serif text-charcoal/70 text-center mt-2">
                    Die Wahl der richtigen Schule ist ein sehr wichtiger Punkt in jeder Familie. 
                    Deshalb gibt es ein "Schritt für Schritt"-Aufnahmeverfahren.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {admissionSteps.map((step, index) => (
                      <div 
                        key={step.step} 
                        className="relative bg-cream rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-schule text-white flex items-center justify-center font-sans font-bold text-lg shrink-0">
                            {step.step}
                          </div>
                          <step.icon className="h-5 w-5 text-schule" />
                        </div>
                        <h4 className="font-sans font-bold text-charcoal mb-2">{step.title}</h4>
                        <p className="font-serif text-charcoal/70 text-sm">{step.description}</p>
                        
                        {index < admissionSteps.length - 1 && (
                          <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                            <ArrowRight className="h-5 w-5 text-schule/40" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-6 bg-schule/10 rounded-xl">
                    <p className="font-serif text-charcoal/80 text-center">
                      Damit Sie und Ihr Kind sich gut mit unserem Konzept vertraut machen können, 
                      die Schule richtig "von innen" kennen lernen und dann entscheiden können, 
                      ob die Schule für Sie passt. Auch wir können Sie im Zuge der Hospitationen gut kennenlernen.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-sans text-2xl text-charcoal">
                      Kontaktieren Sie uns
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-cream rounded-lg">
                      <Phone className="h-5 w-5 text-schule mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-sans font-semibold text-charcoal">Telefon</h4>
                        <a href="tel:+4318874053" className="font-serif text-charcoal/70 hover:text-schule transition-colors">
                          +43 1 887 40 53
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-cream rounded-lg">
                      <Mail className="h-5 w-5 text-schule mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-sans font-semibold text-charcoal">E-Mail</h4>
                        <a href="mailto:office@astrid-lindgren-zentrum.at" className="font-serif text-charcoal/70 hover:text-schule transition-colors">
                          office@astrid-lindgren-zentrum.at
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-cream rounded-lg">
                      <MapPin className="h-5 w-5 text-schule mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-sans font-semibold text-charcoal">Adresse</h4>
                        <p className="font-serif text-charcoal/70">
                          Breitenfurter Straße 401-413/1/R02<br />
                          1230 Wien
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-schule text-white border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-sans text-2xl">
                      Termin vereinbaren
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-serif text-white/90">
                      Vereinbaren Sie ein persönliches Gespräch oder eine Hospitation. 
                      Wir freuen uns darauf, Sie und Ihr Kind kennenzulernen!
                    </p>
                    <Button 
                      asChild 
                      className="w-full bg-white text-schule hover:bg-white/90 font-sans font-bold"
                    >
                      <Link href="/kontakt">
                        Jetzt Termin vereinbaren
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-schule">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-sans text-3xl font-bold text-white sm:text-4xl">
            Wir freuen uns auf Sie!
          </h2>
          <p className="mt-4 font-serif text-xl text-white/90 max-w-2xl mx-auto">
            Beginnen Sie jetzt den Weg zu einer ganzheitlichen Bildung für Ihr Kind.
            Kontaktieren Sie uns für ein Erstgespräch.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-schule hover:bg-white/90 font-sans font-bold"
            >
              <Link href="/kontakt">
                Kontakt aufnehmen
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 font-sans font-bold"
            >
              <Link href="/schule">
                Zurück zur Schule-Übersicht
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
