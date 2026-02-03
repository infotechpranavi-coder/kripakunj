import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Collaborator from '@/models/Collaborator';

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const deletedCollaborator = await Collaborator.findByIdAndDelete(id);
        if (!deletedCollaborator) {
            return NextResponse.json({ success: false, error: 'Collaborator not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        console.error("Error in DELETE /api/collaborators/[id]:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
