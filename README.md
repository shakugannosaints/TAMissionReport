# TTRPG 任务报告网页版

![76916ceae379db8ccbe7f7c1a159b42d.png](https://s2.loli.net/2026/01/15/uyZ9kLJgSw3EVGx.png)

这是一个（希望能）完美复现的任务报告网页版本，包含所有原始设计的视觉效果、排版和功能。

## 项目结构

```
├── dist/                 # 构建输出文件（可直接部署）
│   ├── public/          # 静态资源
│   └── index.js         # 服务器文件
├── src/                 # 源代码
│   ├── pages/           # 页面组件
│   ├── components/      # UI 组件
│   ├── App.tsx          # 应用主文件
│   ├── index.css        # 全局样式
│   └── main.tsx         # 入口文件
├── public/              # 公共资源
├── package.json         # 项目配置
├── index.html           # HTML 模板
└── pnpm-lock.yaml       # 依赖锁定文件
```

## 快速开始

### 开发模式

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

### 生产构建

```bash
# 构建项目
pnpm build

# 启动生产服务器
pnpm start
```

## 功能特性

✅ **完美复现原始设计**
- 精确的布局和间距
- 准确的颜色搭配
- 专业的排版

✅ **交互功能**
- 异常状态复选框
- 异常分析表单
- 散选端表格（支持添加行）
- 可选目标表格（支持添加行）
- 评优卡片

✅ **响应式设计**
- 支持各种屏幕尺寸
- 流畅的用户体验

✅ **现代技术栈**
- React 19
- Tailwind CSS 4
- TypeScript
- Vite

## 文件说明

### 主要组件

**`client/src/pages/Home.tsx`**
- 任务报告的主页面
- 包含所有表单和卡片组件
- 管理表单状态

**`client/src/index.css`**
- 全局样式定义
- Tailwind CSS 配置
- 中文字体设置

**`client/index.html`**
- HTML 入口模板
- Google Fonts 集成

## 自定义修改

### 修改颜色

编辑 `client/src/index.css` 中的 CSS 变量：

```css
:root {
  --primary: var(--color-blue-700);
  /* 修改其他颜色 */
}
```

### 修改内容

编辑 `client/src/pages/Home.tsx` 中的文本和标签。

### 修改样式

使用 Tailwind CSS 类名直接修改组件样式。

## 部署

### 静态部署（推荐）

1. 运行 `pnpm build`
2. 将 `dist/public` 目录中的文件上传到任何静态托管服务
3. 配置服务器将所有路由指向 `index.html`

### Node.js 部署

1. 运行 `pnpm build`
2. 部署整个 `dist` 目录
3. 运行 `pnpm start` 启动服务器
