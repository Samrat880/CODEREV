import { createOpenAI } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// OPENROUTER_API_KEY — used for Free tier and as fallback when OPENAI_API_KEY is missing
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

// OPENAI_API_KEY — used for active Pro tier reviews (gpt-4o-mini)
export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
