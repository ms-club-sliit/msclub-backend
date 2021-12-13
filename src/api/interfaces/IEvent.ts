import { Document } from 'mongoose';

interface IEvent extends Document {
  title : string;
  description : string;
  imageUrl : string;
  dateTime : Date;
  tags ?: string[];
  link ?: string;
  registrationLink?: string;
  eventType : string;
  deletedAt ?: Date;
};

export type { IEvent };