import { ref, onValue, set, get, off } from "firebase/database";
import { getFirebase, isConfigured } from "./firebase";
import { AppData, FoodItem } from "@/types";
import { initialData, DATA_VERSION } from "./data";

const DATA_REF = "foodMapData";

export const firebaseStorage = {
  isAvailable(): boolean {
    if (typeof window === "undefined") {
      return false;
    }
    const { database } = getFirebase();
    return database !== null;
  },

  async getData(): Promise<AppData> {
    const { database } = getFirebase();
    if (!database) {
      console.log("Firebase not available, returning initial data");
      return initialData;
    }

    console.log("Getting data from Firebase...");
    const dataRef = ref(database, DATA_REF);
    const snapshot = await get(dataRef);
    
    if (!snapshot.exists()) {
      console.log("No data in Firebase, initializing with default data");
      await set(dataRef, initialData);
      return initialData;
    }
    
    const data = snapshot.val() as AppData;
    console.log("Got data from Firebase:", data);
    
    if (!data.version || data.version !== DATA_VERSION) {
      console.log("Data version mismatch, resetting to default data");
      await set(dataRef, initialData);
      return initialData;
    }
    
    return data;
  },

  subscribeToData(callback: (data: AppData) => void): () => void {
    const { database } = getFirebase();
    if (!database) {
      console.log("Firebase not available, using initial data");
      callback(initialData);
      return () => {};
    }

    console.log("Subscribing to Firebase data...");
    const dataRef = ref(database, DATA_REF);
    
    const unsubscribe = onValue(dataRef, (snapshot) => {
      console.log("Firebase data changed");
      if (snapshot.exists()) {
        const data = snapshot.val() as AppData;
        callback(data);
      } else {
        console.log("No data in Firebase, setting default data");
        set(dataRef, initialData);
        callback(initialData);
      }
    });
    
    return () => off(dataRef);
  },

  async saveData(data: AppData): Promise<void> {
    const { database } = getFirebase();
    if (!database) {
      console.log("Firebase not available, skipping save");
      return;
    }

    console.log("Saving data to Firebase...", data);
    const dataRef = ref(database, DATA_REF);
    const dataWithVersion = { ...data, version: DATA_VERSION };
    await set(dataRef, dataWithVersion);
    console.log("Data saved to Firebase successfully");
  },

  async addFood(lineId: string, stationId: string, food: FoodItem): Promise<void> {
    console.log("Adding food to Firebase...", { lineId, stationId, food });
    const data = await this.getData();
    const lineIndex = data.lines.findIndex(l => l.id === lineId);
    
    if (lineIndex >= 0) {
      const stationIndex = data.lines[lineIndex].stations.findIndex(s => s.id === stationId);
      
      if (stationIndex >= 0) {
        // 确保 foods 数组存在
        if (!data.lines[lineIndex].stations[stationIndex].foods) {
          data.lines[lineIndex].stations[stationIndex].foods = [];
        }
        data.lines[lineIndex].stations[stationIndex].foods.push(food);
        await this.saveData(data);
        console.log("Food added successfully");
      }
    }
  },

  async updateFood(lineId: string, stationId: string, food: FoodItem): Promise<void> {
    console.log("Updating food in Firebase...", { lineId, stationId, food });
    const data = await this.getData();
    const lineIndex = data.lines.findIndex(l => l.id === lineId);
    
    if (lineIndex >= 0) {
      const stationIndex = data.lines[lineIndex].stations.findIndex(s => s.id === stationId);
      
      if (stationIndex >= 0) {
        // 确保 foods 数组存在
        if (!data.lines[lineIndex].stations[stationIndex].foods) {
          data.lines[lineIndex].stations[stationIndex].foods = [];
        }
        const foodIndex = data.lines[lineIndex].stations[stationIndex].foods.findIndex(f => f.id === food.id);
        
        if (foodIndex >= 0) {
          data.lines[lineIndex].stations[stationIndex].foods[foodIndex] = food;
          await this.saveData(data);
          console.log("Food updated successfully");
        }
      }
    }
  },

  async deleteFood(lineId: string, stationId: string, foodId: string): Promise<void> {
    console.log("Deleting food from Firebase...", { lineId, stationId, foodId });
    const data = await this.getData();
    const lineIndex = data.lines.findIndex(l => l.id === lineId);
    
    if (lineIndex >= 0) {
      const stationIndex = data.lines[lineIndex].stations.findIndex(s => s.id === stationId);
      
      if (stationIndex >= 0) {
        // 确保 foods 数组存在
        if (!data.lines[lineIndex].stations[stationIndex].foods) {
          data.lines[lineIndex].stations[stationIndex].foods = [];
        }
        data.lines[lineIndex].stations[stationIndex].foods = 
          data.lines[lineIndex].stations[stationIndex].foods.filter(f => f.id !== foodId);
        await this.saveData(data);
        console.log("Food deleted successfully");
      }
    }
  },

  async resetData(): Promise<void> {
    console.log("Resetting Firebase data...");
    const { database } = getFirebase();
    if (!database) {
      return;
    }

    const dataRef = ref(database, DATA_REF);
    await set(dataRef, initialData);
    console.log("Firebase data reset successfully");
  },
};
