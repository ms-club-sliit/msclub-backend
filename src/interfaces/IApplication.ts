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

import { Document } from "mongoose";

interface IApplication extends Document {
	studentId: string;
	name: string;
	email: string;
	contactNumber: string;
	currentAcademicYear: string;
	selfIntroduction: string;
	reasonForJoin: string;
	linkedIn: string;
	gitHub: string;
	blog?: string;
	experiences?: string;
	challenges?: string;
	goal: string;
	skillsAndTalents: string[];
	pastWork?: string;
	deletedAt?: Date | null;
	status: string;
}

export type { IApplication };
