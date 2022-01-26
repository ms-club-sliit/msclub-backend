import { DocumentDefinition } from "mongoose";
import { IContact } from "../../interfaces";
import ContactModel from "../models/Contact.model";
import moment from "moment";
import { request } from "express";

/**
 * @param {IContact} contactData
 * @returns {IContact} Contact data
 */
export const insertContact = async (contactData: DocumentDefinition<IContact>) => {
	return await ContactModel.create(contactData)
		.then(async (data) => {
			// Send email
			const emailTemplate = "Contact-Us-Email-Template.html";
			const to = data.email;
			const subject = "MS Club SLIIT - Contact Us";
			const emailBodyData = {
				name: data.name,
				email: data.email,
				message: data.message,
				date_time: moment(data.createdAt).format("LLL"),
			};

			const email = {
				template: emailTemplate,
				to: to,
				subject: subject,
				body: emailBodyData,
			};

			// Send email data to message queue
			const channel = request.channel;
			request.queue.publishMessage(channel, JSON.stringify(email));
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
