# ALZ Homepage - Struktur & Status Dokumentation

## Aktuelle Projektstruktur

```
app/
├── page.tsx                          # Startseite ✓
├── layout.tsx                        # Hauptlayout ✓
├── globals.css                       # Global Styles ✓
│
├── api/                              # API Routes
│   └── admin/
│       ├── gallery/route.ts          # Admin Gallery API ✓
│       └── news/route.ts             # Admin News API ✓
│
├── admin/                            # Admin-Bereich
│   ├── page.tsx                      # Admin Dashboard ✓
│   ├── dashboard/
│   │   └── page.tsx                  # Dashboard Übersicht ✓
│   ├── galerie/
│   │   └── page.tsx                  # Gallery Management ✓
│   └── news/
│       ├── page.tsx                  # News Übersicht ✓
│       └── new/
│           └── page.tsx              # Neue News erstellen ✓
│
├── datenschutz/
│   └── page.tsx                      # Datenschutzerklärung ✓
│
├── foerdern/
│   └── page.tsx                      # Fördern & Spenden ✓
│
├── galerie/
│   ├── page.tsx                      # Galerie Übersicht ✓
│   └── galerie-client.tsx            # Galerie Client-Komponente ✓
│
├── impressum/
│   └── page.tsx                      # Impressum ✓
│
├── karriere/
│   ├── page.tsx                      # Karriere Übersicht ✓
│   └── [id]/
│       └── page.tsx                  # Stellen-Detailseite ✓
│
├── kontakt/
│   ├── page.tsx                      # Kontakt ✓
│   └── kontakt-client.tsx            # Kontakt Formular ✓
│
├── news/
│   ├── page.tsx                      # News Übersicht ✓
│   └── [slug]/
│       └── page.tsx                  # News Detailseite ✓
│
├── schule/
│   └── page.tsx                      # Schule Übersicht ✓
│
└── ueber-uns/
    ├── page.tsx                      # Über uns ✓
    └── team/
        └── [id]/
            └── page.tsx              # Teammitglied Detail ✓
```

## Komponenten Struktur

```
components/
├── ui/                               # shadcn/ui Komponenten
│   ├── alert.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── select.tsx
│   ├── skeleton.tsx
│   ├── sonner.tsx
│   ├── table.tsx
│   ├── tabs.tsx
│   └── textarea.tsx
│
├── admin-nav.tsx                     # Admin Navigation ✓
├── footer.tsx                        # Footer ✓
├── home-page.tsx                     # Startseite Komponenten ✓
├── navbar.tsx                        # Hauptnavigation ✓
└── ui-provider.tsx                   # UI Provider ✓
```

## Lib / Utilities

```
lib/
├── contentful.ts                     # Contentful Integration ✓
└── utils.ts                          # Utility Funktionen ✓
```

## Navigation (Navbar)

```
Startseite → /
Über uns → /ueber-uns
Schule → /schule
News → /news
Galerie → /galerie
Fördern → /foerdern
Karriere → /karriere
Kontakt → /kontakt
```

## Contentful Content-Typen

| Content-Typ | Beschreibung | Status |
|------------|--------------|---------|
| `newsArtikel` | News/Artikel | ✓ Implementiert |
| `galleryImage` | Galerie Bilder | ✓ Implementiert |
| `teamMitglied` | Team Mitglieder | ✓ Implementiert |
| `stellenanzeige` | Job Listings | ✓ Implementiert |

## Fehlende Seiten (Vergleich mit typischer Schul-Website)

### 🔴 Kritisch (Sollte priorisiert werden)

1. **/anmeldung** - Anmeldeinformationen für neue Schüler
   - Anmeldeformular
   - Aufnahmekriterien
   - Termine
   - Benötigte Unterlagen

2. **/termine** - Schuljahreskalender
   - Schulferien
   - Veranstaltungen
   - Elternabende
   - Projektwochen

3. **/schulordnung** - Regeln und Richtlinien
   - Hausordnung
   - Schulordnung PDF
   - Verhaltensregeln

### 🟡 Wichtig (Erweitert die Funktionalität)

4. **/eltern** - Elternbereich
   - Elternvertretung
   - Termine
   - Wichtige Informationen
   - Download-Bereich

5. **/downloads** - Download-Center
   - Anmeldeformulare
   - Schulordnung
   - Informationsblätter
   - Flyer

6. **/kosten** - Schulgeld und Kosten
   - Schulgeld-Informationen
   - Zahlungsmodalitäten
   - Fördermöglichkeiten

7. **/schulweg** - Anfahrt und Lageplan
   - Öffentliche Verkehrsmittel
   - Parkmöglichkeiten
   - Lageplan

### 🟢 Optional (Nice-to-have)

8. **/geschichte** - Detaillierte Schulgeschichte
   - Zeitstrahl
   - Meilensteine
   - Archivfotos

9. **/presse** - Pressebereich
   - Pressemitteilungen
   - Medienkit
   - Logos

10. **/partner** - Kooperationspartner
    - Partnerunternehmen
    - Schulen im Ausland
    - Bildungseinrichtungen

11. **/mitarbeiten** - Ehrenamt/Verein
    - Vereinsinformationen
    - Mitgliedschaft
    - Ehrenamtliche Tätigkeiten

12. **/blog** - Blog/Erfahrungsberichte
    - Schülerberichte
    - Lehrer-Interviews
    - Projektberichte

## Technische TODOs

### Bugs/Issues
- [ ] `contentful-management` Modul fehlt (Build-Fehler)
- [ ] Admin-Panel Login implementieren
- [ ] Bild-Upload für Gallery optimieren

### Performance
- [ ] Bilder optimieren (WebP Format)
- [ ] Lazy Loading für Bilder
- [ ] ISR für statische Seiten

### SEO
- [ ] Sitemap.xml automatisch generieren
- [ ] Robots.txt erweitern
- [ ] Meta-Tags für alle Seiten
- [ ] Open Graph Bilder

### Accessibility
- [ ] ARIA-Labels prüfen
- [ ] Kontrast-Verhältnisse
- [ ] Tastatur-Navigation
- [ ] Screenreader-Test

### DSGVO
- [ ] Cookie-Banner implementieren
- [ ] Datenschutz-Seite erweitern
- [ ] Impressum überprüfen
- [ ] Einwilligungs-Management

## Empfohlene Reihenfolge für fehlende Seiten

1. **/anmeldung** - Wichtig für Neuanmeldungen
2. **/termine** - Oft nachgefragt
3. **/downloads** - Praktisch für Dokumente
4. **/schulordnung** - Rechtlich relevant
5. **/eltern** - Elternbindung
6. **/kosten** - Transparenz
7. **/schulweg** - Praktische Info

## Content-Management Checkliste

- [ ] News-Beiträge aktuell halten
- [ ] Team-Mitglieder aktualisieren
- [ ] Galerie regelmäßig erweitern
- [ ] Stellenanzeigen pflegen
- [ ] Termine/Events eintragen
- [ ] Downloads aktualisieren

## Notizen

**Letzte Aktualisierung:** $(date +%Y-%m-%d)

**Nächste Schritte:**
1. Fehlende Seiten nach Priorität implementieren
2. Contentful mit echten Inhalten füllen
3. SEO-Optimierung durchführen
4. Testing (Mobil, Desktop, verschiedene Browser)
5. Soft-Launch mit Beta-Testern

**Contentful Space ID:** `$(grep CONTENTFUL_SPACE_ID .env.local 2>/dev/null || echo "Nicht gesetzt")`
