import { Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber01: string;
  phoneNumber02: string;
  addressLine01: string;
  addressLine02: string;
  city: string;
  province: string;
  userName?: string;
  password?: string;
  profileImageUrl?: string;
  description?: string;
  socialMedia: ISocialMedia[];
  tags?: string[];
  authToken?: string;
  generateAuthToken(): string;
} 

interface ISocialMedia {
  name: string;
  publicURL: string;
}

export type { IUser };