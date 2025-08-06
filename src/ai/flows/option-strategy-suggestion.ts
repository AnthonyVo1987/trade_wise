'use server';

/**
 * @fileOverview An AI agent to suggest options trading strategies based on user input.
 *
 * - suggestOptionStrategy - A function that suggests an options trading strategy.
 * - SuggestOptionStrategyInput - The input type for the suggestOptionStrategy function.
 * - SuggestOptionStrategyOutput - The return type for the suggestOptionStrategy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptionStrategyInputSchema = z.object({
  stockTicker: z.string().describe('The ticker symbol of the stock to trade options on.'),
  riskTolerance: z
    .string()
    .describe(
      'The risk tolerance of the user, can be conservative, moderate, or aggressive.'
    ),
  query: z.string().describe('The user request and query for options trading strategies.'),
});
export type SuggestOptionStrategyInput = z.infer<typeof SuggestOptionStrategyInputSchema>;

const SuggestOptionStrategyOutputSchema = z.object({
  strategySuggestion: z
    .string()
    .describe('The options trading strategy suggested by the AI.'),
  reasoning: z.string().describe('The reasoning behind the strategy suggestion.'),
});
export type SuggestOptionStrategyOutput = z.infer<typeof SuggestOptionStrategyOutputSchema>;

export async function suggestOptionStrategy(
  input: SuggestOptionStrategyInput
): Promise<SuggestOptionStrategyOutput> {
  return suggestOptionStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptionStrategyPrompt',
  input: {schema: SuggestOptionStrategyInputSchema},
  output: {schema: SuggestOptionStrategyOutputSchema},
  prompt: `You are an Options Trading Expert, skilled in suggesting options trading strategies based on user input, stock data, and risk tolerance.

  Always use web search to obtain the most up-to-date stock data and market sentiment.
  Ground all responses based on the latest current real-world date and time to prevent hallucinating or using outdated data from older time periods.

  Based on the user's query, stock ticker, and risk tolerance, suggest an appropriate options trading strategy.
  Explain the reasoning behind your suggestion.

  Stock Ticker: {{{stockTicker}}}
  Risk Tolerance: {{{riskTolerance}}}
  User Query: {{{query}}}

  Consider the following:
  - Current market conditions for the specified stock.
  - The user's risk tolerance (conservative, moderate, or aggressive).
  - Potential profit and loss scenarios for the suggested strategy.

  Output your suggestion in a clear, concise manner.
  `,
  tools: ['webSearch'],
});

const suggestOptionStrategyFlow = ai.defineFlow(
  {
    name: 'suggestOptionStrategyFlow',
    inputSchema: SuggestOptionStrategyInputSchema,
    outputSchema: SuggestOptionStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
