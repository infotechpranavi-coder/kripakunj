import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import EventRegistration from '@/models/EventRegistration';
import Event from '@/models/Event';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        const { eventId, name, email, phone, comments } = body;

        if (!eventId || !name || !email || !phone) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create the registration
        const registration = await EventRegistration.create({
            eventId,
            name,
            email,
            phone,
            comments,
        });

        // Increment the registered count in the Event model
        await Event.findByIdAndUpdate(eventId, {
            $inc: { registered: 1 }
        });

        return NextResponse.json({ success: true, data: registration }, { status: 201 });
    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to register for event' },
            { status: 500 }
        );
    }
}
