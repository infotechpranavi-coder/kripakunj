import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event from '@/models/Event';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
    try {
        await dbConnect();
        const events = await Event.find({}).sort({ date: 1 });
        return NextResponse.json({ success: true, data: events });
    } catch (error) {
        console.error("Error in GET /api/events:", error);
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

        // Extract image
        const imageFile = formData.get('image') as File;
        let imageUrl = '/placeholder.svg';

        if (imageFile && imageFile instanceof File && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    resource_type: 'image',
                    folder: 'events'
                }, (error: any, result: any) => {
                    if (error) reject(error);
                    else resolve(result);
                }).end(buffer);
            });

            // @ts-ignore
            imageUrl = result.secure_url;
        }

        const eventData = {
            title: formData.get('title') as string || '',
            description: formData.get('description') as string || '',
            date: formData.get('date') as string || '',
            time: formData.get('time') as string || '',
            location: formData.get('location') as string || '',
            category: formData.get('category') as string || '',
            interested: formData.get('interested') as string || '0+',
            status: formData.get('status') as string || 'upcoming',
            image: imageUrl,
            highlights: formData.getAll('highlights') as string[],
            registered: Number(formData.get('registered')) || 0,
            capacity: Number(formData.get('capacity')) || 100,
            volunteers: Number(formData.get('volunteers')) || 0,
        };

        const event = await Event.create(eventData);

        return NextResponse.json({ success: true, data: event }, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : String(error) },
            { status: 400 }
        );
    }
}
