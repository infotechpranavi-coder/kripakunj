import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Volunteer from '@/models/Volunteer';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        const volunteer = await Volunteer.create(body);

        return NextResponse.json({ success: true, data: volunteer }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating volunteer:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to submit application' },
            { status: 400 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const volunteers = await Volunteer.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: volunteers });
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch volunteers' },
            { status: 500 }
        );
    }
}
