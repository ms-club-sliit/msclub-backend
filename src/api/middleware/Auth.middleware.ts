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
import jwt from "jsonwebtoken";
import logger from "../../util/logger";
import UserModel from "../models/User.model";

/**
 * User authentication middleware function
 * @param request
 * @param response
 * @param next
 * @returns user and authToken
 *
 * For every private API endpoint, this function will execute first to identify
 * the user in the system. If the authentication success, then only necessary
 * method will execute.
 */
export const authenticate = async (request: Request, response: Response, next: NextFunction) => {
	try {
		const secret = process.env.JWT_SECRET as string;

		if (secret) {
			const authToken = request.header("Authorization") as string;
			const decode = jwt.verify(authToken, secret);
			const user = await UserModel.findOne({
				_id: decode as string,
				authToken: authToken,
			});

			if (!user) {
				const useNotFoundResponse = JSON.stringify({
					status: 401,
					message: "User not found in the system",
				});
				throw new Error(useNotFoundResponse);
			}

			request.authToken = authToken;
			request.user = user;

			logger.info(`Authentication Token for ID ${user._id} is Accepted`);
			next();
		} else {
			throw new Error("Token Secret is not found");
		}
	} catch (error: any) {
		logger.warn(error.message);
		return request.handleResponse.unauthorizedRespond(response)(error.message);
	}
};
