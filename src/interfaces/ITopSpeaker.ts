import { Document,Schema } from 'mongoose';

interface IUpdatedBy {
  user: Schema.Types.ObjectId;
  updatedAt: Date;
}

interface ITopSpeaker extends Document {
  imageUrl?: string;
  title: string;
  description: string;
  socialMediaURLs: ITopSpeakerMedia;
  deletedAt?: Date;
  createdBy: Schema.Types.ObjectId;
  updatedBy: IUpdatedBy[];
  deletedBy?: Schema.Types.ObjectId;
}

interface ITopSpeakerMedia {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedIn: string;
  web: string;
}

export type { ITopSpeaker };
