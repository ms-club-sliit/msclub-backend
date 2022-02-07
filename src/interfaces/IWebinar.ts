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
	tags?: string[];
	link?: string;
	registrationLink?: string;
	webinarType: string;
	deletedAt?: Date | null;
	createdBy: Schema.Types.ObjectId;
	updatedBy: IUpdatedBy[];
	deletedBy?: Schema.Types.ObjectId | null;
}

export type { IWebinar };
