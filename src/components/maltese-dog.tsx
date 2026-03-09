"use client";

import React from "react";

interface MalteseDogProps {
  color?: "white" | "beige";
  size?: number;
  className?: string;
  animated?: boolean;
}

// 线条小狗 SVG 组件
export const MalteseDog: React.FC<MalteseDogProps> = ({
  color = "beige",
  size = 100,
  className = "",
  animated = false,
}) => {
  const fillColor = color === "white" ? "#FFFFFF" : "#F5E6D3";
  const strokeColor = "#2C3E50";
  const collarColor = "#FF8C69";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`${className} ${animated ? "animate-wag" : ""}`}
      style={{
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
      }}
    >
      {/* 身体 */}
      <ellipse
        cx="100"
        cy="130"
        rx="55"
        ry="45"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="4"
      />
      
      {/* 头部 */}
      <ellipse
        cx="100"
        cy="75"
        rx="50"
        ry="42"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="4"
      />
      
      {/* 左耳 */}
      <ellipse
        cx="45"
        cy="70"
        rx="20"
        ry="28"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="4"
      />
      
      {/* 右耳 */}
      <ellipse
        cx="155"
        cy="70"
        rx="20"
        ry="28"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="4"
      />
      
      {/* 左眼 */}
      <circle cx="75" cy="65" r="5" fill={strokeColor} />
      
      {/* 右眼 */}
      <circle cx="125" cy="65" r="5" fill={strokeColor} />
      
      {/* 鼻子 */}
      <ellipse cx="100" cy="78" rx="8" ry="6" fill={strokeColor} />
      
      {/* 嘴巴 */}
      <path
        d="M 92 88 Q 100 95 108 88"
        fill="none"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* 舌头（开心时） */}
      <ellipse
        cx="100"
        cy="92"
        rx="6"
        ry="8"
        fill="#FF6B6B"
        opacity="0.8"
      />
      
      {/* 项圈 */}
      <path
        d="M 65 105 Q 100 115 135 105"
        fill="none"
        stroke={collarColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      
      {/* 左前爪 */}
      <ellipse
        cx="70"
        cy="165"
        rx="12"
        ry="15"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="3"
      />
      
      {/* 右前爪 */}
      <ellipse
        cx="130"
        cy="165"
        rx="12"
        ry="15"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="3"
      />
      
      {/* 尾巴 */}
      <path
        d="M 150 130 Q 170 120 165 100"
        fill="none"
        stroke={strokeColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* 腮红 */}
      <ellipse cx="55" cy="75" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />
      <ellipse cx="145" cy="75" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />
    </svg>
  );
};

// 小狗脚印组件
export const PawPrint: React.FC<{ size?: number; className?: string }> = ({
  size = 30,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className={className}
      opacity="0.3"
    >
      {/* 主肉垫 */}
      <ellipse cx="25" cy="30" rx="12" ry="10" fill="#F5E6D3" />
      {/* 上肉垫 */}
      <ellipse cx="25" cy="12" rx="6" ry="8" fill="#F5E6D3" />
      {/* 左肉垫 */}
      <ellipse cx="10" cy="22" rx="5" ry="7" fill="#F5E6D3" />
      {/* 右肉垫 */}
      <ellipse cx="40" cy="22" rx="5" ry="7" fill="#F5E6D3" />
    </svg>
  );
};

// 云朵装饰组件
export const Cloud: React.FC<{ size?: number; className?: string }> = ({
  size = 60,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      className={className}
      opacity="0.6"
    >
      <path
        d="M 20 40 Q 10 40 10 30 Q 10 15 25 15 Q 30 5 45 5 Q 60 5 65 15 Q 80 15 80 30 Q 80 40 70 40 Z"
        fill="white"
        stroke="#B8E6F0"
        strokeWidth="2"
      />
    </svg>
  );
};

// 草地装饰组件
export const Grass: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 40 20"
      className={className}
      opacity="0.4"
    >
      <path
        d="M 5 20 Q 5 5 10 10 Q 15 0 20 10 Q 25 5 30 15 Q 35 10 35 20"
        fill="none"
        stroke="#90EE90"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

// 美食图标（带小狗）
export const FoodWithDog: React.FC<{ size?: number; className?: string }> = ({
  size = 80,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
    >
      {/* 背景圆 */}
      <circle cx="50" cy="50" r="45" fill="#FFF8DC" stroke="#F5E6D3" strokeWidth="2" />
      
      {/* 小狗头 */}
      <ellipse cx="50" cy="45" rx="25" ry="22" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="2" />
      
      {/* 耳朵 */}
      <ellipse cx="28" cy="42" rx="10" ry="14" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="2" />
      <ellipse cx="72" cy="42" rx="10" ry="14" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="2" />
      
      {/* 眼睛 */}
      <circle cx="40" cy="40" r="3" fill="#2C3E50" />
      <circle cx="60" cy="40" r="3" fill="#2C3E50" />
      
      {/* 鼻子 */}
      <ellipse cx="50" cy="48" rx="4" ry="3" fill="#2C3E50" />
      
      {/* 食物碗 */}
      <path
        d="M 30 65 L 35 80 Q 50 85 65 80 L 70 65 Z"
        fill="#FF8C69"
        stroke="#2C3E50"
        strokeWidth="2"
      />
      
      {/* 食物 */}
      <circle cx="40" cy="68" r="4" fill="#FDCB6E" />
      <circle cx="50" cy="70" r="4" fill="#FF6B6B" />
      <circle cx="60" cy="68" r="4" fill="#FDCB6E" />
    </svg>
  );
};

export default MalteseDog;
