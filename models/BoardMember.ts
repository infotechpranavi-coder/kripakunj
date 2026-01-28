import mongoose from 'mongoose';

const BoardMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for the board member'],
    },
    designation: {
        type: String,
        required: [true, 'Please provide a designation for the board member'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image for the board member'],
    },
    bio: {
        type: String,
        default: '',
    },
    quote: {
        type: String,
        default: '',
    },
    linkedinUrl: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.models.BoardMember || mongoose.model('BoardMember', BoardMemberSchema);
