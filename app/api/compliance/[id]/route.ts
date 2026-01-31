import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ComplianceDocument from '@/models/ComplianceDocument';

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    try {
        const { id } = await params;
        const deleted = await ComplianceDocument.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json(
                { success: false, error: 'Document not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 400 }
        );
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

        // Check if we are updating the image
        const imageFile = formData.get('image') as File | null;
        let imageUrl = formData.get('existingImageUrl') as string;

        if (imageFile && imageFile.size > 0) {
            const cloudinary = (await import('@/lib/cloudinary')).default;
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            resource_type: 'image',
                            folder: 'compliance-documents',
                        },
                        (error: any, result: any) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    )
                    .end(buffer);
            });

            // @ts-ignore
            imageUrl = result.secure_url;
        }

        const docUrl = formData.get('docUrl') as string;
        const title = formData.get('title') as string;

        const updated = await ComplianceDocument.findByIdAndUpdate(
            id,
            { title, imageUrl, docUrl },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return NextResponse.json(
                { success: false, error: 'Document not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error('Error updating compliance document:', error);
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 400 }
        );
    }
}
