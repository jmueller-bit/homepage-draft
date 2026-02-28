import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Admin-Panel nicht konfiguriert. ADMIN_PASSWORD fehlt.' },
        { status: 503 }
      )
    }

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Falsches Passwort' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Validierung fehlgeschlagen' },
      { status: 500 }
    )
  }
}
