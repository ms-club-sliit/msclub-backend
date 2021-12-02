import { IConfig } from "../api/interfaces";
const environment = process.env.ENVIRONMENT as string;
let configuration: IConfig;

if (environment === 'Development') {
  configuration = {
    ip: process.env.IP || 'localhost',
    port: process.env.PORT as string || '8087',
    environment: process.env.ENVIRONMENT as string,
    mongodb: {
      uri: process.env.MONGO_URI as string
    },
    auth: {
      secret: process.env.JWT_SECRET as string,
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
        rejectUnauthorized: false
      }
    },
    firebase: {
      storageBucket: process.env.STORAGE_BUCKET_URL as string,
      bucketName: process.env.BUCKET_NAME as string,
      applicationImageBucket: process.env.APPLICATION_IMAGES_BUCKET as string,
      emailTemplateBucket: process.env.EMAIL_TEMPLATE_BUCKET as string,
    }
  };
} else if (environment === 'Production') {
  configuration = {
    ip: process.env.IP || 'localhost',
    port: process.env.PORT as string || '8087',
    environment: process.env.ENVIRONMENT as string,
    mongodb: {
      uri: process.env.MONGO_URI as string
    },
    auth: {
      secret: process.env.JWT_SECRET as string,
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
        rejectUnauthorized: false
      }
    },
    firebase: {
      storageBucket: process.env.STORAGE_BUCKET_URL as string,
      bucketName: process.env.BUCKET_NAME as string,
      applicationImageBucket: process.env.APPLICATION_IMAGES_BUCKET as string,
      emailTemplateBucket: process.env.EMAIL_TEMPLATE_BUCKET as string,
    }
  };
}

export { configuration };