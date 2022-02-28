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
		body: {
			application: {
				studentId: { type: String, required: false },
				name: { type: String, required: false },
				email: { type: String, required: false },
				contactNumber: { type: String, required: false },
				currentAcademicYear: { type: String, required: false },
				linkedIn: { type: String, required: false },
				gitHub: { type: String, required: false },
				skillsAndTalents: [{ type: String, required: false }],
			},
			contactUs: {
				name: { type: String, required: false },
				email: { type: String, required: false },
				message: { type: String, required: false },
				date_time: { type: Date, required: false },
			},
		},
	},
	{
		timestamps: true,
	}
);

const EmailModel = mongoose.model<IEmail>("emails", EmailSchema);

export default EmailModel;
