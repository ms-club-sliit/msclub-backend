import { Storage } from "@google-cloud/storage";
import { configs } from ".";

const storage = new Storage({
	projectId: "ms-storage-server-fb22b",
	credentials: {
		client_email: configs.firebase.clientEmail,
		private_key: configs.firebase.privateKey.replace(/\\n/gm, "\n"),
	},
});

const bucketName = configs.firebase.bucketName;

const StorageBucket = storage.bucket(bucketName);

export default StorageBucket;
