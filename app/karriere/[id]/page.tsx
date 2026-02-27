import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, Briefcase, CheckCircle, Mail } from 'lucide-react'
import { getJobById, getJobListings } from '@/lib/contentful'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const jobs = await getJobListings()
  return jobs.map((job) => ({
    id: job.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const job = await getJobById(id)
  
  if (!job) {
    return {
      title: 'Stellenanzeige nicht gefunden',
    }
  }
  
  return {
    title: `${job.title} - Karriere`,
    description: job.description || `Bewerben Sie sich als ${job.title} am Astrid Lindgren Zentrum`,
  }
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params
  const job = await getJobById(id)
  
  if (!job) {
    notFound()
  }

  return (
    <>
      {/* Back Button */}
      <div className="bg-cream pt-24 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link 
            href="/karriere"
            className="inline-flex items-center gap-2 font-sans font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Zurück zu den Stellenanzeigen
          </Link>
        </div>
      </div>

      {/* Job Header */}
      <section className="bg-cream pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-bold text-charcoal sm:text-5xl">
            {job.title}
          </h1>
          
          <div className="mt-4 flex flex-wrap items-center gap-4 text-charcoal/70">
            {job.department && (
              <span className="flex items-center gap-1">
                <Briefcase className="h-5 w-5" />
                {job.department}
              </span>
            )}
            {job.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-5 w-5" />
                {job.location}
              </span>
            )}
            {job.type && (
              <span className="flex items-center gap-1">
                <Clock className="h-5 w-5" />
                {job.type}
              </span>
            )}
          </div>

          {job.description && (
            <div className="mt-8">
              <h2 className="font-sans text-xl font-bold text-charcoal mb-4">
                Über die Position
              </h2>
              <div className="font-serif text-lg text-charcoal/70 whitespace-pre-wrap leading-relaxed">
                {job.description}
              </div>
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div className="mt-8">
              <h2 className="font-sans text-xl font-bold text-charcoal mb-4">
                Anforderungen
              </h2>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 font-serif text-charcoal/70">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <div className="mt-8">
              <h2 className="font-sans text-xl font-bold text-charcoal mb-4">
                Was wir bieten
              </h2>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 font-serif text-charcoal/70">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply Button */}
          <div className="mt-12 pt-8 border-t border-charcoal/10">
            <h2 className="font-sans text-xl font-bold text-charcoal mb-4">
              Interessiert?
            </h2>
            <p className="font-serif text-charcoal/70 mb-6">
              Wir freuen uns auf Ihre Bewerbung! Senden Sie uns Ihre Unterlagen zu.
            </p>
            <Link 
              href={`/kontakt?subject=Bewerbung: ${encodeURIComponent(job.title)}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-sans font-bold text-cream transition-all hover:bg-primary/90 hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              Jetzt bewerben
            </Link>
            {job.contactEmail && (
              <p className="mt-4 text-sm text-charcoal/60">
                oder direkt an: {job.contactEmail}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}