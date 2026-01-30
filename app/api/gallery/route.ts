import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';

export async function GET() {
    await dbConnect();
    try {
        const images = await Gallery.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: images });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const formData = await req.formData();
        const imageFile = formData.get('image') as File;

        let imageUrl = '';
        if (imageFile && imageFile.size > 0) {
            const cloudinary = (await import('@/lib/cloudinary')).default;
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    resource_type: 'image',
                    folder: 'gallery'
                }, (error: any, result: any) => {
                    if (error) reject(error);
                    else resolve(result);
                }).end(buffer);
            });

            // @ts-ignore
            imageUrl = result.secure_url;
        }

        const galleryData = {
            title: formData.get('title') as string,
            imageUrl: imageUrl,
            category: formData.get('category') as string,
        };

        const image = await Gallery.create(galleryData);
        return NextResponse.json({ success: true, data: image }, { status: 201 });
    } catch (error) {
        console.error("Error creating gallery image:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}
