# Contentful Integration Dokumentation

## Übersicht der Content-Typen

Diese Dokumentation beschreibt alle Content-Typen, die in der ALZ-Website verwendet werden, sowie deren Feldstrukturen und Verwendungszwecke.

---

## 📰 News-Artikel (`newsArtikel`)

Für Blog-Posts, Neuigkeiten und Pressemitteilungen.

### Felder:

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `titel` | Text | ✅ | Überschrift des Artikels |
| `slug` | Text | ✅ | URL-freundlicher Name (z.B. "sommerfest-2024") |
| `vorschautext` | Text | ✅ | Kurze Zusammenfassung für Listen |
| `datum` | Datum | ✅ | Veröffentlichungsdatum |
| `inhalt` | RichText | ❌ | Hauptinhalt mit Formatierung |
| `kategorie` | Text | ❌ | Kategorie (z.B. "Veranstaltungen", "Allgemein") |
| `titelbild` | Asset (Bild) | ❌ | Hauptbild des Artikels |
| `autor` | Text | ❌ | Name des Autors |

### RichText-Unterstützung:
- ✅ Überschriften (H1-H6)
- ✅ Absätze
- ✅ Listen (nummeriert/unnummeriert)
- ✅ Fett, kursiv, unterstrichen
- ✅ Links
- ✅ Tabellen
- ✅ Zitate

---

## 👥 Team-Mitglieder (`teamMitglied`)

Für Lehrer, Mitarbeiter und Vorstandsmitglieder.

### Felder:

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `name` | Text | ✅ | Vollständiger Name |
| `funktion` | Text | ✅ | Rolle/Position (z.B. "Klassenlehrer", "Schulleitung") |
| `beschreibung` | RichText | ❌ | Biografie mit Formatierung |
| `foto` | Asset (Bild) | ❌ | Portrait-Foto |
| `reihenfolge` | Zahl | ❌ | Sortierreihenfolge (0, 1, 2...) |

### RichText-Unterstützung:
- ✅ Alle Formatierungen wie bei News
- H1 wird als Hauptüberschrift in der Biografie gerendert
- Listen für Aufzählungen

**Beispiel-Inhalt:**
```
H1: Bist du ein Kopf- oder ein Gefühlsmensch?
Text: Ich bin... [Beschreibung]
Liste:
- Punkt 1
- Punkt 2
```

---

## 💼 Stellenanzeigen (`stellen`)

Für Job-Ausschreibungen und offene Positionen.

### Felder:

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `position` | Text | ✅ | Job-Titel (z.B. "ZivilDiener", "Lehrer") |
| `beschreibungKurz` | Text | ✅ | Kurze Zusammenfassung |
| `beschreibungLang` | RichText | ❌ | Detaillierte Stellenbeschreibung |
| `medien` | Asset (Bild/Dokument) | ❌ | Zusätzliche Dateien |

### RichText-Unterstützung:
- ✅ Alle Formatierungen
- Besonders nützlich für:
  - Aufgabenbeschreibungen (Listen)
  - Anforderungen (H2 + Listen)
  - Benefits (H2 + Listen)

---

## 🖼️ Galerie-Bilder (`galleryImage`)

Für die Bildergalerie auf der Website.

### Felder:

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `titel` | Text | ✅ | Bildtitel |
| `bild` | Asset Array (Mehrere Bilder) | ✅ | Bilder (können mehrere sein!) |
| `kategorie` | Text | ❌ | Kategorie für Filter |
| `reihenfolge` | Zahl | ❌ | Sortierreihenfolge |

### Besonderheit:
**Ein Eintrag kann MEHRERE Bilder enthalten!**
- Jedes Bild im Array wird als eigenes Bild in der Galerie angezeigt
- Titel wird automatisch mit Nummerierung (z.B. "Sommerfest (1/5)")
- Perfekt für Event-Dokumentationen

**Kategorien für Galerie:**
- `unterricht` - Unterrichts-Bilder
- `events` - Veranstaltungen
- `sport` - Sport-Aktivitäten

---

## 🎓 Schule-Allgemein (`schuleAllgemein`)

Für Alltagsbilder aus dem Schulbetrieb.

### Felder:

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `titel` | Text | ✅ | Eintrag-Titel |
| `bild` | Asset Array | ✅ | Bilder |
| `kategorie` | Text | ❌ | Empfohlen: "unterricht" |
| `reihenfolge` | Zahl | ❌ | Sortierung |

### Verwendung:
- Bilder für "Ein Blick in unseren Alltag" auf der Homepage
- Filterbar nach Kategorien

---

## 🎉 Schule-Events (`schuleEvent`)

Für Veranstaltungsbilder (Sommerfest, Weihnachtsfeier, etc.).

### Felder:

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `titel` | Text | ✅ | Event-Name |
| `bild` | Asset Array | ✅ | Event-Bilder |
| `kategorie` | Text | ❌ | Empfohlen: "events" |
| `reihenfolge` | Zahl | ❌ | Sortierung |

### Verwendung:
- Getrennt von Alltagsbildern für bessere Organisation
- Filter "Veranstaltungen" in der Galerie

---

## 📝 RichText Formatierung - Wichtige Hinweise

### Unterstützte Formatierungen:

| Format | Contentful | Website-Darstellung |
|--------|-----------|---------------------|
| **H1** | Überschrift 1 | Große Überschrift (text-3xl) |
| **H2** | Überschrift 2 | Mittlere Überschrift (text-2xl) |
| **H3** | Überschrift 3 | Kleine Überschrift (text-xl) |
| **H4-H6** | Überschrift 4-6 | Text-base mit Fett |
| **Absatz** | Normaler Text | Mit Abstand (mb-4) |
| **Liste** | Aufzählung | Mit Bulletpoints/Nummern |
| **Fett** | Fett | `<strong>` |
| **Kursiv** | Kursiv | `<em>` |
| **Link** | Link | Blau, unterstrichen, öffnet in neuem Tab |
| **Tabelle** | Tabelle | Mit Rahmen und Zellen |
| **Zitat** | Angebot | Linker Rand, kursiv |

### Tipps für RichText:

1. **Überschriften-Hierarchie beachten:**
   - H1 = Hauptthema (nur eine pro Text)
   - H2 = Abschnitte
   - H3 = Unterabschnitte

2. **Listen für bessere Lesbarkeit:**
   - Aufgaben
   - Anforderungen
   - Benefits
   - Zeitpläne

3. **Links immer testen:**
   - URLs müssen mit `https://` beginnen
   - Interne Links: `/ueber-uns`, `/kontakt` etc.

---

## 🖼️ Bilder - Best Practices

### Formate:
- **WebP** bevorzugt (bessere Kompression)
- **JPEG** für Fotos
- **PNG** für Grafiken mit Transparenz
- **SVG** für Logos und Icons

### Größen:
- **Hero-Bilder:** mindestens 1920px breit
- **Galerie:** mindestens 800px breit
- **Team-Fotos:** 400x400px (quadratisch)
- **News-Bilder:** 1200px breit

### Dateinamen:
- Keine Leerzeichen (verwende `-` oder `_`)
- Keine Sonderzeichen
- Beispiel: `sommerfest-2024-gruppenfoto.jpg`

### Alt-Text (Accessibility):
- Beschreibe das Bild für Screenreader
- Beispiel: "Kinder beim Spielen im Schulhof"
- Nicht: "IMG_1234.jpg"

---

## 🔄 Workflow: Neuer Eintrag erstellen

### News-Artikel:
1. In Contentful: Content → Add Entry → `newsArtikel`
2. Felder ausfüllen (titel, slug, vorschautext, datum)
3. RichText-Inhalt in `inhalt` einfügen
4. Optional: titelbild hochladen
5. Publish

### Team-Mitglied:
1. Content → Add Entry → `teamMitglied`
2. name und funktion ausfüllen
3. beschreibung als RichText formatieren
4. Foto hochladen (empfohlen: quadratisch)
5. reihenfolge festlegen (für Sortierung)
6. Publish

### Galerie-Eintrag (mit mehreren Bildern):
1. Content → Add Entry → `galleryImage`
2. titel eingeben
3. **Mehrere Bilder** im `bild`-Feld hinzufügen:
   - "Add existing assets" oder
   - "Add new assets" (mehrere auswählen)
4. kategorie setzen (unterricht/events/sport)
5. Publish

### Stellenanzeige:
1. Content → Add Entry → `stellen`
2. position (z.B. "ZivilDiener")
3. beschreibungKurz (2-3 Sätze)
4. beschreibungLang als RichText (detailliert)
5. Publish

---

## 🐛 Fehlerbehebung

### Bilder werden nicht angezeigt:
- Prüfe ob Bild veröffentlicht ist (nicht nur Draft)
- Prüfe Dateigröße (max. 20MB)
- Prüfe Bild-URL in Contentful

### RichText wird als Plaintext angezeigt:
- Feld muss vom Typ "RichText" sein (nicht Text)
- Contentful Feld-ID prüfen: `beschreibung`, `inhalt`, `beschreibungLang`

### Eintrag erscheint nicht auf der Website:
- Status muss "Published" sein (nicht "Draft")
- Pflichtfelder müssen ausgefüllt sein
- Bei Stellenanzeigen: Kein `aktiv` Feld nötig (wird automatisch als aktiv betrachtet)

### Falsche Kategorie in Galerie:
- Kategorie muss kleingeschrieben sein: `unterricht`, `events`, `sport`
- Nicht: `Unterricht`, `EVENTS`, etc.

---

## 📊 Content-Typ Zusammenfassung

| Content-Typ | Verwendung | Besonderheit |
|-------------|-----------|--------------|
| `newsArtikel` | Blog/News | Slug für URLs |
| `teamMitglied` | Team-Seite | RichText für Bio |
| `stellen` | Jobs | Kurz + Lang Beschreibung |
| `galleryImage` | Galerie | Mehrere Bilder pro Eintrag |
| `schuleAllgemein` | Alltagsbilder | Für Homepage |
| `schuleEvent` | Events | Getrennte Kategorie |

---

## 🔗 Wichtige URLs

- **Contentful Web App:** https://app.contentful.com/spaces/4wwsd5b3f66i
- **Live Website:** https://alz5.thesolution.at
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## 📧 Support

Bei Problemen mit Contentful oder der Website:
1. Prüfe diese Dokumentation
2. Vergleiche mit bestehenden Einträgen
3. Teste in Contentful Preview
4. Frage nach bei: office@astrid-lindgren-zentrum.at

---

*Letzte Aktualisierung: 2025-02-28*
