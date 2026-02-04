import mongoose from 'mongoose';

const VolunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
    },
    area: {
        type: String,
        required: [true, 'Please select an area of interest'],
    },
    experience: {
        type: String,
        required: [true, 'Please provide details about your experience'],
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'contacted', 'rejected', 'accepted', 'active'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);
