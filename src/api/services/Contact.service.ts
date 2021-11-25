import { DocumentDefinition, FilterQuery } from 'mongoose';
import { IContact } from '../interfaces';
import ContactModel from '../models/Contact.model';

/**
 * @todo create @function insertContact to save a user in the database
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