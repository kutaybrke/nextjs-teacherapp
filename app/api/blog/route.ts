import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    switch (method) {
        case 'GET':
            try {
                const posts = await prisma.blogPost.findMany({
                    orderBy: { date: 'desc' },
                });
                res.status(200).json(posts);
            } catch (error) {
                res.status(500).json({ error: 'Database error' });
            }
            break;

        case 'POST':
            try {
                const { title, summary, content, date, imageUrl, author } = req.body;

                if (!title || !summary || !content || !date || !author) {
                    return res.status(400).json({ error: 'Missing required fields' });
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

                res.status(201).json({ message: 'Blog post created', post: newPost });
            } catch (error) {
                res.status(500).json({ error: 'Database error' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
