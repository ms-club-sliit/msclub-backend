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
import { IApplication } from "../../interfaces";

const ApplicationSchema = new Schema<IApplication>(
	{
		studentId: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		contactNumber: { type: String, required: true },
		currentAcademicYear: { type: String, required: true },
		selfIntroduction: { type: String, required: true },
		reasonForJoin: { type: String, required: true },
		linkedIn: { type: String, required: true },
		gitHub: { type: String, required: true },
		blog: { type: String, required: false },
		experiences: { type: String, required: false },
		challenges: { type: String, required: false },
		goal: { type: String, required: true },
		skillsAndTalents: [{ type: String, required: true }],
		pastWork: { type: String, required: false },
		deletedAt: { type: Date, required: false, default: null },
		status: {
			type: String,
			enum: ["PENDING", "INTERVIEW", "SELECTED", "REJECTED"],
			required: false,
			default: "PENDING",
		},
		meeting: { type: mongoose.Schema.Types.ObjectId, ref: "meeting" },
	},
	{ timestamps: true }
);

const ApplicationModel = mongoose.model<IApplication>("application", ApplicationSchema);

export default ApplicationModel;
