# Admin-Panel für Lehrer

Ein einfaches, mobiles Admin-Panel zum Verwalten von News und Galerie-Bildern.

## Features

- **Einfaches Login** - Passwort-basierte Authentifizierung
- **News verwalten** - Neue Artikel erstellen mit automatischer Telegram-Benachrichtigung
- **Galerie** - Bilder hochladen und löschen
- **Mobile-First** - Optimiert für Smartphone und PC
- **Contentful Integration** - Direkte Verbindung zum CMS

## Zugriff

Öffne `/admin` auf der Website.

Standard-Passwort: `alz2024` (kann über Umgebungsvariable `ADMIN_PASSWORD` geändert werden)

## Einrichtung

### 1. Contentful Management Token erstellen

1. Gehe zu [Contentful](https://app.contentful.com)
2. Settings → API keys → Content management tokens
3. "Create personal access token"
4. Token kopieren und als `CONTENTFUL_MANAGEMENT_TOKEN` speichern

### 2. Umgebungsvariablen setzen

Kopiere `.env.admin.example` nach `.env.local`:

```bash
cp .env.admin.example .env.local
```

Fülle die Variablen aus:

```env
ADMIN_PASSWORD=dein_sicheres_passwort
CONTENTFUL_SPACE_ID=dein_space_id
CONTENTFUL_ACCESS_TOKEN=dein_delivery_token
CONTENTFUL_MANAGEMENT_TOKEN=dein_management_token
TELEGRAM_BOT_TOKEN=8662078591:AAFndeL8VmA_pevopwyZM8RC-siPuHFIQ-8
TELEGRAM_CHAT_ID=deine_chat_id
```

### 3. Telegram Bot einrichten (optional)

1. Schreibe [@BotFather](https://t.me/botfather) auf Telegram
2. Erstelle neuen Bot: `/newbot`
3. Kopiere den Token
4. Schreibe dem Bot eine Nachricht
5. Hole die Chat-ID: `https://api.telegram.org/bot<DEIN_TOKEN>/getUpdates`

## Verwendung

### News erstellen

1. Auf `/admin` anmelden
2. "News" auswählen
3. "Neu" klicken
4. Formular ausfüllen:
   - **Titel** - Überschrift der News
   - **URL-Slug** - Wird automatisch generiert (z.B. "sommerfest-2024")
   - **Kategorie** - Optional (z.B. "Veranstaltung")
   - **Autor** - Dein Name
   - **Kurzbeschreibung** - Text für die Übersicht (max. 200 Zeichen)
   - **Inhalt** - Der vollständige Artikel
5. "Veröffentlichen" klicken

Die News wird automatisch:
- In Contentful gespeichert
- Auf der Website angezeigt
- Per Telegram benachrichtigt

### Bilder hochladen

1. Auf `/admin` anmelden
2. "Galerie" auswählen
3. Bild auswählen (max. 5MB)
4. Titel und Kategorie eingeben
5. "Hochladen" klicken

Bilder können gelöscht werden durch Klick auf das X.

## Technische Details

### Architektur

```
Admin-Panel (Next.js)
├── /admin                  - Login-Seite
├── /admin/dashboard        - Übersicht
├── /admin/news             - News-Liste
├── /admin/news/new         - News erstellen
├── /admin/galerie          - Galerie-Verwaltung
└── /api/admin/*            - API-Routen
```

### Authentifizierung

- Cookie-basiert (8 Stunden gültig)
- Einfaches Passwort (für Lehrer-Zugriff ausreichend)
- Keine komplexe Benutzerverwaltung nötig

### Contentful Integration

- **Delivery API** - Lesen von Content (öffentlich)
- **Management API** - Erstellen/Ändern/Löschen (Admin-Panel)
- Content wird automatisch publiziert

### Sicherheit

- Management Token niemals im Client exposen
- API-Routen server-seitig ausführen
- Passwort als Umgebungsvariable

## Fehlerbehebung

### "Admin-Panel nicht konfiguriert"

Der `CONTENTFUL_MANAGEMENT_TOKEN` fehlt. Token erstellen und in `.env.local` eintragen.

### Bilder werden nicht angezeigt

Prüfe ob:
- Contentful Assets verarbeitet sind (kann 1-2 Minuten dauern)
- Das Bild in Contentful veröffentlicht ist
- Die Galerie-Seite neu geladen wird

### Login funktioniert nicht

- Cookie-Blocker deaktivieren
- `ADMIN_PASSWORD` in `.env.local` prüfen
- Server neu starten

## Anpassungen

### Passwort ändern

In `.env.local`:
```env
ADMIN_PASSWORD=neues_passwort_2024
```

### Telegram deaktivieren

`TELEGRAM_BOT_TOKEN` leer lassen oder entfernen.

### Logo/Farben anpassen

Die Farben werden aus dem bestehenden Tailwind-Theme übernommen.

## Support

Bei Problemen:
1. Browser-Konsole auf Fehler prüfen
2. Vercel Logs checken
3. Contentful API-Status prüfen
