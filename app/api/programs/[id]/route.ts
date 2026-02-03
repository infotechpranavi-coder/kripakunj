import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Program from '@/models/Program';

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const deletedProgram = await Program.findByIdAndDelete(id);
        if (!deletedProgram) {
            return NextResponse.json({ success: false, error: 'Program not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        console.error("Error in DELETE /api/programs/[id]:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : String(error) },
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
        const { id } = await params;
        const body = await req.json();

        const updatedProgram = await Program.findByIdAndUpdate(id, body, { new: true });
        if (!updatedProgram) {
            return NextResponse.json({ success: false, error: 'Program not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedProgram });
    } catch (error) {
        console.error("Error in PUT /api/programs/[id]:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : String(error) },
            { status: 400 }
        );
    }
}
