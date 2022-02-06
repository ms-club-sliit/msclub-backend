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
