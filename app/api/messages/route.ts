import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Message from '@/models/Message'

export async function POST(request: Request) {
    try {
        await dbConnect()
        const body = await request.json()

        // Basic validation could be done here if needed, but Mongoose schema handles most
        const message = await Message.create(body)

        return NextResponse.json({ success: true, data: message }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        )
    }
}

export async function GET() {
    try {
        await dbConnect()
        // Sort by createdAt descending (newest first)
        const messages = await Message.find({}).sort({ createdAt: -1 })
        return NextResponse.json({ success: true, data: messages })
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        )
    }
}
