import handlebars from "handlebars";
import fs from "fs";
import logger from "./logger";
import { configs } from "../config";
import moment from "moment";
import fetch from "cross-fetch";

const cc =
  "msclubofsliit@gmail.com";

// HTML Configuration
require.extensions[".html"] = (module: any, fileName: string) => {
  module.exports = fs.readFileSync(fileName, "utf8");
};

// SendGrid Configuration
const sgMail = require("@sendgrid/mail");

let template: HandlebarsTemplateDelegate;
let htmlToSend: string;

class EmailService {
  static sendEmailWithTemplate(
    fileName: string,
    to: string,
    subject: string,
    emailBodyData: any
  ) {
    return new Promise(async (resolve, reject) => {
      this.getEmailTemplatePath(fileName)
        .then((emailTemplate) => {
          if (emailTemplate) {
            template = handlebars.compile(emailTemplate);
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
              "sendEmailWithTemplate->sendEmail"
            );
          } else {
            return reject("Email template not found");
          }
        })
        .catch((error) => {
          logger.error(error.message);
        });
    });
  }

  static getEmailTemplatePath = async (fileName: string) => {
    const emailBucketLink = `${configs.firebase.storageBucket}/${configs.firebase.bucketName}/${configs.firebase.emailTemplateBucket}`;
    const templatePath = (await fetch(`${emailBucketLink}/${fileName}`)).text();

    return templatePath;
  };

  static sendEmail = (to: string, subject: string, htmlTemplate: any) => {
    return new Promise((resolve, reject) => {
      
      sgMail.setApiKey(
        process.env.SENFGRID_API_KEY
      );
      const msg = {
        to: to, // Change to your recipient
        from: process.env.EMAIL_SENFGRID_USER, // Change to your verified sender
        cc:cc,
        subject: subject,
        text: htmlTemplate,
        html: htmlTemplate,
      };
      sgMail
        .send(msg)
        .then((responseData: any) => {
          logger.info(
            `Email sent ${responseData}`
          );
          return resolve(responseData);
        })
        .catch((error: any) => {
          logger.error("Send Email Error: " + error);
          return reject(error);
        });
    });
  };

  static retry = (
    maxRetries: number,
    retryFunction: any,
    retryFunctionName: string
  ) => {
    logger.info("## RETRY COUNT: " + maxRetries);

    return retryFunction().catch((error: any) => {
      if (maxRetries <= 0) {
        const RetryFailedDateAndTime = moment()
          .utcOffset("+05.30")
          .format("MMMM Do YYYY, h:mm:ss a");
        logger.error(RetryFailedDateAndTime);
        /**
         * @todo - to send Email to the system admin about the failure
         */
      }

      return this.retry(maxRetries - 1, retryFunction, retryFunctionName);
    });
  };
}

export default EmailService;
