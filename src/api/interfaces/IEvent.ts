import { Document } from 'mongoose';

interface IEvent extends Document {
  eventName : string;
  description : string;
  imageUrl : string;
  dateTime : Date;
  tags ?: string[];
  link ?: string;
  eventType : string;
  isDeleted : boolean;
};

export type { IEvent };