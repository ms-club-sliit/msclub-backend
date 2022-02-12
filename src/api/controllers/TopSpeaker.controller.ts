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
import TopSpeakerService from "../services";
import ImageService from "../../util/image.handler";

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns { ITopSpeaker } topSpeaker document
 */

export const insertTopSpeaker = async (request: Request, response: Response, next: NextFunction) => {
	const bucketDirectoryName = "topspeaker-flyers";

	const topSpeakerFlyerPath = await ImageService.uploadImage(request.file, bucketDirectoryName);
	request.body.createdBy = request.user && request.user._id ? request.user._id : null;
	request.body.imageUrl = topSpeakerFlyerPath;
	await TopSpeakerService.insertTopSpeaker(request.body)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns { ITopSpeaker } topSpeaker document
 */

export const getTopSpeaker = async (request: Request, response: Response, next: NextFunction) => {
	const topSpeakerId = request.params.topSpeakerId;

	if (topSpeakerId) {
		await TopSpeakerService.getTopSpeaker(request.params.topSpeakerId).then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		});
	} else {
		request.handleResponse.errorRespond(response)("Top Speaker ID not found");
	}
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns { ITopSpeaker[] } All top speakers in the system
 */

export const getTopSpeakers = async (request: Request, response: Response, next: NextFunction) => {
	await TopSpeakerService.getTopSpeakers()
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns { ITopSpeaker } - Updated top speaker details
 */

export const updateTopSpeaker = async (request: Request, response: Response, next: NextFunction) => {
	if (request.file) {
		const bucketDirectoryName = "topspeaker-flyers";

		const topSpeakerFlyerPath = await ImageService.uploadImage(request.file, bucketDirectoryName);
		request.body.imageUrl = topSpeakerFlyerPath;
	}
	const topSpeakerId = request.params.topSpeakerId;
	const updatedBy = request.user && request.user._id ? request.user._id : null;

	if (topSpeakerId) {
		await TopSpeakerService.updateTopSpeaker(request.params.topSpeakerId, request.body, updatedBy).then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		});
	} else {
		request.handleResponse.errorRespond(response)("Top Speaker ID not found");
	}
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns { ITopSpeaker } - Deleted top speaker details
 */

export const deleteTopSpeaker = async (request: Request, response: Response, next: NextFunction) => {
	const topSpeakerId = request.params.topSpeakerId;
	const deletedBy = request.user && request.user._id ? request.user._id : null;

	if (topSpeakerId) {
		await TopSpeakerService.deleteTopSpeaker(request.params.topSpeakerId, deletedBy).then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		});
	} else {
		request.handleResponse.errorRespond(response)("Top Speaker ID not found");
	}
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns { ITopSpeaker } - Recovered top speaker details
 */

export const recoverDeletedTopSpeaker = async (request: Request, response: Response, next: NextFunction) => {
	const topSpeakerId = request.params.topSpeakerId;

	if (topSpeakerId) {
		await TopSpeakerService.recoverDeletedTopSpeaker(topSpeakerId).then((data) => {
			request.handleResponse.successRespond(response)(data);
			next();
		});
	} else {
		request.handleResponse.errorRespond(response)({ message: "Top Speaker ID not found", dateTime: new Date() });
		next();
	}
};

export const getAllTopSpeakersForAdmin = async (request: Request, response: Response, next: NextFunction) => {
	await TopSpeakerService.getAllTopSpeakersForAdmin()
		.then((data: any) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const getDeletedTopSpeakersForAdmin = async (request: Request, response: Response, next: NextFunction) => {
	await TopSpeakerService.getDeletedTopSpeakersForAdmin()
		.then((data: any) => {
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const permenentDeleteTopSpeaker = async (request: Request, response: Response, next: NextFunction) => {
	const topSpeakerId = request.params.topSpeakerId;
	if (topSpeakerId) {
		await TopSpeakerService.permenentDeleteTopSpeaker(topSpeakerId)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("TopSpeaker ID not found");
	}
};
