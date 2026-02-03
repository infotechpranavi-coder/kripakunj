import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Collaborator from '@/models/Collaborator';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
    try {
        await dbConnect();
        const collaborators = await Collaborator.find({ isActive: true }).sort({ order: 1 });
        return NextResponse.json({ success: true, data: collaborators });
    } catch (error) {
        console.error("Error in GET /api/collaborators:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch collaborators' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const formData = await req.formData();

        const name = formData.get('name') as string;
        const link = formData.get('link') as string;
        const order = Number(formData.get('order')) || 0;
        const logoFile = formData.get('logo') as File;

        if (!name || !logoFile) {
            return NextResponse.json({ success: false, error: 'Name and logo are required' }, { status: 400 });
        }

        let logoUrl = '';
        if (logoFile && logoFile instanceof File && logoFile.size > 0) {
            const arrayBuffer = await logoFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    resource_type: 'image',
                    folder: 'collaborators'
                }, (error: any, result: any) => {
                    if (error) reject(error);
                    else resolve(result);
                }).end(buffer);
            });

            // @ts-ignore
            logoUrl = result.secure_url;
        }

        const collaborator = await Collaborator.create({
            name,
            logo: logoUrl,
            link,
            order,
            isActive: true
        });

        return NextResponse.json({ success: true, data: collaborator }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating collaborator:", error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create collaborator' },
            { status: 400 }
        );
    }
}
