import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BoardMember from '@/models/BoardMember';

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
                    folder: 'board'
                }, (error: any, result: any) => {
                    if (error) reject(error);
                    else resolve(result);
                }).end(buffer);
            });

            // @ts-ignore
            imageUrl = result.secure_url;
        }

        const updateData = {
            name: formData.get('name') as string,
            designation: formData.get('designation') as string,
            imageUrl: imageUrl,
            bio: (formData.get('bio') as string) || '',
            quote: (formData.get('quote') as string) || '',
            linkedinUrl: (formData.get('linkedinUrl') as string) || '',
            email: (formData.get('email') as string) || '',
            order: Number(formData.get('order')),
        };

        const updatedMember = await BoardMember.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedMember) {
            return NextResponse.json({ success: false, error: 'Board member not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedMember });
    } catch (error) {
        console.error("Error updating board member:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    try {
        const { id } = await params;
        const deletedMember = await BoardMember.findByIdAndDelete(id);

        if (!deletedMember) {
            return NextResponse.json({ success: false, error: 'Board member not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Board member deleted successfully' });
    } catch (error) {
        console.error("Error deleting board member:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}
