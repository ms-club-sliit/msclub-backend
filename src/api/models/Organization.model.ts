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

import mongoose, { Schema } from "mongoose";
import { IOrganization } from "../../interfaces";

const OrganizationSchema = new Schema<IOrganization>(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true },
		university: { type: String, required: true, trim: true },
		phoneNumber: { type: String, required: false, trim: true },
		address: { type: String, required: true, trim: true },
		website: { type: String, required: true, trim: true },
		imagePath: { type: String, required: true, trim: true },
		updatedBy: [
			{
				user: { type: Schema.Types.ObjectId, required: false, ref: "users" },
				updatedAt: { type: Date, required: false },
			},
		],
	},
	{
		timestamps: true,
	}
);

const OrganizationModel = mongoose.model<IOrganization>("organization", OrganizationSchema);

export default OrganizationModel;
