"use client";

import { useState, useEffect } from "react";
import { SubwayStation, SubwayLine } from "@/types";
import { storage } from "@/lib/data";
import { firebaseStorage } from "@/lib/firebase-storage";
import SubwayMap from "@/components/subway-map";
import StationSidebar from "@/components/station-sidebar";
import AllFoodsList from "@/components/all-foods-list";
import { MalteseDog, Cloud, FoodWithDog } from "@/components/maltese-dog";
import "@/styles/maltese-theme.css";

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
      <div 
        className="flex h-screen items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #E3F2FD 0%, #E8F5E9 50%, #FFF3E0 100%)"
        }}
      >
        <div className="text-center">
          <div className="maltese-loading">
            <MalteseDog size={120} color="beige" animated />
          </div>
          <p className="mt-6 text-lg font-medium" style={{ color: "#5D6D7E" }}>
            小狗正在加载美食地图...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex h-screen"
      style={{
        background: "linear-gradient(135deg, #E3F2FD 0%, #E8F5E9 50%, #FFF3E0 100%)"
      }}
    >
      <div className="flex-1 flex flex-col">
        {/* 头部区域 */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100">
          {/* 标题栏 */}
          <div className="px-6 py-4 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MalteseDog size={60} color="beige" />
                <div>
                  <h1 
                    className="text-2xl font-bold"
                    style={{ 
                      color: "#2C3E50",
                      textShadow: "2px 2px 4px rgba(135, 206, 235, 0.3)"
                    }}
                  >
                    广州美食地图
                  </h1>
                  <p className="text-sm mt-1" style={{ color: "#5D6D7E" }}>
                    🐕 点击站点查看或添加周边美食，或使用搜索栏快速查找站点
                  </p>
                </div>
              </div>
              {isUsingFirebase && (
                <div 
                  className="flex items-center gap-2 text-sm px-4 py-2 rounded-full"
                  style={{ 
                    background: "linear-gradient(135deg, #90EE90 0%, #C8F0C8 100%)",
                    color: "#2C3E50"
                  }}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  实时同步已启用
                </div>
              )}
            </div>
          </div>

          {/* 统计栏 */}
          <div 
            className="px-6 py-4"
            style={{
              background: "linear-gradient(90deg, rgba(255,140,105,0.1) 0%, rgba(253,203,110,0.1) 100%)"
            }}
          >
            <div className="flex items-center justify-between">
              {/* 美食总数按钮 */}
              <div
                className="cursor-pointer transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #F5E6D3 0%, #FFB6A3 100%)",
                  border: "3px solid #FF8C69",
                  borderRadius: "25px",
                  padding: "16px 24px",
                  boxShadow: "0 6px 20px rgba(255, 140, 105, 0.3)",
                  position: "relative"
                }}
                onClick={() => setShowAllFoods(true)}
              >
                <div className="flex items-center gap-3">
                  <FoodWithDog size={50} />
                  <div>
                    <div 
                      className="text-sm font-medium mb-1"
                      style={{ color: "#8B4513" }}
                    >
                      美食总数
                    </div>
                    <div 
                      className="text-3xl font-bold"
                      style={{ color: "#2C3E50" }}
                    >
                      {totalStats.totalFoods}
                    </div>
                  </div>
                </div>
                {/* 装饰性小狗 */}
                <div className="absolute -top-2 -right-2">
                  <MalteseDog size={40} color="white" />
                </div>
              </div>

              {/* 其他统计 */}
              <div className="flex items-center gap-4">
                <div 
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "2px solid #87CEEB",
                    color: "#2C3E50"
                  }}
                >
                  🚇 {totalStats.totalLines} 条线路
                </div>
                <div 
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "2px solid #90EE90",
                    color: "#2C3E50"
                  }}
                >
                  📍 {totalStats.totalStations} 个站点
                </div>
                <div 
                  className="px-4 py-2 rounded-full text-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "2px solid #FDCB6E",
                    color: "#2C3E50"
                  }}
                >
                  ⭐ 平均 {totalStats.avgRating} 分
                </div>
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

        {/* 地图区域 */}
        <div className="flex-1 overflow-hidden relative">
          {/* 装饰云朵 */}
          <div className="absolute top-4 left-8 z-10 pointer-events-none">
            <Cloud size={80} />
          </div>
          <div className="absolute top-8 right-12 z-10 pointer-events-none">
            <Cloud size={60} />
          </div>
          
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
