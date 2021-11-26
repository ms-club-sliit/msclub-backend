import { IConfig } from "../api/interfaces";
const environment = process.env.ENVIRONMENT as string;
let configuration: IConfig;

if (environment === 'Development') {
  configuration = {
    ip: process.env.IP || 'localhost',
    port: process.env.PORT as string,
    environment: process.env.ENVIRONMENT as string,
    mongodb: {
      uri: process.env.MONGO_URI as string
    },
    auth: {
      secret: 'msClubDevJwtSecret'
    },
    email: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      pool: true,
      secureConnection: true,
      auth: {
        user: 'msclubofsliit@gmail.com',
        pass: 'bbyfeykrgcayvrzx'
      },
      tls: {
        rejectUnauthorized: false
      }
    },
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY as string,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
      projectId: process.env.FIREBASE_PROJECT_ID as string,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
      appId: process.env.FIREBASE_APP_ID as string,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID as string,
    }
  };
} else if (environment === 'Production') {
  configuration = {
    ip: process.env.IP || 'localhost',
    port: process.env.PORT as string,
    environment: process.env.ENVIRONMENT as string,
    mongodb: {
      uri: process.env.MONGO_URI as string
    },
    auth: {
      secret: 'msClubProdJwtSecret'
    },
    email: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      pool: true,
      secureConnection: true,
      auth: {
        user: 'msclubofsliit@gmail.com',
        pass: 'bbyfeykrgcayvrzx'
      },
      tls: {
        rejectUnauthorized: false
      }
    },
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY as string,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
      projectId: process.env.FIREBASE_PROJECT_ID as string,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
      appId: process.env.FIREBASE_APP_ID as string,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID as string,
    }
  };
}

export { configuration };