# FoodScan AI 🍎📱

FoodScan AI 是一个基于[Expo](https://expo.dev)开发的全平台移动应用，它使用 AI 技术帮助用户识别和分析食物。

## 功能特点

- 🔍 **食物识别**：使用 AI 技术识别拍照或上传的食物图片
- 📊 **营养分析**：提供详细的营养成分和健康信息
- 🌐 **多平台支持**：iOS、Android 和 Web 平台无缝体验
- 🤖 **AI 驱动**：集成先进的 AI 模型，提供准确的食物分析
- 🔄 **实时反馈**：流式响应提供即时分析结果

## 技术栈

- [Expo](https://expo.dev) / [React Native](https://reactnative.dev) - 跨平台移动应用开发框架
- [Expo Router](https://docs.expo.dev/router/introduction) - 基于文件系统的路由解决方案
- [AI SDK](https://sdk.vercel.ai/docs) - Vercel 提供的 AI 模型集成工具包
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集，提供类型安全

## 开始使用

### 前提条件

- [Node.js](https://nodejs.org/) 18+ (推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理 Node 版本)
- [npm](https://www.npmjs.com/) 或 [pnpm](https://pnpm.io/) 包管理器
- [OpenAI API 密钥](https://platform.openai.com/api-keys) (用于 AI 功能)
- 可选：[Expo Go](https://expo.dev/go) 应用（用于在真机上测试）

### 安装步骤

1. 克隆仓库

   ```bash
   git clone https://github.com/yourusername/foodscan-ai.git
   cd foodscan-ai
   ```

2. 安装依赖

   ```bash
   npm install
   # 或者使用pnpm
   pnpm install
   ```

3. 安装必要的全局工具（如果尚未安装）

   ```bash
   npm install -g expo-cli
   # 或者使用pnpm
   pnpm add -g expo-cli
   ```

4. 配置环境变量

   创建`.env.local`文件并添加以下内容：

   ```
   OPENAI_API_KEY=你的OpenAI_API密钥
   ```

5. 启动开发服务器

   ```bash
   npx expo start
   ```

   启动后，终端会显示一个二维码和几个选项：

   - 按 `a` 在连接的 Android 设备/模拟器上打开
   - 按 `i` 在连接的 iOS 模拟器上打开
   - 按 `w` 在浏览器中打开 Web 版本
   - 使用 Expo Go 应用扫描二维码在真机上运行

### 开发环境设置

#### Android 开发

1. 安装 [Android Studio](https://developer.android.com/studio)
2. 通过 Android Studio 安装 Android SDK 和创建模拟器
3. 启动模拟器或连接真机
4. 运行 `npx expo start` 并按 `a` 在 Android 设备上启动应用

#### iOS 开发（仅限 macOS）

1. 安装 [Xcode](https://apps.apple.com/us/app/xcode/id497799835)
2. 运行 `npx expo start` 并按 `i` 在 iOS 模拟器上启动应用

#### Web 开发

1. 运行 `npx expo start` 并按 `w` 在浏览器中启动应用

## 项目结构详解

```
foodscan-ai/
├── app/                  # 应用路由和页面（基于Expo Router）
│   ├── (tabs)/           # 标签页路由（括号表示这是一个分组）
│   │   ├── index.tsx     # 主页面
│   │   ├── scan.tsx      # 扫描页面
│   │   └── profile.tsx   # 个人资料页面
│   ├── api/              # API路由（服务器端功能）
│   │   └── analyze+api.ts # 食物分析API端点
│   ├── _layout.tsx       # 根布局（应用于所有页面）
│   └── index.tsx         # 入口页面（可能是启动屏幕）
├── components/           # 可复用组件
│   ├── ui/               # UI组件（按钮、输入框等）
│   └── features/         # 功能组件（与业务逻辑相关）
├── constants/            # 常量和配置
│   ├── Colors.ts         # 颜色主题
│   └── Config.ts         # 应用配置
├── hooks/                # 自定义React钩子
│   └── useAI.ts          # AI相关钩子
├── assets/               # 静态资源（图片、字体等）
│   ├── images/           # 图片资源
│   └── fonts/            # 字体资源
├── utils/                # 工具函数
│   ├── api.ts            # API相关工具
│   └── polyfills.ts      # 兼容性填充
├── .env.local            # 本地环境变量（不提交到Git）
├── app.json              # Expo配置文件
├── babel.config.js       # Babel配置
├── tsconfig.json         # TypeScript配置
└── package.json          # 项目依赖和脚本
```

## Expo Router 路由系统说明

Expo Router 是一个基于文件系统的路由解决方案，类似于 Next.js。了解以下概念有助于理解项目结构：

- **文件即路由**：`app/` 目录中的每个文件都对应一个路由
- **嵌套路由**：文件夹结构反映了路由嵌套
- **分组**：使用括号 `(group)` 创建不影响 URL 的逻辑分组
- **动态路由**：使用方括号 `[param]` 创建动态路由
- **布局**：`_layout.tsx` 文件定义应用于该目录下所有页面的布局

## API 路由详解

本项目使用 Expo Router 的 API 路由功能提供服务器端功能。API 路由文件使用`+api.ts`后缀命名：

```typescript
// app/api/analyze+api.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// 处理POST请求，接收食物图片数据并返回分析结果
export async function POST(request: Request) {
  const { imageData, prompt } = await request.json();

  // 使用AI SDK处理图像分析
  const result = streamText({
    model: openai("gpt-4-vision-preview"),
    messages: [
      {
        role: "system",
        content: "你是一个专业的食物分析助手，擅长识别食物并提供营养信息。",
      },
      {
        role: "user",
        content: [
          { type: "text", text: prompt || "分析这张食物图片" },
          { type: "image", image: new URL(imageData) },
        ],
      },
    ],
  });

  // 返回流式响应
  return result.toDataStreamResponse();
}
```

## AI 集成说明

本项目使用 Vercel AI SDK 集成 AI 功能，主要包括：

1. **模型提供者**：使用 `@ai-sdk/openai` 包访问 OpenAI 模型
2. **流式响应**：使用 `streamText` 函数实现流式文本生成
3. **多模态输入**：支持文本和图像的组合输入
4. **API 路由**：通过 Expo Router 的 API 路由功能提供 AI 服务

## 常见问题解答

### Q: 如何在本地测试 API 路由？

A: 确保使用 `npx expo start` 启动开发服务器，API 路由将在开发服务器上可用。

### Q: 如何处理图像上传？

A: 可以使用 Expo 的 `expo-image-picker` 库选择图片，然后将图片转换为 base64 或上传到存储服务获取 URL。

### Q: 如何添加新页面？

A: 在 `app/` 目录中创建新的 `.tsx` 文件，文件名将成为路由路径。

### Q: 如何处理环境变量？

A: 使用 `.env.local` 文件存储本地环境变量，使用 `process.env.VARIABLE_NAME` 访问。

## 开发指南

- 使用 TypeScript 类型确保代码质量
- 遵循组件化开发方法，将 UI 和业务逻辑分离
- 使用 React Hooks 管理状态和副作用
- 使用 Expo 提供的 API 而不是原生模块，以确保跨平台兼容性
- 考虑不同屏幕尺寸和设备特性，实现响应式设计

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

[MIT](LICENSE)

## 联系方式

项目维护者 - [@steveoon](https://github.com/steveoon)

项目链接: [https://github.com/steveoon/foodscan-ai](https://github.com/steveoon/foodscan-ai)
