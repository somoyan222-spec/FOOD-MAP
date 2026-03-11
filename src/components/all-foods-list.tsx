"use client";

import { useState, useMemo } from "react";
import { SubwayLine, FoodItem, FoodCategory } from "@/types";
import { FOOD_CATEGORIES } from "@/lib/data";
import { X, Search, Sparkles } from "lucide-react";
import FoodCard from "./food-card";
import { MemphisPattern } from "./memphis-pattern";
import "@/styles/memphis-theme.css";

interface AllFoodsListProps {
  lines: SubwayLine[];
  onClose: () => void;
}

const memphisColors = ["#98D9C2", "#FF6B6B", "#C3B1E1", "#F7DC6F", "#87CEEB", "#FFB6C1"];
const rotations = [-3, -2, -1, 0, 1, 2, 3];

export default function AllFoodsList({ lines, onClose }: AllFoodsListProps) {
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredFoods = useMemo(() => {
    let result = allFoods;

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
  }, [allFoods, searchQuery]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = { 全部: allFoods.length };
    FOOD_CATEGORIES.forEach((cat) => {
      stats[cat] = allFoods.filter((f) => f.category === cat).length;
    });
    return stats;
  }, [allFoods]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
        onClick={onClose}
      />
      
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col memphis-card"
        style={{ 
          background: "#FFF8E7",
          transform: "rotate(-0.5deg)"
        }}
      >
        <MemphisPattern />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="p-4 md:p-6 border-b-4 border-black">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="memphis-card p-2 md:p-3"
                  style={{ 
                    background: "#FF6B6B",
                    transform: "rotate(5deg)"
                  }}
                >
                  <Sparkles size={24} style={{ color: "#FFF" }} />
                </div>
                <h2 
                  className="memphis-title"
                  style={{ fontSize: "24px" }}
                >
                  全部美食
                </h2>
              </div>
              <button
                onClick={onClose}
                className="memphis-card p-2 md:p-3 hover:scale-110 transition-transform"
                style={{ 
                  background: "#FF6B6B",
                  transform: "rotate(-3deg)"
                }}
              >
                <X size={24} style={{ color: "#FFF" }} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <div 
                className="memphis-card px-4 py-2"
                style={{ 
                  background: "#98D9C2",
                  transform: "rotate(-1deg)"
                }}
              >
                <span className="text-sm font-bold">总数: {stats.count} 家</span>
              </div>
              <div 
                className="memphis-card px-4 py-2"
                style={{ 
                  background: "#F7DC6F",
                  transform: "rotate(1deg)"
                }}
              >
                <span className="text-sm font-bold">评分: {stats.avgRating} ⭐</span>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 border-b-4 border-black" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="memphis-card p-1.5"
                  style={{ 
                    background: "#C3B1E1",
                    transform: "rotate(3deg)"
                  }}
                >
                  <Search size={16} style={{ color: "#2C2C2C" }} />
                </div>
                <span className="text-sm font-bold">搜索美食、站点或线路</span>
              </div>
              <div className="relative">
                <div 
                  className="absolute left-3 top-1/2 -translate-y-1/2 memphis-card p-1"
                  style={{ 
                    background: "#87CEEB",
                    transform: "rotate(-5deg)"
                  }}
                >
                  <Search size={16} style={{ color: "#2C2C2C" }} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索店名、推荐菜品、站点或线路..."
                  className="w-full pl-12 pr-4 py-3 border-3 border-black rounded-2xl font-medium focus:outline-none focus:ring-4 focus:ring-offset-2"
                  style={{ 
                    background: "#FFF",
                    fontFamily: "var(--font-memphis)"
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-24" style={{ minHeight: 0, maxHeight: 'calc(100vh - 300px)' }}>
            {filteredFoods.length === 0 ? (
              <div className="text-center py-16">
                <div 
                  className="memphis-card inline-block p-6 mb-4"
                  style={{ 
                    background: "#C3B1E1",
                    transform: "rotate(-2deg)"
                  }}
                >
                  <Sparkles size={48} style={{ color: "#2C2C2C" }} />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  暂无符合条件的美食
                </h3>
                <p className="text-sm opacity-70">
                  {searchQuery ? `没有找到与 "${searchQuery}" 相关的美食` : "还没有添加任何美食"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredFoods.map((food, index) => {
                  const randomColor = memphisColors[index % memphisColors.length];
                  const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
                  
                  return (
                    <div 
                      key={food.id} 
                      className="memphis-card p-4 md:p-5"
                      style={{ 
                        background: "#FFF",
                        transform: `rotate(${randomRotation}deg)`
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div 
                              className="w-3 h-3 rounded-full border-2 border-black"
                              style={{ backgroundColor: food.lineColor }}
                            />
                            <span className="text-xs font-bold opacity-70">
                              {food.lineName} · {food.stationName}
                            </span>
                          </div>
                          <h3 className="font-bold text-base md:text-lg">{food.name}</h3>
                        </div>
                        <div 
                          className="memphis-card px-3 py-1"
                          style={{ 
                            background: "#F7DC6F",
                            transform: "rotate(3deg)"
                          }}
                        >
                          <span className="font-bold text-sm">{food.rating} ⭐</span>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ background: randomColor }}
                          />
                          <span className="opacity-70">分类:</span>
                          <span className="font-bold">{food.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ background: randomColor }}
                          />
                          <span className="opacity-70">价格:</span>
                          <span className="font-bold">{food.priceRange}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ background: randomColor }}
                          />
                          <span className="opacity-70">推荐:</span>
                          <span className="font-bold">{food.recommendedDish}</span>
                        </div>
                        {food.distance > 0 && (
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ background: randomColor }}
                            />
                            <span className="opacity-70">距离:</span>
                            <span className="font-bold">{food.distance} 米</span>
                          </div>
                        )}
                        {food.remarks && (
                          <div className="flex items-start gap-2">
                            <div 
                              className="w-2 h-2 rounded-full mt-1"
                              style={{ background: randomColor }}
                            />
                            <span className="opacity-70">备注:</span>
                            <span className="font-bold">{food.remarks}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
