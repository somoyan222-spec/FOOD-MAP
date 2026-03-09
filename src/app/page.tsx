"use client";

import { useState, useEffect } from "react";
import { SubwayStation, SubwayLine } from "@/types";
import { storage } from "@/lib/data";
import { firebaseStorage } from "@/lib/firebase-storage";
import SubwayMap from "@/components/subway-map";
import StationSidebar from "@/components/station-sidebar";
import AllFoodsList from "@/components/all-foods-list";
import { Star } from "lucide-react";

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
        .flatMap(line => line.stations)
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
    if (confirm("确定要重置所有数据吗？这将清除所有已添加的美食信息并更新到最新版本的地铁线路数据。")) {
      if (isUsingFirebase) {
        await firebaseStorage.resetData();
      } else {
        storage.resetData();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">广州美食地图</h1>
                <p className="text-sm text-gray-500 mt-1">点击站点查看或添加周边美食，或使用搜索栏快速查找站点</p>
              </div>
              {isUsingFirebase && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  实时同步已启用
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md hover:bg-orange-50 transition-all"
                onClick={() => setShowAllFoods(true)}
              >
                <div className="flex items-center gap-2 text-orange-600 mb-2">
                  <Star className="w-5 h-5" />
                  <span className="text-sm font-medium">美食总数</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{totalStats.totalFoods}</div>
              </div>

              <button
                onClick={handleResetData}
                className="hidden"
                title="重置为最新地铁数据"
              >
                🔄 更新地铁数据
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <SubwayMap
            selectedStation={selectedStation}
            onStationSelect={handleStationSelect}
            onStationDeselect={handleStationDeselect}
            onDataChange={handleDataChange}
          />
        </div>
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
