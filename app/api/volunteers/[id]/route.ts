import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Volunteer from '@/models/Volunteer';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const volunteer = await Volunteer.findByIdAndUpdate(
            id,
            { status: body.status },
            { new: true, runValidators: true }
        );

        if (!volunteer) {
            return NextResponse.json(
                { success: false, error: 'Volunteer not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: volunteer });
    } catch (error: any) {
        console.error('Error updating volunteer status:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update status' },
            { status: 500 }
        );
    }
}
