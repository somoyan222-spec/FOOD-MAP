# 广州美食地图 (Guangzhou Foodie Map)

基于 Next.js 和广州地铁路线的交互式美食推荐应用。

## ✨ 功能特性

- 🚇 **交互式地铁路线图** - 可视化展示广州地铁线路和站点
- 🍜 **美食管理** - 为每个站点添加、编辑、删除美食
- ⭐ **星级评分** - 1-5星推荐指数系统
- 🏷️ **分类筛选** - 10种美食分类（快餐、正餐、小吃、奶茶、咖啡、甜品、烧烤、火锅、酒吧、其他）
- 💰 **价格区间** - 6档价格筛选（30元以下 ~ 200元以上）
- 📱 **移动端优化** - 响应式设计，支持手机和平板
- 💾 **本地存储** - 数据保存在浏览器 LocalStorage 中
- 🔍 **搜索功能** - 快速查找站点和美食

## 🛠️ 技术栈

- **框架**: Next.js 16 (App Router)
- **UI 库**: shadcn/ui + Tailwind CSS 4
- **语言**: TypeScript 5
- **图标**: Lucide React
- **状态管理**: React Hooks

## 📦 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/Somoyan222-spec/Foodie-Map.git
cd Foodie-Map
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 运行开发服务器

```bash
pnpm dev
```

访问 http://localhost:5000 查看应用。

### 4. 构建生产版本

```bash
pnpm build
pnpm start
```

## 📁 项目结构

```
Foodie-Map/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # 全局样式
│   │   ├── layout.tsx       # 根布局
│   │   └── page.tsx         # 主页面
│   ├── components/          # React 组件
│   │   ├── ui/              # shadcn/ui 组件
│   │   ├── subway-map.tsx   # 地铁路线图组件
│   │   ├── station-sidebar.tsx    # 站点侧边栏
│   │   └── all-foods-list.tsx     # 全部美食列表
│   ├── lib/                 # 工具函数和数据
│   │   ├── utils.ts         # cn() 工具函数
│   │   └── data.ts          # 地铁数据
│   └── types/               # TypeScript 类型
│       └── index.ts         # 类型定义
├── public/                  # 静态资源
├── package.json             # 依赖配置
├── tsconfig.json            # TypeScript 配置
├── tailwind.config.ts       # Tailwind CSS 配置
└── next.config.ts           # Next.js 配置
```

## 🎨 核心功能说明

### 地铁路线图

- **竖向展示** - 所有线路采用竖向布局，站点名称显示在右侧
- **单线路模式** - 每次只显示一条线路，避免视觉混乱
- **线路切换** - 点击线路按钮切换显示不同线路
- **站点交互** - 点击站点打开美食管理侧边栏
- **缩放控制** - 支持放大/缩小查看地图

### 美食管理

- **添加美食** - 在侧边栏填写美食信息
- **编辑美食** - 点击美食卡片进行编辑
- **删除美食** - 删除不再推荐的美食
- **排序显示** - 按推荐指数自动排序
- **统计信息** - 显示站点美食总数、平均评分等

### 全部美食列表

- **查看所有** - 查看所有站点的美食
- **分类筛选** - 按美食分类快速筛选
- **搜索功能** - 根据店名搜索美食

## 🗂️ 数据存储

所有数据保存在浏览器 LocalStorage 中：

```typescript
// 数据结构
{
  version: "v2.5.0",
  lines: [
    {
      id: "line-1",
      name: "1号线",
      color: "#F7B500",
      stations: [
        {
          id: "s1-1",
          name: "西朗",
          lineId: "line-1",
          x: 150,
          y: 600,
          foods: [...]
        }
      ]
    }
  ]
}
```

## 🌐 部署

### Vercel 部署（推荐）

1. 访问 [vercel.com](https://vercel.com)
2. 连接 GitHub 账户
3. 导入 `Foodie-Map` 仓库
4. 点击 "Deploy"

### 其他平台

此项目可部署到任何支持 Next.js 的平台：
- Netlify
- Railway
- Render
- 自有服务器

## 📱 移动端支持

- 响应式布局自动适配屏幕尺寸
- 触摸手势支持（点击、滚动）
- 优化的控件尺寸适合手指操作
- 隐藏不必要的界面元素

## 🔄 数据更新

地铁数据包含版本控制机制（`DATA_VERSION`）：

- 当检测到数据版本不匹配时，自动更新地铁数据
- 用户的美食数据会被保留
- 仅更新地铁站点信息

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: 添加某个功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 开发计划

- [ ] 支持导出美食数据为 JSON/CSV
- [ ] 添加图片上传功能
- [ ] 实现美食分享功能
- [ ] 添加用户评价系统
- [ ] 支持多城市数据

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- 广州地铁官网提供的线路数据
- shadcn/ui 提供的精美组件库
- Next.js 团队的优秀框架

---

**开发者**: Somoyan222-spec
**项目地址**: https://github.com/Somoyan222-spec/Foodie-Map

如有问题或建议，欢迎提 Issue！
