'use server';

/**
 * @fileOverview This flow allows users to ask the Market News Reporter persona for a summary of the latest market news on a specific stock.
 *
 * - marketNewsSummary - A function that takes a stock ticker and returns a summary of recent news.
 * - MarketNewsSummaryInput - The input type for the marketNewsSummary function.
 * - MarketNewsSummaryOutput - The return type for the marketNewsSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketNewsSummaryInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock to summarize news for.'),
});
export type MarketNewsSummaryInput = z.infer<typeof MarketNewsSummaryInputSchema>;

const MarketNewsSummaryOutputSchema = z.object({
  newsSummary: z.string().describe('A summary of the latest market news for the given stock ticker.'),
});
export type MarketNewsSummaryOutput = z.infer<typeof MarketNewsSummaryOutputSchema>;

export async function marketNewsSummary(input: MarketNewsSummaryInput): Promise<MarketNewsSummaryOutput> {
  return marketNewsSummaryFlow(input);
}

const marketNewsSummaryPrompt = ai.definePrompt({
  name: 'marketNewsSummaryPrompt',
  input: {schema: MarketNewsSummaryInputSchema},
  output: {schema: MarketNewsSummaryOutputSchema},
  prompt: `You are the Market News Reporter, an AI persona specialized in providing summaries of the latest market news for specific stocks.

  A user is asking for a market news summary on the stock with ticker: {{{ticker}}}.

  First, you MUST use the web search tool to search for the latest news regarding this stock.
  Pay close attention to the current real-world date and time, and ground all responses based on the latest information to prevent outdated data.

  Then, provide a concise summary of the most relevant and recent market news for the stock. Focus on events that could impact the stock's price or investor sentiment.
`,
  tools: ['webSearch'],
});

const marketNewsSummaryFlow = ai.defineFlow(
  {
    name: 'marketNewsSummaryFlow',
    inputSchema: MarketNewsSummaryInputSchema,
    outputSchema: MarketNewsSummaryOutputSchema,
  },
  async input => {
    const {output} = await marketNewsSummaryPrompt(input);
    return output!;
  }
);
