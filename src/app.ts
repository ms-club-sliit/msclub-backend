import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import logger from './util/logger';
import responseHandler from './util/response.handler';
import routes from './api/routes';
import { configuration } from './config';
import connect from './util/database.connection';

dotenv.config();
const app: Express = express();
const PORT: string = configuration.port;
const ENVIRONMENT = configuration.environment;
const MONGO_URI = configuration.mongodb.uri;
 
// Register Middleware Chain
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inject Response Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  req.handleResponse = responseHandler;
  next();
});

// Root API Call
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('<h2>MS CLUB SLIIT Web API</h2>');
});

// Start the Server
app.listen(PORT, () => {
  logger.info(`Starting on ${ENVIRONMENT} Environment`);
  logger.info(MONGO_URI);
  logger.info(`API Server up and running on PORT ${PORT}`);
  // Connect to Database
  connect();
  // Inject Routes
  routes(app);
});