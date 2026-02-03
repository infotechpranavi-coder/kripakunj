import mongoose from 'mongoose';

const EventRegistrationSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Please provide an event ID.'],
    },
    name: {
        type: String,
        required: [true, 'Please provide your name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email.'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number.'],
    },
    comments: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Avoid model overwrite error in Next.js development
if (mongoose.models.EventRegistration) {
    delete mongoose.models.EventRegistration;
}

const EventRegistration = mongoose.model('EventRegistration', EventRegistrationSchema);

export default EventRegistration;
