import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    city: String,
    state: String,
    country: String,
    isOnline: Boolean,
}, { _id: false });

const OrganizerSchema = new mongoose.Schema({
    name: String,
    type: { type: String }, // Using explicit type property to avoid collision with reserved 'type'
    description: String,
}, { _id: false });

const CampaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this campaign.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    shortDescription: String,
    aboutCampaign: String,
    images: {
        type: [String], // Array of image URLs
        default: [],
    },
    goalAmount: {
        type: Number,
        required: [true, 'Please specify the goal amount.'],
    },
    raisedAmount: {
        type: Number,
        default: 0,
    },
    location: LocationSchema,
    organizer: OrganizerSchema,
    category: String,
    status: {
        type: String,
        default: 'active',
    },
    beneficiariesCount: Number,
    startDate: Date,
    endDate: Date,
    impactDescription: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// In Next.js dev mode, the model might be cached with an old schema.
// This ensures we always use the latest schema definition.
console.log("Registering Campaign model...");
if (mongoose.models.Campaign) {
    console.log("Deleting existing Campaign model from cache...");
    delete mongoose.models.Campaign;
}

const Campaign = mongoose.model('Campaign', CampaignSchema);
console.log("Campaign model registered successfully.");

export default Campaign;
