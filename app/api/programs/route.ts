import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Program from '@/models/Program';

export async function GET() {
    try {
        await dbConnect();
        const programs = await Program.find({ isActive: true }).sort({ order: 1 });
        return NextResponse.json({ success: true, data: programs });
    } catch (error) {
        console.error("Error in GET /api/programs:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch programs' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        const program = await Program.create(body);

        return NextResponse.json({ success: true, data: program }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating program:", error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create program' },
            { status: 400 }
        );
    }
}
