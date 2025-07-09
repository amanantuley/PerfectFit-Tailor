'use server';
/**
 * @fileOverview An AI flow to translate a batch of text.
 *
 * - translateBatch - A function that translates a dictionary of strings.
 * - TranslateBatchInput - The input type for the function.
 * - TranslateBatchOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TranslateBatchInputSchema = z.object({
  texts: z.record(z.string()).describe('A JSON object where keys are stable identifiers and values are the English texts to be translated.'),
  targetLanguage: z.string().describe('The target language for translation (e.g., "Hindi", "Marathi").'),
});
export type TranslateBatchInput = z.infer<typeof TranslateBatchInputSchema>;

const TranslateBatchOutputSchema = z.record(z.string()).describe('A JSON object with the same keys as the input, but with the translated text as values.');
export type TranslateBatchOutput = z.infer<typeof TranslateBatchOutputSchema>;


export async function translateBatch(input: TranslateBatchInput): Promise<TranslateBatchOutput> {
  return translateBatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateBatchPrompt',
  input: { schema: TranslateBatchInputSchema },
  output: { schema: TranslateBatchOutputSchema },
  prompt: `Translate the string value of each key-value pair in the provided JSON object into {{targetLanguage}}.

You MUST return a valid JSON object. The returned object must have the exact same keys as the input object. The values should be the translated strings.

Do not translate the keys, only the values.

Input JSON:
{{{json texts}}}
`,
});

const translateBatchFlow = ai.defineFlow(
  {
    name: 'translateBatchFlow',
    inputSchema: TranslateBatchInputSchema,
    outputSchema: TranslateBatchOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
