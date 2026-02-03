import mongoose from 'mongoose';

const ImpactStatSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'Please provide a label for the impact stat.'],
        trim: true,
    },
    value: {
        type: String,
        required: [true, 'Please provide a value for the impact stat.'],
        trim: true,
    },
    icon: {
        type: String, // lucide icon name or emoji
        default: 'Globe',
    },
    color: {
        type: String, // CSS color or Tailwind class
        default: 'primary',
    },
    order: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

export default mongoose.models.ImpactStat || mongoose.model('ImpactStat', ImpactStatSchema);
