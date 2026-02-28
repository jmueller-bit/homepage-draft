import type { Metadata } from 'next'
import KontaktClient from './kontakt-client'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktieren Sie das Astrid Lindgren Zentrum für Fragen zur Anmeldung oder Schulbetrieb.',
  alternates: {
    canonical: 'https://alz5.thesolution.at/kontakt',
  },
}

export default function KontaktPage() {
  return <KontaktClient />
}
