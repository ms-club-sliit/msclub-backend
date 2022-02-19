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
import { IContact } from "../../interfaces";
import ContactService from "../services";

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IContact} Contact document
 */
export const createContact = async (request: Request, response: Response, next: NextFunction) => {
	await ContactService.insertContact(request, request.body)
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
 * @returns {IContact[]} Contacts
 */
export const getAllContacts = async (request: Request, response: Response, next: NextFunction) => {
	await ContactService.fetchContactInfo()
		.then((contacts) => {
			request.handleResponse.successRespond(response)(contacts);
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IContact[]} Removed contact information
 */
export const removeContact = async (request: Request, response: Response, next: NextFunction) => {
	await ContactService.archiveContact(request.params.contactId)
		.then((deletedContactData) => {
			request.handleResponse.successRespond(response)(deletedContactData);
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const removedContacts = async (request: Request, response: Response, next: NextFunction) => {
	await ContactService.getArchivedContacts()
		.then((data: IContact[]) => {
			request.handleResponse.successRespond(response)(data);
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IContact[]} Removed contact information
 */
export const removeContactPermanently = async (request: Request, response: Response, next: NextFunction) => {
	await ContactService.deleteContactPermanently(request.params.contactId)
		.then((data) => {
			request.handleResponse.successRespond(response)(data);
		})
		.catch((error) => {
			request.handleResponse.errorRespond(response)(error.message);
			next();
		});
};

export const recoverRemovedInquiry = async (request: Request, response: Response, next: NextFunction) => {
	const inquiryId = request.params.inquiryId;
	if (inquiryId) {
		await ContactService.recoverDeletedInquiry(inquiryId)
			.then((data) => {
				request.handleResponse.successRespond(response)(data);
				next();
			})
			.catch((error) => {
				request.handleResponse.errorRespond(response)(error.message);
				next();
			});
	} else {
		request.handleResponse.errorRespond(response)("Inquiry ID not found");
	}
};
