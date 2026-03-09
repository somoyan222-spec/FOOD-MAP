"use client";

import React from "react";

interface MalteseDogProps {
  color?: "white" | "beige";
  size?: number;
  className?: string;
  animated?: boolean;
}

// 线条小狗 SVG 组件（基本款）
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
      
      {/* 舌头 */}
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

// 两只小狗坐在一起（参考图1）
export const TwoDogsTogether: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 200 160"
      className={className}
    >
      {/* 蓝天背景 */}
      <rect x="0" y="0" width="200" height="100" fill="#87CEEB" />
      {/* 草地背景 */}
      <rect x="0" y="100" width="200" height="60" fill="#90EE90" />
      
      {/* 白云 */}
      <ellipse cx="40" cy="30" rx="20" ry="12" fill="white" />
      <ellipse cx="55" cy="25" rx="15" ry="10" fill="white" />
      <ellipse cx="30" cy="35" rx="12" ry="8" fill="white" />
      
      <ellipse cx="150" cy="25" rx="18" ry="10" fill="white" />
      <ellipse cx="165" cy="20" rx="14" ry="9" fill="white" />
      <ellipse cx="140" cy="30" rx="10" ry="7" fill="white" />
      
      {/* 白色小狗 */}
      {/* 身体 */}
      <ellipse cx="75" cy="125" rx="30" ry="22" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="3" />
      {/* 头 */}
      <ellipse cx="75" cy="95" rx="28" ry="25" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="3" />
      {/* 耳朵 */}
      <ellipse cx="52" cy="90" rx="12" ry="18" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="3" />
      <ellipse cx="98" cy="90" rx="12" ry="18" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="3" />
      {/* 眼睛 */}
      <circle cx="65" cy="90" r="3" fill="#2C3E50" />
      <circle cx="85" cy="90" r="3" fill="#2C3E50" />
      {/* 鼻子 */}
      <ellipse cx="75" cy="98" rx="4" ry="3" fill="#2C3E50" />
      {/* 嘴巴 */}
      <path d="M 68 103 Q 75 108 82 103" fill="none" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
      {/* 爪子 */}
      <ellipse cx="60" cy="140" rx="8" ry="10" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="2" />
      <ellipse cx="90" cy="140" rx="8" ry="10" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="2" />
      
      {/* 米色小狗 */}
      {/* 身体 */}
      <ellipse cx="135" cy="128" rx="32" ry="24" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="3" />
      {/* 头 */}
      <ellipse cx="135" cy="92" rx="30" ry="26" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="3" />
      {/* 耳朵 */}
      <ellipse cx="110" cy="88" rx="13" ry="19" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="3" />
      <ellipse cx="160" cy="88" rx="13" ry="19" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="3" />
      {/* 眼睛 */}
      <circle cx="123" cy="87" r="3" fill="#2C3E50" />
      <circle cx="147" cy="87" r="3" fill="#2C3E50" />
      {/* 鼻子 */}
      <ellipse cx="135" cy="96" rx="4" ry="3" fill="#2C3E50" />
      {/* 嘴巴 */}
      <path d="M 127 101 Q 135 107 143 101" fill="none" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
      {/* 项圈 */}
      <path d="M 110 112 Q 135 118 160 112" fill="none" stroke="#FF8C69" strokeWidth="4" strokeLinecap="round" />
      {/* 爪子 */}
      <ellipse cx="118" cy="145" rx="9" ry="11" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="2" />
      <ellipse cx="152" cy="145" rx="9" ry="11" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="2" />
      {/* 尾巴 */}
      <path d="M 165 125 Q 180 118 178 110 Q 182 102 175 98" fill="none" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

// 开心的白色小狗（参考图2）
export const HappyWhiteDog: React.FC<{ size?: number; className?: string }> = ({
  size = 150,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      className={className}
    >
      {/* 浅黄色背景 */}
      <rect x="0" y="0" width="150" height="150" fill="#FFEFB5" />
      
      {/* 花朵装饰 */}
      <g fill="#FFB6C1" opacity="0.8">
        <circle cx="30" cy="40" r="12" />
        <circle cx="22" cy="32" r="6" />
        <circle cx="38" cy="32" r="6" />
        <circle cx="22" cy="48" r="6" />
        <circle cx="38" cy="48" r="6" />
        <circle cx="30" cy="40" r="4" fill="#FFD1DC" />
      </g>
      
      <g fill="#FFB6C1" opacity="0.7">
        <circle cx="120" cy="35" r="10" />
        <circle cx="113" cy="28" r="5" />
        <circle cx="127" cy="28" r="5" />
        <circle cx="113" cy="42" r="5" />
        <circle cx="127" cy="42" r="5" />
        <circle cx="120" cy="35" r="3" fill="#FFD1DC" />
      </g>
      
      <g fill="#FFB6C1" opacity="0.6">
        <circle cx="25" cy="100" r="9" />
        <circle cx="19" cy="94" r="4" />
        <circle cx="31" cy="94" r="4" />
        <circle cx="19" cy="106" r="4" />
        <circle cx="31" cy="106" r="4" />
        <circle cx="25" cy="100" r="3" fill="#FFD1DC" />
      </g>
      
      {/* 白色小狗身体 */}
      <ellipse cx="75" cy="110" rx="40" ry="35" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="4" />
      {/* 头 */}
      <ellipse cx="75" cy="65" rx="35" ry="32" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="4" />
      {/* 耳朵 */}
      <ellipse cx="45" cy="55" rx="15" ry="22" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="4" />
      <ellipse cx="105" cy="55" rx="15" ry="22" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="4" />
      {/* 眼睛 */}
      <circle cx="60" cy="60" r="4" fill="#2C3E50" />
      <circle cx="90" cy="60" r="4" fill="#2C3E50" />
      {/* 鼻子 */}
      <ellipse cx="75" cy="70" rx="5" ry="4" fill="#2C3E50" />
      {/* 嘴巴 */}
      <path d="M 63 80 Q 75 90 87 80" fill="none" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />
      {/* 腮红 */}
      <ellipse cx="48" cy="68" rx="10" ry="6" fill="#FFB6C1" opacity="0.6" />
      <ellipse cx="102" cy="68" rx="10" ry="6" fill="#FFB6C1" opacity="0.6" />
      {/* 左前爪 */}
      <path d="M 30 95 Q 25 85 18 80 Q 10 85 8 95" fill="none" stroke="#2C3E50" strokeWidth="5" strokeLinecap="round" />
      {/* 右前爪 */}
      <path d="M 120 95 Q 125 85 132 80 Q 140 85 142 95" fill="none" stroke="#2C3E50" strokeWidth="5" strokeLinecap="round" />
      {/* 尾巴 */}
      <path d="M 115 130 Q 130 125 135 110" fill="none" stroke="#2C3E50" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
};

// 两只小狗趴着（参考图3）
export const TwoDogsLying: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 200 120"
      className={className}
    >
      {/* 白色小狗 */}
      {/* 身体 */}
      <ellipse cx="65" cy="85" rx="35" ry="20" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="3" />
      {/* 头 */}
      <ellipse cx="55" cy="55" rx="28" ry="25" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="3" />
      {/* 耳朵 */}
      <ellipse cx="35" cy="50" rx="12" ry="15" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="3" />
      <ellipse cx="75" cy="50" rx="12" ry="15" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="3" />
      {/* 眼睛 */}
      <circle cx="45" cy="52" r="3" fill="#2C3E50" />
      <circle cx="65" cy="52" r="3" fill="#2C3E50" />
      {/* 鼻子 */}
      <ellipse cx="55" cy="60" rx="4" ry="3" fill="#2C3E50" />
      {/* 嘴巴 */}
      <path d="M 48 66 Q 55 71 62 66" fill="none" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
      {/* 前爪 */}
      <path d="M 35 92 L 30 105 L 45 105 L 42 92 Z" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="2" />
      <path d="M 75 92 L 70 105 L 85 105 L 82 92 Z" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="2" />
      
      {/* 米色小狗 */}
      {/* 身体 */}
      <ellipse cx="135" cy="88" rx="40" ry="22" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="3" />
      {/* 头 */}
      <ellipse cx="120" cy="52" rx="30" ry="26" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="3" />
      {/* 耳朵 */}
      <ellipse cx="98" cy="48" rx="13" ry="17" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="3" />
      <ellipse cx="142" cy="48" rx="13" ry="17" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="3" />
      {/* 眼睛 */}
      <circle cx="108" cy="50" r="3" fill="#2C3E50" />
      <circle cx="132" cy="50" r="3" fill="#2C3E50" />
      {/* 鼻子 */}
      <ellipse cx="120" cy="58" rx="4" ry="3" fill="#2C3E50" />
      {/* 嘴巴 */}
      <path d="M 112 64 Q 120 70 128 64" fill="none" stroke="#2C3E50" strokeWidth="2" strokeLinecap="round" />
      {/* 项圈 */}
      <path d="M 95 70 Q 120 76 145 70" fill="none" stroke="#FF8C69" strokeWidth="4" strokeLinecap="round" />
      {/* 前爪 */}
      <ellipse cx="95" cy="100" rx="10" ry="12" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="2" />
      <ellipse cx="120" cy="100" rx="10" ry="12" fill="#F5E6D3" stroke="#2C3E50" strokeWidth="2" />
      {/* 尾巴 */}
      <path d="M 170 88 Q 185 82 188 72 Q 190 62 182 58" fill="none" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round" />
      
      {/* 装饰星星 */}
      <circle cx="45" cy="35" r="3" fill="#FDCB6E" />
      <circle cx="38" cy="42" r="2" fill="#FDCB6E" />
      <circle cx="52" cy="38" r="2" fill="#FDCB6E" />
      <circle cx="110" cy="32" r="3" fill="#FDCB6E" />
      <circle cx="103" cy="39" r="2" fill="#FDCB6E" />
      <circle cx="117" cy="35" r="2" fill="#FDCB6E" />
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
