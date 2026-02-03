import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Banner from '@/models/Banner';
import cloudinary from '@/lib/cloudinary';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const banner = await Banner.findById(id);
        if (!banner) {
            return NextResponse.json({ success: false, error: 'Banner not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: banner });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const formData = await req.formData();

        const banner = await Banner.findById(id);
        if (!banner) {
            return NextResponse.json({ success: false, error: 'Banner not found' }, { status: 404 });
        }

        // Extract images if provided
        const newImages: string[] = [];
        const imageKeys = ['image1', 'image2', 'image3'];
        let hasNewUploads = false;

        for (const key of imageKeys) {
            const imageFile = formData.get(key) as File;
            if (imageFile && imageFile instanceof File && imageFile.size > 0) {
                hasNewUploads = true;
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
                newImages.push(result.secure_url);
            }
        }

        const updateData = {
            title: formData.get('title') as string || banner.title,
            subtitle: formData.get('subtitle') as string || banner.subtitle,
            description: formData.get('description') as string || banner.description,
            images: hasNewUploads ? newImages : banner.images,
            imageUrl: formData.get('imageUrl') as string !== null ? (formData.get('imageUrl') as string) : banner.imageUrl,
            alt: formData.get('alt') as string || banner.alt,
            link: formData.get('link') as string || banner.link,
            order: Number(formData.get('order')) || banner.order,
            isActive: formData.get('isActive') === 'true',
        };

        const updatedBanner = await Banner.findByIdAndUpdate(id, updateData, { new: true });

        return NextResponse.json({ success: true, data: updatedBanner });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : String(error) },
            { status: 400 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const deletedBanner = await Banner.findByIdAndDelete(id);
        if (!deletedBanner) {
            return NextResponse.json({ success: false, error: 'Banner not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
