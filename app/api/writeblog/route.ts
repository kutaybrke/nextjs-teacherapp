import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const title = formData.get("title")?.toString() || "";
        const summary = formData.get("summary")?.toString() || "";
        const content = formData.get("content")?.toString() || "";
        const dateString = formData.get("date")?.toString() || "";
        const imageUrl = formData.get("imageUrl")?.toString() || null;

        // Burada author'ı sabit verdim, istersen frontend'den al veya auth ekle
        const author = "admin";

        if (!title || !summary || !content || !dateString) {
            return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
        }

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return NextResponse.json({ error: "Geçersiz tarih." }, { status: 400 });
        }

        const newBlog = await prisma.blogPost.create({
            data: {
                title,
                summary,
                content,
                date,
                imageUrl,
                author: 'İlayda Yücer',
            },
        });

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        console.error("Blog oluşturma hatası:", error);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}
