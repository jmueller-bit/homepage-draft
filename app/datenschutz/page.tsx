import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung des Astrid Lindgren Zentrums.',
}

export default function DatenschutzPage() {
  return (
    <>
      <section className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-extrabold text-cream sm:text-5xl">
            Datenschutz
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none font-serif text-charcoal/80">
            <h2 className="font-sans text-2xl font-bold text-charcoal">Datenschutzerklärung</h2>
            
            <p>
              Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz 
              Ihrer personenbezogenen Daten ist uns ein wichtiges Anliegen. 
              Im Folgenden informieren wir Sie über die Erhebung, Verarbeitung 
              und Nutzung Ihrer Daten gemäß der Datenschutz-Grundverordnung (DSGVO) 
              und dem österreichischen Datenschutzgesetz (DSG).
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">1. Verantwortlicher</h3>
            <p>
              Astrid Lindgren Zentrum – Verein für Pädagogik und Kultur<br />
              Breitenfurter Straße 401-413/1/R02<br />
              1230 Wien<br />
              E-Mail: office@astrid-lindgren-zentrum.at
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">2. Datenschutzbeauftragter</h3>
            <p>
              Unser Datenschutzbeauftragter ist unter folgender Adresse erreichbar:<br />
              E-Mail: datenschutz@astrid-lindgren-zentrum.at
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">3. Erhebung und Verarbeitung personenbezogener Daten</h3>
            <p>
              <strong>a) Besuch der Website</strong><br />
              Bei Ihrem Besuch unserer Website werden automatisch folgende Daten 
              erhoben: IP-Adresse, Datum und Uhrzeit der Anfrage, Zeitzonendifferenz 
              zur Greenwich Mean Time (GMT), Inhalt der Anforderung (konkrete Seite), 
              Zugriffsstatus/HTTP-Statuscode, übertragene Datenmenge, Website, von 
              der die Anforderung kommt, Browser, Betriebssystem und dessen Oberfläche, 
              Sprache und Version der Browsersoftware.
            </p>
            <p>
              <strong>b) Kontaktformular</strong><br />
              Wenn Sie uns über das Kontaktformular kontaktieren, werden folgende 
              Daten erhoben: Name, E-Mail-Adresse, Betreff und Nachricht. Diese 
              Daten werden ausschließlich zur Beantwortung Ihrer Anfrage verwendet.
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">4. Zweck der Datenverarbeitung</h3>
            <p>Die erhobenen Daten werden für folgende Zwecke verwendet:</p>
            <ul>
              <li>Bereitstellung unserer Website</li>
              <li>Verbesserung unseres Internetauftritts</li>
              <li>Beantwortung von Kontaktanfragen</li>
              <li>Verwaltung von Schüleranmeldungen</li>
              <li>Kommunikation mit Eltern und Erziehungsberechtigten</li>
            </ul>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">5. Rechtsgrundlage der Verarbeitung</h3>
            <p>Die Verarbeitung Ihrer Daten erfolgt auf Grundlage folgender Rechtsgrundlagen:</p>
            <ul>
              <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
              <li>Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</li>
              <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</li>
            </ul>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">6. Cookies</h3>
            <p>
              Unsere Website verwendet Cookies. Das sind kleine Textdateien, die 
              auf Ihrem Endgerät gespeichert werden und die Ihren Browser 
              speichern. Cookies richten auf Ihrem Endgerät keinen Schaden an 
              und enthalten keine Viren, Trojaner oder sonstige Schadsoftware.
            </p>
            <p>
              Sie können die Speicherung von Cookies durch eine entsprechende 
              Einstellung Ihrer Browser-Software verhindern; wir weisen jedoch 
              darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche 
              Funktionen dieser Website vollumfänglich werden nutzen können.
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">7. Google Fonts</h3>
            <p>
              Diese Website nutzt Google Fonts zur Darstellung von Schriftarten. 
              Die Fonts werden lokal gehostet, um eine datenschutzkonforme Nutzung 
              zu gewährleisten. Es erfolgt keine Übertragung von Daten an Google.
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">8. Ihre Rechte</h3>
            <p>Sie haben folgende Rechte:</p>
            <ul>
              <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an unseren 
              Datenschutzbeauftragten.
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">9. Beschwerderecht</h3>
            <p>
              Sie haben das Recht, eine Beschwerde bei der österreichischen 
              Datenschutzbehörde einzureichen:<br />
              <strong>Österreichische Datenschutzbehörde</strong><br />
              Barichgasse 40-42<br />
              1030 Wien<br />
              E-Mail: dsb@dsb.gv.at
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">10. Speicherdauer</h3>
            <p>
              Ihre personenbezogenen Daten werden nur so lange gespeichert, 
              wie dies für die Erfüllung der genannten Zwecke erforderlich 
              ist oder gesetzliche Aufbewahrungsfristen eine längere Speicherung 
              vorsehen.
            </p>

            <h3 className="font-sans text-xl font-bold text-charcoal mt-8">11. Änderungen dieser Datenschutzerklärung</h3>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf 
              anzupassen, um sie aktuell zu halten und gesetzlichen Anforderungen 
              gerecht zu werden.
            </p>

            <p className="mt-8">
              Stand: {new Date().toLocaleDateString('de-AT', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
