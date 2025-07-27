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
  output: { format: 'text' },
  prompt: `Translate the string value of each key-value pair in the provided JSON object into {{targetLanguage}}.

You MUST return a valid JSON object. The returned object must have the exact same keys as the input object. The values should be the translated strings.

Do not translate the keys, only the values.

Input JSON:
{{{json texts}}}
`,
  model: 'googleai/gemini-1.5-flash',
  config: {
      temperature: 0.1,
  }
});

const translateBatchFlow = ai.defineFlow(
  {
    name: 'translateBatchFlow',
    inputSchema: TranslateBatchInputSchema,
    outputSchema: TranslateBatchOutputSchema,
  },
  async (input) => {
    const llmResponse = await prompt(input);
    const rawText = llmResponse.text;

    try {
      // Sometimes the model returns the JSON wrapped in ```json ... ```
      const jsonRegex = /```json\n([\s\S]*?)\n```/;
      const match = rawText.match(jsonRegex);
      if (match && match[1]) {
        return JSON.parse(match[1]);
      }
      // Otherwise, assume the raw text is the JSON
      return JSON.parse(rawText);
    } catch (e) {
      console.error("Failed to parse translation JSON:", e, "Raw text was:", rawText);
      // If parsing fails, return an empty object or handle error appropriately
      return {}; 
    }
  }
);
