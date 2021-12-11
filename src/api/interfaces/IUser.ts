import { Document, Schema } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber01: string;
  phoneNumber02: string;
  userName?: string;
  password?: string;
  profileImageUrl?: string;
  permissionLevel: string;
  authToken?: string;
  deletedAt?: Date;
  deletedBy?: Schema.Types.ObjectId;
  generateAuthToken(): string;
} 

export type { IUser };