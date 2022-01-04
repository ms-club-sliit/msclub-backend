import handlebars from "handlebars";
import fs from "fs";
import logger from "./logger";
import { configs } from "../config";
import moment from "moment";
import fetch from "cross-fetch";
import { Channel } from "amqplib";
import { subscribeMessages } from "./queue.config";

const cc =
  "senurajayadeva@gmail.com,Lasalshettiarachchi458@gmail.com,rusiruavbpersonal98@gmail.com,yasirurandika99@gmail.com";

// HTML Configuration
require.extensions[".html"] = (module: any, fileName: string) => {
  module.exports = fs.readFileSync(fileName, "utf8");
};

// SendGrid Configuration
const sgMail = require("@sendgrid/mail");

let template: HandlebarsTemplateDelegate;
let htmlToSend: string;

class EmailService {
  channel: Channel;

  constructor(channel: Channel) {
    this.channel = channel;
    subscribeMessages(this.channel, this);
  }

  sendEmailWithTemplate(data: any) {
    console.log(data);
    let fileName = data.email.template;
    let to = data.email.to;
    let subject = data.email.subject;
    let emailBodyData = data.email.body;

    return new Promise(async (resolve, reject) => {
      EmailService.getEmailTemplatePath(fileName)
        .then((emailTemplate) => {
          if (emailTemplate) {
            template = handlebars.compile(emailTemplate);
            htmlToSend = template(emailBodyData);

            EmailService.retry(
              5, // Retry count
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
      sgMail.setApiKey(configs.email.sendGrid.apiKey);
      const msg = {
        to: to, // Change to your recipient
        from: { name: "MS Club of SLIIT", email: configs.email.sendGrid.user }, // Change to your verified sender
        cc: "msclubofsliit@gmail.com",
        subject: subject,
        text: htmlTemplate,
        html: htmlTemplate,
      };
      sgMail
        .send(msg)
        .then((responseData: any) => {
          logger.info(`Email sent ${responseData}`);
          return resolve(responseData);
        })
        .catch((error: any) => {
          logger.error("Send Email Error: " + error);
          return reject(error);
        });
    });
  };

  static retry = (maxRetries: number, retryFunction: any, retryFunctionName: string) => {
    logger.info("## RETRY COUNT: " + maxRetries);

    return retryFunction().catch((error: any) => {
      if (maxRetries <= 0) {
        const RetryFailedDateAndTime = moment().utcOffset("+05.30").format("MMMM Do YYYY, h:mm:ss a");
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
