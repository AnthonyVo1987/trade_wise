// Stock Technical Analysis Flow
'use server';

/**
 * @fileOverview Technical analysis flow for stocks.
 *
 * - analyzeStockTechnicals - A function that performs technical analysis of a stock.
 * - AnalyzeStockTechnicalsInput - The input type for the analyzeStockTechnicals function.
 * - AnalyzeStockTechnicalsOutput - The return type for the analyzeStockTechnicals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeStockTechnicalsInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock to analyze.'),
});
export type AnalyzeStockTechnicalsInput = z.infer<typeof AnalyzeStockTechnicalsInputSchema>;

const AnalyzeStockTechnicalsOutputSchema = z.object({
  analysis: z.string().describe('A detailed technical analysis of the stock, including recent price action, key indicators, and short-term trading potential.'),
});
export type AnalyzeStockTechnicalsOutput = z.infer<typeof AnalyzeStockTechnicalsOutputSchema>;

export async function analyzeStockTechnicals(input: AnalyzeStockTechnicalsInput): Promise<AnalyzeStockTechnicalsOutput> {
  return analyzeStockTechnicalsFlow(input);
}

const webSearch = ai.defineTool(
  {
    name: 'webSearch',
    description: 'Performs a web search and returns the results.',
    inputSchema: z.object({
      query: z.string().describe('The search query.'),
    }),
    outputSchema: z.string(),
  },
  async input => {
    // Dummy implementation, replace with actual web search logic
    console.log('Performing web search with query:', input.query);
    return `Web search results for ${input.query}:  [PLACEHOLDER - Implement web search here]`;
  }
);

const analyzeStockTechnicalsPrompt = ai.definePrompt({
  name: 'analyzeStockTechnicalsPrompt',
  input: {schema: AnalyzeStockTechnicalsInputSchema},
  output: {schema: AnalyzeStockTechnicalsOutputSchema},
  tools: [webSearch],
  prompt: `You are a Stock Trading Expert.  A user has asked for a technical analysis of the stock with ticker symbol {{{ticker}}}.  

To provide the best possible analysis, you *MUST* use the webSearch tool to get the latest information about the stock's price action, key indicators, and any recent news or developments that could affect its short-term trading potential.  Ground your analysis in the current real-world date and time.

After using the webSearch tool, provide a detailed technical analysis of the stock, including:

*   Recent price action
*   Key indicators (e.g., moving averages, RSI, MACD)
*   Assessment of its short-term trading potential
`,
});

const analyzeStockTechnicalsFlow = ai.defineFlow(
  {
    name: 'analyzeStockTechnicalsFlow',
    inputSchema: AnalyzeStockTechnicalsInputSchema,
    outputSchema: AnalyzeStockTechnicalsOutputSchema,
  },
  async input => {
    const {output} = await analyzeStockTechnicalsPrompt(input);
    return output!;
  }
);
