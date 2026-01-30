import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Video from '@/models/Video';

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    try {
        const { id } = await context.params;
        const formData = await req.formData();
        const videoFile = formData.get('video') as File | null;

        let fileUrl = '';

        if (videoFile && videoFile.size > 0) {
            const cloudinary = (await import('@/lib/cloudinary')).default;
            const arrayBuffer = await videoFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'video',
                        folder: 'videos',
                    },
                    (error: any, result: any) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(buffer);
            });

            // @ts-ignore
            fileUrl = result.secure_url;
        }

        const updateData: any = {
            title: formData.get('title') as string,
            videoUrl: (formData.get('videoUrl') as string | null) || '',
        };

        if (fileUrl) {
            updateData.fileUrl = fileUrl;
        }

        if (!updateData.videoUrl && !updateData.fileUrl) {
            return NextResponse.json(
                { success: false, error: 'Please provide a video URL or upload a video file.' },
                { status: 400 }
            );
        }

        const updatedVideo = await Video.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedVideo) {
            return NextResponse.json({ success: false, error: 'Video not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedVideo });
    } catch (error) {
        console.error('Error updating video:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    try {
        const { id } = await context.params;
        const deletedVideo = await Video.findByIdAndDelete(id);

        if (!deletedVideo) {
            return NextResponse.json({ success: false, error: 'Video not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: deletedVideo });
    } catch (error) {
        console.error('Error deleting video:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}

