// Telegram Bot Integration für Admin-Benachrichtigungen
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || ''

export async function sendTelegramMessage(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram nicht konfiguriert')
    return
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    })

    if (!response.ok) {
      throw new Error(`Telegram API Fehler: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Fehler beim Senden der Telegram-Nachricht:', error)
  }
}

export function formatNewsNotification(title: string, excerpt: string, author: string) {
  return `
📰 <b>Neue News veröffentlicht</b>

<b>Titel:</b> ${title}
<b>Autor:</b> ${author}

<i>${excerpt}</i>

👉 astrid-lindgren-zentrum.at/news
  `.trim()
}
