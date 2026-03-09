import { ref, onValue, set, get, off } from "firebase/database";
import { database, isConfigured, initFirebase } from "./firebase";
import { AppData, FoodItem } from "@/types";
import { initialData, DATA_VERSION } from "./data";

const DATA_REF = "foodMapData";

// 获取数据库实例（确保已初始化）
const getDatabaseInstance = () => {
  if (typeof window === "undefined") {
    return null;
  }
  if (!database) {
    const initialized = initFirebase();
    return initialized?.database || null;
  }
  return database;
};

export const firebaseStorage = {
  isAvailable(): boolean {
    if (typeof window === "undefined") {
      return false;
    }
    return isConfigured() && getDatabaseInstance() !== null;
  },

  async getData(): Promise<AppData> {
    const db = getDatabaseInstance();
    if (!db) {
      return initialData;
    }

    const dataRef = ref(db, DATA_REF);
    const snapshot = await get(dataRef);
    
    if (!snapshot.exists()) {
      await set(dataRef, initialData);
      return initialData;
    }
    
    const data = snapshot.val() as AppData;
    
    if (!data.version || data.version !== DATA_VERSION) {
      await set(dataRef, initialData);
      return initialData;
    }
    
    return data;
  },

  subscribeToData(callback: (data: AppData) => void): () => void {
    const db = getDatabaseInstance();
    if (!db) {
      callback(initialData);
      return () => {};
    }

    const dataRef = ref(db, DATA_REF);
    
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as AppData;
        callback(data);
      } else {
        set(dataRef, initialData);
        callback(initialData);
      }
    });
    
    return () => off(dataRef);
  },

  async saveData(data: AppData): Promise<void> {
    const db = getDatabaseInstance();
    if (!db) {
      return;
    }

    const dataRef = ref(db, DATA_REF);
    const dataWithVersion = { ...data, version: DATA_VERSION };
    await set(dataRef, dataWithVersion);
  },

  async addFood(lineId: string, stationId: string, food: FoodItem): Promise<void> {
    const db = getDatabaseInstance();
    if (!db) {
      return;
    }

    const data = await this.getData();
    const lineIndex = data.lines.findIndex(l => l.id === lineId);
    
    if (lineIndex >= 0) {
      const stationIndex = data.lines[lineIndex].stations.findIndex(s => s.id === stationId);
      
      if (stationIndex >= 0) {
        data.lines[lineIndex].stations[stationIndex].foods.push(food);
        await this.saveData(data);
      }
    }
  },

  async updateFood(lineId: string, stationId: string, food: FoodItem): Promise<void> {
    const db = getDatabaseInstance();
    if (!db) {
      return;
    }

    const data = await this.getData();
    const lineIndex = data.lines.findIndex(l => l.id === lineId);
    
    if (lineIndex >= 0) {
      const stationIndex = data.lines[lineIndex].stations.findIndex(s => s.id === stationId);
      
      if (stationIndex >= 0) {
        const foodIndex = data.lines[lineIndex].stations[stationIndex].foods.findIndex(f => f.id === food.id);
        
        if (foodIndex >= 0) {
          data.lines[lineIndex].stations[stationIndex].foods[foodIndex] = food;
          await this.saveData(data);
        }
      }
    }
  },

  async deleteFood(lineId: string, stationId: string, foodId: string): Promise<void> {
    const db = getDatabaseInstance();
    if (!db) {
      return;
    }

    const data = await this.getData();
    const lineIndex = data.lines.findIndex(l => l.id === lineId);
    
    if (lineIndex >= 0) {
      const stationIndex = data.lines[lineIndex].stations.findIndex(s => s.id === stationId);
      
      if (stationIndex >= 0) {
        data.lines[lineIndex].stations[stationIndex].foods = 
          data.lines[lineIndex].stations[stationIndex].foods.filter(f => f.id !== foodId);
        await this.saveData(data);
      }
    }
  },

  async resetData(): Promise<void> {
    const db = getDatabaseInstance();
    if (!db) {
      return;
    }

    const dataRef = ref(db, DATA_REF);
    await set(dataRef, initialData);
  },
};
