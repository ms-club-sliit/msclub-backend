import { Storage } from "@google-cloud/storage";
import path from "path";
import { configs } from ".";

const storage = new Storage({
  keyFilename: path.join(__dirname, "../config/ms-storage-server.json"),
  projectId: "ms-storage-server-fb22b",
});

const StorageBucket = storage.bucket(configs.firebase.bucketName);

export default StorageBucket;
