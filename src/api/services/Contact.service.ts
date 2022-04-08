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

import { Request } from "express";
import { DocumentDefinition } from "mongoose";
import { IContact, IInquiryReply } from "../../interfaces";
import { EmailTemplate, EmailType, EmailStatus } from "./Service.constant";
import ContactModel from "../models/Contact.model";
import moment from "moment";
import EmailModel from "../models/Email.model";

/**
 * @param {IContact} contactData
 * @returns {IContact} Contact data
 */
export const insertContact = async (request: Request, contactData: DocumentDefinition<IContact>) => {
	return await ContactModel.create(contactData)
		.then(async (data) => {
			const email = {
				templateName: EmailTemplate.ContactUs,
				to: data.email,
				subject: "MS Club SLIIT - Contact Us",
				body: {
					name: data.name,
					email: data.email,
					message: data.message,
					date_time: moment(data.createdAt).format("LLL"),
				},
				status: EmailStatus.Waiting,
				type: EmailType.ContactUs,
			};

			await EmailModel.create(email);
			return data;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 * @param {string} contactId
 * @returns {IContact} Updated contact data
 */
export const archiveContact = async (contactId: string) => {
	return await ContactModel.findById(contactId)
		.then(async (contactData) => {
			if (contactData && contactData.deletedAt === null) {
				contactData.deletedAt = new Date();
				return await contactData.save();
			} else {
				return "Contact not found";
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 * @returns {IContact[]} All available contacts
 */
export const fetchContactInfo = async () => {
	return await ContactModel.aggregate([{ $match: { deletedAt: { $eq: null } } }])
		.sort({ createdAt: -1 })
		.then((contacts) => {
			return contacts;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
Get deleted inquiries - admin
 */
export const getArchivedContacts = async () => {
	return await ContactModel.aggregate([{ $match: { deletedAt: { $ne: null } } }])
		.then((contacts) => {
			return contacts;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

/**
 * Delete Contact Permenently
@returns {IContact[]} Deleted Contact Details
 */
export const deleteContactPermanently = async (contactId: string) => {
	if (contactId) {
		return ContactModel.findByIdAndDelete(contactId)
			.then((contacts) => {
				if (contacts != null) return contacts;
				else return "Contact Not Found";
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	} else {
		throw new Error("Contact ID not Found");
	}
};

// Recover deleted inquiries
export const recoverDeletedInquiry = async (inquiryId: string) => {
	if (inquiryId) {
		return await ContactModel.findById(inquiryId)
			.then(async (inquiryDetails) => {
				if (inquiryDetails) {
					if (inquiryDetails.deletedAt !== null) {
						inquiryDetails.deletedAt = null;
						return await inquiryDetails.save();
					} else {
						return "Inquiry is already recovered";
					}
				}
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	} else {
		throw new Error("Inquiry ID not Passed");
	}
};

export const replyInquiry = async (
	request: Request,
	inquiryId: string,
	replyData: DocumentDefinition<IInquiryReply>
) => {
	return await ContactModel.findById(inquiryId)
		.then(async (data) => {
			if (data) {
				const to = data.email;
				const subject = "MS Club of SLIIT";

				const email = {
					to: to,
					subject: subject,
					body: replyData,
				};

				const channel = request.channel;
				request.queue.publishMessage(channel, JSON.stringify(email));

				data.replies.push(replyData.reply);
				return await data.save();
			} else {
				return null;
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};
