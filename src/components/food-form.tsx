"use client";

import { useState, useEffect } from "react";
import { FoodItem, FoodCategory, PriceRange } from "@/types";
import { FOOD_CATEGORIES, PRICE_RANGES } from "@/lib/data";
import { X } from "lucide-react";

interface FoodFormProps {
  food?: FoodItem; // 如果有值则为编辑模式，否则为添加模式
  onSubmit: (food: Omit<FoodItem, "id" | "stationId" | "userId" | "userName" | "createdAt" | "updatedAt" | "likes" | "likedBy" | "comments">) => Promise<void>;
  onCancel: () => void;
}

export default function FoodForm({ food, onSubmit, onCancel }: FoodFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    category: "快餐" as FoodCategory,
    priceRange: "30-50元" as PriceRange,
    recommendedDish: "",
    remarks: "",
    distance: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name,
        rating: food.rating,
        category: food.category,
        priceRange: food.priceRange,
        recommendedDish: food.recommendedDish,
        remarks: food.remarks,
        distance: food.distance.toString(),
      });
    }
  }, [food]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "请输入店名";
    }

    if (!formData.recommendedDish.trim()) {
      newErrors.recommendedDish = "请输入推荐菜品";
    }

    if (!formData.distance || isNaN(Number(formData.distance)) || Number(formData.distance) <= 0) {
      newErrors.distance = "请输入有效的距离（大于0的数字）";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit({
      name: formData.name.trim(),
      rating: formData.rating,
      category: formData.category,
      priceRange: formData.priceRange,
      recommendedDish: formData.recommendedDish.trim(),
      remarks: formData.remarks.trim(),
      distance: Number(formData.distance),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {food ? "编辑美食" : "添加美食"}
        </h2>
        <button
          onClick={onCancel}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 店名 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            店名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="请输入店名"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* 评分 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            推荐指数
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className={`p-2 rounded-lg transition-colors ${
                  formData.rating >= star
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
            <span className="flex items-center text-sm text-gray-600 ml-2">
              {formData.rating} 星
            </span>
          </div>
        </div>

        {/* 分类和价格 - 两列布局 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 分类 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              分类
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as FoodCategory })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {FOOD_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 价格区间 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              价格区间（人均）
            </label>
            <select
              value={formData.priceRange}
              onChange={(e) =>
                setFormData({ ...formData, priceRange: e.target.value as PriceRange })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {PRICE_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 推荐菜品 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            推荐菜品 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.recommendedDish}
            onChange={(e) =>
              setFormData({ ...formData, recommendedDish: e.target.value })
            }
            placeholder="请输入推荐菜品"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.recommendedDish && (
            <p className="text-sm text-red-500 mt-1">{errors.recommendedDish}</p>
          )}
        </div>

        {/* 距离 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            距离地铁站（米） <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.distance}
            onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
            placeholder="请输入距离（米）"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.distance && (
            <p className="text-sm text-red-500 mt-1">{errors.distance}</p>
          )}
        </div>

        {/* 备注 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            备注
          </label>
          <textarea
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            placeholder="添加一些备注信息（可选）"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* 按钮 */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {food ? "保存修改" : "添加"}
          </button>
        </div>
      </form>
    </div>
  );
}
