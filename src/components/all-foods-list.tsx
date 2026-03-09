"use client";

import { useState, useMemo } from "react";
import { SubwayLine, FoodItem, FoodCategory } from "@/types";
import { FOOD_CATEGORIES } from "@/lib/data";
import { X, Filter, Search } from "lucide-react";
import FoodCard from "./food-card";

interface AllFoodsListProps {
  lines: SubwayLine[];
  onClose: () => void;
}

export default function AllFoodsList({ lines, onClose }: AllFoodsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | "全部">("全部");
  const [searchQuery, setSearchQuery] = useState("");

  // 获取所有美食
  const allFoods = useMemo(() => {
    const foods: (FoodItem & { stationName: string; lineName: string; lineColor: string })[] = [];

    lines.forEach((line) => {
      (line.stations || []).forEach((station) => {
        (station.foods || []).forEach((food) => {
          foods.push({
            ...food,
            stationName: station.name,
            lineName: line.name,
            lineColor: line.color,
          });
        });
      });
    });

    return foods;
  }, [lines]);

  // 根据分类和搜索过滤美食
  const filteredFoods = useMemo(() => {
    let result = allFoods;

    // 按分类过滤
    if (selectedCategory !== "全部") {
      result = result.filter((food) => food.category === selectedCategory);
    }

    // 按搜索关键词过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (food) =>
          food.name.toLowerCase().includes(query) ||
          food.recommendedDish.toLowerCase().includes(query) ||
          food.stationName.toLowerCase().includes(query) ||
          food.lineName.toLowerCase().includes(query)
      );
    }

    return result;
  }, [allFoods, selectedCategory, searchQuery]);

  // 统计各分类数量
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = { 全部: allFoods.length };
    FOOD_CATEGORIES.forEach((cat) => {
      stats[cat] = allFoods.filter((f) => f.category === cat).length;
    });
    return stats;
  }, [allFoods]);

  // 计算统计信息
  const stats = useMemo(() => {
    const avgRating = filteredFoods.length > 0
      ? (filteredFoods.reduce((sum, f) => sum + f.rating, 0) / filteredFoods.length).toFixed(1)
      : "0";

    return {
      count: filteredFoods.length,
      avgRating,
    };
  }, [filteredFoods]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* 头部 */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">全部美食</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 统计信息 */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">总数：</span>
              <span className="font-bold text-gray-900">{stats.count} 家</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">平均评分：</span>
              <span className="font-bold text-gray-900">{stats.avgRating} ⭐</span>
            </div>
          </div>
        </div>

        {/* 过滤器 */}
        <div className="p-4 border-b bg-gray-50">
          {/* 分类过滤 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">按分类筛选：</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("全部")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === "全部"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                全部 ({categoryStats["全部"]})
              </button>
              {FOOD_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {cat} ({categoryStats[cat]})
                </button>
              ))}
            </div>
          </div>

          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索店名、推荐菜品、站点或线路..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 美食列表 */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredFoods.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                暂无符合条件的美食
              </h3>
              <p className="text-gray-500">
                {selectedCategory !== "全部" ? `分类 "${selectedCategory}" 下没有收录的美食` : "还没有添加任何美食"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFoods.map((food) => (
                <div key={food.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: food.lineColor }}
                        />
                        <span className="text-xs text-gray-500">
                          {food.lineName} · {food.stationName}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900">{food.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span className="font-bold">{food.rating}</span>
                      <span className="text-sm">⭐</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <div>
                      <span className="text-gray-500">分类：</span>
                      <span>{food.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">价格：</span>
                      <span>{food.priceRange}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">推荐：</span>
                      <span className="text-gray-900">{food.recommendedDish}</span>
                    </div>
                    {food.distance > 0 && (
                      <div>
                        <span className="text-gray-500">距离：</span>
                        <span>{food.distance} 米</span>
                      </div>
                    )}
                    {food.remarks && (
                      <div>
                        <span className="text-gray-500">备注：</span>
                        <span>{food.remarks}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
