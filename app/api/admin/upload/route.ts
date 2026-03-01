import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');

        if (!filename) {
            return NextResponse.json({ error: 'Kein Dateiname' }, { status: 400 });
        }

        if (!request.body) {
            return NextResponse.json({ error: 'Kein Inhalt' }, { status: 400 });
        }

        // Dateiname bereinigen (Leerzeichen, Sonderzeichen)
        const cleanFilename = filename
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9.\-_]/g, '')
            .toLowerCase();

        const blob = await put(`news/${cleanFilename}`, request.body, {
            access: 'public',
            allowOverwrite: true, // Enable overwriting an existing blob with the same pathname
        });

        return NextResponse.json(blob);
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Upload fehlgeschlagen' },
            { status: 500 }
        );
    }
}