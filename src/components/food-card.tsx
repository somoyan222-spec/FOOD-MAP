"use client";

import { FoodItem } from "@/types";
import { Star, MapPin, Utensils, DollarSign } from "lucide-react";

interface FoodCardProps {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (foodId: string) => void;
}

export default function FoodCard({ food, onEdit, onDelete }: FoodCardProps) {
  // 生成星级显示
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* 头部：店名 + 评分 + 操作按钮 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {food.name}
          </h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              {renderStars(food.rating)}
              <span className="text-gray-600 ml-1">{food.rating}.0</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(food)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="编辑"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(food.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="删除"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 分类和价格 */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Utensils className="w-3 h-3 mr-1" />
          {food.category}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <DollarSign className="w-3 h-3 mr-1" />
          {food.priceRange}
        </span>
      </div>

      {/* 推荐菜品 */}
      {food.recommendedDish && (
        <div className="mb-3">
          <span className="text-xs text-gray-500">推荐菜品：</span>
          <span className="text-sm text-gray-900 ml-1">
            {food.recommendedDish}
          </span>
        </div>
      )}

      {/* 距离 */}
      <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
        <MapPin className="w-4 h-4" />
        <span>距地铁站 {food.distance} 米</span>
      </div>

      {/* 备注 */}
      {food.remarks && (
        <div className="pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600">{food.remarks}</p>
        </div>
      )}
    </div>
  );
}
