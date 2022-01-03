require("dotenv").config();
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import logger from "./util/logger";
import responseHandler from "./util/response.handler";
import routes from "./api/routes";
import { configs } from "./config";
import connect from "./util/database.connection";

export const app: Express = express();
const PORT: string = configs.port;
const ENVIRONMENT = configs.environment;
const MONGO_URI = configs.mongodb.uri;

// Register Middleware Chain
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Inject Response Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  req.handleResponse = responseHandler;
  next();
});

// Root API Call
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("<h2>MS CLUB SLIIT Web API</h2>");
});

// Start the Server
app.listen(PORT, () => {
  logger.info(`Starting on ${ENVIRONMENT} Environment`);
  logger.info(MONGO_URI);
  // Connect to Database
  connect();
  // Inject Routes
  routes(app);
  logger.info(`API Server up and running on PORT ${PORT}`);
});
