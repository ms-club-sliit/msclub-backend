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

import StorageBucket from "../config/storage.config";
import logger from "./logger";
class ImageService {
	static uploadImage = async (file: any, folderName: string): Promise<string> => {
		return new Promise((resolve, reject) => {
			const { buffer } = file;

			const blob = StorageBucket.file(`${folderName}/${this.generateImageName()}`);
			const blobStream = blob.createWriteStream({
				resumable: false,
				gzip: true,
			});

			blobStream
				.on("finish", () => {
					resolve(blob.name);
				})
				.on("error", (error) => {
					logger.error(error.message);
					reject(`Upload Error: ${error.message}`);
				})
				.end(buffer);
		});
	};

	static generateImageName = () => {
		const fileName = new Date().getTime() + "-" + Math.floor(Math.random() * 1000000 + 1) + ".jpg";
		return fileName;
	};
}

export default ImageService;
