import { Document } from "mongoose";

interface IContact extends Document {
	name: string;
	email: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

export type { IContact };
