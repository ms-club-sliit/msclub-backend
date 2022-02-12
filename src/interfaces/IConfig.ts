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

interface IConfig {
	ip: string;
	port: string;
	environment: string;
	mongodb: {
		uri: string;
	};
	auth: {
		secret: string;
	};
	email: {
		host: string;
		port: string;
		secure: boolean;
		pool: boolean;
		secureConnection: boolean;
		auth: {
			user: string;
			pass: string;
		};
		tls: {
			rejectUnauthorized: boolean;
		};
		sendGrid: {
			user: string;
			apiKey: string;
		};
	};
	firebase: {
		projectId: string;
		clientEmail: string;
		privateKey: string;
		storageBucket: string;
		emailTemplateBucket: string;
		applicationImageBucket: string;
		bucketName: string;
	};
	queue: {
		messageBrokerURL: string;
		exchangeName: string;
		emailQueue: string;
		emailService: string;
	};
}

export type { IConfig };
