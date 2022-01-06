import { Document, Model, Schema } from "mongoose";

interface IUserRequest {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber01: string;
	phoneNumber02: string;
	userName: string;
	password: string;
	profileImage?: any;
	authToken?: string;
	permissionLevel: string;
}

interface IUserDocument extends Document {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber01: string;
	phoneNumber02: string;
	userName: string;
	password: string;
	profileImage?: any;
	authToken?: string;
	permissionLevel: string;
	deletedAt?: Date | null;
	deletedBy?: Schema.Types.ObjectId | null;
}

// Object level functions for the schema
interface IUser extends IUserDocument {
	generateAuthToken(): string;
}

// Static functions for the schema
interface IUserModel extends Model<IUser> {
	// eslint-disable-next-line no-unused-vars
	findByUsernamePassword(userName: string, password: string): IUser;
}

export type { IUser, IUserModel, IUserRequest };
