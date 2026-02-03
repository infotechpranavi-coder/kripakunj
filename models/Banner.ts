import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    subtitle: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    images: {
        type: [String],
        default: [],
    },
    imageUrl: {
        type: String,
    },
    alt: {
        type: String,
        default: 'Banner image',
    },
    link: {
        type: String,
    },
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Clear cached model to force schema refresh in development
if (mongoose.models && mongoose.models.Banner) {
    delete mongoose.models.Banner;
}

export default mongoose.model('Banner', BannerSchema);
