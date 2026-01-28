import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Campaign from '@/models/Campaign';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    console.log("Connecting to database for GET /api/campaigns...");
    await dbConnect();
    const campaigns = await Campaign.find({});
    console.log(`Successfully fetched ${campaigns.length} campaigns.`);
    return NextResponse.json({ success: true, data: campaigns });
  } catch (error) {
    console.error("Critical Error in GET /api/campaigns:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("Connecting to database for POST /api/campaigns...");
    await dbConnect();
    const formData = await req.formData();

    // Extract images
    const imagesFiles = formData.getAll('images') as File[];
    const imageUrls = [];

    for (const image of imagesFiles) {
      if (image instanceof File && image.size > 0) {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({
            resource_type: 'image',
            folder: 'campaigns'
          }, (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result);
          }).end(buffer);
        });

        // @ts-ignore
        imageUrls.push(result.secure_url);
      }
    }

    const campaignData = {
      title: formData.get('title') as string || '',
      shortDescription: formData.get('shortDescription') as string || '',
      aboutCampaign: formData.get('aboutCampaign') as string || '',
      images: imageUrls,
      goalAmount: Number(formData.get('goalAmount')) || 0,
      raisedAmount: Number(formData.get('raisedAmount')) || 0,
      location: {
        city: formData.get('locationCity') as string || '',
        state: formData.get('locationState') as string || '',
        country: 'India',
        isOnline: formData.get('isOnline') === 'true',
      },
      organizer: {
        name: formData.get('organizerName') as string || '',
        type: formData.get('organizerType') as string || 'individual',
        description: formData.get('organizerDescription') as string || '',
      },
      category: formData.get('category') as string || '',
      status: formData.get('status') as string || 'active',
      beneficiariesCount: Number(formData.get('beneficiariesCount')) || 0,
      startDate: formData.get('startDate') as string || undefined,
      endDate: formData.get('endDate') as string || undefined,
      impactDescription: formData.get('impactDescription') as string || '',
    };

    console.log("Creating campaign with data:", JSON.stringify(campaignData, null, 2));
    const campaign = await Campaign.create(campaignData);

    return NextResponse.json({ success: true, data: campaign }, { status: 201 });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 400 }
    );
  }
}
