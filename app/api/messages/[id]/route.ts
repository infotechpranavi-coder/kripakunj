import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Message from '@/models/Message'

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await params

        const deletedMessage = await Message.findByIdAndDelete(id)

        if (!deletedMessage) {
            return NextResponse.json(
                { success: false, error: 'Message not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true, message: 'Message deleted successfully' })
    } catch (error: any) {
        console.error('Error deleting message:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to delete message' },
            { status: 500 }
        )
    }
}
