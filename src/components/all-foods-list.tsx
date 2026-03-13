"use client";

import { useState, useMemo, useEffect } from "react";
import { SubwayLine, FoodItem, FoodCategory } from "@/types";
import { FOOD_CATEGORIES } from "@/lib/data";
import { X, Search, Sparkles } from "lucide-react";
import FoodCard from "./food-card";
import { FoodPattern } from "./food-pattern";
import { useAuth } from "@/contexts/AuthContext";
import { storage } from "@/lib/data";
import { firebaseStorage } from "@/lib/firebase-storage";
import "@/styles/memphis-theme.css";

interface AllFoodsListProps {
  lines: SubwayLine[];
  onClose: () => void;
}

const memphisColors = ["#98D9C2", "#FF6B6B", "#C3B1E1", "#F7DC6F", "#87CEEB", "#FFB6C1"];
const rotations = [-3, -2, -1, 0, 1, 2, 3];

export default function AllFoodsList({ lines, onClose }: AllFoodsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | "全部">('全部');
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isUsingFirebase, setIsUsingFirebase] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);
  const { user } = useAuth();
  
  // 检查是否使用Firebase
  useEffect(() => {
    const available = firebaseStorage.isAvailable();
    setIsUsingFirebase(available);
  }, []);
  
  // 处理点赞
  const handleLikeFood = async (foodId: string) => {
    if (!user && !localStorage.getItem('guestId')) {
      const guestId = 'guest_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
      localStorage.setItem('guestId', guestId);
    }
    const userId = user?.id || localStorage.getItem('guestId') || 'anonymous';
    
    // 找到包含该美食的站点和线路
    for (const line of lines) {
      for (const station of line.stations || []) {
        const foodIndex = (station.foods || []).findIndex(f => f.id === foodId);
        if (foodIndex >= 0) {
          const food = station.foods![foodIndex];
          const isLiked = food.likedBy?.includes(userId) || false;
          
          let updatedFoods;
          if (isLiked) {
            // 取消点赞
            updatedFoods = station.foods!.map(f => {
              if (f.id === foodId) {
                return {
                  ...f,
                  likes: Math.max(0, (f.likes || 0) - 1),
                  likedBy: f.likedBy?.filter(id => id !== userId) || []
                };
              }
              return f;
            });
          } else {
            // 添加点赞
            updatedFoods = station.foods!.map(f => {
              if (f.id === foodId) {
                return {
                  ...f,
                  likes: (f.likes || 0) + 1,
                  likedBy: [...(f.likedBy || []), userId]
                };
              }
              return f;
            });
          }
          
          // 更新数据
          if (isUsingFirebase) {
            await firebaseStorage.updateFood(line.id, station.id, updatedFoods[foodIndex]);
          } else {
            const data = storage.getData();
            const lineIndex = data.lines.findIndex(l => l.id === line.id);
            if (lineIndex >= 0) {
              const stationIndex = data.lines[lineIndex].stations.findIndex(s => s.id === station.id);
              if (stationIndex >= 0) {
                data.lines[lineIndex].stations[stationIndex].foods = updatedFoods;
                storage.saveData(data);
              }
            }
          }
          
          // 触发数据更新
          setDataVersion(prev => prev + 1);
          return;
        }
      }
    }
  };
  
  // 处理评论
  const handleAddComment = async (foodId: string, content: string) => {
    if (!user) {
      alert('请先登录后再评论');
      return;
    }

    const newComment = {
      id: `comment_${Date.now()}`,
      foodId,
      userId: user.id,
      userName: user.displayName || user.email,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      replies: []
    };

    // 找到包含该美食的站点和线路
    for (const line of lines) {
      for (const station of line.stations || []) {
        const foodIndex = (station.foods || []).findIndex(f => f.id === foodId);
        if (foodIndex >= 0) {
          const food = station.foods![foodIndex];
          if (!food.comments) {
            food.comments = [];
          }
          food.comments.push(newComment);

          // 更新数据
          if (isUsingFirebase) {
            await firebaseStorage.updateFood(line.id, station.id, food);
          } else {
            const data = storage.getData();
            const lineIndex = data.lines.findIndex(l => l.id === line.id);
            if (lineIndex >= 0) {
              const stationIndex = data.lines[lineIndex].stations.findIndex(s => s.id === station.id);
              if (stationIndex >= 0) {
                const foodIdx = data.lines[lineIndex].stations[stationIndex].foods?.findIndex(f => f.id === foodId);
                if (foodIdx !== undefined && foodIdx >= 0) {
                  data.lines[lineIndex].stations[stationIndex].foods![foodIdx] = food;
                  storage.saveData(data);
                }
              }
            }
          }

          // 触发数据更新
          setDataVersion(prev => prev + 1);
          return;
        }
      }
    }
  };

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

    if (selectedCategory !== "全部") {
      result = result.filter((food) => food.category === selectedCategory);
    }

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
        <FoodPattern />
        
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

          <div className="p-4 md:p-6">
            <div className="mb-4">
              <div className="relative mb-4">
                <div 
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                >
                  <Search size={20} style={{ color: "#2C2C2C" }} />
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
              <div>
                {(() => {
                  const categories = ["全部", "正餐", "烧烤"];
                  const remainingCategories = ["酒吧", "快餐", "小吃", "奶茶", "咖啡", "甜品", "火锅", "其他"];
                  return showAllCategories ? [...categories, ...remainingCategories] : categories;
                })().map((cat, index) => {
                  const randomColor = memphisColors[index % memphisColors.length];
                  const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
                  const isSelected = selectedCategory === cat;
                  
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat as FoodCategory | "全部")}
                      className="memphis-card px-3 py-1.5 text-sm font-bold transition-all hover:scale-105 mr-2 mb-2"
                      style={{ 
                        background: isSelected ? randomColor : "#FFF",
                        transform: `rotate(${randomRotation}deg)`,
                        opacity: isSelected ? 1 : 0.8
                      }}
                    >
                      {cat} ({categoryStats[cat]})
                    </button>
                  );
                })}
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="memphis-card px-3 py-1.5 text-sm font-bold transition-all hover:scale-105 mr-2 mb-2"
                  style={{ 
                    background: "#87CEEB",
                    transform: "rotate(2deg)"
                  }}
                >
                  {showAllCategories ? "收起" : "展开更多"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-32 md:pb-40" style={{ minHeight: 0, maxHeight: 'calc(100vh - 280px)' }}>
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
                  {searchQuery && selectedCategory !== "全部" 
                    ? `在分类 "${selectedCategory}" 中没有找到与 "${searchQuery}" 相关的美食`
                    : searchQuery
                    ? `没有找到与 "${searchQuery}" 相关的美食`
                    : selectedCategory !== "全部"
                    ? `分类 "${selectedCategory}" 下没有收录的美食`
                    : "还没有添加任何美食"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredFoods.map((food, index) => {
                  const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
                  
                  return (
                    <div 
                      key={food.id} 
                      style={{ 
                        transform: `rotate(${randomRotation}deg)`
                      }}
                    >
                      <FoodCard 
                        food={food} 
                        user={user} 
                        onEdit={() => {}} 
                        onDelete={() => {}} 
                        onLike={handleLikeFood} 
                        onAddComment={handleAddComment} 
                      />
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
