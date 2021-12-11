import { Document, Schema } from "mongoose";

interface IUpdatedBy {
  user: Schema.Types.ObjectId;
  updatedAt: Date;
}
interface IEvent extends Document {
  title: string;
  description: string;
  imageUrl: string;
  dateTime: Date;
  tags?: string[];
  link?: string;
  eventType: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  createdBy: Schema.Types.ObjectId;
  updatedBy: IUpdatedBy[];
  deletedBy?: Schema.Types.ObjectId;
}

export type { IEvent, IUpdatedBy };
