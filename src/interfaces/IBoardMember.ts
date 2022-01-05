import { Document, Schema } from "mongoose";

interface IUpdatedBy {
	user: Schema.Types.ObjectId;
	updatedAt: Date;
}

interface IBoardMember extends Document {
	name: string;
	position: string;
	imageUrl?: string;
	socialMedia: ISocialMedia;
	deletedAt?: Date;
	createdBy: Schema.Types.ObjectId;
	updatedBy: IUpdatedBy[];
	deletedBy?: Schema.Types.ObjectId;
}

interface ISocialMedia {
	facebook: string;
	instagram: string;
	twitter: string;
	linkedIn: string;
}

export type { IBoardMember };
