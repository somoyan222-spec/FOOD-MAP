# 快速上传指南

## 🎯 核心步骤（5分钟完成）

### 1️⃣ 在本地运行脚本
```powershell
cd C:\Users\你的用户名\source\repos\Foodie-Map
.\generate-all-files.ps1
```

### 2️⃣ 从沙箱复制文件
需要复制 6 个核心文件到本地：

| 文件 | 路径 | 说明 |
|------|------|------|
| `types.ts` | `src/types/index.ts` | 类型定义（约30行）✅ |
| `data.ts` | `src/lib/data.ts` | 地铁数据（约500行） |
| `page.tsx` | `src/app/page.tsx` | 主页面（约400行） |
| `subway-map.tsx` | `src/components/subway-map.tsx` | 地铁地图组件（约300行） |
| `station-sidebar.tsx` | `src/components/station-sidebar.tsx` | 侧边栏组件（约200行） |
| `all-foods-list.tsx` | `src/components/all-foods-list.tsx` | 美食列表组件（约250行） |

### 3️⃣ 在 GitHub Desktop 中提交
- 打开 GitHub Desktop
- 查看 Changes
- 输入提交信息：`feat: 初始化广州美食地图项目`
- 点击 Commit to main
- 点击 Push origin

---

## 📁 types.ts 完整代码（直接复制）

```typescript
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
```

**创建文件：** `src/types/index.ts`

---

## 📦 其他核心文件获取方式

由于剩余文件内容较长，我建议：

### 方案 A：让我逐个提供（推荐）
告诉我需要哪个文件，我会提供完整代码：
- "给我 data.ts 的完整代码"
- "给我 page.tsx 的完整代码"
- 等等...

### 方案 B：从沙箱复制
1. 访问沙箱项目文件浏览器
2. 打开对应文件
3. 全选复制内容
4. 粘贴到本地对应位置

---

## ✅ 验证清单

复制完成后，检查以下文件是否都存在：

```powershell
# 在项目目录运行
Test-Path src\lib\data.ts           # 应返回 True
Test-Path src\app\page.tsx          # 应返回 True
Test-Path src\components\subway-map.tsx         # 应返回 True
Test-Path src\components\station-sidebar.tsx    # 应返回 True
Test-Path src\components\all-foods-list.tsx     # 应返回 True
Test-Path src\types\index.ts        # 应返回 True
```

---

## 🚀 提交到 GitHub

所有文件就绪后：

```bash
# 在项目目录运行
git add .
git commit -m "feat: 初始化广州美食地图项目

- 实现基于地铁路线的美食管理功能
- 支持添加、编辑、删除美食
- 实现星级评分和分类筛选
- 优化移动端显示效果"
git push -u origin main
```

或者在 GitHub Desktop 中：
1. 查看所有 Changes
2. 填写提交信息
3. 点击 "Commit to main"
4. 点击 "Push origin"

---

## 🎉 完成后

1. 访问 https://github.com/Somoyan222-spec/Foodie-Map
2. 确认所有文件都已上传
3. 可以部署到 Vercel 或其他平台

需要其他文件的代码？告诉我！
