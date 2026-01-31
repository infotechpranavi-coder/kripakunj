import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
    },
    phone: {
        type: String,
    },
    donationType: {
        type: String,
        enum: ['one-time', 'monthly'],
        default: 'one-time',
    },
    amount: {
        type: Number,
        required: [true, 'Please provide a donation amount'],
    },
    campaign: {
        type: String,
        required: [true, 'Please provide a campaign title'],
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed', // Since we're just simulating payment for now
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Donation || mongoose.model('Donation', DonationSchema);
