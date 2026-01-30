import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Video from '@/models/Video';

export async function GET() {
    await dbConnect();
    try {
        const videos = await Video.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: videos });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
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

        const videoUrl = (formData.get('videoUrl') as string | null) || '';

        if (!videoUrl && !fileUrl) {
            return NextResponse.json(
                { success: false, error: 'Please provide a video URL or upload a video file.' },
                { status: 400 }
            );
        }

        const videoData = {
            title: formData.get('title') as string,
            videoUrl,
            fileUrl,
        };

        const video = await Video.create(videoData);
        return NextResponse.json({ success: true, data: video }, { status: 201 });
    } catch (error) {
        console.error('Error creating video:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}

