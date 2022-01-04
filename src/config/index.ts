import { IConfig } from "../interfaces";
let configs: IConfig;
const environment = process.env.NODE_ENV?.trim() as string;

if (environment == "Development") {
  configs = {
    ip: process.env.IP || "localhost",
    port: (process.env.PORT as string) || "8087",
    environment: process.env.DEV_ENVIRONMENT as string,
    mongodb: {
      uri: process.env.DEV_MONGO_URI as string,
    },
    auth: {
      secret: process.env.DEV_JWT_SECRET as string,
    },
    email: {
      host: process.env.EMAIL_HOST as string,
      port: process.env.EMAIL_PORT as string,
      secure: true,
      pool: true,
      secureConnection: true,
      auth: {
        user: process.env.EMAIL_AUTH_USER as string,
        pass: process.env.EMAIL_AUTH_PASSWORD as string,
      },
      tls: {
        rejectUnauthorized: false,
      },
      sendGrid: {
        user: process.env.EMAIL_SENDGRID_USER as string,
        apiKey: process.env.SENDGRID_API_KEY as string,
      },
    },
    firebase: {
      projectId: process.env.STORAGE_PROJECT_ID as string,
      clientEmail: process.env.STORAGE_CLIENT_EMAIL as string,
      privateKey: process.env.STORAGE_PRIVATE_KEY as string,
      storageBucket: process.env.STORAGE_BUCKET_URL as string,
      bucketName: process.env.BUCKET_NAME as string,
      applicationImageBucket: process.env.APPLICATION_IMAGES_BUCKET as string,
      emailTemplateBucket: process.env.EMAIL_TEMPLATE_BUCKET as string,
    },
    queue: {
      messageBrokerURL: process.env.DEV_MESSAGE_BROKER_URL as string,
      exchangeName: process.env.EXCHANGE_NAME as string,
      emailService: process.env.EMAIL_SERVICE_NAME as string,
      emailQueue: process.env.EMAIL_QUEUE_NAME as string,
    },
  };
}

if (environment == "Production") {
  configs = {
    ip: process.env.IP || "localhost",
    port: (process.env.PORT as string) || "8087",
    environment: process.env.PROD_ENVIRONMENT as string,
    mongodb: {
      uri: process.env.PROD_MONGO_URI as string,
    },
    auth: {
      secret: process.env.PROD_JWT_SECRET as string,
    },
    email: {
      host: process.env.EMAIL_HOST as string,
      port: process.env.EMAIL_PORT as string,
      secure: true,
      pool: true,
      secureConnection: true,
      auth: {
        user: process.env.EMAIL_AUTH_USER as string,
        pass: process.env.EMAIL_AUTH_PASSWORD as string,
      },
      tls: {
        rejectUnauthorized: false,
      },
      sendGrid: {
        user: process.env.EMAIL_SENDGRID_USER as string,
        apiKey: process.env.SENDGRID_API_KEY as string,
      },
    },
    firebase: {
      projectId: process.env.PROJECT_ID as string,
      clientEmail: process.env.STORAGE_CLIENT_EMAIL as string,
      privateKey: process.env.STORAGE_PRIVATE_KEY as string,
      storageBucket: process.env.STORAGE_BUCKET_URL as string,
      bucketName: process.env.BUCKET_NAME as string,
      applicationImageBucket: process.env.APPLICATION_IMAGES_BUCKET as string,
      emailTemplateBucket: process.env.EMAIL_TEMPLATE_BUCKET as string,
    },
    queue: {
      messageBrokerURL: process.env.PROD_MESSAGE_BROKER_URL as string,
      exchangeName: process.env.EXCHANGE_NAME as string,
      emailService: process.env.EMAIL_SERVICE_NAME as string,
      emailQueue: process.env.EMAIL_QUEUE_NAME as string,
    },
  };
}

export { configs };
