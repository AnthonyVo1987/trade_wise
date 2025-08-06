"use server";

import { analyzeStockTechnicals } from "@/ai/flows/stock-analysis";
import { suggestOptionStrategy } from "@/ai/flows/option-strategy-suggestion";
import { marketNewsSummary } from "@/ai/flows/market-news-summary";
import type { Persona } from "@/lib/types";

export async function getAiResponse(
  persona: Persona,
  formData: FormData
): Promise<string> {
  try {
    switch (persona) {
      case "dashboard":
        return "Welcome to TradeWise AI! Select a tool from the sidebar to get started. For example, try 'Stock Analysis' and enter a stock ticker like 'GOOG'.";

      case "stock-analysis": {
        const ticker = formData.get("message") as string;
        if (!ticker) throw new Error("Ticker symbol is required.");
        const result = await analyzeStockTechnicals({ ticker });
        return result.analysis;
      }

      case "option-strategy": {
        const stockTicker = formData.get("stockTicker") as string;
        const riskTolerance = formData.get("riskTolerance") as string;
        const query = formData.get("message") as string;

        if (!stockTicker || !riskTolerance || !query) {
          throw new Error(
            "Stock ticker, risk tolerance, and a query are required."
          );
        }

        const result = await suggestOptionStrategy({
          stockTicker,
          riskTolerance,
          query,
        });
        return `**Strategy Suggestion:**\n${result.strategySuggestion}\n\n**Reasoning:**\n${result.reasoning}`;
      }

      case "market-news": {
        const ticker = formData.get("message") as string;
        if (!ticker) throw new Error("Ticker symbol is required.");
        const result = await marketNewsSummary({ ticker });
        return result.newsSummary;
      }

      default:
        throw new Error("Invalid persona selected.");
    }
  } catch (error) {
    console.error(error);
    return `An error occurred: ${
      error instanceof Error ? error.message : "Unknown error"
    }. Please try again.`;
  }
}
