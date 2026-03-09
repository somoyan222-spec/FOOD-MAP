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
