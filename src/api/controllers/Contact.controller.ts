import { Request, Response, NextFunction } from 'express';
import ContactService from '../services';
import Email from '../../util/email.handler';
import { getImageURL } from '../../util/image.handler';
import path from 'path';
import moment from 'moment';
import logger from '../../util/logger';

/**
 * @param {Request} request - Request from the frontend
 * @param {Response} response - Response that need to send to the client
 * @param {NextFunction} next - Next function
 * @returns {IContact} Contact document
 */
export const createContact = async (request: Request, response: Response, next: NextFunction) => {
  await ContactService.insertContact(request.body)
    .then((data) => {
      // Send email 
      const emailTemplate = 'Contact-Us-Email-Template.html';
      const to = data.email;
      const subject = 'MS Club SLIIT - Contact Us';
      const emailBodyData = {
        name: data.name,
        email: data.email,
        message: data.message,
        dateTime: moment(data.createdAt).format('LLL'),
      };

      Email.sendEmailWithTemplate(emailTemplate, to, subject, emailBodyData)
        .then((emailData) => {
          request.handleResponse.successRespond(response)({
            contactData: data,
            emailData: emailData,
          });
        })
        .catch((error) => {
          request.handleResponse.errorRespond(response)({
            message: error.message,
            data: data,
          });
        });
    })
    .catch((error: any) => {
      request.handleResponse.errorRespond(response)(error.message);
      next();
    });
}

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
}

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
}