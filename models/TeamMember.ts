import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for the team member'],
    },
    designation: {
        type: String,
        required: [true, 'Please provide a designation for the team member'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image for the team member'],
    },
    order: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
