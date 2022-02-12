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

import { object, string, array } from "yup";

const webURLRegEx = RegExp(
	// eslint-disable-next-line
	/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/g
);

const contactNumberRegEx = RegExp(
	//eslint-disable-next-line
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
);

const applicationSchema = object({
	studentId: string().length(10).required("SLIIT ID is required"),
	name: string().required("Name is required"),
	email: string().required("Email is required").email("Email is not valid"),
	contactNumber: string()
		.required("Phone number is required")
		.min(10)
		.max(10)
		.matches(contactNumberRegEx, "Invalid phone number"),
	currentAcademicYear: string().required("Academic year is required"),
	selfIntroduction: string().required("Self introduction is required"),
	reasonForJoin: string().required("Reason for join is required"),
	linkedIn: string().required("LinkedIn profile is required").matches(webURLRegEx, "Invalid link"),
	gitHub: string().required("GitHub profile is required").matches(webURLRegEx, "Invalid link"),
	blog: string().matches(webURLRegEx, "Invalid link"),
	experiences: string().max(1500, "Character count exceed: (Maximum: 1500)"),
	challenges: string().max(1500, "Character count exceed: (Maximum: 1500)"),
	goal: string().required("Goal is required"),
	skillsAndTalents: array().of(string()),
	pastWork: string().max(1500, "Character count exceed: (Maximum: 1500)"),
});

export { applicationSchema };
