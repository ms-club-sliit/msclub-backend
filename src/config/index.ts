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

import { IConfig } from "../interfaces";

const configs: IConfig = {
	ip: process.env.IP || "localhost",
	port: process.env.PORT as string,
	environment: process.env.NODE_ENV as string,
	mongodb: {
		uri: process.env.MONGO_URI as string,
	},
	auth: {
		secret: process.env.JWT_SECRET as string,
	},
	email: {
		host: process.env.EMAIL_HOST as string,
		port: process.env.EMAIL_PORT as string,
		secure: true,
		pool: true,
		secureConnection: true,
		auth: {
			user: process.env.EMAIL_AUTH_USER as string,
			pass: process.env.EMAIL_AUTH_PASSWORD as string,
		},
		tls: {
			rejectUnauthorized: false,
		},
	},
	supabase: {
		url: process.env.SUPABASE_URL as string,
		anonKey: process.env.SUPABASE_ANON_KEY as string,
		serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
		applicationImageBucket: process.env.APPLICATION_IMAGES_BUCKET as string,
		emailTemplateBucket: process.env.EMAIL_TEMPLATE_BUCKET as string,
	},
	queue: {
		messageBrokerURL: process.env.MESSAGE_BROKER_URL as string,
		exchangeName: process.env.EXCHANGE_NAME as string,
		emailService: process.env.EMAIL_SERVICE_NAME as string,
		emailQueue: process.env.EMAIL_QUEUE_NAME as string,
	},
};

export { configs };
