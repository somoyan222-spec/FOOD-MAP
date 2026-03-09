import { ref, onValue, set, get, off } from "firebase/database";
import { database, isConfigured } from "./firebase";
import { AppData, FoodItem } from "@/types";
import { initialData, DATA_VERSION } from "./data";

const DATA_REF = "foodMapData";

export const firebaseStorage = {
  isAvailable(): boolean {
    return isConfigured() && database !== null;
  },

  async getData(): Promise<AppData> {
    if (!database) {
      return initialData;
    }

    const dataRef = ref(database, DATA_REF);
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
    if (!database) {
      callback(initialData);
      return () => {};
    }

    const dataRef = ref(database, DATA_REF);
    
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
    if (!database) {
      return;
    }

    const dataRef = ref(database, DATA_REF);
    const dataWithVersion = { ...data, version: DATA_VERSION };
    await set(dataRef, dataWithVersion);
  },

  async addFood(lineId: string, stationId: string, food: FoodItem): Promise<void> {
    if (!database) {
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
    if (!database) {
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
    if (!database) {
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
    if (!database) {
      return;
    }

    const dataRef = ref(database, DATA_REF);
    await set(dataRef, initialData);
  },
};
