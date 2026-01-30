import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    try {
        const { id } = params;
        const formData = await req.formData();
        const imageFile = formData.get('image') as File;

        let imageUrl = '';
        
        // If a new image is provided, upload it
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

        // Prepare update data
        const updateData: any = {
            title: formData.get('title') as string,
            category: formData.get('category') as string,
        };

        // Only update imageUrl if a new image was uploaded
        if (imageUrl) {
            updateData.imageUrl = imageUrl;
        }

        const updatedImage = await Gallery.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedImage) {
            return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedImage });
    } catch (error) {
        console.error("Error updating gallery image:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    try {
        const { id } = params;
        const deletedImage = await Gallery.findByIdAndDelete(id);

        if (!deletedImage) {
            return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: deletedImage });
    } catch (error) {
        console.error("Error deleting gallery image:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}
