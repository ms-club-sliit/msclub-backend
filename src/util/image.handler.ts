import firebase from "../config/firebase.config";
import imagemin from "imagemin";
import mozjpeg from "imagemin-mozjpeg";
import sharp from "sharp";
import logger from "./logger";

export const getImageURL = async (file: any, directory: string): Promise<string> => {
  const bucket = firebase.storage().bucket();
  const originalName = file.originalname as string;
  const fileName = new Date().getTime() + '-' + Math.floor(Math.random() * 1000000 + 1);
  const filePath = `${directory}/${fileName}`;
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
      convertToJPG, 
      mozjpeg({ 
        quality: compressQuality 
      })
    ]
  });

  return compressedImage;
}

const convertToJPG = (imageBuffer: any) => {
  return sharp(imageBuffer).resize({ width: 500 }).png().toBuffer();
}