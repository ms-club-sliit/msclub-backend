import Mongoose from "mongoose";
import logger from "./logger";
import { configs } from "../config";

let database: Mongoose.Connection;

const connect = async () => {
	const databaseConnectionString = configs.mongodb.uri;

	if (database) {
		return;
	}

	try {
		Mongoose.connect(databaseConnectionString);
		database = Mongoose.connection;

		database.once("open", async () => {
			logger.info("Database Synced");
		});

		database.on("error", () => {
			logger.error("Error connecting to database");
		});
	} catch (error: any) {
		logger.error(error.message);
	}
};

export default connect;
