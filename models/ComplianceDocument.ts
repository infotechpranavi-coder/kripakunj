import mongoose from 'mongoose';

const ComplianceDocumentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title for the document'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Please provide an image for the document'],
        },
        date: {
            type: Date,
            default: Date.now,
        },
        docUrl: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.ComplianceDocument ||
    mongoose.model('ComplianceDocument', ComplianceDocumentSchema);
