import { Express, Request, Response, NextFunction } from 'express';
import ContactService from '../services';
import Email from '../../util/email.handler';
import path from 'path';
import moment from 'moment';

export const createContact = async (request: Request, response: Response, next: NextFunction) => {
  await ContactService.insertContact(request.body)
    .then((data) => {
      // Send email 
      let emailTemplate = path.join(__dirname, '../..', 'templates', 'Contact-Us-Email-Template.html');
      let to = data.email;
      let subject = 'MS Club SLIIT - Contact Us';
      let emailBodyData = {
        name: data.name,
        email: data.email,
        message: data.message,
        date_time: moment(data.createdAt).format('LLL'),
      };

      Email.sendEmail(emailTemplate, to, subject, emailBodyData)
        .then((emailData) => {
          request.handleResponse.successRespond(response)(data);
        })
        .catch((error) => {
          request.handleResponse.errorRespond(response)(error.message);
        });
    })
    .catch((error: any) => {
      request.handleResponse.errorRespond(response)(error.message);
      next();
    });
}