/*
 * Created on Sat Feb 12 2022
 *
 * The GNU General Public License v3.0
 * Copyright (c) 2022 MS Club SLIIT Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program at
 *
 *     https://www.gnu.org/licenses/
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 */

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
	persistedFaceId?: string;
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
	persistedFaceId?: string;
	permissionLevel: string;
	deletedAt?: Date | null;
	deletedBy?: Schema.Types.ObjectId | null;
}

interface ILastLoggedUser extends Document {
	loggedAt: string | null;
	userId: Schema.Types.ObjectId | null;
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

export type { IUser, IUserModel, IUserRequest, ILastLoggedUser };
