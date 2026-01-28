import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import BoardMember from '@/models/BoardMember';

export async function GET() {
    await dbConnect();
    try {
        const members = await BoardMember.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json({ success: true, data: members });
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
                    folder: 'board'
                }, (error: any, result: any) => {
                    if (error) reject(error);
                    else resolve(result);
                }).end(buffer);
            });

            // @ts-ignore
            imageUrl = result.secure_url;
        }

        const memberData = {
            name: formData.get('name') as string,
            designation: formData.get('designation') as string,
            imageUrl: imageUrl,
            bio: (formData.get('bio') as string) || '',
            quote: (formData.get('quote') as string) || '',
            linkedinUrl: (formData.get('linkedinUrl') as string) || '',
            email: (formData.get('email') as string) || '',
            order: Number(formData.get('order')) || 0,
        };

        console.log('=== BOARD MEMBER DATA ===');
        console.log('Name:', memberData.name);
        console.log('Designation:', memberData.designation);
        console.log('Bio:', memberData.bio);
        console.log('Quote:', memberData.quote);
        console.log('LinkedIn:', memberData.linkedinUrl);
        console.log('Email:', memberData.email);
        console.log('========================');

        const member = await BoardMember.create(memberData);
        return NextResponse.json({ success: true, data: member }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating board member:", error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        return NextResponse.json({
            success: false,
            error: error.message || String(error),
            details: error.toString()
        }, { status: 400 });
    }
}
