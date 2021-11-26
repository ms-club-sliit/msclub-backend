import { DocumentDefinition } from 'mongoose';
import { IContact } from '../interfaces';
import ContactModel from '../models/Contact.model';

/**
 * @param {IContact} contactData
 * @returns {IContact} Contact data
 * @throws Error 
 */
export const insertContact = async (contactData: DocumentDefinition<IContact>) => {
  return await ContactModel.create(contactData)
    .then(async (data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}