import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Banner from '@/models/Banner';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
    try {
        await dbConnect();
        const banners = await Banner.find({}).sort({ order: 1 });
        return NextResponse.json({ success: true, data: banners });
    } catch (error) {
        console.error("Error in GET /api/banners:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const formData = await req.formData();

        // Extract images
        const images: string[] = [];
        const imageKeys = ['image1', 'image2', 'image3'];

        for (const key of imageKeys) {
            const imageFile = formData.get(key) as File;
            if (imageFile && imageFile instanceof File && imageFile.size > 0) {
                const arrayBuffer = await imageFile.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({
                        resource_type: 'image',
                        folder: 'banners'
                    }, (error: any, result: any) => {
                        if (error) reject(error);
                        else resolve(result);
                    }).end(buffer);
                });

                // @ts-ignore
                images.push(result.secure_url);
            }
        }

        const bannerData = {
            title: formData.get('title') as string || '',
            subtitle: formData.get('subtitle') as string || '',
            description: formData.get('description') as string || '',
            images: images,
            imageUrl: formData.get('imageUrl') as string || '',
            alt: formData.get('alt') as string || 'Banner image',
            link: formData.get('link') as string || '',
            order: Number(formData.get('order')) || 0,
            isActive: formData.get('isActive') === 'true',
        };

        const banner = await Banner.create(bannerData);

        return NextResponse.json({ success: true, data: banner }, { status: 201 });
    } catch (error) {
        console.error("Error creating banner:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : String(error) },
            { status: 400 }
        );
    }
}
