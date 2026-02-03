import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ImpactStat from '@/models/ImpactStat';

export async function GET() {
    try {
        await dbConnect();
        const stats = await ImpactStat.find({}).sort({ order: 1 });
        return NextResponse.json({ success: true, data: stats });
    } catch (error) {
        console.error("Error in GET /api/impact-stats:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch impact stats' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        const stat = await ImpactStat.create(body);

        return NextResponse.json({ success: true, data: stat }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating impact stat:", error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create impact stat' },
            { status: 400 }
        );
    }
}
