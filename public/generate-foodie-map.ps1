# 广州美食地图 - 自动生成脚本
# 在克隆的仓库根目录运行此脚本

# 创建目录结构
Write-Host "创建目录结构..." -ForegroundColor Green

$directories = @(
    "src",
    "src\app",
    "src\components",
    "src\components\ui",
    "src\lib",
    "src\types",
    "public"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "✓ 创建目录: $dir" -ForegroundColor Cyan
    }
}

Write-Host "`n创建文件..." -ForegroundColor Green

# 1. README.md
$readmeContent = @'
# 广州美食地图

基于地铁路线的交互式美食推荐应用。

## 功能特性

- 🗺️ 交互式地铁路线图（竖向展示）
- 📍 点击站点查看或添加周边美食
- ⭐ 星级评分和推荐指数
- 🍽️ 10种美食分类（火锅、酒吧等）
- 💰 6档价格区间
- 🔍 站点搜索功能
- 📱 移动端优化

## 技术栈

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui

## 开始使用

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 数据存储

使用浏览器 LocalStorage 本地存储，无需后端服务器。
'@

Set-Content -Path "README.md" -Value $readmeContent -Encoding UTF8
Write-Host "✓ 创建文件: README.md" -ForegroundColor Cyan

# 2. package.json
$packageJson = @'
{
  "name": "foodie-map",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-slider": "^1.2.2",
    "@radix-ui/react-slot": "^1.1.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.468.0",
    "next": "16.1.1",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-hook-form": "^7.54.2",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.1",
    "postcss": "^8",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
'@

Set-Content -Path "package.json" -Value $packageJson -Encoding UTF8
Write-Host "✓ 创建文件: package.json" -ForegroundColor Cyan

# 3. tsconfig.json
$tsconfigJson = @'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'@

Set-Content -Path "tsconfig.json" -Value $tsconfigJson -Encoding UTF8
Write-Host "✓ 创建文件: tsconfig.json" -ForegroundColor Cyan

# 4. next.config.js
$nextConfig = @'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
'@

Set-Content -Path "next.config.js" -Value $nextConfig -Encoding UTF8
Write-Host "✓ 创建文件: next.config.js" -ForegroundColor Cyan

# 5. tailwind.config.ts
$tailwindConfig = @'
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
'@

Set-Content -Path "tailwind.config.ts" -Value $tailwindConfig -Encoding UTF8
Write-Host "✓ 创建文件: tailwind.config.ts" -ForegroundColor Cyan

# 6. .gitignore
$gitignoreContent = @'
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
'@

Set-Content -Path ".gitignore" -Value $gitignoreContent -Encoding UTF8
Write-Host "✓ 创建文件: .gitignore" -ForegroundColor Cyan

# 7. postcss.config.js
$postcssConfig = @'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
'@

Set-Content -Path "postcss.config.js" -Value $postcssConfig -Encoding UTF8
Write-Host "✓ 创建文件: postcss.config.js" -ForegroundColor Cyan

# 8. src/types/index.ts
$typesContent = @'
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
'@

Set-Content -Path "src\types\index.ts" -Value $typesContent -Encoding UTF8
Write-Host "✓ 创建文件: src\types\index.ts" -ForegroundColor Cyan

Write-Host "`n注意: data.ts 文件包含大量地铁数据，请从 GitHub 仓库中获取完整版本" -ForegroundColor Yellow
Write-Host "或者访问 http://localhost:5000/foodie-map.tar.gz 下载完整项目" -ForegroundColor Yellow

Write-Host "`n✅ 脚本执行完成!" -ForegroundColor Green
Write-Host "接下来请在 GitHub Desktop 中查看变更并推送" -ForegroundColor Cyan

