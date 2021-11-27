import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import logger from './logger';
import { configuration } from '../config';

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

let readHTMLTemplate = (filePath: string, callback: any) => {
  fs.readFile(
    filePath, 
    { encoding: 'utf-8' }, 
    (error, html) => {
      if (error) {
        logger.error('Email error: ', error);
      } else {
        callback(null, html);
      }
    }
  );
}

let template: HandlebarsTemplateDelegate;
let htmlToSend: string;

class Email {
  static sendEmail(filePath: string, to: string, subject: string,  emailBodyData: any) {
    return new Promise((resolve, reject) => {
      readHTMLTemplate(
        filePath, 
        async (error: any, html: any) => {
          template = handlebars.compile(html);
          htmlToSend = template(emailBodyData);
  
          transport.sendMail({
            from: configuration.email.auth.user,
            to: to,
            subject: subject,
            html: htmlToSend
          })
            .then((responseData) => {
              logger.info(`Email sent from ${responseData.envelope.from} to ${responseData.envelope.to}`);
              return resolve(responseData);
            })
            .catch((error) => {
              logger.error(error.message + 'dddd');
              return reject(error.message);
            });
        }
      );
    });
  }
}

export default Email;