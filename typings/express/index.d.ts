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

/* eslint-disable no-unused-vars */
import { Channel } from "amqplib";
declare global {
	namespace Express {
		interface Request {
			handleResponse: {
				successRespond(response: Response): (data: any) => Response;
				notFoundRespond(response: Response): (data: any) => Response;
				errorRespond(response: Response): (error: any) => Response;
				unauthorizedRespond(response: Response): (data: any) => Response;
			};
			queue: {
				/**
				 * Publish messages to the queue. This function wil take 3 parameters.
				 * @param channel - RabbitMQ Channel
				 * @param bindingKey - Binding key to bind the messages to the queue
				 * @param message - Actual message data that add to the queue
				 * @example
				 * let channel = request.queue.channel;
				 * let bindingKey = configs.queue.emailService;
				 * let message = {
				 *    template: "Email-Template.html",
				 *    body: "Email template to queue"
				 * };
				 *
				 * request.queue.publishMessage(channel, bindingKey, message);
				 */
				publishMessage(channel: Channel, message: any): void;

				/**
				 * Consume the messages that are published to the message queue. The function will take 3 parameters.
				 * @param channel - RabbitMQ Channel
				 * @param service - Class name of the service
				 * @example
				 * let channel = request.queue.channel;
				 * let emailService = new EmailService();
				 *
				 * request.queue.subscribeMessages(channel, emailService);
				 */
				subscribeMessages(channel: Channel, service: EmailService): Promise<void>;
			};
			authToken: any;
			user: any;
			channel: Channel;
		}
	}
}
