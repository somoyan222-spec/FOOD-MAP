import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

let app: FirebaseApp | null = null;
let database: Database | null = null;

// 硬编码 Firebase 配置（临时解决方案）
const firebaseConfig = {
  apiKey: "AIzaSyBwHUAw93e8yv4f3xMO08jfwv52h64C4w",
  authDomain: "food-map-43a16.firebaseapp.com",
  databaseURL: "https://food-map-43a16-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "food-map-43a16",
  storageBucket: "food-map-43a16.firebasestorage.app",
  messagingSenderId: "683873152380",
  appId: "1:683873152380:web:565feb77ceecf08b5008f9",
};

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

// 只在客户端初始化
if (typeof window !== "undefined") {
  setTimeout(() => {
    getFirebase();
  }, 0);
}
