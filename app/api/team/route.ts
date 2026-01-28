import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TeamMember from '@/models/TeamMember';

export async function GET() {
    await dbConnect();
    try {
        const members = await TeamMember.find({}).sort({ order: 1, createdAt: -1 });
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
                    folder: 'team'
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
            order: Number(formData.get('order')) || 0,
        };

        const member = await TeamMember.create(memberData);
        return NextResponse.json({ success: true, data: member }, { status: 201 });
    } catch (error) {
        console.error("Error creating team member:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}
