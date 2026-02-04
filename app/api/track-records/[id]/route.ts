import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import TrackRecord from '@/models/TrackRecord';

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const body = await req.json();
        const { id } = await params;

        const record = await TrackRecord.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!record) {
            return NextResponse.json(
                { success: false, error: 'Track record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: record });
    } catch (error: any) {
        console.error("Error updating track record:", error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update track record' },
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
        const { id } = await params;

        const record = await TrackRecord.findByIdAndDelete(id);

        if (!record) {
            return NextResponse.json(
                { success: false, error: 'Track record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: 'Track record deleted' });
    } catch (error: any) {
        console.error("Error deleting track record:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete track record' },
            { status: 500 }
        );
    }
}
