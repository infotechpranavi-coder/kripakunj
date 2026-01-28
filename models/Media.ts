import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the article'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image for the article'],
    },
    linkUrl: {
        type: String,
        required: [true, 'Please provide a link for the article'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.models.Media || mongoose.model('Media', MediaSchema);
