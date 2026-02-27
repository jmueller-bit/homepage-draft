# ALZ Homepage Sitemap & Seiten-Status

## Übersicht: Vorhandene vs. Fehlende Seiten

```
┌─────────────────────────────────────────────────────────────┐
│                    VORHANDENE SEITEN                         │
│                        ✅ (16 Seiten)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🏠 Öffentliche Seiten:                                      │
│  ├── ✅ /                    Startseite                      │
│  ├── ✅ /ueber-uns           Über uns + Team                 │
│  ├── ✅ /schule              Schule Übersicht                │
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
│                        ❌ (12 Seiten)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🔴 KRITISCH (Priorität 1):                                  │
│  ├── ❌ /anmeldung           Anmeldung neue Schüler          │
│  ├── ❌ /termine             Schuljahreskalender            │
│  └── ❌ /schulordnung        Schulordnung & Regeln          │
│                                                              │
│  🟡 WICHTIG (Priorität 2):                                   │
│  ├── ❌ /eltern              Elternbereich                  │
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
| Schule | ✅ | ❌ | ✅ | ✅ | - |
| News | ✅ | ✅ | ✅ | ✅ | - |
| Galerie | ✅ | ✅ | ✅ | ✅ | - |
| Fördern | ✅ | ❌ | ✅ | ✅ | - |
| Karriere | ✅ | ✅ Jobs | ✅ | ✅ | - |
| Kontakt | ✅ | ❌ | ✅ | ✅ | - |
| Impressum | ✅ | ❌ | ✅ | ✅ | - |
| Datenschutz | ✅ | ❌ | ✅ | ✅ | - |
| Anmeldung | ❌ | ❌ | ❌ | ❌ | 🔴 P1 |
| Termine | ❌ | ❌ | ❌ | ❌ | 🔴 P1 |
| Schulordnung | ❌ | ❌ | ❌ | ❌ | 🔴 P1 |
| Eltern | ❌ | ❌ | ❌ | ❌ | 🟡 P2 |
| Downloads | ❌ | ❌ | ❌ | ❌ | 🟡 P2 |
| Kosten | ❌ | ❌ | ❌ | ❌ | 🟡 P2 |
| Schulweg | ❌ | ❌ | ❌ | ❌ | 🟡 P2 |

## Navigation Struktur

```
Hauptnavigation:
├─ Startseite
├─ Über uns
│  └─ Teammitglieder (Detailseiten)
├─ Schule
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
1. `/anmeldung` - Formular + Informationen
2. `/termine` - Kalender-Übersicht
3. `/schulordnung` - PDF-Downloads

### Phase 2: Wichtige Seiten (Woche 2)
4. `/downloads` - Download-Center
5. `/eltern` - Elternportal
6. `/kosten` - Preisübersicht
7. `/schulweg` - Anfahrt

### Phase 3: Optionale Erweiterungen (Woche 3-4)
8. `/geschichte` - Schulgeschichte
9. `/presse` - Pressebereich
10. `/partner` - Partnerschaften
11. Weitere nach Bedarf

## Technische Quick-Wins

- [ ] Sitemap automatisch generieren
- [ ] Cookie-Banner hinzufügen
- [ ] 404-Seite designen
- [ ] Lade-Animationen
- [ ] Scroll-to-Top Button

## Content-Plan

### Sofort erledigen:
- [ ] Test-News in Contentful eintragen
- [ ] Team-Mitglieder anlegen
- [ ] Galerie-Bilder hochladen
- [ ] Stellenanzeige erstellen (falls vorhanden)

### Inhaltlich vorbereiten:
- [ ] Anmeldeformular PDF
- [ ] Schulordnung PDF
- [ ] Schuljahreskalender
- [ ] Flyer/Broschüren
- [ ] Team-Fotos

## Zusammenfassung

**Aktueller Stand:**
- ✅ 16 Seiten implementiert
- ✅ Contentful-Integration aktiv
- ✅ Responsive Design
- ✅ Moderne Technologie (Next.js 14)

**Fehlt noch:**
- ❌ 12 Seiten (davon 3 kritisch)
- ❌ Echter Content in Contentful
- ❌ SEO-Feinjustierung
- ❌ Performance-Optimierung

**Geschätzter Aufwand für fehlende Seiten:**
- Phase 1 (Kritisch): ~2-3 Tage
- Phase 2 (Wichtig): ~3-4 Tage  
- Phase 3 (Optional): ~5-7 Tage
- **Gesamt: ~10-14 Tage**
