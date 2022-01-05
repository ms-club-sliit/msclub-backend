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
        publishMessage(channel: Channel, bindingKey: string, message: any): Promise<void>;

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
