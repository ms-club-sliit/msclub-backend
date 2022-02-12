/*
 * Created on Sat Feb 12 2022
 *
 * The GNU General Public License v3.0
 * Copyright (c) 2022 MS Club SLIIT Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program at
 *
 *     https://www.gnu.org/licenses/
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 */

import handlebars from "handlebars";
import fs from "fs";
import logger from "./logger";
import { configs } from "../config";
import moment from "moment";
import fetch from "cross-fetch";
import { Channel } from "amqplib";
import messageQueue from "./queue.config";
import sgMail from "@sendgrid/mail";

// HTML Configuration
require.extensions[".html"] = (module: any, fileName: string) => {
	module.exports = fs.readFileSync(fileName, "utf8");
};

let template: HandlebarsTemplateDelegate;
let htmlToSend: string;

class EmailService {
	channel: Channel;

	constructor(channel: Channel) {
		this.channel = channel;
		messageQueue.subscribeMessages(this.channel, this);
	}

	sendEmailWithTemplate(data: any) {
		const fileName = data.template;
		const to = data.to;
		const subject = data.subject;
		const emailBodyData = data.body;

		return new Promise((resolve, reject) => {
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
					logger.info(`Email sent to ${to}`);
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

		return retryFunction().catch(() => {
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
