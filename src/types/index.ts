// 缇庨鍒嗙被鏋氫妇
export type FoodCategory =
  | "蹇"
  | "姝ｉ"
  | "灏忓悆"
  | "濂惰尪"
  | "鍜栧暋"
  | "鐢滃搧"
  | "鐑х儰"
  | "鐏攨"
  | "閰掑惂"
  | "鍏朵粬";

// 浠锋牸鍖洪棿绫诲瀷
export type PriceRange =
  | "30鍏冧互涓?
  | "30-50鍏?
  | "50-100鍏?
  | "100-150鍏?
  | "100-200鍏?
  | "200鍏冧互涓?;

// 缇庨淇℃伅
export interface FoodItem {
  id: string;
  stationId: string;
  name: string;
  rating: number;
  category: FoodCategory;
  priceRange: PriceRange;
  recommendedDish: string;
  remarks: string;
  distance: number;
}

// 鍦伴搧绔欑偣
export interface SubwayStation {
  id: string;
  name: string;
  lineId: string;
  x: number;
  y: number;
  foods: FoodItem[];
}

// 鍦伴搧绾胯矾
export interface SubwayLine {
  id: string;
  name: string;
  color: string;
  stations: SubwayStation[];
}

// 搴旂敤鏁版嵁缁撴瀯
export interface AppData {
  version?: string;
  lines: SubwayLine[];
}
