import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Media from '@/models/Media';

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    try {
        const { id } = await params;
        const deletedArticle = await Media.findByIdAndDelete(id);

        if (!deletedArticle) {
            return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Article deleted successfully' });
    } catch (error) {
        console.error("Error deleting media article:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    try {
        const { id } = await params;
        const formData = await req.formData();

        const existingImageUrl = formData.get('existingImageUrl') as string;
        const imageFile = formData.get('image') as File;

        let imageUrl = existingImageUrl;

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

        const updateData = {
            title: formData.get('title') as string,
            imageUrl: imageUrl,
            linkUrl: formData.get('linkUrl') as string,
            date: formData.get('date') ? new Date(formData.get('date') as string) : new Date(),
        };

        const updatedArticle = await Media.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedArticle) {
            return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedArticle });
    } catch (error) {
        console.error("Error updating media article:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}
