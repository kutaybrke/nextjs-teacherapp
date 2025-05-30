import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
    } = req;

    // id yoksa ya da birden fazlaysa hata dön
    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    const blogId = Number(id);
    if (isNaN(blogId)) {
        return res.status(400).json({ error: 'ID must be a number' });
    }

    try {
        switch (method) {
            case 'GET':
                const post = await prisma.blogPost.findUnique({
                    where: { id: blogId },
                });
                if (!post) {
                    return res.status(404).json({ error: 'Blog post not found' });
                }
                res.status(200).json(post);
                break;

            case 'PUT':
                const { title, summary, content, date, imageUrl, author } = req.body;
                if (!title || !summary || !content || !date || !author) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }
                const updatedPost = await prisma.blogPost.update({
                    where: { id: blogId },
                    data: {
                        title,
                        summary,
                        content,
                        date: new Date(date),
                        imageUrl: imageUrl || null,
                        author,
                    },
                });
                res.status(200).json({ message: 'Blog post updated', post: updatedPost });
                break;

            case 'DELETE':
                await prisma.blogPost.delete({
                    where: { id: blogId },
                });
                res.status(200).json({ message: 'Blog post deleted' });
                break;

            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error: any) {
        // Silme veya güncelleme sırasında ilgili post yoksa farklı hata gelebilir, onu da kontrol edelim:
        if (error.code === 'P2025') { // Prisma not found error
            return res.status(404).json({ error: 'Blog post not found' });
        }
        res.status(500).json({ error: 'Database error', details: error.message });
    }
}
