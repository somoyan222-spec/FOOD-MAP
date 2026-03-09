# 广州美食地图 - 完整项目生成脚本 v2.0
# 在克隆的仓库根目录运行此脚本

param(
    [switch]$IncludeCore = $false
)

# 颜色配置
$colors = @{
    Cyan = [ConsoleColor]::Cyan
    Green = [ConsoleColor]::Green
    Yellow = [ConsoleColor]::Yellow
    Red = [ConsoleColor]::Red
}

function Write-ColorOutput {
    param([string]$Message, [ConsoleColor]$Color = [ConsoleColor]::White)
    Write-Host $Message -ForegroundColor $Color
}

function Write-Separator {
    param([string]$Title = "")
    Write-Host "========================================" -ForegroundColor $colors.Cyan
    if ($Title) {
        Write-Host "  $Title" -ForegroundColor $colors.Cyan
    }
    Write-Host "========================================" -ForegroundColor $colors.Cyan
}

function Create-Directory {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
        Write-ColorOutput "  ✓ 创建目录: $Path" $colors.Green
    }
}

function Create-File {
    param(
        [string]$Path,
        [string]$Content,
        [string]$Description = ""
    )
    $dir = Split-Path $Path -Parent
    if ($dir) {
        Create-Directory $dir
    }

    Set-Content -Path $Path -Value $Content -Encoding UTF8 -NoNewline
    if ($Description) {
        Write-ColorOutput "  ✓ $Description ($Path)" $colors.Green
    }
}

# ==================== 开始执行 ====================
Write-Separator "广州美食地图 - 完整项目生成工具"
Write-ColorOutput "`n准备生成项目文件...`n" $colors.Green

# 记录开始时间
$startTime = Get-Date

# ==================== 阶段 1: 小文件生成 ====================
Write-ColorOutput "[1/2] 生成基础配置文件..." $colors.Cyan

# 1. src/lib/utils.ts
Write-ColorOutput "`n[1/6] 创建 src/lib/utils.ts" $colors.Yellow
Create-File -Path "src\lib\utils.ts" -Content @'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
'@ -Description "工具函数"

# 2. src/app/globals.css
Write-ColorOutput "`n[2/6] 创建 src/app/globals.css" $colors.Yellow
Create-File -Path "src\app\globals.css" -Content @'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
'@ -Description "全局样式"

# 3. src/app/layout.tsx
Write-ColorOutput "`n[3/6] 创建 src/app/layout.tsx" $colors.Yellow
Create-File -Path "src\app\layout.tsx" -Content @'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "广州美食地图",
  description: "基于地铁路线的交互式美食推荐应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
'@ -Description "根布局组件"

# 4. src/types/index.ts
Write-ColorOutput "`n[4/6] 创建 src/types/index.ts" $colors.Yellow
Create-File -Path "src\types\index.ts" -Content @'
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
'@ -Description "TypeScript 类型定义"

Write-Separator "✅ 小文件创建完成！"

# ==================== 阶段 2: 核心文件提示 ====================
Write-ColorOutput "`n[2/2] 核心业务文件（需要手动复制）" $colors.Cyan

$coreFiles = @(
    @{ File = "src\lib\data.ts"; Lines = "约500行"; Description = "地铁数据" },
    @{ File = "src\app\page.tsx"; Lines = "约400行"; Description = "主页面" },
    @{ File = "src\components\subway-map.tsx"; Lines = "约300行"; Description = "地铁地图组件" },
    @{ File = "src\components\station-sidebar.tsx"; Lines = "约200行"; Description = "侧边栏组件" },
    @{ File = "src\components\all-foods-list.tsx"; Lines = "约250行"; Description = "美食列表组件" }
)

Write-ColorOutput "`n需要复制以下核心文件：" $colors.Yellow
Write-Host ""
foreach ($file in $coreFiles) {
    Write-Host "  • $($file.Description)" -ForegroundColor $colors.Cyan
    Write-Host "    路径: $($file.File)" -ForegroundColor $colors.Green
    Write-Host "    行数: $($file.Lines)`n" -ForegroundColor $colors.Green
}

# ==================== 阶段 3: 获取文件提示 ====================
Write-Separator "获取核心文件代码"
Write-ColorOutput "`n有 3 种方式获取核心文件代码：`n" $colors.Yellow

Write-Host "【方式 1】让我提供（推荐）" -ForegroundColor $colors.Cyan
Write-Host "  告诉我：'给我 data.ts 的完整代码'"
Write-Host "  我会逐个提供完整代码`n"

Write-Host "【方式 2】从沙箱复制" -ForegroundColor $colors.Cyan
Write-Host "  1. 访问沙箱项目文件浏览器"
Write-Host "  2. 打开对应文件"
Write-Host "  3. 全选复制内容"
Write-Host "  4. 粘贴到本地`n"

Write-Host "【方式 3】查看快速指南" -ForegroundColor $colors.Cyan
Write-Host "  已生成 QUICK_START.md 文件"
Write-Host "  包含详细的操作步骤和 types.ts 代码`n"

# ==================== 阶段 4: 验证和提交 ====================
Write-Separator "验证和提交"

Write-ColorOutput "`n复制完成后，运行以下命令验证：`n" $colors.Yellow
Write-Host "```powershell" -ForegroundColor $colors.Green
foreach ($file in $coreFiles) {
    Write-Host "Test-Path '$($file.File)'"
}
Write-Host "```" -ForegroundColor $colors.Green
Write-Host "所有命令都应该返回 True`n" -ForegroundColor $colors.Cyan

Write-ColorOutput "然后在 GitHub Desktop 中：`n" $colors.Yellow
Write-Host "1. 查看 Changes" -ForegroundColor $colors.Green
Write-Host "2. 填写提交信息：" -ForegroundColor $colors.Green
Write-Host "   'feat: 初始化广州美食地图项目'" -ForegroundColor $colors.Cyan
Write-Host "3. 点击 'Commit to main'" -ForegroundColor $colors.Green
Write-Host "4. 点击 'Push origin'`n" -ForegroundColor $colors.Green

# ==================== 完成 ====================
$endTime = Get-Date
$duration = ($endTime - $startTime).TotalSeconds

Write-Separator "脚本执行完成"
Write-ColorOutput "`n✅ 耗时: $([math]::Round($duration, 2)) 秒" $colors.Green
Write-ColorOutput "✅ 已生成 4 个小文件" $colors.Green
Write-ColorOutput "⏳ 待复制 5 个核心文件`n" $colors.Yellow

Write-ColorOutput "需要帮助？" -colors.Cyan
Write-ColorOutput "告诉我：'给我 [文件名] 的完整代码'" $colors.Green
Write-ColorOutput "例如：'给我 data.ts 的完整代码'`n" $colors.Cyan
