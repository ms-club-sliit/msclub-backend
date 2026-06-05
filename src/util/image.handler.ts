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

import getSupabaseClient from "../config/storage.config";
import logger from "./logger";
import { configs } from "../config";

class ImageService {
	static uploadImage = async (file: any, folderName: string): Promise<string> => {
		try {
			const { buffer } = file;
			const fileName = this.generateImageName();
			const filePath = `${folderName}/${fileName}`;

			const supabase = getSupabaseClient();
			const { data, error } = await supabase.storage
				.from(configs.supabase.applicationImageBucket)
				.upload(filePath, buffer, {
					contentType: 'image/jpeg',
					upsert: false
				});

			if (error) {
				logger.error(`Upload Error: ${error.message}`);
				throw new Error(`Upload Error: ${error.message}`);
			}

			return filePath;
		} catch (error: any) {
			logger.error(error.message);
			throw new Error(`Upload Error: ${error.message}`);
		}
	};

	static generateImageName = () => {
		const fileName = new Date().getTime() + "-" + Math.floor(Math.random() * 1000000 + 1) + ".jpg";
		return fileName;
	};
}

export default ImageService;
