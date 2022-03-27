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
import UserService from "../services";
import logger from "../../util/logger";
import ImageService from "../../util/image.handler";
import { IUserRequest } from "../../interfaces";
import LastLoggedUserModel from "../models/LastLogin.model";

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} User document
 */
export const createUser = async (request: Request, response: Response, next: NextFunction) => {
	const bucketDirectoryName = "profile-images";

	const profileImagePath = await ImageService.uploadImage(request.file, bucketDirectoryName);

	const userInfo: IUserRequest = {
		firstName: request.body.firstName as string,
		lastName: request.body.lastName as string,
		phoneNumber01: request.body.phoneNumber01 as string,
		phoneNumber02: request.body.phoneNumber02 as string,
		email: request.body.email as string,
		userName: request.body.userName as string,
		password: request.body.password as string,
		profileImage: profileImagePath as string,
		permissionLevel: request.body.permissionLevel as string,
	};

	await UserService.insertUser(userInfo)
		.then((data) => {
			logger.info(`New user with ID ${data._id} created`);
			request.handleResponse.successRespond(response)(data);
			next();
		})
		.catch((error: any) => {
			logger.error(error.message);
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} Authenticated user document
 */
export const login = async (request: Request, response: Response, next: NextFunction) => {
	const { userName, password } = request.body;
	if (userName && password) {
		await UserService.authenticateUser(userName, password)
			.then(async (user) => {
				const authToken = await user.generateAuthToken();
				const authResponseData = {
					token: authToken,
				};

				await getLogins(request, response, next);
				request.handleResponse.successRespond(response)(authResponseData);
			})
			.catch((error) => {
				const errorResponseData = {
					errorTime: new Date(),
					message: error.message,
				};

				logger.error(JSON.stringify(errorResponseData));
				request.handleResponse.errorRespond(response)(errorResponseData);
				next();
			});
	} else {
		logger.error("Username or Password is missing");
		request.handleResponse.errorRespond(response)("Username or Password is missing");
		next();
	}
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} Authenticated user document
 */
export const loginByFaceAuthentication = async (request: Request, response: Response, next: NextFunction) => {
	const bucketDirectoryName = "login-profile-images";

	const profileImagePath = await ImageService.uploadImage(request.file, bucketDirectoryName);
	if (profileImagePath) {
		await UserService.authenticateUserByFace(profileImagePath)
			.then(async (user) => {
				if (user) {
					const authToken = await user.generateAuthToken();
					const authResponseData = {
						token: authToken,
					};

					request.handleResponse.successRespond(response)(authResponseData);
				} else {
					request.handleResponse.successRespond(response)(null);
				}
			})
			.catch((error) => {
				const errorResponseData = {
					errorTime: new Date(),
					message: error.message,
				};

				logger.error(JSON.stringify(errorResponseData));
				request.handleResponse.errorRespond(response)(errorResponseData);
				next();
			});
	} else {
		logger.error("Username or Password is missing");
		request.handleResponse.errorRespond(response)("Username or Password is missing");
		next();
	}
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} Authenticated user document
 */
export const getAuthUser = async (request: Request, response: Response, next: NextFunction) => {
	const userInfo = {
		_id: request.user._id,
		userName: request.user.userName,
		permissionLevel: request.user.permissionLevel,
		authToken: request.user.authToken,
		imagePath: request.user.profileImage,
	};

	request.handleResponse.successRespond(response)(userInfo);
	next();
};

/**
 * @todo implement a @function getAllUsers that calls
 * @function getUsers in the UserService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser[]} All user documents in the system
 */
export const getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
	await UserService.getUsers()
		.then((users) => {
			request.handleResponse.successRespond(response)(users);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

/**
 * @todo implement a @function updateUser that calls
 * @function updateUser in the UserService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} Updated user document
 */
export const updateUser = async (request: Request, response: Response, next: NextFunction) => {
	const bucketDirectoryName = "profile-images";

	if (request.file) {
		request.body.profileImage = await ImageService.uploadImage(request.file, bucketDirectoryName);
	}

	await UserService.updateUser(request.user._id, request.body)
		.then((user) => {
			request.handleResponse.successRespond(response)(user);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

/**
 * @todo implement a @function adminUpdateUser that calls
 * @function adminUpdateUser in the UserService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} Updated user document
 */
export const adminUpdateUser = async (request: Request, response: Response, next: NextFunction) => {
	const bucketDirectoryName = "profile-images";

	if (request.file) {
		request.body.profileImage = await ImageService.uploadImage(request.file, bucketDirectoryName);
	}
	await UserService.adminUpdateUser(request.body)
		.then((user) => {
			request.handleResponse.successRespond(response)(user);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

/**
 * @todo implement a @function removeUser that calls
 * @function deleteUser in the UserService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} Deleted user document
 */
export const removeUser = async (request: Request, response: Response, next: NextFunction) => {
	await UserService.deleteUser(request.body.userId, request.user._id)
		.then((user) => {
			request.handleResponse.successRespond(response)(user);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(JSON.parse(error.message));
			next();
		});
};

/**
 * @todo implement a @function recoverUser that calls
 * @function recoverUser in the UserService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} Recover the deleted user
 */
export const recoverUser = async (request: Request, response: Response, next: NextFunction) => {
	await UserService.recoverUser(request.body.userId)
		.then((user) => {
			request.handleResponse.successRespond(response)(user);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(JSON.parse(error.message));
			next();
		});
};

/**
 * @todo implement a @function fetchDeletedUsers that calls
 * @function getRemovedUsers in the UserService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser[]} Deleted user documents
 */
export const getRemovedUsers = async (request: Request, response: Response, next: NextFunction) => {
	await UserService.fetchDeletedUsers()
		.then((users) => {
			request.handleResponse.successRespond(response)(users);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(JSON.parse(error.message));
			next();
		});
};

/**
 * @todo implement a @function deleteUserPermenently that calls
 * @function removeUserPermenently in the UserService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} Deleted user permanently
 */
export const removeUserPermenently = async (request: Request, response: Response, next: NextFunction) => {
	if (request.body.userId) {
		await UserService.deleteUserPermenently(request.body.userId)
			.then((user) => {
				request.handleResponse.successRespond(response)(user);
				next();
			})
			.catch((error) => {
				request.handleResponse.errorRespond(response)(JSON.parse(error.message));
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)(JSON.parse("User id is not Passed"));
		next();
	}
};

/**
 fetch all the details of last logged in users in the system
 */
export const getLogins = async (request: Request, response: Response, next: NextFunction) => {
	return await LastLoggedUserModel.aggregate([{ $match: { deletedAt: { $eq: null } } }])
		.then((users) => {
			request.handleResponse.successRespond(response)(users);
			next();
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};
