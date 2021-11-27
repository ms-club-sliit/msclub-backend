import mongoose, { Schema } from 'mongoose';
import { ITopSpeaker } from '../interfaces';

const TopSpeakerSchema = new Schema<ITopSpeaker>({
  id: { type: Number, required: true },
  imageUrl: { type: String, required: false, default: null },
  title: { type: String, required: true },
  description: { type: String, required: false },
  socialMediaURLs: [
    {
      facebook: { type: String, required: true },
      instagram: { type: String, required: true },
      twitter: { type: String, required: true },
      linkedIn: { type: String, required: true },
      web: { type: String, required: true },
    },
  ],
  deletedAt: { type: Date, required: false, default: null },
});

const TopSpeakerModel = mongoose.model<ITopSpeaker>(
  'topSpeaker',
  TopSpeakerSchema
);

export default TopSpeakerModel;
