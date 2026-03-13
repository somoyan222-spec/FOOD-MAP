// 美食分类枚举
export type FoodCategory =
  | "快餐"
  | "正餐"
  | "小吃"
  | "奶茶"
  | "咖啡"
  | "甜品"
  | "烧烤"
  | "火锅"
  | "酒吧"
  | "其他";

// 价格区间类型
export type PriceRange =
  | "30元以下"
  | "30-50元"
  | "50-100元"
  | "100-150元"
  | "100-200元"
  | "200元以上";

// 用户角色
export type UserRole = 'user' | 'developer';

// 用户信息
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: UserRole;
  createdAt: string;
}

// 评论信息
export interface Comment {
  id: string;
  foodId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
  replies: Reply[];
}

// 评论回复
export interface Reply {
  id: string;
  commentId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

// 美食信息
export interface FoodItem {
  id: string;
  stationId: string;
  name: string;
  rating: number; // 1-5星
  category: FoodCategory;
  priceRange: PriceRange;
  recommendedDish: string;
  remarks: string;
  distance: number; // 米
  userId: string; // 添加用户ID
  userName: string; // 添加用户名
  createdAt: string;
  updatedAt: string;
  likes: number;
  likedBy: string[]; // 点赞用户ID
  comments: Comment[];
}

// 地铁站点（规则布局位置）
export interface SubwayStation {
  id: string;
  name: string;
  lineId: string;
  x: number; // SVG坐标 X
  y: number; // SVG坐标 Y
  foods: FoodItem[];
}

// 地铁线路
export interface SubwayLine {
  id: string;
  name: string;
  color: string;
  stations: SubwayStation[];
}

// 应用数据结构
export interface AppData {
  version?: string;
  lines: SubwayLine[];
  users?: {
    [userId: string]: User;
  };
}

// 站点统计信息
export interface StationStats {
  foodCount: number;
  avgRating: number;
  maxRating: number;
  bestFoods: FoodItem[];
}

// 线路统计信息
export interface LineStats {
  foodCount: number;
  stationCount: number;
  avgRating: number;
  maxRating: number;
  bestFood?: FoodItem;
}

// 认证状态
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
