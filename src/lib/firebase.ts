import { initializeApp, FirebaseApp, getApps, getApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

let app: FirebaseApp | null = null;
let database: Database | null = null;

// 获取环境变量（在函数内部调用，确保在客户端执行时获取）
const getFirebaseConfig = () => ({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

export const isConfigured = () => {
  const config = getFirebaseConfig();
  const configured = !!(
    config.apiKey &&
    config.databaseURL &&
    config.projectId
  );
  
  if (!configured) {
    console.log("Firebase config check:", {
      hasApiKey: !!config.apiKey,
      hasDatabaseUrl: !!config.databaseURL,
      hasProjectId: !!config.projectId,
    });
  }
  
  return configured;
};

export const getFirebase = () => {
  if (typeof window === "undefined") {
    return { app: null, database: null };
  }

  const config = getFirebaseConfig();

  if (!config.apiKey || !config.databaseURL || !config.projectId) {
    console.warn("Firebase not configured - missing environment variables:", {
      apiKey: config.apiKey ? "✓" : "✗",
      databaseURL: config.databaseURL ? "✓" : "✗",
      projectId: config.projectId ? "✓" : "✗",
    });
    return { app: null, database: null };
  }

  try {
    if (!app) {
      if (getApps().length === 0) {
        app = initializeApp(config);
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
  // 延迟初始化，确保环境变量已加载
  setTimeout(() => {
    getFirebase();
  }, 0);
}
