import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import logger from './logger';
import { configuration } from '../config';
import moment from 'moment';
import fetch from 'cross-fetch';
import storage from '../config/storage.config';

// HTML Configuration
require.extensions['.html'] = (module: any, fileName: string) => {
  module.exports = fs.readFileSync(fileName, 'utf8');
}

const transport = nodemailer.createTransport({
  host: configuration.email.host,
  port: configuration.email.port,
  secure: configuration.email.secure,
  auth: {
    user: configuration.email.auth.user,
    pass: configuration.email.auth.pass
  }
});

let template: HandlebarsTemplateDelegate;
let htmlToSend: string;

class EmailService {
  static sendEmailWithTemplate(fileName: string, to: string, subject: string,  emailBodyData: any) {
    return new Promise(async (resolve, reject) => {
      let emailTemaplate = await this.getEmailTemplatePath(fileName);
      if (emailTemaplate) {
        template = handlebars.compile(emailTemaplate);
        htmlToSend = template(emailBodyData);

        this.retry(
          5,
          function () {
            return EmailService.sendEmail(to, subject, htmlToSend)
              .then((responseData) => {
                return resolve(responseData);
              })
              .catch((error) => {
                return reject(error.message);
              });
          },
          'sendEmailWithTemplate->sendEmail'
        );
      } else {
        return reject('Email template not found');
      }
    });
  }

  static getEmailTemplatePath = async (fileName: string) => {
    const emailBucketLink = process.env.EMAIL_STORAGE_BUCKET as string;
    const templatePath = (await fetch(`${emailBucketLink}/${fileName}`)).text();

    return templatePath;
  }

  static sendEmail = (to: string, subject: string, htmlTemplate: any) => {
    return new Promise((resolve, reject) => {
      transport.sendMail({
        from: configuration.email.auth.user,
        to: to,
        subject: subject,
        html: htmlTemplate
      })
        .then((responseData) => {
          logger.info(`Email sent from ${responseData.envelope.from} to ${responseData.envelope.to}`);
          return resolve(responseData);
        })
        .catch((error) => {
          logger.error('Send Email Error: ' + error.message);
          return reject(error.message);
        })
    })
  }

  static retry = (maxRetries: number, retryFunction: any, retryFunctionName: string) => {
    logger.info('## RETRY COUNT: ' + maxRetries);

    return retryFunction()
      .catch((error: any) => {
        if (maxRetries <= 0) {
          const RetryFailedDateAndTime = moment().utcOffset('+05.30').format('MMMM Do YYYY, h:mm:ss a');
          logger.error(RetryFailedDateAndTime);
          /**
           * @todo - to send Email to the system admin about the failure
           */ 
        }

        return this.retry(maxRetries - 1, retryFunction, retryFunctionName);
      });
  }
}

export default EmailService;