# 广州美食地图 - GitHub 上传完整指南

## 方案一：使用批处理脚本（推荐）

### 步骤 1：运行初始脚本

1. 在 GitHub Desktop 中克隆仓库到本地（例如：`C:\Users\你的用户名\source\repos\Foodie-Map`）
2. 打开 PowerShell，进入项目目录：
   ```powershell
   cd C:\Users\你的用户名\source\repos\Foodie-Map
   ```
3. 运行批处理脚本：
   ```powershell
   .\generate-all-files.ps1
   ```

### 步骤 2：从沙箱复制核心文件

由于核心文件内容太长，需要手动从沙箱复制。访问沙箱项目的文件：

**需要复制的文件：**

1. **src/lib/data.ts** (地铁数据，500+ 行)
   - 在沙箱中找到并复制完整内容
   - 在本地创建 `src\lib\` 文件夹
   - 粘贴到 `src\lib\data.ts`

2. **src/app/page.tsx** (主页面)
   - 复制完整内容到 `src\app\page.tsx`

3. **src/components/subway-map.tsx** (地铁地图组件)
   - 创建 `src\components\` 文件夹
   - 粘贴到 `src\components\subway-map.tsx`

4. **src/components/station-sidebar.tsx** (侧边栏组件)
   - 粘贴到 `src\components\station-sidebar.tsx`

5. **src/components/all-foods-list.tsx** (美食列表组件)
   - 粘贴到 `src\components\all-foods-list.tsx`

6. **src/types/index.ts** (类型定义)
   - 创建 `src\types\` 文件夹
   - 粘贴到 `src\types\index.ts`

### 步骤 3：提交并推送到 GitHub

1. 打开 GitHub Desktop
2. 查看所有变更（应该显示所有新建的文件）
3. 输入提交信息：
   ```
   feat: 初始化广州美食地图项目
   - 实现基于地铁路线的美食管理功能
   - 支持添加、编辑、删除美食
   - 实现星级评分和分类筛选
   - 优化移动端显示效果
   ```
4. 点击"Commit to main"
5. 点击"Push origin"推送到远程仓库

---

## 方案二：使用 Git 命令行（高级用户）

如果你熟悉 Git 命令行，可以使用以下命令：

```bash
# 初始化 Git 仓库
cd C:\Users\你的用户名\source\repos\Foodie-Map
git init

# 添加远程仓库
git remote add origin https://github.com/Somoyan222-spec/Foodie-Map.git

# 运行批处理脚本生成文件
.\generate-all-files.ps1

# 手动复制核心文件后...

# 查看变更
git status

# 添加所有文件
git add .

# 提交
git commit -m "feat: 初始化广州美食地图项目"

# 推送到远程仓库
git push -u origin main
```

---

## 项目结构

```
Foodie-Map/
├── .coze                   # 项目配置文件（已存在）
├── package.json            # 依赖配置（已存在）
├── pnpm-lock.yaml          # 依赖锁定文件（已存在）
├── tsconfig.json           # TypeScript 配置（已存在）
├── next.config.ts          # Next.js 配置（已存在）
├── tailwind.config.ts      # Tailwind CSS 配置（已存在）
├── components.json         # shadcn/ui 配置（已存在）
├── generate-all-files.ps1  # 批处理脚本（新建）
├── src/
│   ├── app/
│   │   ├── globals.css     # 全局样式（脚本生成）
│   │   ├── layout.tsx      # 根布局（脚本生成）
│   │   └── page.tsx        # 主页面（需要复制）
│   ├── components/
│   │   ├── ui/             # shadcn/ui 组件（已存在）
│   │   ├── subway-map.tsx  # 地铁地图（需要复制）
│   │   ├── station-sidebar.tsx  # 侧边栏（需要复制）
│   │   └── all-foods-list.tsx   # 美食列表（需要复制）
│   ├── lib/
│   │   ├── utils.ts        # 工具函数（脚本生成）
│   │   └── data.ts         # 地铁数据（需要复制）
│   └── types/
│       └── index.ts        # 类型定义（需要复制）
└── public/
    ├── next.svg            # Next.js 图标（已存在）
    └── vercel.svg          # Vercel 图标（已存在）
```

---

## 常见问题

### Q1: PowerShell 脚本无法运行？

**解决方案：**
```powershell
# 以管理员身份运行 PowerShell，执行：
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Q2: 找不到沙箱项目文件？

**解决方案：**
告诉我，我可以逐个提供核心文件的完整代码。

### Q3: 推送到 GitHub 失败？

**解决方案：**
```bash
# 拉取最新代码
git pull origin main --rebase

# 解决冲突后推送
git push origin main
```

---

## 后续开发

项目上传完成后，可以：

1. **在 GitHub Codespaces 中开发：**
   - 访问 GitHub 仓库
   - 点击"Code" → "Codespaces" → "Create codespace"
   - 自动打开在线开发环境

2. **部署到 Vercel：**
   - 访问 [vercel.com](https://vercel.com)
   - 连接 GitHub 账户
   - 选择 `Foodie-Map` 仓库
   - 点击"Deploy"

3. **添加新功能：**
   - 使用 GitHub Desktop 拉取最新代码
   - 本地修改后提交推送

---

## 技术支持

如有问题，请告诉我：
- 具体的错误信息
- 当前的操作步骤
- 截图（如果可能）

我会尽力帮助你解决问题！
