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
import { IExecutiveBoard } from "../../interfaces/IExecutiveBoard";

const ExecutiveBoardSchema = new Schema<IExecutiveBoard>({
	year: { type: String, required: true },
	board: [{ type: mongoose.Schema.Types.ObjectId, ref: "boardmember" }],
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
});

const ExecutiveBoardModel = mongoose.model<IExecutiveBoard>("ececutiveboard", ExecutiveBoardSchema);

export default ExecutiveBoardModel;
