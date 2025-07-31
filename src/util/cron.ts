import { CronJob } from "cron";
import logger from "./logger";
import { sendEmailWithTemplate } from "./email.handler";

const cronInit = () => {
	const crons: CronJob[] = [];

	crons.push(
		new CronJob(
			"*/20 * * * * *",
			async () => {
				await sendEmailWithTemplate();
			},
			null,
			false,
			"Asia/Colombo"
		)
	);

	for (const cron of crons) {
		logger.info("📅 Starting MS Cron Processes");
		cron.start();
	}
};

export { cronInit };
