import mongoose, { Schema } from 'mongoose';
import { ITopSpeaker } from '../interfaces';

const TopSpeakerSchema = new Schema<ITopSpeaker>(
  {
    imageUrl: { type: String, required: false, default: null },
    title: { type: String, required: true },
    description: { type: String, required: false },
    socialMediaURLs: {
      facebook: { type: String, required: true },
      instagram: { type: String, required: true },
      twitter: { type: String, required: true },
      linkedIn: { type: String, required: true },
      web: { type: String, required: true },
    },
    deletedAt: { type: Date, required: false, default: null },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    updatedBy: [
      {
        user: { type: Schema.Types.ObjectId, required: false, ref: "users" },
        updatedAt: { type: Date, required: false },
      },
    ],
    deletedBy: {
      type: Schema.Types.ObjectId,
      required: false,
      default: null,
      ref: "users",
    },
  },
  { timestamps: true }
);

const TopSpeakerModel = mongoose.model<ITopSpeaker>(
  'topSpeaker',
  TopSpeakerSchema
);

export default TopSpeakerModel;
