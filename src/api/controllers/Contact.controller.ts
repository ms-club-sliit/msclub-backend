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
      let emailTemplate = 'Contact-Us-Email-Template.html';
      let to = data.email;
      let subject = 'MS Club SLIIT - Contact Us';
      let emailBodyData = {
        name: data.name,
        email: data.email,
        message: data.message,
        date_time: moment(data.createdAt).format('LLL'),
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

// This function is for testing purposes.
export const testImageUploader = async (request: Request, response: Response, next: NextFunction) => {
  await getImageURL(request.file, 'profile-images')
    .then((data) => {
      request.handleResponse.successRespond(response)({ image_url: data});
    })
    .catch((error) => {
      logger.error(error.message);
      request.handleResponse.errorRespond(response)(error.message);
    })
}