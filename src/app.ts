/*
 * Created on Sat Feb 12 2022
 *
 * The GNU General Public License v3.0
 * Copyright (c) 2022 MS Club SLIIT Authors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program at
 *
 *     https://www.gnu.org/licenses/
 *
 * This program is distributed in the hope that it will be useful
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
dotenv.config();
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import logger from "./util/logger";
import responseHandler from "./util/response.handler";
import routes from "./api/routes";
import { configs } from "./config";
import connect from "./util/database.connection";
import messageQueue from "./util/queue.config";
import { Channel } from "amqplib";
import EmailService from "./util/email.handler";

export const app: Express = express();
const PORT: string = configs.port;
const ENVIRONMENT = configs.environment;
const MONGO_URI = configs.mongodb.uri;
let channel: Channel;

messageQueue.createChannel().then((channelData) => {
	channel = channelData;
});

// Register Middleware Chain
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Inject Response Handler
app.use((req: Request, res: Response, next: NextFunction) => {
	req.handleResponse = responseHandler;
	req.channel = channel;
	req.queue = messageQueue;
	new EmailService(channel);
	next();
});

// Root API Call
app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send("<h2>MS CLUB SLIIT - WEB API</h2>");
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
