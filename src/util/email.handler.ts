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
import Email from "../api/models/Email.model";
import { EmailStatus } from "../api/services/Service.constant";
import logger from "./logger";
import { configs } from "../config";
import moment from "moment";
import fetch from "cross-fetch";
import sgMail from "@sendgrid/mail";

// HTML Configuration
require.extensions[".html"] = (module: any, fileName: string) => {
	module.exports = fs.readFileSync(fileName, "utf8");
};

let template: HandlebarsTemplateDelegate;
let htmlToSend: string;

const sendEmailWithTemplate = async () => {
	logger.info(`#### Step 00 - Starting the Email Queue Items at ${new Date().getMinutes()}`);
	logger.info("#### Step 01 - Fetch the email that in the WAITING & IN-PROGRESS state");
	const email = await Email.findOne({ $or: [{ status: EmailStatus.Waiting }, { status: EmailStatus.InProgress }] });

	if (email && email._id) {
		// Change the status from "WAITING" -> "IN-PROGRESS";
		logger.info("#### Step 02 - Change the status from 'WAITING' -> 'IN-PROGRESS'");
		await Email.findByIdAndUpdate(email._id, { status: EmailStatus.InProgress });

		logger.info("#### Step 03 - Get the Email template");
		const emailTemplate = await getEmailTemplatePath(email.templateName);
		logger.info("#### Step 04 - Compile the Email template");
		template = handlebars.compile(emailTemplate);
		htmlToSend = template(email.body);

		logger.info("#### Step 04 - Send the Email Notification");
		retry(
			5, // Retry count
			async () => {
				try {
					await sendEmail(email.to, email.subject, htmlToSend);
					logger.info("#### Step 06 - Change the status from 'IN-PROGRESS' -> 'DELIVERED'");
					await Email.findByIdAndUpdate(email._id, { status: EmailStatus.Delivered });
				} catch (error: any) {
					logger.error(error.message);
				}
			},
			"sendEmail"
		);
	} else {
		logger.info(`#### Step 07 - Email Queue is empty at ${new Date().getMinutes()}`);
	}
};

const getEmailTemplatePath = async (fileName: string) => {
	const emailBucketLink = `${configs.firebase.storageBucket}/${configs.firebase.bucketName}/${configs.firebase.emailTemplateBucket}`;
	const templatePath = (await fetch(`${emailBucketLink}/${fileName}`)).text();

	return templatePath;
};

const sendEmail = (to: string, subject: string, htmlTemplate: any) => {
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
				logger.info(`#### Step 05 - Email sent to ${to}`);
				return resolve(responseData);
			})
			.catch((error: any) => {
				logger.error("Send Email Error: " + error);
				return reject(error);
			});
	});
};

const retry = (maxRetries: number, retryFunction: any, retryFunctionName: string) => {
	logger.info("#### Retry Count: " + maxRetries);

	return retryFunction().catch(() => {
		if (maxRetries <= 0) {
			const RetryFailedDateAndTime = moment().utcOffset("+05.30").format("MMMM Do YYYY, h:mm:ss a");
			logger.error(RetryFailedDateAndTime);
			/**
			 * @todo - to send Email to the system admin about the failure
			 */
		}

		return retry(maxRetries - 1, retryFunction, retryFunctionName);
	});
};

export { sendEmailWithTemplate };
