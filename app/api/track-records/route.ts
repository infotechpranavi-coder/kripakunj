import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TrackRecord from '@/models/TrackRecord';

export async function GET() {
    try {
        await dbConnect();
        const records = await TrackRecord.find({}).sort({ order: 1 });
        return NextResponse.json({ success: true, data: records });
    } catch (error) {
        console.error("Error in GET /api/track-records:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch track records' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        const record = await TrackRecord.create(body);

        return NextResponse.json({ success: true, data: record }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating track record:", error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create track record' },
            { status: 400 }
        );
    }
}
