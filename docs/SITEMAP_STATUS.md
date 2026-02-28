# ALZ Homepage Sitemap & Seiten-Status

## Übersicht: Vorhandene vs. Fehlende Seiten

```
┌─────────────────────────────────────────────────────────────┐
│                    VORHANDENE SEITEN                         │
│                        ✅ (17 Seiten)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🏠 Öffentliche Seiten:                                      │
│  ├── ✅ /                    Startseite                      │
│  ├── ✅ /ueber-uns           Über uns + Team                 │
│  ├── ✅ /schule              Schule Übersicht + Anmeldung    │
│  ├── ✅ /news                News Übersicht + Detail         │
│  ├── ✅ /galerie             Galerie                        │
│  ├── ✅ /foerdern            Fördern & Spenden              │
│  ├── ✅ /karriere            Karriere + Stellen             │
│  ├── ✅ /kontakt             Kontakt                        │
│  ├── ✅ /impressum           Impressum                      │
│  └── ✅ /datenschutz         Datenschutz                    │
│                                                              │
│  🔐 Admin Bereich:                                           │
│  ├── ✅ /admin               Admin Dashboard                │
│  ├── ✅ /admin/dashboard     Dashboard                      │
│  ├── ✅ /admin/galerie       Gallery Management             │
│  └── ✅ /admin/news          News Management                │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    FEHLENDE SEITEN                           │
│                        ❌ (11 Seiten)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🔴 KRITISCH (Priorität 1):                                  │
│  ├── ❌ /termine             Schuljahreskalender            │
│  ├── ❌ /schulordnung        Schulordnung & Regeln          │
│  └── ❌ /eltern              Elternbereich                  │
│                                                              │
│  🟡 WICHTIG (Priorität 2):                                   │
│  ├── ❌ /downloads           Download-Center                │
│  ├── ❌ /kosten              Schulgeld & Kosten             │
│  └── ❌ /schulweg            Anfahrt & Lageplan             │
│                                                              │
│  🟢 OPTIONAL (Priorität 3):                                  │
│  ├── ❌ /geschichte          Detaillierte Geschichte        │
│  ├── ❌ /presse              Pressebereich                  │
│  ├── ❌ /partner             Kooperationspartner            │
│  ├── ❌ /mitarbeiten         Ehrenamt/Verein                │
│  └── ❌ /blog                Blog/Erfahrungsberichte        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Seiten-Status Matrix

| Seite | Status | Contentful | SEO | Mobile | Priorität |
|-------|--------|------------|-----|--------|-----------|
| Startseite | ✅ | ❌ | ✅ | ✅ | - |
| Über uns | ✅ | ✅ Team | ✅ | ✅ | - |
| Schule | ✅ | ✅ Anmeldung | ✅ | ✅ | - |
| News | ✅ | ✅ | ✅ | ✅ | - |
| Galerie | ✅ | ✅ | ✅ | ✅ | - |
| Fördern | ✅ | ❌ | ✅ | ✅ | - |
| Karriere | ✅ | ✅ Jobs | ✅ | ✅ | - |
| Kontakt | ✅ | ❌ | ✅ | ✅ | - |
| Impressum | ✅ | ❌ | ✅ | ✅ | - |
| Datenschutz | ✅ | ❌ | ✅ | ✅ | - |
| Termine | ❌ | ❌ | ❌ | ❌ | 🔴 P1 |
| Schulordnung | ❌ | ❌ | ❌ | ❌ | 🔴 P1 |
| Eltern | ❌ | ❌ | ❌ | ❌ | 🔴 P1 |
| Downloads | ❌ | ❌ | ❌ | ❌ | 🟡 P2 |
| Kosten | ❌ | ❌ | ❌ | ❌ | 🟡 P2 |
| Schulweg | ❌ | ❌ | ❌ | ❌ | 🟡 P2 |

## Navigation Struktur

```
Hauptnavigation:
├─ Startseite
├─ Über uns (Dropdown)
│  ├─ Übersicht
│  ├─ Pädagogisches Konzept
│  ├─ Philosophie
│  └─ Unser Team
│     └─ Teammitglieder (Detailseiten)
├─ Schule (Dropdown)
│  ├─ Übersicht
│  └─ Anmeldung
├─ News
│  └─ News-Artikel (Detailseiten)
├─ Galerie
├─ Fördern
├─ Karriere
│  └─ Stellenanzeigen (Detailseiten)
└─ Kontakt

Footer:
├─ Impressum
├─ Datenschutz
└─ Admin (versteckt)
```

## Contentful Integration Status

| Content-Typ | Felder | Daten vorhanden | Status |
|------------|--------|-----------------|---------|
| newsArtikel | 8 | ⏳ Wartend | ✅ Bereit |
| galleryImage | 8 | ⏳ Wartend | ✅ Bereit |
| teamMitglied | 6 | ⏳ Wartend | ✅ Bereit |
| stellenanzeige | 9 | ⏳ Wartend | ✅ Bereit |

## Empfohlene Implementierungs-Reihenfolge

### Phase 1: Kritische Seiten (Woche 1)
1. `/termine` - Kalender-Übersicht
2. `/schulordnung` - PDF-Downloads
3. `/eltern` - Elternportal

### Phase 2: Wichtige Seiten (Woche 2)
4. `/downloads` - Download-Center
5. `/kosten` - Preisübersicht
6. `/schulweg` - Anfahrt

### Phase 3: Optionale Erweiterungen (Woche 3-4)
7. `/geschichte` - Schulgeschichte
8. `/presse` - Pressebereich
9. `/partner` - Partnerschaften
10. Weitere nach Bedarf

## Technische Quick-Wins

- [ ] Sitemap automatisch generieren
- [x] Cookie-Banner hinzufügen
- [x] 404-Seite designen
- [ ] Lade-Animationen
- [x] Scroll-to-Top Button
- [x] Dropdown-Menüs implementiert

## Content-Plan

### Sofort erledigen:
- [ ] Test-News in Contentful eintragen
- [ ] Team-Mitglieder anlegen
- [ ] Galerie-Bilder hochladen
- [ ] Stellenanzeige erstellen (falls vorhanden)

### Inhaltlich vorbereiten:
- [x] Anmeldeformular PDF
- [ ] Schulordnung PDF
- [ ] Schuljahreskalender
- [ ] Flyer/Broschüren
- [ ] Team-Fotos

## Zusammenfassung

**Aktueller Stand:**
- ✅ 17 Seiten implementiert
- ✅ Dropdown-Menüs für Über uns & Schule
- ✅ Contentful-Integration aktiv
- ✅ Responsive Design
- ✅ Moderne Technologie (Next.js 14)

**Fehlt noch:**
- ❌ 11 Seiten (davon 3 kritisch)
- ❌ Echter Content in Contentful
- ❌ SEO-Feinjustierung
- ❌ Performance-Optimierung

**Geschätzter Aufwand für fehlende Seiten:**
- Phase 1 (Kritisch): ~2-3 Tage
- Phase 2 (Wichtig): ~2-3 Tage  
- Phase 3 (Optional): ~5-7 Tage
- **Gesamt: ~9-13 Tage**
