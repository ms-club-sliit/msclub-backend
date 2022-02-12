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

import amqp, { Channel } from "amqplib";
import { configs } from "../config";

// Create a channel
const createChannel = async () => {
	const connection = await amqp.connect(configs.queue.messageBrokerURL);
	const channel = await connection.createChannel();
	await channel.assertQueue(configs.queue.emailQueue, { durable: false });
	return channel;
};

// Publish the messages
const publishMessage = (channel: Channel, message: any) => {
	channel.sendToQueue(configs.queue.emailQueue, Buffer.from(JSON.stringify(message)));
};

// Subscribe to messages
const subscribeMessages = async (channel: Channel, service: any) => {
	const serviceQueue = await channel.assertQueue(configs.queue.emailQueue, { durable: false });
	channel.consume(serviceQueue.queue, (data) => {
		if (data) {
			const queueItem = JSON.parse(JSON.parse(data.content.toString()));
			service.sendEmailWithTemplate(queueItem);
			channel.ack(data); // Send acknowledgement to queue after consume the message
		}
	});
};

export default { createChannel, publishMessage, subscribeMessages };
