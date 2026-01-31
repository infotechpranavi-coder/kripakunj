import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Donation from '@/models/Donation';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        const donation = await Donation.create(body);

        return NextResponse.json({ success: true, data: donation }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating donation:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to process donation' },
            { status: 400 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const donations = await Donation.find({}).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: donations });
    } catch (error) {
        console.error('Error fetching donations:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch donations' },
            { status: 500 }
        );
    }
}
