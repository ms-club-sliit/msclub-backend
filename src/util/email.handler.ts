import handlebars from "handlebars";
import fs from "fs";
const mg = require("nodemailer-mailgun-transport")
import logger from "./logger";
import { configuration } from "../config";
import moment from "moment";
import fetch from "cross-fetch";

const cc = "senurajayadeva@gmail.com,lasalshettiarachi458@gmail.com,rusiruavb98@gmail.com,yasirurandika99@gmail.com";

// HTML Configuration
require.extensions[".html"] = (module: any, fileName: string) => {
  module.exports = fs.readFileSync(fileName, "utf8");
};

const mailgunAuth = {
  auth: {
    api_key: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN
  }
}

// Node Mailer Configuration
const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport(mg(mailgunAuth));

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
    const emailBucketLink = `${configuration.firebase.storageBucket}/${configuration.firebase.bucketName}/${configuration.firebase.emailTemplateBucket}`;
    const templatePath = (await fetch(`${emailBucketLink}/${fileName}`)).text();

    return templatePath;
  };

  static sendEmail = (
    to: string,
    subject: string,
    htmlTemplate: any
  ) => {
    return new Promise((resolve, reject) => {
      transport
        .sendMail({
          from: configuration.email.auth.user,
          to: to,
          cc: cc,
          replyTo: configuration.email.auth.user,
          subject: subject,
          html: htmlTemplate,
          text: htmlTemplate,
        })
        .then((responseData: any) => {
          logger.info(
            `Email sent from ${responseData.envelope.from} to ${responseData.envelope.to}`
          );
          return resolve(responseData);
        })
        .catch((error: any) => {
          logger.error("Send Email Error: " + error.message);
          return reject(error.message);
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
