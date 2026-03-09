"use client";

import { useState, useEffect } from "react";
import { SubwayStation, FoodItem } from "@/types";
import { storage } from "@/lib/data";
import FoodCard from "./food-card";
import FoodForm from "./food-form";
import { Plus, X, ArrowUpDown, MapPin } from "lucide-react";

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
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);

  useEffect(() => {
    if (station) {
      setFoods(station.foods);
      setShowForm(false);
      setEditingFood(null);
      setSortBy("default");
    }
  }, [station]);

  // 排序逻辑
  useEffect(() => {
    let sorted = [...foods];

    switch (sortBy) {
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-asc":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      default:
        // 默认按添加顺序（不排序）
        break;
    }

    setFoods(sorted);
  }, [sortBy, station?.foods]);

  // 计算统计信息
  const stats = {
    count: foods.length,
    avgRating:
      foods.length > 0
        ? (foods.reduce((sum, f) => sum + f.rating, 0) / foods.length).toFixed(1)
        : "0",
    maxRating: foods.length > 0 ? Math.max(...foods.map((f) => f.rating)) : 0,
  };

  // 添加美食
  const handleAddFood = (foodData: Omit<FoodItem, "id" | "stationId">) => {
    const newFood: FoodItem = {
      ...foodData,
      id: `food-${Date.now()}`,
      stationId: station!.id,
    };

    const data = storage.getData();
    const lineIndex = data.lines.findIndex((l) => l.id === station!.lineId);
    if (lineIndex >= 0) {
      const stationIndex = data.lines[lineIndex].stations.findIndex(
        (s) => s.id === station!.id
      );
      if (stationIndex >= 0) {
        data.lines[lineIndex].stations[stationIndex].foods.push(newFood);
        storage.saveData(data);

        // 更新本地 foods state
        setFoods([...data.lines[lineIndex].stations[stationIndex].foods]);

        // 关闭表单
        setShowForm(false);

        // 触发自定义事件通知其他组件数据已更新
        window.dispatchEvent(new CustomEvent('food-data-changed'));

        // 通知父组件数据已更新
        onDataChange();
      }
    }
  };

  // 编辑美食
  const handleEditFood = (foodData: Omit<FoodItem, "id" | "stationId">) => {
    if (!editingFood) return;

    const data = storage.getData();
    const lineIndex = data.lines.findIndex((l) => l.id === station!.lineId);
    if (lineIndex >= 0) {
      const stationIndex = data.lines[lineIndex].stations.findIndex(
        (s) => s.id === station!.id
      );
      if (stationIndex >= 0) {
        const foodIndex = data.lines[lineIndex].stations[
          stationIndex
        ].foods.findIndex((f) => f.id === editingFood.id);
        if (foodIndex >= 0) {
          data.lines[lineIndex].stations[stationIndex].foods[foodIndex] = {
            ...foodData,
            id: editingFood.id,
            stationId: station!.id,
          };
          storage.saveData(data);

          // 更新本地 foods state
          setFoods([...data.lines[lineIndex].stations[stationIndex].foods]);

          // 关闭表单并清空编辑状态
          setShowForm(false);
          setEditingFood(null);

          // 触发自定义事件通知其他组件数据已更新
          window.dispatchEvent(new CustomEvent('food-data-changed'));

          // 通知父组件数据已更新
          onDataChange();
        }
      }
    }
  };

  // 删除美食
  const handleDeleteFood = (foodId: string) => {
    if (!confirm("确定要删除这个美食吗？")) return;

    const data = storage.getData();
    const lineIndex = data.lines.findIndex((l) => l.id === station!.lineId);
    if (lineIndex >= 0) {
      const stationIndex = data.lines[lineIndex].stations.findIndex(
        (s) => s.id === station!.id
      );
      if (stationIndex >= 0) {
        data.lines[lineIndex].stations[stationIndex].foods = data.lines[
          lineIndex
        ].stations[stationIndex].foods.filter((f) => f.id !== foodId);
        storage.saveData(data);

        // 触发自定义事件通知其他组件数据已更新
        window.dispatchEvent(new CustomEvent('food-data-changed'));

        onDataChange();
      }
    }
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
      {/* 头部 */}
      <div className="sticky top-0 bg-white border-b px-6 py-4 z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
              <MapPin className="w-4 h-4" />
              <span>地铁站点</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{station.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.count}</div>
            <div className="text-xs text-gray-600 mt-1">美食数量</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.avgRating}⭐</div>
            <div className="text-xs text-gray-600 mt-1">平均评分</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.maxRating}⭐</div>
            <div className="text-xs text-gray-600 mt-1">最高评分</div>
          </div>
        </div>
      </div>

      {/* 操作栏 */}
      <div className="px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">排序：</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="default">默认</option>
              <option value="rating-desc">评分从高到低</option>
              <option value="rating-asc">评分从低到高</option>
            </select>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            添加美食
          </button>
        </div>
      </div>

      {/* 美食列表 */}
      <div className="px-6 py-4">
        {foods.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              暂无美食信息
            </h3>
            <p className="text-gray-500 mb-6">
              点击上方"添加美食"按钮开始记录
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              添加第一个美食
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {foods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onEdit={(f) => {
                  setEditingFood(f);
                  setShowForm(true);
                }}
                onDelete={handleDeleteFood}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
