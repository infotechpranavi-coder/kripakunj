import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a program name'],
    },
    tagline: {
        type: String,
        required: [true, 'Please provide a tagline'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    stats: {
        type: String,
        required: [true, 'Please provide stats'],
    },
    icon: {
        type: String,
        required: [true, 'Please provide an icon (emoji)'],
    },
    color: {
        type: String,
        default: 'from-primary/10 to-accent/10',
    },
    borderColor: {
        type: String,
        default: 'border-primary/20',
    },
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Clear cached model to force schema refresh in development
if (mongoose.models && mongoose.models.Program) {
    delete mongoose.models.Program;
}

export default mongoose.models.Program || mongoose.model('Program', ProgramSchema);
