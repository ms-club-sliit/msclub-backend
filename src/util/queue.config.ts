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
