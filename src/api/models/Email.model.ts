/*
 * Created on Tue Mar 01 2022
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
import { IEmail } from "../../interfaces/IEmail";

const EmailSchema = new Schema<IEmail>(
	{
		templateName: { type: String, required: true },
		to: { type: String, required: true },
		subject: { type: String, required: true },
		status: {
			type: String,
			enum: ["WAITING", "IN-PROGRESS", "DELIVERED"],
			default: "WAITING",
			required: true,
		},
		body: { type: Schema.Types.Mixed, required: true },
		type: {
			type: String,
			enum: ["Application", "ContactUs"],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const EmailModel = mongoose.model<IEmail>("emails", EmailSchema);

export default EmailModel;
