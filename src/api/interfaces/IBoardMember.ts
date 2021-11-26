import { Document } from 'mongoose';

interface IBoardMember extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  position: string;
  profileImageUrl?: string;
  socialMedia: ISocialMedia[];
  generateAuthToken(): string;
} 

interface ISocialMedia {
  name: string;
  publicURL: string;
}

export type { IBoardMember };