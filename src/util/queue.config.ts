import amqp, { Channel } from "amqplib";
import { configs } from "../config";
import EmailService from "./email.handler";

// Create a channel
const createChannel = async () => {
  try {
    const connection = await amqp.connect(configs.queue.messageBrokerURL);
    const channel = await connection.createChannel();
    await channel.assertExchange(configs.queue.exchangeName, "direct", { durable: false });
    return channel;
  } catch (error) {
    throw error;
  }
};

// Publish the messages
const publishMessageToQueue = async (channel: Channel, bindingKey: string, message: any) => {
  try {
    await channel.publish(configs.queue.exchangeName, bindingKey, Buffer.from(JSON.stringify(message)));
  } catch (error) {
    throw error;
  }
};

// Subscribe to messages
const subscribeMessages = async (channel: Channel, service: EmailService) => {
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

export { createChannel, publishMessageToQueue, subscribeMessages };
