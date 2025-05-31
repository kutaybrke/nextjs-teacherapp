import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error('GET /api/event error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { date, startTime, endTime } = await req.json();

    if (!date || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'date, startTime ve endTime zorunludur.' },
        { status: 400 }
      );
    }

    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json({ error: 'Geçersiz tarih formatı.' }, { status: 400 });
    }

    const existingEvent = await prisma.event.findFirst({
      where: {
        date: eventDate,
        startTime,
        endTime,
      },
    });

    if (existingEvent) {
      return NextResponse.json(
        { error: 'Bu zaman aralığında zaten bir etkinlik var.' },
        { status: 409 }
      );
    }

    const newEvent = await prisma.event.create({
      data: {
        date: eventDate,
        startTime,
        endTime,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });

  } catch (error) {
    console.error('POST /api/event error:', error);
    return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
  }
}
