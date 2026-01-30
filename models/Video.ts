import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the video'],
    },
    videoUrl: {
        type: String,
    },
    fileUrl: {
        type: String,
    },
}, { timestamps: true });

// Ensure we don't overwrite the model during hot reloads
export default mongoose.models.Video || mongoose.model('Video', VideoSchema);

