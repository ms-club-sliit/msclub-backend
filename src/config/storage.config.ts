import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  keyFilename: path.join(__dirname, '../config/ms-storage-server.json'),
  projectId: 'ms-storage-server-fb22b'
});

const StorageBucket = storage.bucket(process.env.BUCKET_NAME as string);

export default StorageBucket;