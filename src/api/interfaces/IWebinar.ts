import { Document, Schema } from "mongoose";

interface IUpdatedBy {
  user: Schema.Types.ObjectId;
  updatedAt: Date;
}

interface IWebinar extends Document {
  title: string;
  description: string;
  imageUrl: string;
  dateTime: Date;
  time: Date;
  tags?: string[];
  link?: string;
  registrationLink?: string;
  webinarType: string;
  deletedAt?: Date;
  createdBy: Schema.Types.ObjectId;
  updatedBy: IUpdatedBy[];
  deletedBy?: Schema.Types.ObjectId;
}

export type { IWebinar };
