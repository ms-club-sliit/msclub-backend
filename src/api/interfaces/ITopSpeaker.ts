import { Document } from 'mongoose';

interface ITopSpeaker extends Document {
  speakerName: string;
  description: string;
  image_url?: string;
  socialMedia: ITopSpeakerMedia[];
  deletedAt?: string;
}

interface ITopSpeakerMedia {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedIn: string;
  web: string;
}

export type { ITopSpeaker };
