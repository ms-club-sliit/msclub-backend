import { Document } from 'mongoose';

interface ITopSpeaker extends Document {
  speakerName: string;
  description: string;
  image_url?: string;
  socialMedia: ITopSpeakerMedia[];
  isDelete: boolean;
}

interface ITopSpeakerMedia {
  name: string;
  publicURL: string;
}

export type { ITopSpeaker };
