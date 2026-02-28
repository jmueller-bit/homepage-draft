'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone, Clock, Send, Train, Bus, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    content: 'Breitenfurter Straße 401-413/1/R02\n1230 Wien',
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: '+43 1 887 40 53',
  },
  {
    icon: Mail,
    title: 'E-Mail',
    content: 'office@astrid-lindgren-zentrum.at',
  },
  {
    icon: Clock,
    title: 'Öffnungszeiten',
    content: 'Mo-Fr: 08:00 - 17:00 Uhr',
  },
]

// Breitenfurter Straße 401-413, 1230 Wien (Liesing)
// Plus Code: 47QF+5J Wien
// Koordinaten: 48.140625, 16.285417
const MAP_COORDS = {
  lat: 48.140625,
  lng: 16.285417,
  bbox: '16.2830%2C48.1385%2C16.2880%2C48.1425',
  marker: '48.140625%2C16.285417',
}

export default function KontaktClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    betreff: '',
    nachricht: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Google Maps Embed URL
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2693.627123456789!2d16.285417!3d48.140625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d000000000000%3A0x0!2sBreitenfurter%20Stra%C3%9Fe%20401-413%2F1%2FR02%2C%201230%20Wien!5e0!3m2!1sde!2sat!4v1234567890000!5m2!1sde!2sat`
  const googleMapsUrl = 'https://maps.app.goo.gl/RjBZcY1Tx31joX1e8'

  return (
    <>
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Kontakt
          </h1>
          <p className="mt-4 font-serif text-xl text-cream/80 max-w-2xl">
            Wir freuen uns auf Ihre Nachricht
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-8">
                <h2 className="font-sans text-2xl font-bold text-charcoal">
                  Astrid Lindgren Zentrum
                </h2>
                <p className="mt-2 font-serif text-charcoal/70">
                  Verein für Pädagogik und Kultur
                </p>
                <p className="mt-1 font-serif text-sm text-charcoal/60">
                  ZVR: 960385266
                </p>
              </div>

              <h2 className="font-sans text-2xl font-bold text-charcoal">
                Kontaktinformationen
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {contactInfo.map((item) => (
                  <Card key={item.title} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-sans font-semibold text-charcoal">
                            {item.title}
                          </h3>
                          <p className="mt-1 font-serif text-sm text-charcoal/70 whitespace-pre-line">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12">
                <h2 className="font-sans text-2xl font-bold text-charcoal">
                  Anmeldung
                </h2>
                <p className="mt-4 font-serif text-charcoal/70">
                  Für die Anmeldung Ihres Kindes kontaktieren Sie uns bitte telefonisch 
                  oder per E-Mail. Wir vereinbaren dann einen persönlichen Termin 
                  für ein Kennenlerngespräch.
                </p>
                <p className="mt-4 font-serif text-charcoal/70">
                  Die Anmeldung für das nächste Schuljahr beginnt jeweils im Jänner.
                </p>
              </div>

              <div className="mt-12">
                <h2 className="font-sans text-2xl font-bold text-charcoal flex items-center gap-2">
                  <Train className="h-6 w-6 text-primary" />
                  So kommen Sie zu uns
                </h2>
                <div className="mt-6 space-y-4">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Train className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-sans font-semibold text-charcoal">
                            Öffentliche Verkehrsmittel
                          </h3>
                          <p className="mt-2 font-serif text-charcoal/70">
                            <strong>S-Bahn:</strong> Bahnhof Liesing<br />
                            <strong>Straßenbahn:</strong> Linie 60<br />
                            <strong>Bus:</strong> 60A, 253, 259, 354
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="font-serif text-sm text-amber-800">
                      <strong>Hinweis:</strong> Der Eingang befindet sich an der Breitenfurter Straße fast unter dem Aquädukt (an der Ecke), neben dem Städtischen Kindergarten.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="font-sans text-xl font-bold text-charcoal">
                    Nachricht senden
                  </h2>
                  
                  {isSubmitted ? (
                    <div className="mt-6 rounded-lg bg-green-50 p-6 text-center">
                      <p className="font-sans font-semibold text-green-800">
                        Vielen Dank!
                      </p>
                      <p className="mt-2 font-serif text-sm text-green-700">
                        Wir werden uns in Kürze bei Ihnen melden.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Neue Nachricht senden
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ihr Name"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-Mail *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="ihre@email.at"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="betreff">Betreff</Label>
                        <Input
                          id="betreff"
                          name="betreff"
                          value={formData.betreff}
                          onChange={handleChange}
                          placeholder="Anmeldung / Frage / ..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nachricht">Nachricht *</Label>
                        <Textarea
                          id="nachricht"
                          name="nachricht"
                          value={formData.nachricht}
                          onChange={handleChange}
                          placeholder="Ihre Nachricht an uns..."
                          required
                          className="mt-1 min-h-[150px]"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          'Wird gesendet...'
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Nachricht senden
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-sans text-2xl font-bold text-charcoal">
              So finden Sie uns
            </h2>
            <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title="Standortkarte - Astrid Lindgren Zentrum"
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-sans text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                In Google Maps öffnen
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
