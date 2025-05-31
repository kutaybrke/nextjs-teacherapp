import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT: Blog güncelle
export async function PUT(
    req: NextRequest,
    { params }: { params: { blogId: string } }
) {
    try {
        const blogId = parseInt(params.blogId)
        const body = await req.json()
        const { title, summary, content } = body

        if (!title || !summary || !content) {
            return NextResponse.json({ error: 'Tüm alanlar zorunludur.' }, { status: 400 })
        }

        const existingBlog = await prisma.blogPost.findUnique({
            where: { id: blogId },
        })

        if (!existingBlog) {
            return NextResponse.json({ error: 'Blog bulunamadı.' }, { status: 404 })
        }

        const updatedBlog = await prisma.blogPost.update({
            where: { id: blogId },
            data: {
                title,
                summary,
                content,
                date: new Date(),
            },
        })

        return NextResponse.json({ message: 'Blog başarıyla güncellendi.', blog: updatedBlog })
    } catch (error) {
        console.error('PUT /api/blog/[blogId] error:', error)
        return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 })
    }
}

// DELETE: Blog sil
export async function DELETE(
    req: NextRequest,
    { params }: { params: { blogId: string } }
) {
    try {
        const blogId = parseInt(params.blogId)

        const existingBlog = await prisma.blogPost.findUnique({
            where: { id: blogId },
        })

        if (!existingBlog) {
            return NextResponse.json({ error: 'Blog bulunamadı.' }, { status: 404 })
        }

        await prisma.blogPost.delete({
            where: { id: blogId },
        })

        return NextResponse.json({ message: 'Blog başarıyla silindi.' })
    } catch (error) {
        console.error('DELETE /api/blog/[blogId] error:', error)
        return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 })
    }
}
