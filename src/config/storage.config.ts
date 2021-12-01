import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  keyFilename: path.join(__dirname, '../config/ms-storage-server.json'),
  projectId: 'ms-storage-server-fb22b'
});

export default storage;