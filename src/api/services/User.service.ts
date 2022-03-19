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

import { DocumentDefinition, Schema } from "mongoose";
import { IUser, IUserRequest } from "../../interfaces";
import UserModel from "../models/User.model";
import axios from "axios";

/**
 * @param {IUser} userData
 * @returns {Document} User document
 */
export const insertUser = async (userData: DocumentDefinition<IUserRequest>) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			"Ocp-Apim-Subscription-Key": process.env.FACE_API_KEY || "null",
		},
	};

	const profileImageDetails = {
		url: process.env.STORAGE_BUCKET_URL + userData.profileImage,
	};

	return await axios
		.post(
			`${process.env.FACE_API_HOST}/face/v1.0/largefacelists/${process.env.FACE_API_LARGE_LIST}/persistedfaces?detectionModel=detection_01`,
			profileImageDetails,
			config
		)
		.then(async (response) => {
			userData.persistedFaceId = response.data.persistedFaceId;
			return await UserModel.create(userData)
				.then(async (user) => {
					return await axios
						.post(
							`${process.env.FACE_API_HOST}/face/v1.0/largefacelists/${process.env.FACE_API_LARGE_LIST}/train`,
							"",
							config
						)
						.then(async () => {
							await user.generateAuthToken();
							return user;
						})
						.catch((error) => {
							return axios
								.delete(
									`${process.env.FACE_API_HOST}/face/v1.0/largefacelists/${process.env.FACE_API_LARGE_LIST}/persistedfaces/${response.data.persistedFaceId}`,
									config
								)
								.then(() => {
									return axios
										.post(
											`${process.env.FACE_API_HOST}/face/v1.0/largefacelists/${process.env.FACE_API_LARGE_LIST}/train`,
											"",
											config
										)
										.then(() => {
											return user;
										})
										.catch(() => {
											throw new Error(error.message);
										});
								})
								.catch(() => {
									throw new Error(error.message);
								});
						});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		});
};

export const authenticateUser = async (userName: string, password: string) => {
	try {
		return await UserModel.findByUsernamePassword(userName, password);
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const authenticateUserByFace = async (imageUrl: string) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			"Ocp-Apim-Subscription-Key": process.env.FACE_API_KEY || "null",
		},
	};

	const newImageDetails = {
		url: process.env.STORAGE_BUCKET_URL + imageUrl,
	};

	return await axios
		.post(
			`${process.env.FACE_API_HOST}/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_03&returnRecognitionModel=false&detectionModel=detection_02&faceIdTimeToLive=86400`,
			newImageDetails,
			config
		)
		.then(async (response) => {
			const newUserLogin = {
				faceId: response.data[0].faceId,
				largeFaceListId: process.env.FACE_API_LARGE_LIST,
				maxNumOfCandidatesReturned: 10,
				mode: "matchPerson",
			};

			return await axios
				.post(`${process.env.FACE_API_HOST}/face/v1.0/findsimilars`, newUserLogin, config)
				.then(async (responseLargeFaceList) => {
					return await UserModel.findOne({ persistedFaceId: responseLargeFaceList.data[0].persistedFaceId })
						.then((user) => {
							return user;
						})
						.catch((error) => {
							throw new Error(error.message);
						});
				})
				.catch((error) => {
					throw new Error(error.message);
				});
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 *get all users
 */
export const getUsers = async () => {
	return await UserModel.find({ deletedAt: null })
		.then((users) => {
			return users;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 * update user
 * @param userId @type string
 * @param updateData @type DocumentDefinition<IUser>
 */
export const updateUser = async (userId: string, updateData: DocumentDefinition<IUser>) => {
	return await UserModel.findById(userId)
		.then(async (userDetails) => {
			if (userDetails) {
				if (userDetails.deletedAt === null) {
					if (updateData.firstName) {
						userDetails.firstName = updateData.firstName;
					}
					if (updateData.lastName) {
						userDetails.lastName = updateData.lastName;
					}
					if (updateData.phoneNumber01) {
						userDetails.phoneNumber01 = updateData.phoneNumber01;
					}
					if (updateData.phoneNumber02) {
						userDetails.phoneNumber02 = updateData.phoneNumber02;
					}
					if (updateData.email) {
						userDetails.email = updateData.email;
					}
					if (updateData.userName) {
						userDetails.userName = updateData.userName;
					}
					if (updateData.password) {
						userDetails.password = updateData.password;
					}
					if (updateData.profileImage) {
						userDetails.profileImage = updateData.profileImage;
					}
					if (updateData.permissionLevel) {
						userDetails.permissionLevel = updateData.permissionLevel;
					}

					return await userDetails.save();
				} else {
					throw new Error("User is not found");
				}
			} else {
				throw new Error("User already removed");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 * admin update user
 * @param updateData @type DocumentDefinition<IUser>
 */
export const adminUpdateUser = async (updateData: DocumentDefinition<IUser>) => {
	return await UserModel.findById(updateData._id)
		.then(async (userDetails) => {
			if (userDetails) {
				if (userDetails.deletedAt === null) {
					if (updateData.firstName) {
						userDetails.firstName = updateData.firstName;
					}
					if (updateData.lastName) {
						userDetails.lastName = updateData.lastName;
					}
					if (updateData.phoneNumber01) {
						userDetails.phoneNumber01 = updateData.phoneNumber01;
					}
					if (updateData.phoneNumber02) {
						userDetails.phoneNumber02 = updateData.phoneNumber02;
					}
					if (updateData.email) {
						userDetails.email = updateData.email;
					}
					if (updateData.userName) {
						userDetails.userName = updateData.userName;
					}
					if (updateData.password) {
						userDetails.password = updateData.password;
					}
					if (updateData.profileImage) {
						userDetails.profileImage = updateData.profileImage;
					}
					if (updateData.permissionLevel) {
						userDetails.permissionLevel = updateData.permissionLevel;
					}

					return await userDetails.save();
				} else {
					throw new Error("User is not found");
				}
			} else {
				throw new Error("User already removed");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 * delete user
 * @param userId @type string
 */
export const deleteUser = async (userId: string, deletedBy: Schema.Types.ObjectId) => {
	return await UserModel.findById(userId)
		.then(async (userDetails) => {
			if (userDetails && userDetails.deletedAt === null) {
				userDetails.deletedAt = new Date();
				userDetails.deletedBy = deletedBy;
				return await userDetails.save();
			} else {
				const errorInfo = {
					time: new Date(),
					message: "User already removed",
				};
				throw new Error(JSON.stringify(errorInfo));
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

export const recoverUser = async (userId: string) => {
	return await UserModel.findById(userId)
		.then(async (user) => {
			if (user) {
				user.deletedAt = null;
				user.deletedBy = null;

				return await user.save();
			}
		})
		.catch((error) => {
			const errorInfo = {
				time: new Date(),
				message: error.message,
			};
			throw new Error(JSON.stringify(errorInfo));
		});
};

export const fetchDeletedUsers = async () => {
	return await UserModel.find({ deletedAt: { $ne: null } })
		.then((users) => {
			return users;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

export const deleteUserPermenently = async (userId: string) => {
	return await UserModel.findByIdAndDelete(userId)
		.then((user) => {
			return user;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
