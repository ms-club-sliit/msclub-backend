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

import { Request, Response, NextFunction } from "express";
import ImageService from "../../util/image.handler";
import OrganizationService from "../services";

export const insertOrganization = async (request: Request, response: Response, next: NextFunction) => {
	const bucketDirectoryName = "organization-images";
	const organizationImagePath = await ImageService.uploadImage(request.file, bucketDirectoryName);
	request.body.imagePath = organizationImagePath;

	await OrganizationService.createOrganization(request.body, request.user._id)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const getOrganization = async (request: Request, response: Response, next: NextFunction) => {
	await OrganizationService.getOrganizationInfo()
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const getOrganizationForAdmin = async (request: Request, response: Response, next: NextFunction) => {
	await OrganizationService.getOrganizationInfoForAdmin()
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const updateOrganization = async (request: Request, response: Response, next: NextFunction) => {
	if (request.file) {
		const bucketDirectoryName = "organization-images";
		const organizationImagePath = await ImageService.uploadImage(request.file, bucketDirectoryName);
		request.body.imagePath = organizationImagePath;
	}
	const updatedBy = request.user && request.user._id ? request.user._id : null;
	const organizationId = request.body.organizationId;

	await OrganizationService.updateOrganizationInfo(organizationId, request.body, updatedBy)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};
