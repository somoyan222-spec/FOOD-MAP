"use client";

import { FoodItem } from "@/types";
import { Star, MapPin, Utensils, DollarSign, Edit2, Trash2 } from "lucide-react";

interface FoodCardProps {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (foodId: string) => void;
}

const colors = ["#98D9C2", "#FF6B6B", "#C3B1E1", "#F7DC6F", "#87CEEB", "#FFB6C1"];
const rotations = [-3, -2, -1, 0, 1, 2, 3];

export default function FoodCard({ food, onEdit, onDelete }: FoodCardProps) {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
  const accentColor = colors[Math.floor(Math.random() * colors.length)];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            fill={star <= rating ? "#F7DC6F" : "transparent"}
            stroke={star <= rating ? "#2C2C2C" : "#9E9E9E"}
            strokeWidth={2}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="memphis-card relative"
      style={{ 
        background: "#FFF",
        transform: `rotate(${randomRotation}deg)`,
        padding: "24px"
      }}
    >
      <div 
        className="absolute -top-3 -left-3 w-8 h-8 rounded-full border-3 border-black"
        style={{ background: accentColor }}
      ></div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-extrabold mb-3" style={{ fontFamily: "var(--font-memphis)" }}>
            {food.name}
          </h3>
          <div className="flex items-center gap-3">
            {renderStars(food.rating)}
            <span className="text-sm font-bold opacity-70">{food.rating}.0</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(food)}
            className="memphis-button"
            style={{ 
              background: "#98D9C2",
              padding: "8px",
              minWidth: "36px",
              height: "36px"
            }}
            title="编辑"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(food.id)}
            className="memphis-button"
            style={{ 
              background: "#FF6B6B",
              padding: "8px",
              minWidth: "36px",
              height: "36px"
            }}
            title="删除"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span 
          className="memphis-tag"
          style={{ background: "#98D9C2" }}
        >
          <Utensils size={12} className="mr-1" />
          {food.category}
        </span>
        <span 
          className="memphis-tag"
          style={{ background: "#F7DC6F" }}
        >
          <DollarSign size={12} className="mr-1" />
          {food.priceRange}
        </span>
      </div>

      {food.recommendedDish && (
        <div className="mb-4 p-3 rounded-lg border-2 border-black" style={{ background: `${randomColor}40` }}>
          <span className="text-xs font-bold uppercase tracking-wider opacity-70">
            推荐菜品
          </span>
          <p className="text-sm font-bold mt-1">
            {food.recommendedDish}
          </p>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm font-bold mb-4">
        <MapPin size={16} />
        <span>距地铁站 {food.distance} 米</span>
      </div>

      {food.remarks && (
        <div className="pt-4 border-t-2 border-black border-dashed">
          <p className="text-sm opacity-80">
            {food.remarks}
          </p>
        </div>
      )}
    </div>
  );
}
