import { Document } from 'mongoose';

interface ITopSpeaker extends Document {
  id: number;
  image_url?: string;
  title: string;
  description: string;
  socialMedia: ITopSpeakerMedia;
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
