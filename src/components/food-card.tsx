"use client";

import { FoodItem } from "@/types";
import { Star, MapPin, Utensils, DollarSign, Edit2, Trash2 } from "lucide-react";

interface FoodCardProps {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (foodId: string) => void;
}

export default function FoodCard({ food, onEdit, onDelete }: FoodCardProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`${
              star <= rating ? "fill-gray-900 text-gray-900" : "text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="minimal-card p-6">
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            {food.name}
          </h3>
          <div className="flex items-center gap-3">
            {renderStars(food.rating)}
            <span className="text-sm text-gray-500">{food.rating}.0</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(food)}
            className="p-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
            title="编辑"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(food.id)}
            className="p-2.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
            title="删除"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="minimal-tag">
          <Utensils size={12} className="mr-1.5" />
          {food.category}
        </span>
        <span className="minimal-tag">
          <DollarSign size={12} className="mr-1.5" />
          {food.priceRange}
        </span>
      </div>

      {food.recommendedDish && (
        <div className="mb-5">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            推荐菜品
          </span>
          <p className="text-sm text-gray-700 mt-1">
            {food.recommendedDish}
          </p>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
        <MapPin size={14} />
        <span>距地铁站 {food.distance} 米</span>
      </div>

      {food.remarks && (
        <div className="pt-5 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            {food.remarks}
          </p>
        </div>
      )}
    </div>
  );
}
