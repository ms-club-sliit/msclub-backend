import { CronJob } from "cron";
import logger from "./logger";
import { sendEmailWithTemplate } from "./email.handler";

const cronInit = () => {
	const crons = [];

	crons.push(
		new CronJob({
			cronTime: "*/20 * * * * *",
			onTick: async () => {
				await sendEmailWithTemplate();
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
