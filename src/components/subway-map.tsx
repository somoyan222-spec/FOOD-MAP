"use client";

import { useState, useEffect } from "react";
import { SubwayLine, SubwayStation } from "@/types";
import { storage } from "@/lib/data";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";

interface SubwayMapProps {
  selectedStation: SubwayStation | null;
  onStationSelect: (station: SubwayStation) => void;
  onStationDeselect: () => void;
}

interface SearchResult {
  station: SubwayStation;
  line: SubwayLine;
}

export default function SubwayMap({
  selectedStation,
  onStationSelect,
  onStationDeselect,
}: SubwayMapProps) {
  const [lines, setLines] = useState<SubwayLine[]>([]);
  const [selectedLineId, setSelectedLineId] = useState<string>("");
  const [scale, setScale] = useState(1.0); // 默认缩放比例为100%
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showAllLines, setShowAllLines] = useState(false); // 控制是否显示所有线路

  useEffect(() => {
    const data = storage.getData();
    setLines(data.lines);
    if (data.lines.length > 0 && !selectedLineId) {
      setSelectedLineId(data.lines[0].id);
    }
  }, [selectedLineId]);

  const selectedLine = lines.find((line) => line.id === selectedLineId);

  // 搜索功能
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    lines.forEach((line) => {
      line.stations.forEach((station) => {
        if (station.name.toLowerCase().includes(query)) {
          results.push({ station, line });
        }
      });
    });

    setSearchResults(results);
    setShowSearchResults(true);
  }, [searchQuery, lines]);

  // 选择搜索结果
  const handleSelectSearchResult = (result: SearchResult) => {
    setSelectedLineId(result.line.id);
    onStationSelect(result.station);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  // 缩放控制
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 5)); // 最大放大到 5 倍
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 1)); // 最小缩小到 1 倍
  };

  const handleResetZoom = () => {
    setScale(1.0); // 重置为 1 倍（100%）
  };

  // 清空搜索
  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  // 计算当前线路的边界，动态调整 viewBox（竖向展示）
  const getLineViewBox = () => {
    if (!selectedLine || selectedLine.stations.length === 0) {
      return { x: 0, y: 0, width: 1200, height: 6000 };
    }

    // 将横向坐标转换为竖向坐标（交换 x 和 y）
    const xs = selectedLine.stations.map(s => s.y); // 原来的 y 变成 x（横向）
    const ys = selectedLine.stations.map(s => s.x); // 原来的 x 变成 y（竖向）
    const minX = Math.min(...xs) - 300; // 增加右侧空间用于显示站点名称
    const maxX = Math.max(...xs) + 100;
    const minY = Math.min(...ys) - 100;
    const maxY = Math.max(...ys) + 100;

    const width = maxX - minX;
    const height = maxY - minY;

    return { x: minX, y: minY, width, height };
  };

  const viewBox = getLineViewBox();

  return (
    <div className="flex flex-col h-full">
      {/* 控制栏 */}
      <div className="p-3 bg-white border-b">
        {/* 第一行：搜索栏和缩放控制 */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* 搜索栏 */}
          <div className="relative flex-1 max-w-xs sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索站点名称..."
                className="w-full pl-9 pr-9 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 搜索结果下拉 */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                {searchResults.map((result) => (
                  <button
                    key={result.station.id}
                    onClick={() => handleSelectSearchResult(result)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: result.line.color }}
                      />
                      <span className="font-medium text-gray-900">
                        {result.station.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({result.line.name})
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {showSearchResults && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
                未找到匹配的站点
              </div>
            )}
          </div>

          {/* 缩放控制 */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleZoomOut}
              className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
              aria-label="缩小"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="text-xs text-gray-600 min-w-[40px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 bg-gray-100 rounded hover:bg-gray-200"
              aria-label="放大"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-xs"
            >
              重置
            </button>
          </div>
        </div>

        {/* 第二行：线路切换 */}
        <div>
          <div className="flex flex-wrap gap-1.5">
            {/* 默认显示前4条线路 */}
            {(showAllLines ? lines : lines.slice(0, 4)).map((line) => (
              <button
                key={line.id}
                onClick={() => setSelectedLineId(line.id)}
                className={`px-2.5 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedLineId === line.id
                    ? "text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor:
                    selectedLineId === line.id ? line.color : undefined,
                }}
              >
                {line.name}
              </button>
            ))}
          </div>

          {/* 展开/收起按钮 */}
          {lines.length > 4 && (
            <button
              onClick={() => setShowAllLines(!showAllLines)}
              className="mt-1.5 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              {showAllLines ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  收起线路
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  展开全部线路 ({lines.length}条)
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* 地铁图 */}
      <div className="flex-1 overflow-auto bg-gray-50 flex items-start justify-center p-4">
        {selectedLine && (
          <div className="w-full">
            <svg
              viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
              className="w-full"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center top",
                transition: "transform 0.2s ease-out"
              }}
            >
              {/* 线路 */}
              {selectedLine.stations.length > 0 && (
                <path
                  d={`M ${selectedLine.stations[0].y} ${selectedLine.stations[0].x} ${selectedLine.stations
                    .map((s) => `L ${s.y} ${s.x}`)
                    .join(" ")}`}
                  stroke={selectedLine.color}
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* 站点 */}
              {selectedLine.stations.map((station, index) => {
                const hasFood = station.foods.length > 0;
                const isSelected = selectedStation?.id === station.id;

                // 将横向坐标转换为竖向坐标（交换 x 和 y）
                const cx = station.y; // 原来的 y 变成 x（横向）
                const cy = station.x; // 原来的 x 变成 y（竖向）

                // 计算站点名称的位置（在站点右侧）
                const nameOffsetX = 30;
                const nameOffsetY = (index % 2 === 0) ? 6 : -6; // 上下交错避免重合

                return (
                  <g key={station.id}>
                    {/* 站点圆形 */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 20 : 14}
                      fill={isSelected ? selectedLine.color : "white"}
                      stroke={selectedLine.color}
                      strokeWidth={isSelected ? 6 : 4}
                      className="cursor-pointer transition-all hover:r-16"
                      onClick={() => onStationSelect(station)}
                    />

                    {/* 美食标记 */}
                    {hasFood && (
                      <circle
                        cx={cx - 12}
                        cy={cy - 12}
                        r={10}
                        fill="#FF6B35"
                        stroke="white"
                        strokeWidth={2}
                      />
                    )}

                    {/* 美食数量提示 */}
                    {hasFood && (
                      <text
                        x={cx - 12}
                        cy={cy - 5}
                        textAnchor="middle"
                        fontSize={12}
                        fill="white"
                        fontWeight={600}
                        className="pointer-events-none select-none"
                      >
                        {station.foods.length}
                      </text>
                    )}

                    {/* 站点名称（在右侧） */}
                    <text
                      x={cx + nameOffsetX}
                      y={cy + nameOffsetY}
                      textAnchor="start"
                      fontSize={16}
                      fontWeight={isSelected ? 700 : 600}
                      fill={isSelected ? selectedLine.color : "#333"}
                      className="pointer-events-none select-none"
                    >
                      {station.name}
                    </text>
                  </g>
                );
              })}
            </svg>
        </div>
        )}
      </div>
    </div>
  );
}
