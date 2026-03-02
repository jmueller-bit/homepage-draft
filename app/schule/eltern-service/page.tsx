import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SchoolSubnav } from '@/components/school-subnav'
import { FileText, Download, FolderOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Eltern-Service',
  description: 'Wichtige Informationen und Dokumente für Eltern am Astrid Lindgren Zentrum. Hier finden Sie alle relevanten Formulare und Unterlagen zum Download.',
}

export default function ElternServicePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Eltern-Service
          </h1>
          <p className="mt-4 font-serif text-xl text-cream/80 max-w-2xl">
            Wichtige Informationen und Dokumente für Eltern
          </p>
        </div>
      </section>

      <SchoolSubnav />

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Card */}
            <Card className="bg-white border-none shadow-lg lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-sans text-2xl text-charcoal flex items-center gap-2">
                  <FolderOpen className="h-6 w-6 text-secondary" />
                  Dokumenten-Ordner
                </CardTitle>
              </CardHeader>
              <CardContent className="font-serif text-charcoal/80 space-y-4">
                <p>
                  Hier finden Sie alle wichtigen Dokumente und Formulare für das Schuljahr. 
                  Die Dateien werden regelmäßig aktualisiert.
                </p>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <p className="font-semibold text-secondary mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Hinweis:
                  </p>
                  <p className="text-sm">
                    Klicken Sie auf eine Datei, um sie herunterzuladen oder anzusehen. 
                    Für den Download benötigen Sie keine Google-Anmeldung.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Google Drive Embed */}
            <Card className="bg-white border-none shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-sans text-2xl text-charcoal flex items-center gap-2">
                  <Download className="h-6 w-6 text-secondary" />
                  Alle Dokumente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-cream rounded-lg overflow-hidden border border-charcoal/10">
                  <iframe
                    src="https://drive.google.com/embeddedfolderview?id=1nhQtCRS9mCaVTaD9kg6zXjoBv3UlllpH#list"
                    className="w-full h-[600px] border-0"
                    title="Eltern-Service Dokumente"
                    allow="autoplay"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}
