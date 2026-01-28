import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Campaign from '@/models/Campaign';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    try {
        const { id } = await params;
        const campaign = await Campaign.findById(id);
        if (!campaign) {
            return NextResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: campaign });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    try {
        const formData = await req.formData();
        const { id } = await params;

        // Process images if any new ones provided
        const imageFiles = formData.getAll('images') as File[];
        let imageUrls: string[] = [];

        // If 'existingImages' are passed, we keep them
        const existingImages = formData.getAll('existingImages') as string[];
        imageUrls = [...existingImages];

        if (imageFiles.length > 0) {
            const cloudinary = (await import('@/lib/cloudinary')).default;
            for (const image of imageFiles) {
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
        }

        const updateData = {
            title: formData.get('title') as string,
            shortDescription: formData.get('shortDescription') as string,
            aboutCampaign: formData.get('aboutCampaign') as string,
            images: imageUrls,
            goalAmount: Number(formData.get('goalAmount')),
            raisedAmount: Number(formData.get('raisedAmount')),
            location: {
                city: formData.get('locationCity') as string,
                state: formData.get('locationState') as string,
                country: 'India',
                isOnline: formData.get('isOnline') === 'true',
            },
            organizer: {
                name: formData.get('organizerName') as string,
                type: formData.get('organizerType') as string,
                description: formData.get('organizerDescription') as string,
            },
            category: formData.get('category') as string,
            status: formData.get('status') as string,
            beneficiariesCount: Number(formData.get('beneficiariesCount')),
            startDate: formData.get('startDate') as string,
            endDate: formData.get('endDate') as string,
            impactDescription: formData.get('impactDescription') as string,
        };

        const updatedCampaign = await Campaign.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedCampaign) {
            return NextResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedCampaign });
    } catch (error) {
        console.error("Error updating campaign:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    try {
        const { id } = await params;
        const deletedCampaign = await Campaign.findByIdAndDelete(id);

        if (!deletedCampaign) {
            return NextResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Campaign deleted successfully' });
    } catch (error) {
        console.error("Error deleting campaign:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 400 });
    }
}
