import { CronJob } from "cron";
import logger from "./logger";

const cronInit = () => {
	const crons = [];

	crons.push(
		new CronJob({
			cronTime: "*/20 * * * * *",
			onTick: () => {
				logger.info("Cron is send");
			},
			timeZone: "Asia/Colombo",
		})
	);

	for (const cron of crons) {
		logger.info("📅 Starting MS Cron Processes");
		cron.start();
	}
};

export { cronInit };
