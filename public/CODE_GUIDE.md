# 广州美食地图 - 完整代码指南

## 创建方法
在对应目录右键 → 新建 → 文本文档 → 重命名 → 编辑 → 粘贴代码 → 保存

---

## 文件 1：src/lib/utils.ts

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 文件 2：src/app/globals.css

```css
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
```

---

## 文件 3：src/app/layout.tsx

```typescript
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
```

---

## ⚠️ 重要提示

由于剩余文件内容较多（src/lib/data.ts 包含 500+ 行地铁数据），建议使用以下更简单的方法：

### 方法 A：通过 GitHub 网页导入（推荐）

访问 https://github.com/Somoyan222-spec/Foodie-Map 直接在网页上创建这些文件：
- src/lib/data.ts（最大文件，包含地铁数据）
- src/app/page.tsx
- src/components/subway-map.tsx
- src/components/station-sidebar.tsx
- src/components/all-foods-list.tsx

### 方法 B：从项目压缩包获取

告诉我，我可以为你提供完整的项目代码，或者从沙箱下载完整项目。

---

## 📤 如何上传到 GitHub

完成所有文件创建后：

1. **打开 GitHub Desktop**
2. **查看变更** - 左侧会显示所有新增文件
3. **填写提交信息**：
   - Summary: "Initial commit: 广州美食地图项目"
   - Description: "- 添加交互式地铁路线图\n- 支持美食收藏和评分\n- 移动端优化"
4. **点击 "Commit to main"**
5. **点击 "Push origin"**

---

需要我提供剩余文件的完整代码吗？
