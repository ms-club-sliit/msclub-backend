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
import validator from "validator";
import { IContact } from "../../interfaces";

const ContactSchema = new Schema<IContact>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
			validate(value: string) {
				if (!validator.isEmail(value)) {
					throw new Error("Email address is not valid");
				}
			},
		},
		message: {
			type: String,
			required: [true, "Message is required"],
			trim: true,
		},
		deletedAt: { type: Date, required: false, default: null },
		replies: [
			{
				type: String,
				required: false,
			},
		],
	},
	{
		timestamps: true,
	}
);

const ContactModel = mongoose.model<IContact>("contacts", ContactSchema);

export default ContactModel;
