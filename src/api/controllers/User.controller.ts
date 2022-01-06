import { Request, Response, NextFunction } from "express";
import UserService from "../services";
import logger from "../../util/logger";
import ImageService from "../../util/image.handler";
import { IUserRequest } from "../../interfaces";

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
export const getAuthUser = async (request: Request, response: Response, next: NextFunction) => {
	const userInfo = {
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
 * @todo implement a @function removeUser that calls
 * @function deleteUser in the UserService
 *
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IUser} Deleted user document
 */
export const removeUser = async (request: Request, response: Response, next: NextFunction) => {
	await UserService.deleteUser(request.user._id, request.user._id)
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
