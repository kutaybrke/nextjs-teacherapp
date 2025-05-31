import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { date: "desc" },
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, summary, content, date, imageUrl, author } = body;

        if (!title || !summary || !content || !date || !author) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const newPost = await prisma.blogPost.create({
            data: {
                title,
                summary,
                content,
                date: new Date(date),
                imageUrl: imageUrl || null,
                author,
            },
        });

        return NextResponse.json(
            { message: "Blog post created", post: newPost },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Database error" },
            { status: 500 }
        );
    }
}
