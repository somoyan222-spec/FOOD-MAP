"use client";

import { useState, useEffect } from "react";
import { SubwayStation, SubwayLine } from "@/types";
import { storage } from "@/lib/data";
import { firebaseStorage } from "@/lib/firebase-storage";
import SubwayMap from "@/components/subway-map";
import StationSidebar from "@/components/station-sidebar";
import AllFoodsList from "@/components/all-foods-list";
import { MemphisPattern, MemphisStatCard } from "@/components/memphis-pattern";
import { Star, Sparkles } from "lucide-react";
import "@/styles/memphis-theme.css";

export default function Home() {
  const [selectedStation, setSelectedStation] = useState<SubwayStation | null>(null);
  const [dataVersion, setDataVersion] = useState(0);
  const [lines, setLines] = useState<SubwayLine[]>([]);
  const [showAllFoods, setShowAllFoods] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFirebase, setIsUsingFirebase] = useState(false);

  useEffect(() => {
    const useFirebase = firebaseStorage.isAvailable();
    setIsUsingFirebase(useFirebase);

    if (useFirebase) {
      setIsLoading(true);
      const unsubscribe = firebaseStorage.subscribeToData((data) => {
        setLines(data.lines);
        setIsLoading(false);
      });
      return () => {
        unsubscribe();
      };
    } else {
      loadData();
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isUsingFirebase) {
      loadData();
    }
  }, [dataVersion, isUsingFirebase]);

  const loadData = () => {
    const data = storage.getData();
    setLines(data.lines);
  };

  const handleStationSelect = (station: SubwayStation) => {
    setSelectedStation(station);
  };

  const handleStationDeselect = () => {
    setSelectedStation(null);
  };

  const handleDataChange = () => {
    if (!isUsingFirebase) {
      setDataVersion((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (selectedStation) {
      const updatedStation = lines
        .flatMap(line => line.stations || [])
        .find(s => s.id === selectedStation.id);
      if (updatedStation && updatedStation !== selectedStation) {
        setSelectedStation(updatedStation);
      }
    }
  }, [lines]);

  const totalStats = {
    totalLines: lines.length,
    totalStations: lines.reduce((sum, line) => sum + (line.stations || []).length, 0),
    totalFoods: lines.reduce(
      (sum, line) => sum + (line.stations || []).reduce((s, station) => s + (station.foods || []).length, 0),
      0
    ),
    avgRating: (() => {
      const allFoods = lines.flatMap((line) =>
        (line.stations || []).flatMap((station) => station.foods || [])
      );
      if (allFoods.length === 0) return "0";
      const avg = allFoods.reduce((sum, f) => sum + f.rating, 0) / allFoods.length;
      return avg.toFixed(1);
    })(),
  };

  const handleResetData = async () => {
    if (confirm("确定要重置所有数据吗？")) {
      if (isUsingFirebase) {
        await firebaseStorage.resetData();
      } else {
        storage.resetData();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center relative" style={{ background: "#FFF8E7" }}>
        <MemphisPattern />
        <div className="text-center relative z-10">
          <div className="memphis-card p-8" style={{ background: "#98D9C2", transform: "rotate(-2deg)" }}>
            <div className="animate-bounce-slow">
              <Sparkles size={60} className="mx-auto mb-4" style={{ color: "#2C2C2C" }} />
            </div>
            <p className="text-2xl font-bold">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen relative" style={{ background: "#FFF8E7" }}>
      <MemphisPattern />
      
      <div className="flex-1 flex flex-col relative z-10">
        <header className="px-4 py-4 md:px-8 md:py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3 md:gap-6">
                <div 
                  className="memphis-card p-3 md:p-4"
                  style={{ 
                    background: "#FF6B6B", 
                    transform: "rotate(3deg)" 
                  }}
                >
                  <Sparkles size={28} className="md:w-10 md:h-10" style={{ color: "#FFF" }} />
                </div>
                <div>
                  <h1 className="memphis-title text-2xl md:text-4xl">
                    广州美食地图
                  </h1>
                  <p className="memphis-subtitle text-sm md:text-base">
                    探索城市美味，发现惊喜
                  </p>
                </div>
              </div>
            </div>

            <div className="memphis-divider mb-6 md:mb-8"></div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowAllFoods(true)}
                className="memphis-card cursor-pointer w-full md:w-auto md:min-w-[300px]"
                style={{ 
                  background: "#F7DC6F",
                  transform: "rotate(-1deg)",
                  padding: "24px 32px"
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm md:text-base font-bold uppercase tracking-wider mb-2 opacity-70">
                    美食总数
                  </span>
                  <span className="text-4xl md:text-6xl font-extrabold">
                    {totalStats.totalFoods}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden px-4 pb-4 md:px-8 md:pb-8">
          <div 
            className="h-full memphis-card"
            style={{ 
              background: "rgba(255, 255, 255, 0.9)",
              transform: "rotate(0.5deg)"
            }}
          >
            <SubwayMap
              selectedStation={selectedStation}
              onStationSelect={handleStationSelect}
              onStationDeselect={handleStationDeselect}
              onDataChange={handleDataChange}
            />
          </div>
        </main>
      </div>

      {selectedStation && (
        <StationSidebar
          station={selectedStation}
          onClose={handleStationDeselect}
          onDataChange={handleDataChange}
        />
      )}

      {showAllFoods && (
        <AllFoodsList lines={lines} onClose={() => setShowAllFoods(false)} />
      )}
    </div>
  );
}
