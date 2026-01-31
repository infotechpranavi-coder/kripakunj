import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this event.'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this event.'],
    },
    date: {
        type: Date,
        required: [true, 'Please provide a date for this event.'],
    },
    time: {
        type: String,
        required: [true, 'Please provide a time for this event.'],
    },
    location: {
        type: String,
        required: [true, 'Please provide a location for this event.'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category for this event.'],
    },
    status: {
        type: String,
        enum: ['upcoming', 'completed', 'planned', 'cancelled'],
        default: 'upcoming',
    },
    image: {
        type: String,
        default: '/placeholder.svg',
    },
    highlights: {
        type: [String],
        default: [],
    },
    interested: {
        type: String,
        default: '0+',
    },
    registered: {
        type: Number,
        default: 0,
    },
    capacity: {
        type: Number,
        default: 100,
    },
    volunteers: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Avoid model overwrite error in Next.js development
if (mongoose.models.Event) {
    delete mongoose.models.Event;
}

const Event = mongoose.model('Event', EventSchema);

export default Event;
