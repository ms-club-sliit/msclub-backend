import { Document } from 'mongoose';

interface IBoardMember extends Document {
  name: string;
  position: string;
  image?: string;
  socialMedia: {
    facebook:String,
    linkedin:String,
    instagram:String,
    twitter:String,
  };
} 


export type { IBoardMember };