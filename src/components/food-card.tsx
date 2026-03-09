"use client";

import { FoodItem } from "@/types";
import { Star, MapPin, Utensils, DollarSign } from "lucide-react";
import { MalteseDog, PawPrint } from "./maltese-dog";

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
            className={`w-4 h-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #FFFFFF 0%, #FFF8F0 100%)",
        border: "3px solid #F5E6D3",
        boxShadow: "0 4px 15px rgba(255, 140, 105, 0.1)"
      }}
    >
      {/* 背景装饰 - 小狗脚印 */}
      <div className="absolute -bottom-2 -right-2 opacity-20 pointer-events-none">
        <PawPrint size={50} />
      </div>
      
      {/* 背景装饰 - 小狗头像 */}
      <div className="absolute -top-3 -right-3 opacity-15 pointer-events-none">
        <MalteseDog size={60} color="white" />
      </div>

      {/* 头部：店名 + 评分 + 操作按钮 */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex-1">
          <h3 
            className="text-xl font-bold mb-2"
            style={{ color: "#2C3E50" }}
          >
            {food.name}
          </h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              {renderStars(food.rating)}
              <span className="ml-1 font-medium" style={{ color: "#5D6D7E" }}>
                {food.rating}.0
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(food)}
            className="p-2.5 rounded-xl transition-all hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #87CEEB 0%, #B8E6F0 100%)",
              color: "#2C3E50"
            }}
            title="编辑"
          >
            <svg
              className="w-4.5 h-4.5"
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
            className="p-2.5 rounded-xl transition-all hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #FF8C69 0%, #FFB6A3 100%)",
              color: "white"
            }}
            title="删除"
          >
            <svg
              className="w-4.5 h-4.5"
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
      <div className="flex flex-wrap gap-3 mb-4 relative z-10">
        <span 
          className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold"
          style={{
            background: "linear-gradient(135deg, #87CEEB 0%, #B8E6F0 100%)",
            color: "#2C3E50"
          }}
        >
          <Utensils className="w-3.5 h-3.5 mr-1.5" />
          {food.category}
        </span>
        <span 
          className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold"
          style={{
            background: "linear-gradient(135deg, #90EE90 0%, #C8F0C8 100%)",
            color: "#2C3E50"
          }}
        >
          <DollarSign className="w-3.5 h-3.5 mr-1.5" />
          {food.priceRange}
        </span>
      </div>

      {/* 推荐菜品 */}
      {food.recommendedDish && (
        <div className="mb-4 relative z-10">
          <span 
            className="text-xs font-medium"
            style={{ color: "#8B4513" }}
          >
            🍽️ 推荐菜品：
          </span>
          <span 
            className="text-sm ml-1 font-medium"
            style={{ color: "#2C3E50" }}
          >
            {food.recommendedDish}
          </span>
        </div>
      )}

      {/* 距离 */}
      <div className="flex items-center gap-1.5 text-sm mb-4 relative z-10">
        <MapPin 
          className="w-4.5 h-4.5"
          style={{ color: "#FF8C69" }}
        />
        <span 
          className="font-medium"
          style={{ color: "#5D6D7E" }}
        >
          📍 距地铁站 {food.distance} 米
        </span>
      </div>

      {/* 备注 */}
      {food.remarks && (
        <div 
          className="pt-4 border-t relative z-10"
          style={{ borderColor: "rgba(255, 140, 105, 0.2)" }}
        >
          <p 
            className="text-sm"
            style={{ color: "#5D6D7E" }}
          >
            💭 {food.remarks}
          </p>
        </div>
      )}
    </div>
  );
}
