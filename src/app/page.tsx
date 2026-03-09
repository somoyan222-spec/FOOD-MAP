"use client";

import { useState, useEffect } from "react";
import { SubwayStation, SubwayLine } from "@/types";
import { storage } from "@/lib/data";
import { firebaseStorage } from "@/lib/firebase-storage";
import SubwayMap from "@/components/subway-map";
import StationSidebar from "@/components/station-sidebar";
import AllFoodsList from "@/components/all-foods-list";
import { MinimalDogIcon } from "@/components/minimal-dog";
import { MapPin, Star, Utensils, DollarSign, Edit2, Trash2 } from "lucide-react";
import "@/styles/minimal-theme.css";

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
      <div className="minimal-loading">
        <div className="text-center">
          <div className="minimal-loading-spinner mx-auto mb-6"></div>
          <p className="text-sm text-gray-500 tracking-wide">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-100 px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <MinimalDogIcon size={28} className="text-gray-800" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                    广州美食地图
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    探索城市美味
                  </p>
                </div>
              </div>
              {isUsingFirebase && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="font-medium">实时同步</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowAllFoods(true)}
                className="minimal-card px-8 py-5 flex items-center gap-4 hover:cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    美食总数
                  </span>
                  <span className="text-3xl font-semibold text-gray-900 mt-1">
                    {totalStats.totalFoods}
                  </span>
                </div>
              </button>

              <div className="flex items-center gap-4 flex-1">
                <div className="minimal-card px-6 py-4 flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Utensils size={16} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500">线路</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {totalStats.totalLines}
                    </span>
                  </div>
                </div>

                <div className="minimal-card px-6 py-4 flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <MapPin size={16} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500">站点</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {totalStats.totalStations}
                    </span>
                  </div>
                </div>

                <div className="minimal-card px-6 py-4 flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Star size={16} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-500">评分</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {totalStats.avgRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden bg-[#FAFAFA]">
          <div className="h-full">
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
