import { DocumentDefinition } from "mongoose";
import { IContact } from "../../interfaces";
import ContactModel from "../models/Contact.model";

/**
 * @param {IContact} contactData
 * @returns {IContact} Contact data
 */
export const insertContact = async (contactData: DocumentDefinition<IContact>) => {
  return await ContactModel.create(contactData)
    .then((data) => {
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
    .then((contacts) => {
      return contacts;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
