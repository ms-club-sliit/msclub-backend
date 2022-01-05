import dotenv from "dotenv";
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import logger from "./util/logger";
import responseHandler from "./util/response.handler";
import routes from "./api/routes";
import { configs } from "./config";
import connect from "./util/database.connection";
import amqp from "amqplib";

dotenv.config();
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

// Create and Inject the message queue
app.use((req: Request, res: Response, next: NextFunction) => {
	try {
		// Create the channel
		amqp
			.connect(configs.queue.messageBrokerURL)
			.then((connection) => {
				connection
					.createChannel()
					.then((channel) => {
						channel.assertExchange(configs.queue.exchangeName, "direct", { durable: false });

						// Add channel as request property
						req.channel = channel;
						next();
					})
					.catch((channelError) => {
						logger.error(`Channel Error: ${channelError.message}`);
					});
			})
			.catch((connectionError: any) => {
				logger.error(`Connection Error: ${connectionError.message}`);
			});
	} catch (error: any) {
		logger.error(error.message);
	}
});

// Root API Call
app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send("<h2>MS CLUB SLIIT Web API</h2>");
	next();
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
