import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ImpactStat from '@/models/ImpactStat';

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const body = await req.json();
        const { id } = params;

        const stat = await ImpactStat.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!stat) {
            return NextResponse.json(
                { success: false, error: 'Impact stat not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: stat });
    } catch (error: any) {
        console.error("Error updating impact stat:", error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to update impact stat' },
            { status: 400 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const { id } = params;

        const stat = await ImpactStat.findByIdAndDelete(id);

        if (!stat) {
            return NextResponse.json(
                { success: false, error: 'Impact stat not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: 'Impact stat deleted' });
    } catch (error: any) {
        console.error("Error deleting impact stat:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete impact stat' },
            { status: 500 }
        );
    }
}
