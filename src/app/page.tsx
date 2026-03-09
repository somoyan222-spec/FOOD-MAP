"use client";

import { useState, useEffect } from "react";
import { SubwayStation, SubwayLine } from "@/types";
import { storage } from "@/lib/data";
import { firebaseStorage } from "@/lib/firebase-storage";
import SubwayMap from "@/components/subway-map";
import StationSidebar from "@/components/station-sidebar";
import AllFoodsList from "@/components/all-foods-list";
import { 
  MalteseDog, 
  Cloud, 
  FoodWithDog,
  TwoDogsTogether,
  HappyWhiteDog,
  TwoDogsLying,
  PawPrint
} from "@/components/maltese-dog";
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
          background: "linear-gradient(180deg, #87CEEB 0%, #B8E6F0 30%, #90EE90 70%, #C8F0C8 100%)"
        }}
      >
        <div className="text-center relative">
          {/* 背景装饰 - 两只小狗 */}
          <div className="absolute -top-20 -left-40 opacity-30">
            <TwoDogsTogether size={300} />
          </div>
          
          {/* 加载动画 - 开心小狗 */}
          <div className="relative z-10">
            <div className="maltese-loading">
              <HappyWhiteDog size={180} />
            </div>
            <p 
              className="mt-4 text-2xl font-bold"
              style={{ 
                color: "#2C3E50",
                textShadow: "2px 2px 4px rgba(255,255,255,0.8)"
              }}
            >
              小狗正在加载美食地图...
            </p>
            <p className="mt-2 text-lg" style={{ color: "#5D6D7E" }}>
              稍等一下下~ 🐕✨
            </p>
          </div>
          
          {/* 装饰云朵 */}
          <div className="absolute -top-10 -right-20 opacity-40">
            <Cloud size={100} />
          </div>
          <div className="absolute -bottom-10 -left-20 opacity-30">
            <Cloud size={80} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex h-screen"
      style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #B8E6F0 25%, #E8F5E9 50%, #90EE90 75%, #C8F0C8 100%)"
      }}
    >
      <div className="flex-1 flex flex-col relative">
        {/* 背景装饰 - 小狗脚印 */}
        <div className="absolute top-32 left-10 z-0 pointer-events-none opacity-20">
          <PawPrint size={40} />
        </div>
        <div className="absolute top-40 right-20 z-0 pointer-events-none opacity-15">
          <PawPrint size={35} />
        </div>
        <div className="absolute bottom-32 left-40 z-0 pointer-events-none opacity-20">
          <PawPrint size={30} />
        </div>
        
        {/* 头部区域 */}
        <div 
          className="bg-white/85 backdrop-blur-md border-b border-orange-200 relative z-10"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)"
          }}
        >
          {/* 标题栏 */}
          <div className="px-6 py-4 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <MalteseDog size={65} color="beige" />
                  {/* 装饰性小花 */}
                  <div 
                    className="absolute -top-2 -right-2 text-2xl"
                    style={{ animation: "pulse 2s infinite" }}
                  >
                    🌸
                  </div>
                </div>
                <div>
                  <h1 
                    className="text-3xl font-extrabold"
                    style={{ 
                      color: "#2C3E50",
                      textShadow: "2px 2px 4px rgba(135, 206, 235, 0.3)"
                    }}
                  >
                    广州美食地图
                  </h1>
                  <p 
                    className="text-sm mt-1 font-medium"
                    style={{ color: "#5D6D7E" }}
                  >
                    🐕 点击站点查看或添加周边美食，一起寻找美味吧~
                  </p>
                </div>
              </div>
              {isUsingFirebase && (
                <div 
                  className="flex items-center gap-2 text-sm px-5 py-2 rounded-full font-medium"
                  style={{ 
                    background: "linear-gradient(135deg, #90EE90 0%, #C8F0C8 100%)",
                    color: "#2C3E50",
                    boxShadow: "0 2px 10px rgba(144, 238, 144, 0.3)"
                  }}
                >
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  实时同步已启用 ✨
                </div>
              )}
            </div>
          </div>

          {/* 统计栏 */}
          <div 
            className="px-6 py-5 relative overflow-hidden"
            style={{
              background: "linear-gradient(90deg, rgba(255,140,105,0.15) 0%, rgba(253,203,110,0.15) 50%, rgba(255,140,105,0.15) 100%)"
            }}
          >
            {/* 背景装饰 - 趴着的小狗 */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none">
              <TwoDogsLying size={180} />
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              {/* 美食总数按钮 - 带两只小狗背景 */}
              <div
                className="cursor-pointer transition-all hover:scale-105 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #FFF8DC 0%, #FFEFB5 50%, #FFD9B3 100%)",
                  border: "4px solid #FF8C69",
                  borderRadius: "30px",
                  padding: "20px 32px",
                  boxShadow: "0 8px 25px rgba(255, 140, 105, 0.35)",
                  position: "relative",
                  minWidth: "280px"
                }}
                onClick={() => setShowAllFoods(true)}
              >
                {/* 背景装饰 - 两只小狗坐在一起 */}
                <div className="absolute -right-6 bottom-0 opacity-20 pointer-events-none">
                  <TwoDogsTogether size={140} />
                </div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <FoodWithDog size={65} />
                  <div>
                    <div 
                      className="text-base font-bold mb-1"
                      style={{ color: "#8B4513" }}
                    >
                      美食总数
                    </div>
                    <div 
                      className="text-4xl font-black"
                      style={{ 
                        color: "#2C3E50",
                        textShadow: "2px 2px 0px rgba(255,140,105,0.3)"
                      }}
                    >
                      {totalStats.totalFoods}
                    </div>
                  </div>
                </div>
                
                {/* 装饰性小狗 */}
                <div className="absolute -top-4 -right-4 z-20">
                  <MalteseDog size={50} color="white" />
                </div>
              </div>

              {/* 其他统计标签 */}
              <div className="flex items-center gap-5">
                <div 
                  className="px-6 py-3 rounded-2xl text-base font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    border: "3px solid #87CEEB",
                    color: "#2C3E50",
                    boxShadow: "0 4px 15px rgba(135, 206, 235, 0.2)"
                  }}
                >
                  🚇 {totalStats.totalLines} 条线路
                </div>
                <div 
                  className="px-6 py-3 rounded-2xl text-base font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    border: "3px solid #90EE90",
                    color: "#2C3E50",
                    boxShadow: "0 4px 15px rgba(144, 238, 144, 0.2)"
                  }}
                >
                  📍 {totalStats.totalStations} 个站点
                </div>
                <div 
                  className="px-6 py-3 rounded-2xl text-base font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    border: "3px solid #FDCB6E",
                    color: "#2C3E50",
                    boxShadow: "0 4px 15px rgba(253, 203, 110, 0.2)"
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

        {/* 地图区域 - 带小狗背景装饰 */}
        <div className="flex-1 overflow-hidden relative">
          {/* 背景装饰 - 开心小狗 */}
          <div className="absolute bottom-4 right-4 z-0 pointer-events-none opacity-15">
            <HappyWhiteDog size={200} />
          </div>
          
          {/* 装饰云朵 */}
          <div className="absolute top-6 left-10 z-10 pointer-events-none">
            <Cloud size={100} />
          </div>
          <div className="absolute top-12 right-16 z-10 pointer-events-none">
            <Cloud size={80} />
          </div>
          <div className="absolute top-20 left-1/4 z-10 pointer-events-none opacity-50">
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
