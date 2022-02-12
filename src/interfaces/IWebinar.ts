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
