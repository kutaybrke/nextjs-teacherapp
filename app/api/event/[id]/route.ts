import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
        }

        await prisma.event.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Etkinlik başarıyla silindi.' });
    } catch (error) {
        console.error('DELETE /api/event/[id] error:', error);
        return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
    }
}
