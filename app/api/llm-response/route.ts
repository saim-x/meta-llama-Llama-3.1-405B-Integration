import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  const prompt = reqBody.data.prompt;

  const openai = createOpenAI({
    apiKey: process.env.TOGETHER_API,
    baseURL: 'https://api.together.xyz/v1',
  });
  const result = await streamText({
    model: openai('meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo'),
    prompt: prompt,
  });

  return result.toDataStreamResponse();
}
