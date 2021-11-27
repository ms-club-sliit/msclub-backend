import mongoose, { Schema } from 'mongoose';
import { ITopSpeaker } from '../interfaces';

const TopSpeakerSchema = new Schema<ITopSpeaker>({
  speakerName: { type: String, required: true },
  description: { type: String, required: false },
  image_url: { type: String, required: false, default: null },
  socialMedia: [
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
