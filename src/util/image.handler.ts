import StorageBucket from "../config/storage.config";
import logger from "./logger";
class ImageService {
  static uploadImage = async (
    file: any,
    folderName: string
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const { originalname, buffer } = file;

      const blob = StorageBucket.file(
        `${folderName}/${this.generateImageName()}`
      );
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
    let fileName =
      new Date().getTime() +
      "-" +
      Math.floor(Math.random() * 1000000 + 1) +
      ".jpg";
    return fileName;
  };
}

export default ImageService;
