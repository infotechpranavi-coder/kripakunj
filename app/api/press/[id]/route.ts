import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import PressRelease from '@/models/PressRelease'

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()
        const { id } = await params

        const deletedPressRelease = await PressRelease.findByIdAndDelete(id)

        if (!deletedPressRelease) {
            return NextResponse.json(
                { success: false, error: 'Press release not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true, message: 'Press release deleted successfully' })
    } catch (error: any) {
        console.error('Error deleting press release:', error)
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to delete press release' },
            { status: 500 }
        )
    }
}
