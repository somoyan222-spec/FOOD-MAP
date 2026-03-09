"use client";

import { useState, useEffect } from "react";
import { SubwayStation, SubwayLine } from "@/types";
import { storage } from "@/lib/data";
import SubwayMap from "@/components/subway-map";
import StationSidebar from "@/components/station-sidebar";
import AllFoodsList from "@/components/all-foods-list";
import { Star } from "lucide-react";

export default function Home() {
  const [selectedStation, setSelectedStation] = useState<SubwayStation | null>(null);
  const [dataVersion, setDataVersion] = useState(0);
  const [lines, setLines] = useState<SubwayLine[]>([]);
  const [showAllFoods, setShowAllFoods] = useState(false);

  useEffect(() => {
    loadData();
  }, [dataVersion]);

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
    setDataVersion((prev) => prev + 1);
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

  // 计算所有线路的统计数据
  const totalStats = {
    totalLines: lines.length,
    totalStations: lines.reduce((sum, line) => sum + line.stations.length, 0),
    totalFoods: lines.reduce(
      (sum, line) => sum + line.stations.reduce((s, station) => s + station.foods.length, 0),
      0
    ),
    avgRating: (() => {
      const allFoods = lines.flatMap((line) =>
        line.stations.flatMap((station) => station.foods)
      );
      if (allFoods.length === 0) return "0";
      const avg = allFoods.reduce((sum, f) => sum + f.rating, 0) / allFoods.length;
      return avg.toFixed(1);
    })(),
  };

  // 重置数据
  const handleResetData = () => {
    if (confirm("确定要重置所有数据吗？这将清除所有已添加的美食信息并更新到最新版本的地铁线路数据。")) {
      storage.resetData();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 主内容区域 - 地铁线路图 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航和统计 */}
        <div className="bg-white border-b">
          <div className="px-6 py-4 border-b">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">广州美食地图</h1>
              <p className="text-sm text-gray-500 mt-1">点击站点查看或添加周边美食，或使用搜索栏快速查找站点</p>
            </div>
          </div>

          {/* 统计信息面板 */}
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

              {/* 重置数据按钮 - 已隐藏 */}
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

      {/* 站点详情侧边栏 */}
      {selectedStation && (
        <StationSidebar
          station={selectedStation}
          onClose={handleStationDeselect}
          onDataChange={handleDataChange}
        />
      )}

      {/* 全部美食列表 */}
      {showAllFoods && (
        <AllFoodsList lines={lines} onClose={() => setShowAllFoods(false)} />
      )}
    </div>
  );
}
