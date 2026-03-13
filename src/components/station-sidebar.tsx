"use client";

import { useState, useEffect, useMemo } from "react";
import { SubwayStation, FoodItem } from "@/types";
import { storage } from "@/lib/data";
import { firebaseStorage } from "@/lib/firebase-storage";
import FoodCard from "./food-card";
import FoodForm from "./food-form";
import { Plus, X, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type SortOption = "default" | "rating-desc" | "rating-asc";

interface StationSidebarProps {
  station: SubwayStation | null;
  onClose: () => void;
  onDataChange: () => void;
}

export default function StationSidebar({
  station,
  onClose,
  onDataChange,
}: StationSidebarProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [dataVersion, setDataVersion] = useState(0);
  const [isUsingFirebase, setIsUsingFirebase] = useState(false);
  const [currentFoods, setCurrentFoods] = useState<FoodItem[]>([]);
  const [lineColor, setLineColor] = useState<string>('#f97316');
  const [lineName, setLineName] = useState<string>('');
  const { user } = useAuth();

  useEffect(() => {
    const available = firebaseStorage.isAvailable();
    setIsUsingFirebase(available);
  }, []);

  // 获取当前站点的美食列表和线路信息
  useEffect(() => {
    const loadFoods = async () => {
      if (!station) {
        setCurrentFoods([]);
        return;
      }

      let data;
      if (isUsingFirebase) {
        data = await firebaseStorage.getData();
      } else {
        data = storage.getData();
      }

      const line = data.lines.find(l => l.id === station.lineId);
      const currentStation = line?.stations.find(s => s.id === station.id);
      setCurrentFoods(currentStation?.foods || []);
      setLineColor(line?.color || '#f97316');
      setLineName(line?.name || '');
    };

    loadFoods();
  }, [station, dataVersion, isUsingFirebase]);

  const foods = useMemo(() => {
    let sorted = [...currentFoods];

    switch (sortBy) {
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-asc":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    return sorted;
  }, [currentFoods, sortBy]);

  useEffect(() => {
    const handleDataChange = () => {
      setDataVersion(prev => prev + 1);
    };
    window.addEventListener('food-data-changed', handleDataChange);
    return () => window.removeEventListener('food-data-changed', handleDataChange);
  }, []);

  useEffect(() => {
    if (station) {
      setShowForm(false);
      setEditingFood(null);
      setSortBy("default");
      setDataVersion(prev => prev + 1);
    }
  }, [station?.id]);

  const stats = useMemo(() => {
    return {
      count: foods.length,
      avgRating:
        foods.length > 0
          ? (foods.reduce((sum, f) => sum + f.rating, 0) / foods.length).toFixed(1)
          : "0",
      maxRating: foods.length > 0 ? Math.max(...foods.map((f) => f.rating)) : 0,
    };
  }, [foods]);

  const handleAddFood = async (foodData: Omit<FoodItem, "id" | "stationId" | "userId" | "userName" | "createdAt" | "updatedAt" | "likes" | "likedBy" | "comments">) => {
    const newFood: FoodItem = {
      ...foodData,
      id: `food-${Date.now()}`,
      stationId: station!.id,
      userId: user?.id || "anonymous",
      userName: user?.displayName || user?.email || "匿名用户",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      comments: [],
    };

    if (isUsingFirebase) {
      await firebaseStorage.addFood(station!.lineId, station!.id, newFood);
    } else {
      const data = storage.getData();
      const lineIndex = data.lines.findIndex((l) => l.id === station!.lineId);
      if (lineIndex >= 0) {
        const stationIndex = data.lines[lineIndex].stations.findIndex(
          (s) => s.id === station!.id
        );
        if (stationIndex >= 0) {
          if (!data.lines[lineIndex].stations[stationIndex].foods) {
            data.lines[lineIndex].stations[stationIndex].foods = [];
          }
          data.lines[lineIndex].stations[stationIndex].foods.push(newFood);
          storage.saveData(data);
        }
      }
    }

    setShowForm(false);
    window.dispatchEvent(new CustomEvent('food-data-changed'));
    onDataChange();
  };

  const handleEditFood = async (foodData: Omit<FoodItem, "id" | "stationId" | "userId" | "userName" | "createdAt" | "updatedAt" | "likes" | "likedBy" | "comments">) => {
    if (!editingFood) return;

    // 检查是否是自己的美食卡片或开发者
    if (editingFood.userId !== user?.id && user?.role !== 'developer') {
      alert('只能修改自己添加的美食卡片');
      return;
    }

    const updatedFood: FoodItem = {
      ...editingFood,
      ...foodData,
      updatedAt: new Date().toISOString(),
    };

    if (isUsingFirebase) {
      await firebaseStorage.updateFood(station!.lineId, station!.id, updatedFood);
    } else {
      const data = storage.getData();
      const lineIndex = data.lines.findIndex((l) => l.id === station!.lineId);
      if (lineIndex >= 0) {
        const stationIndex = data.lines[lineIndex].stations.findIndex(
          (s) => s.id === station!.id
        );
        if (stationIndex >= 0) {
          if (!data.lines[lineIndex].stations[stationIndex].foods) {
            data.lines[lineIndex].stations[stationIndex].foods = [];
          }
          const foodIndex = data.lines[lineIndex].stations[
            stationIndex
          ].foods.findIndex((f) => f.id === editingFood.id);
          if (foodIndex >= 0) {
            data.lines[lineIndex].stations[stationIndex].foods[foodIndex] = updatedFood;
            storage.saveData(data);
          }
        }
      }
    }

    setShowForm(false);
    setEditingFood(null);
    window.dispatchEvent(new CustomEvent('food-data-changed'));
    onDataChange();
  };

  const handleDeleteFood = async (foodId: string) => {
    if (!confirm("确定要删除这个美食吗？")) return;

    // 检查是否是自己的美食卡片或开发者
    const food = currentFoods.find(f => f.id === foodId);
    if (food && food.userId !== user?.id && user?.role !== 'developer') {
      alert('只能删除自己添加的美食卡片');
      return;
    }

    if (isUsingFirebase) {
      await firebaseStorage.deleteFood(station!.lineId, station!.id, foodId);
    } else {
      const data = storage.getData();
      const lineIndex = data.lines.findIndex((l) => l.id === station!.lineId);
      if (lineIndex >= 0) {
        const stationIndex = data.lines[lineIndex].stations.findIndex(
          (s) => s.id === station!.id
        );
        if (stationIndex >= 0) {
          if (!data.lines[lineIndex].stations[stationIndex].foods) {
            data.lines[lineIndex].stations[stationIndex].foods = [];
          }
          data.lines[lineIndex].stations[stationIndex].foods = data.lines[
            lineIndex
          ].stations[stationIndex].foods.filter((f) => f.id !== foodId);
          storage.saveData(data);
        }
      }
    }

    window.dispatchEvent(new CustomEvent('food-data-changed'));
    onDataChange();
  };

  const handleLikeFood = async (foodId: string) => {
    if (!user && !localStorage.getItem('guestId')) {
      // 为游客生成一个临时ID
      const guestId = 'guest_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
      localStorage.setItem('guestId', guestId);
    }

    const userId = user?.id || localStorage.getItem('guestId') || 'anonymous';

    if (isUsingFirebase) {
      // 这里需要在firebase-storage.ts中实现点赞功能
      // 暂时使用本地存储实现
    } else {
      const data = storage.getData();
      const lineIndex = data.lines.findIndex((l) => l.id === station!.lineId);
      if (lineIndex >= 0) {
        const stationIndex = data.lines[lineIndex].stations.findIndex(
          (s) => s.id === station!.id
        );
        if (stationIndex >= 0) {
          if (!data.lines[lineIndex].stations[stationIndex].foods) {
            data.lines[lineIndex].stations[stationIndex].foods = [];
          }
          const foodIndex = data.lines[lineIndex].stations[
            stationIndex
          ].foods.findIndex((f) => f.id === foodId);
          if (foodIndex >= 0) {
            const food = data.lines[lineIndex].stations[stationIndex].foods[foodIndex];
            
            // 确保likes和likedBy字段存在
            if (!food.likes) food.likes = 0;
            if (!food.likedBy) food.likedBy = [];
            
            // 检查用户是否已经点赞
            const isLiked = food.likedBy.includes(userId);
            
            if (isLiked) {
              // 取消点赞
              food.likes = Math.max(0, food.likes - 1);
              food.likedBy = food.likedBy.filter(id => id !== userId);
            } else {
              // 添加点赞
              food.likes += 1;
              food.likedBy.push(userId);
            }
            
            storage.saveData(data);
            setDataVersion(prev => prev + 1);
          }
        }
      }
    }
  };

  const handleCommentFood = (foodId: string) => {
    if (!user) {
      alert('请先登录后再评论');
      return;
    }
    
    // 这里可以打开评论对话框
    alert('评论功能开发中...');
  };

  if (!station) {
    return null;
  }

  if (showForm) {
    return (
      <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
        <FoodForm
          food={editingFood || undefined}
          onSubmit={editingFood ? handleEditFood : handleAddFood}
          onCancel={() => {
            setShowForm(false);
            setEditingFood(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b px-6 py-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: lineColor }}
            >
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{station.name}</h2>
              <p className="text-sm text-gray-500">{lineName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">美食数量:</span>
            <span className="font-semibold text-gray-900">{stats.count}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">平均评分:</span>
            <span className="font-semibold text-orange-500">{stats.avgRating}</span>
          </div>
          {stats.maxRating > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">最高评分:</span>
              <span className="font-semibold text-orange-500">{stats.maxRating}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3">
          {user ? (
            <button
              onClick={() => setShowForm(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              添加美食
            </button>
          ) : (
            <div className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-500 py-2.5 px-4 rounded-lg font-medium">
              <Plus className="w-5 h-5" />
              登录后添加美食
            </div>
          )}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="default">默认排序</option>
            <option value="rating-desc">评分从高到低</option>
            <option value="rating-asc">评分从低到高</option>
          </select>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {foods.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">还没有添加美食</p>
            <p className="text-sm text-gray-400 mt-1">点击上方按钮添加第一个美食</p>
          </div>
        ) : (
          foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              user={user}
              onEdit={() => {
                setEditingFood(food);
                setShowForm(true);
              }}
              onDelete={() => handleDeleteFood(food.id)}
              onLike={handleLikeFood}
              onComment={handleCommentFood}
            />
          ))
        )}
      </div>
    </div>
  );
}
