import amqp, { Channel } from "amqplib";
import { configs } from "../config";

const messageBrokerURL = configs.queue.messageBrokerURL;
const exchangeName = configs.queue.exchangeName;
const emailService = configs.queue.emailService;
const emailQueue = configs.queue.emailQueue;

// Create a channel
const createChannel = async () => {
  try {
    const connection = await amqp.connect(messageBrokerURL);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "direct", { durable: false });
    return channel;
  } catch (error) {
    throw error;
  }
};

// Subscribe to messages
const subscribeMessages = async (channel: Channel, service: any) => {
  const serviceQueue = await channel.assertQueue(emailQueue);
  channel.bindQueue(serviceQueue.queue, exchangeName, emailService);
  channel.consume(serviceQueue.queue, (data) => {
    if (data) {
      // Call the service function
    }
  });
};

export { createChannel, subscribeMessages };
