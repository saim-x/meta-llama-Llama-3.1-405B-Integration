// app/api/llm-response/route.ts
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { processWhatsAppChat } from "../../utils/chatProcessor";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const userPrompt = reqBody.data.prompt;
  const chatHistory = reqBody.data.history;

  // Get raw chat context from WhatsApp chat history
  const chatContext = await processWhatsAppChat();

  // Format the chat history to pass it as context, appending the new user input
  const formattedHistory = chatHistory
    .map((msg: { role: string; content: string }) => `${msg.role === "user" ? "User" : "Bot"}: ${msg.content}`)
    .join("\n");

  // Combine the WhatsApp context with the formatted conversation history and user prompt
  const fullPrompt = `${chatContext}\n${formattedHistory}\nUser: ${userPrompt}\n`;

  const openai = createOpenAI({
    apiKey: process.env.TOGETHER_API,
    baseURL: 'https://api.together.xyz/v1',
  });

  const result = await streamText({
    model: openai('meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo'),
    prompt: fullPrompt,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}
