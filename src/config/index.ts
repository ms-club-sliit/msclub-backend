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
      auth: {
        user: 'msclubofsliit@gmail.com',
        pass: 'bbyfeykrgcayvrzx'
      }
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
      auth: {
        user: 'msclubofsliit@gmail.com',
        pass: 'bbyfeykrgcayvrzx'
      }
    }
  };
}

export { configuration };