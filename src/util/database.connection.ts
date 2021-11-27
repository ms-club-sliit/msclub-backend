import Mongoose, { ConnectOptions } from 'mongoose';
import logger from './logger';

let database: Mongoose.Connection;

const connect = async () => {
  const databaseConnectionString = process.env.MONGO_URI as string;

  if (database) {
    return;
  }

  try {
    Mongoose.connect(databaseConnectionString);
    database = Mongoose.connection;

    database.once('open', async () => {
      logger.info('Database Synced');
    });
  
    database.on('error', () => {
      logger.error('Error connecting to database');
    });
  } catch (error: any) {
    logger.error(error.message);
  }
}

export default connect;