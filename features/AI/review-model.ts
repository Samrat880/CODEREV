import type { SubscriptionPlan } from "@/features/dashboard/lib/types";
import { openai, openrouter } from "./providers";

const OPENROUTER_REVIEW_MODEL = "openrouter/free";
const OPENAI_REVIEW_MODEL = "gpt-4o";

type ReviewModelOptions = {
  proActive?: boolean;
};

export function getReviewModel(
  plan: SubscriptionPlan,
  opts?: ReviewModelOptions,
) {
  const proActive = opts?.proActive ?? false;
  const useOpenAi =
    plan === "pro" && proActive && Boolean(process.env.OPENAI_API_KEY);

  if (plan === "pro" && proActive && !process.env.OPENAI_API_KEY) {
    console.warn(
      "[getReviewModel] OPENAI_API_KEY is not set; falling back to OpenRouter for Pro review.",
    );
  }

  if (useOpenAi) {
    return openai(OPENAI_REVIEW_MODEL);
  }

  return openrouter(OPENROUTER_REVIEW_MODEL);
}
