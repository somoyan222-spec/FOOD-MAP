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

const isConfigured = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.databaseURL &&
    firebaseConfig.projectId
  );
};

const initFirebase = () => {
  if (!isConfigured()) {
    return null;
  }

  try {
    // 检查是否已经初始化
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    database = getDatabase(app);
    return { app, database };
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
    return null;
  }
};

// 在客户端初始化
if (typeof window !== "undefined") {
  initFirebase();
}

// 导出初始化函数，供服务端使用
export { app, database, isConfigured, initFirebase };
