import amqp, { Channel } from "amqplib";
import { configs } from "../config";

// Create a channel
const createChannel = async () => {
	const connection = await amqp.connect(configs.queue.messageBrokerURL);
	const channel = await connection.createChannel();
	await channel.assertExchange(configs.queue.exchangeName, "direct", { durable: false });
	return channel;
};

// Publish the messages
const publishMessage = async (channel: Channel, bindingKey: string, message: any) => {
	await channel.publish(configs.queue.exchangeName, bindingKey, Buffer.from(JSON.stringify(message)));
};

// Subscribe to messages
const subscribeMessages = async (channel: Channel, service: any) => {
	const serviceQueue = await channel.assertQueue(configs.queue.emailQueue);
	channel.bindQueue(serviceQueue.queue, configs.queue.exchangeName, configs.queue.emailService);
	channel.consume(serviceQueue.queue, (data) => {
		if (data) {
			const queueItem = JSON.parse(JSON.parse(data.content.toString()));
			service.sendEmailWithTemplate(queueItem);
			channel.ack(data); // Send acknowledgement to queue after consume the message
		}
	});
};

export { createChannel, publishMessage, subscribeMessages };
