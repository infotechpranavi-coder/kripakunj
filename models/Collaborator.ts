import mongoose from 'mongoose';

const CollaboratorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    logo: {
        type: String,
        required: [true, 'Please provide a logo URL'],
    },
    link: {
        type: String,
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
if (mongoose.models && mongoose.models.Collaborator) {
    delete mongoose.models.Collaborator;
}

export default mongoose.models.Collaborator || mongoose.model('Collaborator', CollaboratorSchema);
