# 广州美食地图 - 自动生成脚本
# 在克隆的仓库根目录运行此脚本

Write-Host "正在初始化广州美食地图项目..." -ForegroundColor Cyan
Write-Host ""

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

Write-Host "`n创建配置文件..." -ForegroundColor Green

# 1. package.json
$packageJson = @"
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
"@

Set-Content -Path "package.json" -Value $packageJson -Encoding UTF8
Write-Host "✓ 创建文件: package.json" -ForegroundColor Cyan

# 2. tsconfig.json
$tsconfigJson = @"
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
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
"@

Set-Content -Path "tsconfig.json" -Value $tsconfigJson -Encoding UTF8
Write-Host "✓ 创建文件: tsconfig.json" -ForegroundColor Cyan

# 3. next.config.js
$nextConfig = @'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
'@

Set-Content -Path "next.config.js" -Value $nextConfig -Encoding UTF8
Write-Host "✓ 创建文件: next.config.js" -ForegroundColor Cyan

# 4. tailwind.config.ts
$tailwindConfig = @"
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
"@

Set-Content -Path "tailwind.config.ts" -Value $tailwindConfig -Encoding UTF8
Write-Host "✓ 创建文件: tailwind.config.ts" -ForegroundColor Cyan

# 5. .gitignore
$gitignore = @"
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
"@

Set-Content -Path ".gitignore" -Value $gitignore -Encoding UTF8
Write-Host "✓ 创建文件: .gitignore" -ForegroundColor Cyan

# 6. postcss.config.js
$postcss = @"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"@

Set-Content -Path "postcss.config.js" -Value $postcss -Encoding UTF8
Write-Host "✓ 创建文件: postcss.config.js" -ForegroundColor Cyan

# 7. README.md
$readme = @"
# 广州美食地图

基于地铁路线的交互式美食推荐应用。

## 功能特性

- 🗺️ 交互式地铁路线图（竖向展示）
- 📍 点击站点查看或添加周边美食
- ⭐ 星级评分和推荐指数
- 🍽️ 10种美食分类
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

\`\`\`bash
pnpm install
pnpm dev
\`\`\`

访问 http://localhost:5000
"@

Set-Content -Path "README.md" -Value $readme -Encoding UTF8
Write-Host "✓ 创建文件: README.md" -ForegroundColor Cyan

# 8. src/types/index.ts
$types = @"
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
  rating: number;
  category: FoodCategory;
  priceRange: PriceRange;
  recommendedDish: string;
  remarks: string;
  distance: number;
}

// 地铁站点
export interface SubwayStation {
  id: string;
  name: string;
  lineId: string;
  x: number;
  y: number;
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
"@

Set-Content -Path "src\types\index.ts" -Value $types -Encoding UTF8
Write-Host "✓ 创建文件: src\types\index.ts" -ForegroundColor Cyan

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✅ 基础文件创建完成！" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "接下来需要手动创建以下文件：" -ForegroundColor Yellow
Write-Host "1. src\lib\utils.ts" -ForegroundColor Cyan
Write-Host "2. src\lib\data.ts (地铁数据文件)" -ForegroundColor Cyan
Write-Host "3. src\app\layout.tsx" -ForegroundColor Cyan
Write-Host "4. src\app\globals.css" -ForegroundColor Cyan
Write-Host "5. src\app\page.tsx" -ForegroundColor Cyan
Write-Host "6. src\components\subway-map.tsx" -ForegroundColor Cyan
Write-Host "7. src\components\station-sidebar.tsx" -ForegroundColor Cyan
Write-Host "8. src\components\all-foods-list.tsx" -ForegroundColor Cyan

Write-Host "`n请告诉我继续获取这些文件的内容" -ForegroundColor Green