import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { getTeamMemberById, getTeamMembers } from '@/lib/contentful'
import { notFound } from 'next/navigation'
import { renderRichText } from '@/components/rich-text-renderer'
import { UeberUnsSubnav } from '@/components/ueber-uns-subnav'

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const members = await getTeamMembers()
  return members.map((member) => ({
    id: member.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const member = await getTeamMemberById(id)
  
  if (!member) {
    return {
      title: 'Teammitglied nicht gefunden',
    }
  }
  
  return {
    title: `${member.name} - ${member.role}`,
    description: member.bio || `Lernen Sie ${member.name} kennen - ${member.role} am Astrid Lindgren Zentrum`,
  }
}

export default async function TeamMemberPage({ params }: Props) {
  const { id } = await params
  const member = await getTeamMemberById(id)
  
  if (!member) {
    notFound()
  }

  return (
    <>
      <div className="pt-20">
        <UeberUnsSubnav showBackToTeam={true} />
      </div>

      {/* Hero Section */}
      <section className="bg-cream pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start">
            {/* Photo */}
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 overflow-hidden rounded-2xl shadow-xl">
              {member.photo ? (
                <Image
                  src={member.photo.url}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                  <span className="font-sans text-6xl font-bold">{member.name.charAt(0)}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:pt-8">
              <h1 className="font-sans text-4xl font-bold text-charcoal sm:text-5xl">
                {member.name}
              </h1>
              <p className="mt-2 font-sans text-xl font-semibold text-primary">
                {member.role}
              </p>
              
              {(member.bioRichText || member.bio) && (
                <div className="mt-8">
                  <h2 className="font-sans text-lg font-bold text-charcoal mb-4">
                    Über mich
                  </h2>
                  <div className="font-serif text-lg text-charcoal/70 leading-relaxed">
                    {member.bioRichText ? (
                      renderRichText(member.bioRichText)
                    ) : (
                      <div className="whitespace-pre-wrap">{member.bio}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Contact placeholder - can be extended with actual contact data */}
              <div className="mt-8 pt-8 border-t border-charcoal/10">
                <h2 className="font-sans text-lg font-bold text-charcoal mb-4">
                  Kontakt
                </h2>
                <div className="space-y-3">
                  <a 
                    href="/kontakt"
                    className="inline-flex items-center gap-2 font-sans text-primary hover:text-primary/80 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    Nachricht senden
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Team Members */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-2xl font-bold text-charcoal mb-8">
            Weitere Teammitglieder
          </h2>
          <Link 
            href="/ueber-uns"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-sans font-bold text-cream transition-all hover:bg-primary/90 hover:scale-105"
          >
            Ganzes Team ansehen
          </Link>
        </div>
      </section>
    </>
  )
}