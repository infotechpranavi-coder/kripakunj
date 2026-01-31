import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event from '@/models/Event';
import cloudinary from '@/lib/cloudinary';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const unwrappedParams = await params;
        const event = await Event.findById(unwrappedParams.id);

        if (!event) {
            return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: event });
    } catch (error) {
        console.error("Error in GET /api/events/[id]:", error);
        return NextResponse.json(
            { success: false, error: 'Invalid ID or Server Error' },
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
        const unwrappedParams = await params;
        const formData = await req.formData();

        const existingEvent = await Event.findById(unwrappedParams.id);
        if (!existingEvent) {
            return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
        }

        // Extract image
        const imageFile = formData.get('image') as File;
        let imageUrl = existingEvent.image;

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

        const updateData = {
            title: formData.get('title') as string || existingEvent.title,
            description: formData.get('description') as string || existingEvent.description,
            date: formData.get('date') as string || existingEvent.date,
            time: formData.get('time') as string || existingEvent.time,
            location: formData.get('location') as string || existingEvent.location,
            category: formData.get('category') as string || existingEvent.category,
            interested: formData.get('interested') as string || existingEvent.interested,
            status: formData.get('status') as string || existingEvent.status,
            image: imageUrl,
            highlights: formData.getAll('highlights').length > 0 ? formData.getAll('highlights') : existingEvent.highlights,
            registered: Number(formData.get('registered')) || existingEvent.registered,
            capacity: Number(formData.get('capacity')) || existingEvent.capacity,
            volunteers: Number(formData.get('volunteers')) || existingEvent.volunteers,
        };

        const updatedEvent = await Event.findByIdAndUpdate(unwrappedParams.id, updateData, { new: true });

        return NextResponse.json({ success: true, data: updatedEvent });
    } catch (error) {
        console.error("Error updating event:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to update event' },
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
        const unwrappedParams = await params;
        const event = await Event.findByIdAndDelete(unwrappedParams.id);

        if (!event) {
            return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
        console.error("Error deleting event:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete event' },
            { status: 500 }
        );
    }
}
