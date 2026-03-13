"use client";

import { useState } from "react";
import { FoodItem, Comment } from "@/types";
import { Star, MapPin, Utensils, DollarSign, Edit2, Trash2, ThumbsUp, MessageCircle, Heart, ChevronDown, ChevronUp, Send } from "lucide-react";
import { User } from "@/types";

interface FoodCardProps {
  food: FoodItem;
  user: User | null;
  onEdit: (food: FoodItem) => void;
  onDelete: (foodId: string) => void;
  onLike: (foodId: string) => void;
  onAddComment?: (foodId: string, content: string) => void;
}

const colors = ["#98D9C2", "#FF6B6B", "#C3B1E1", "#F7DC6F", "#87CEEB", "#FFB6C1"];
const rotations = [-3, -2, -1, 0, 1, 2, 3];

export default function FoodCard({ food, user, onEdit, onDelete, onLike, onAddComment }: FoodCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
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

  // 检查是否是自己的美食卡片或开发者
  const isOwner = user?.id === food.userId || user?.role === 'developer';
  
  // 检查用户是否已经点赞
  const isLiked = food.likedBy?.includes(user?.id || '') || false;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    if (!user) {
      alert('请先登录后再评论');
      return;
    }

    if (onAddComment) {
      onAddComment(food.id, commentText.trim());
      setCommentText("");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="memphis-card relative cursor-pointer"
      style={{ 
        background: "#FFF",
        transform: `rotate(${randomRotation}deg)`,
        padding: "24px"
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div 
        className="absolute -top-3 -left-3 w-8 h-8 rounded-full border-3 border-black"
        style={{ background: accentColor }}
      ></div>

      {/* 头部信息 - 始终显示 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-extrabold mb-3" style={{ fontFamily: "var(--font-memphis)" }}>
            {food.name}
          </h3>
          <div className="flex items-center gap-3">
            {renderStars(food.rating)}
            <span className="text-sm font-bold opacity-70">{food.rating}.0</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            添加者: {food.userName}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* 点赞和评论数 - 始终显示 */}
          <div className="flex items-center gap-3 mr-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike(food.id);
              }}
              className="flex items-center gap-1 text-sm font-bold transition-colors hover:scale-105"
              style={{ color: isLiked ? "#FF6B6B" : "#2C2C2C" }}
            >
              {isLiked ? <Heart size={16} fill="#FF6B6B" /> : <ThumbsUp size={16} />}
              <span>{food.likes || 0}</span>
            </button>
            <div
              className="flex items-center gap-1 text-sm font-bold"
              style={{ color: "#2C2C2C" }}
            >
              <MessageCircle size={16} />
              <span>{food.comments?.length || 0}</span>
            </div>
          </div>
          
          {/* 展开/收起按钮 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="memphis-button"
            style={{ 
              background: "#87CEEB",
              padding: "6px",
              minWidth: "32px",
              height: "32px"
            }}
            title={isExpanded ? "收起" : "展开"}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isOwner && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(food);
                }}
                className="memphis-button"
                style={{ 
                  background: "#98D9C2",
                  padding: "6px",
                  minWidth: "32px",
                  height: "32px"
                }}
                title="编辑"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(food.id);
                }}
                className="memphis-button"
                style={{ 
                  background: "#FF6B6B",
                  padding: "6px",
                  minWidth: "32px",
                  height: "32px"
                }}
                title="删除"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* 展开后的详细内容 */}
      {isExpanded && (
        <div onClick={(e) => e.stopPropagation()}>
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
            <div className="pt-4 border-t-2 border-black border-dashed mb-4">
              <p className="text-sm opacity-80">
                {food.remarks}
              </p>
            </div>
          )}

          {/* 评论区域 */}
          <div className="pt-4 border-t-2 border-black border-dashed">
            <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
              <MessageCircle size={16} />
              评论 ({food.comments?.length || 0})
            </h4>

            {/* 评论列表 */}
            {food.comments && food.comments.length > 0 ? (
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {food.comments.map((comment) => (
                  <div 
                    key={comment.id} 
                    className="p-3 rounded-lg border-2 border-black"
                    style={{ background: "#f5f5f5" }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{comment.userName}</span>
                      <span className="text-xs opacity-50">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm opacity-60 mb-4">暂无评论，快来发表第一条评论吧！</p>
            )}

            {/* 评论输入框 */}
            {user ? (
              <form onSubmit={handleCommentSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="写下你的评论..."
                  className="flex-1 px-3 py-2 text-sm border-2 border-black rounded-lg focus:outline-none focus:ring-2"
                  style={{ background: "#f9f9f9" }}
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="memphis-button disabled:opacity-50"
                  style={{ 
                    background: "#98D9C2",
                    padding: "8px 16px"
                  }}
                >
                  <Send size={16} />
                </button>
              </form>
            ) : (
              <p className="text-sm opacity-60 text-center py-2">
                登录后即可发表评论
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
