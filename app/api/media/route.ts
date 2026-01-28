import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Media from '@/models/Media';

export async function GET() {
    await dbConnect();
    try {
        const articles = await Media.find({}).sort({ date: -1 });
        return NextResponse.json({ success: true, data: articles });
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
                    folder: 'media'
                }, (error: any, result: any) => {
                    if (error) reject(error);
                    else resolve(result);
                }).end(buffer);
            });

            // @ts-ignore
            imageUrl = result.secure_url;
        }

        const articleData = {
            title: formData.get('title') as string,
            imageUrl: imageUrl,
            linkUrl: formData.get('linkUrl') as string,
            date: formData.get('date') ? new Date(formData.get('date') as string) : new Date(),
        };

        const article = await Media.create(articleData);
        return NextResponse.json({ success: true, data: article }, { status: 201 });
    } catch (error) {
        console.error("Error creating media article:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}
