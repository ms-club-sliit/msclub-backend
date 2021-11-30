import firebase from "../config/firebase.config";
import imagemin from "imagemin";
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
import logger from "./logger";

/**
 * @param {Buffer | any} file File to upload to the bucket
 * @param {string} directory Storage bucket folder name
 * @returns {Promise<string>} Downloadable URL of the image 
 * 
 * Functions that are using
 * @function compressedImage
 * @function convertToJPG
 * @function generateImageCode
 */
export const getImageURL = async (file: any, directory: string): Promise<string> => {
  const bucket = firebase.storage().bucket();
  const originalName = file.originalname as string;
  const imageCode = generateImageCode(originalName);
  const filePath = `${directory}/${imageCode}`;
  const bucketFile = bucket.file(filePath);

  // Compress the Image
  let image = await compressImage(file.buffer);

  await bucketFile.save(image, {
    contentType: file.mimetype,
    gzip: true
  });

  const [url] = await bucketFile.getSignedUrl({
    action: 'read',
    expires: '01-01-2025'
  });

  logger.info(`${originalName} uploaded to the storage`);
  return url;
}

const compressImage = async (file: any) => {
  const compressQuality = 40;

  if (!file) {
    return 'empty';
  }

  const compressedImage = await imagemin.buffer(file, {
    plugins: [
      convertToJPG
    ]
  });

  return compressedImage;
}

const convertToJPG = (imageBuffer: any) => {
  return sharp(imageBuffer).resize({ width: 500 }).png().toBuffer();
}

const generateImageCode = (originalName: string) => {
  let uuid = uuidv4();
  let imageCode: string = '';

  for (let index = 0; index < uuid.length; index++) {
    uuid = uuid.replace('-', '');
  }

  imageCode = uuid.substring(0, 6) + '-' + originalName;

  return imageCode;
}