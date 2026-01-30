import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the image'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
    },
}, { timestamps: true });

// Delete the cached model to ensure schema changes are applied
if (mongoose.models.Gallery) {
    delete mongoose.models.Gallery;
}

export default mongoose.model('Gallery', GallerySchema);
