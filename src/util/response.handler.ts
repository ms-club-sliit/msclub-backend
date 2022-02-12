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

import { Response } from "express";

const successRespond = (response: Response, status = 201) => {
	return function (data: any) {
		if (!data) {
			return response.status(204).json({ status: 204, message: "Not Found" });
		}
		return response.status(status).json(data);
	};
};

const notFoundRespond = (response: Response) => {
	return function (data: any) {
		if (!data) {
			return response.status(204).json({ status: 204, message: "Not Found" });
		}
		return response.status(404).json({ status: 404, details: "Not Found" });
	};
};

const errorRespond = (response: Response) => {
	return function (error: any) {
		return response.status(400).json({ status: 400, details: error });
	};
};

const unauthorizedRespond = (response: Response) => {
	return function (data: any) {
		if (!data) {
			return response.status(204).json({ status: 204, message: "Not Found" });
		}
		return response.status(401).json({ details: data });
	};
};

export default { successRespond, notFoundRespond, errorRespond, unauthorizedRespond };
