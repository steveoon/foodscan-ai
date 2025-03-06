import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

// 处理POST请求，接收食物图片数据并返回分析结果
export async function POST(request: Request) {
  try {
    // 解析请求体
    const { imageData, prompt } = await request.json();

    if (!imageData) {
      return Response.json({ error: "缺少图片数据" }, { status: 400 });
    }

    // 验证imageData是否为有效的URL
    try {
      new URL(imageData);
    } catch (e) {
      return Response.json(
        { error: "提供的图片数据不是有效的URL" },
        { status: 400 }
      );
    }

    // 默认提示词
    const defaultPrompt = "分析这张食物图片，提供详细的营养成分和健康信息。";

    // 创建流式响应
    const result = streamText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "system",
          content: "你是一个专业的食物分析助手，擅长识别食物并提供营养信息。",
        },
        {
          role: "user",
          content: [
            { type: "text", text: prompt || defaultPrompt },
            { type: "image", image: new URL(imageData) },
          ],
        },
      ],
      maxTokens: 1000,
    });

    // 返回流式响应
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("分析食物图片时出错:", error);

    // 提供更详细的错误信息
    const errorMessage = error instanceof Error ? error.message : "未知错误";
    return Response.json(
      { error: "处理请求时出错", details: errorMessage },
      { status: 500 }
    );
  }
}

// 处理GET请求，返回API状态信息
export async function GET() {
  return Response.json({
    status: "online",
    service: "FoodScan AI 分析服务",
    version: "1.0.0",
  });
}
