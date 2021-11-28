import firebase from 'firebase-admin';
import { configuration } from './index';

const serviceAccount = require('./service-account-file.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: configuration.firebase.projectId,
});

export default firebase;