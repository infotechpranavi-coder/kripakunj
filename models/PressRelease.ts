import mongoose from 'mongoose';

const PressReleaseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the press release'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide an image for the press release'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PressRelease ||
  mongoose.model('PressRelease', PressReleaseSchema);

