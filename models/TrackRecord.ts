import mongoose from 'mongoose';

const TrackRecordSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the track record.'],
        trim: true,
    },
    value: {
        type: String,
        required: [true, 'Please provide a value/number for the track record.'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description.'],
        trim: true,
    },
    order: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

export default mongoose.models.TrackRecord || mongoose.model('TrackRecord', TrackRecordSchema);
