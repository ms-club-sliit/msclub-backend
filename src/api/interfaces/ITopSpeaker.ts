import { Document } from 'mongoose';

interface ITopSpeaker extends Document {
  id: number;
  imageUrl?: string;
  title: string;
  description: string;
  socialMediaURLs: ITopSpeakerMedia;
  deletedAt?: Date;
}

interface ITopSpeakerMedia {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedIn: string;
  web: string;
}

export type { ITopSpeaker };
