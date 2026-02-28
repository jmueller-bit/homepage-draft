import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'Kein Bild gefunden' }, { status: 400 })
        }

        // Nur Bilder erlauben
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Nur Bilder erlaubt' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Eindeutiger Dateiname
        const ext = path.extname(file.name)
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`

        // Upload-Ordner erstellen falls nicht vorhanden
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        const uploadPath = path.join(uploadDir, filename)
        await writeFile(uploadPath, buffer)

        console.log('✅ Bild gespeichert:', uploadPath)

        return NextResponse.json({
            url: `/uploads/${filename}`,
            filename
        })

    } catch (err) {
        console.error('❌ Upload Fehler:', err)
        return NextResponse.json({
            error: 'Upload fehlgeschlagen',
            details: String(err)
        }, { status: 500 })
    }
}
