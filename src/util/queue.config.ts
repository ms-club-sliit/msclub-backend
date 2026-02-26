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

import amqp, { Channel } from "amqplib";
import { configs } from "../config";
import logger from "./logger";

let channel: Channel | null = null;

/**
 * Acts as a mutex: while a connection attempt is in-flight,
 * all concurrent callers await the same promise instead of
 * starting duplicate connections.
 */
let connectingPromise: Promise<Channel | null> | null = null;

/**
 * Prevents multiple overlapping reconnect timers from stacking.
 */
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

const RECONNECT_DELAY_MS = 5000;
const MAX_RECONNECT_DELAY_MS = 30000;
let currentReconnectDelay = RECONNECT_DELAY_MS;

/**
 * Tears down existing connection/channel references safely.
 * Called from error/close handlers and before reconnect.
 */
const cleanup = () => {
	channel = null;
	connectingPromise = null;
	// Don't clear reconnectTimer here — let scheduleReconnect manage its own lifecycle
};

/**
 * Schedules a reconnection attempt with exponential backoff.
 * If reconnection fails, recursively schedules another attempt
 * so the system never stays permanently disconnected.
 */
const scheduleReconnect = () => {
	// Prevent stacking multiple timers
	if (reconnectTimer) return;

	logger.info(`[RabbitMQ] Reconnecting in ${currentReconnectDelay / 1000}s...`);

	reconnectTimer = setTimeout(async () => {
		reconnectTimer = null;
		const ch = await getChannel();

		if (ch) {
			// Success: backoff is already reset inside createConnection()
			logger.info("[RabbitMQ] Reconnection successful.");
		} else {
			// Failed: increase backoff and try again
			currentReconnectDelay = Math.min(currentReconnectDelay * 2, MAX_RECONNECT_DELAY_MS);
			logger.warn(`[RabbitMQ] Reconnection failed. Next attempt in ${currentReconnectDelay / 1000}s...`);
			scheduleReconnect();
		}
	}, currentReconnectDelay);
};

/**
 * Internal function that actually creates the connection + channel.
 * Only one instance of this runs at a time (guarded by connectingPromise).
 */
const createConnection = async (): Promise<Channel | null> => {
	try {
		const conn = await amqp.connect(configs.queue.messageBrokerURL, {
			heartbeat: 60,
			servername: new URL(configs.queue.messageBrokerURL).hostname,
		});

		const ch = await conn.createChannel();
		await ch.assertQueue(configs.queue.emailQueue, { durable: false });

		conn.on("error", (err) => {
			logger.error("[RabbitMQ] Connection error:", err.message);
			scheduleReconnect();
			cleanup();
		});

		conn.on("close", () => {
			logger.warn("[RabbitMQ] Connection closed.");
			cleanup();
			scheduleReconnect();
		});

		ch.on("error", (err) => {
			logger.error("[RabbitMQ] Channel error:", err.message);
			channel = null;
		});

		ch.on("close", () => {
			logger.warn("[RabbitMQ] Channel closed.");
			channel = null;
		});

		currentReconnectDelay = RECONNECT_DELAY_MS;

		channel = ch;

		logger.info("[RabbitMQ] Connected successfully.");
		return ch;
	} catch (err: any) {
		logger.error(`[RabbitMQ] Failed to connect: ${err.message}`);
		cleanup();
		scheduleReconnect();
		return null;
	}
};

/**
 * Returns an active channel, or creates one.
 * Uses connectingPromise as a mutex so concurrent callers
 * share a single connection attempt.
 */
const getChannel = async (): Promise<Channel | null> => {
	// already connected
	if (channel) return channel;

	// If a connection attempt is already in-flight, wait for it
	if (connectingPromise) return connectingPromise;

	// Start a new connection attempt and store the promise (mutex)
	connectingPromise = createConnection();

	try {
		return await connectingPromise;
	} finally {
		// Clear the mutex once resolved (success or failure)
		connectingPromise = null;
	}
};

const publishMessage = async (message: any) => {
	const ch = await getChannel();
	if (!ch) {
		logger.warn("[RabbitMQ] Skipping publish - no connection available");
		return;
	}
	ch.sendToQueue(configs.queue.emailQueue, Buffer.from(JSON.stringify(message)));
};

const subscribeMessages = async (service: any) => {
	const ch = await getChannel();
	if (!ch) {
		logger.warn("[RabbitMQ] Skipping subscribe - no connection available");
		return;
	}
	const serviceQueue = await ch.assertQueue(configs.queue.emailQueue, { durable: false });
	await ch.consume(serviceQueue.queue, (data) => {
		if (data) {
			const queueItem = JSON.parse(JSON.parse(data.content.toString()));
			service.sendEmailWithTemplate(queueItem);
			ch.ack(data);
		}
	});
};

export default { getChannel, publishMessage, subscribeMessages };