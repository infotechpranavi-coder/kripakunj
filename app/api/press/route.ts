import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import PressRelease from '@/models/PressRelease';

export async function GET() {
  await dbConnect();
  try {
    const items = await PressRelease.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File | null;

    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
      const cloudinary = (await import('@/lib/cloudinary')).default;
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: 'image',
              folder: 'press-releases',
            },
            (error: any, result: any) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      // @ts-ignore
      imageUrl = result.secure_url;
    }

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Please upload an image for the press release.' },
        { status: 400 }
      );
    }

    const data = {
      title: formData.get('title') as string,
      date: formData.get('date')
        ? new Date(formData.get('date') as string)
        : new Date(),
      imageUrl,
    };

    const created = await PressRelease.create(data);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error('Error creating press release:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
  }
}

