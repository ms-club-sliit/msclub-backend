import { Storage } from "@google-cloud/storage";
import { configs } from ".";

const storage = new Storage({
  credentials: {
    client_email: configs.firebase.clientEmail,
    private_key: configs.firebase.privateKey.replace(/\\n/gm, "\n"),
  },
  projectId: configs.firebase.projectId,
});

const bucketName = configs.firebase.bucketName;

const StorageBucket = storage.bucket(bucketName);

export default StorageBucket;
