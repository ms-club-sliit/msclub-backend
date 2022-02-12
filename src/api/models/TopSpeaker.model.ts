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
import { ITopSpeaker } from "../../interfaces";

const TopSpeakerSchema = new Schema<ITopSpeaker>(
	{
		imageUrl: { type: String, required: false, default: null },
		title: { type: String, required: true },
		description: { type: String, required: false },
		socialMediaURLs: {
			facebook: { type: String, required: true },
			instagram: { type: String, required: true },
			twitter: { type: String, required: true },
			linkedIn: { type: String, required: true },
			web: { type: String, required: true },
		},
		deletedAt: { type: Date, required: false, default: null },
		createdBy: { type: Schema.Types.ObjectId, required: true, ref: "users" },
		updatedBy: [
			{
				user: { type: Schema.Types.ObjectId, required: false, ref: "users" },
				updatedAt: { type: Date, required: false },
			},
		],
		deletedBy: {
			type: Schema.Types.ObjectId,
			required: false,
			default: null,
			ref: "users",
		},
	},
	{ timestamps: true }
);

const TopSpeakerModel = mongoose.model<ITopSpeaker>("topSpeaker", TopSpeakerSchema);

export default TopSpeakerModel;
