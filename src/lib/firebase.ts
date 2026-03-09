import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let database: Database | null = null;

export const isConfigured = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.databaseURL &&
    firebaseConfig.projectId
  );
};

export const getFirebase = () => {
  if (typeof window === "undefined") {
    return { app: null, database: null };
  }

  if (!isConfigured()) {
    console.warn("Firebase not configured - missing environment variables");
    return { app: null, database: null };
  }

  try {
    if (!app) {
      if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
        console.log("Firebase initialized successfully");
      } else {
        app = getApp();
        console.log("Firebase app already initialized");
      }
    }

    if (!database && app) {
      database = getDatabase(app);
      console.log("Firebase database initialized");
    }

    return { app, database };
  } catch (error) {
    console.error("Firebase initialization error:", error);
    return { app: null, database: null };
  }
};

if (typeof window !== "undefined") {
  getFirebase();
}
