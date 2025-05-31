// app/api/upload/route.ts
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
        return NextResponse.json({ error: 'Dosya yok' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: 'blog-images' }, (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                })
                .end(buffer);
        });

        return NextResponse.json(uploadResult);
    } catch (error) {
        return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 });
    }
}
