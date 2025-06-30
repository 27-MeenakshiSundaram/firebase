import { initializeApp, cert } from "firebase-admin/app";
import {getStorage} from "firebase-admin/storage"
import { getDatabase } from "firebase-admin/database";
import  * as  dotenv from 'dotenv'
dotenv.config()
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL ,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const storage = getStorage().bucket();
export const db = getDatabase();
