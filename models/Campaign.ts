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
    slug: {
        type: String,
        unique: true,
        lowercase: true,
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

// Generate slug from title before saving
CampaignSchema.pre('save', async function(next) {
    if (this.isModified('title') || this.isNew) {
        // Generate slug from title
        let baseSlug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
        
        // Ensure uniqueness by appending a number if needed
        let slug = baseSlug;
        let counter = 1;
        const CampaignModel = this.constructor as any;
        while (await CampaignModel.findOne({ slug, _id: { $ne: this._id } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        this.slug = slug;
    }
    next();
});

CampaignSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate() as any;
    if (update.title) {
        let baseSlug = update.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        
        // Ensure uniqueness
        let slug = baseSlug;
        let counter = 1;
        const query = this.getQuery();
        while (await Campaign.findOne({ slug, _id: { $ne: query._id } })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        update.slug = slug;
    }
    next();
});

const Campaign = mongoose.model('Campaign', CampaignSchema);
console.log("Campaign model registered successfully.");

export default Campaign;
