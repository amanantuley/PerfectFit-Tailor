'use server';
/**
 * @fileOverview An AI flow to suggest garment measurement adjustments.
 *
 * - suggestMeasurementAdjustments - A function that provides fitting recommendations.
 * - SuggestMeasurementAdjustmentsInput - The input type for the function.
 * - SuggestMeasurementAdjustmentsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestMeasurementAdjustmentsInputSchema = z.object({
  garmentType: z.string().describe('The type of garment (e.g., Shirt, Pants, Jacket).'),
  desiredFit: z.string().describe('The desired fit (e.g., Slim, Regular, Loose).'),
  measurements: z.record(z.number()).describe('A map of body measurements in inches (e.g., { "Chest": 38, "Waist": 32 }).'),
  referenceImage: z.string().optional().describe(
    "An optional reference photo as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
export type SuggestMeasurementAdjustmentsInput = z.infer<typeof SuggestMeasurementAdjustmentsInputSchema>;

const SuggestMeasurementAdjustmentsOutputSchema = z.object({
  suggestedAdjustments: z.record(z.string()).describe('A map of suggested adjustments, with the measurement name as the key and the adjustment as the value (e.g., { "Sleeve Length": "+0.5 inches" }).'),
  reasoning: z.string().describe('A detailed explanation for the suggested adjustments.'),
});
export type SuggestMeasurementAdjustmentsOutput = z.infer<typeof SuggestMeasurementAdjustmentsOutputSchema>;

export async function suggestMeasurementAdjustments(input: SuggestMeasurementAdjustmentsInput): Promise<SuggestMeasurementAdjustmentsOutput> {
  return suggestMeasurementAdjustmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMeasurementAdjustmentsPrompt',
  input: { schema: SuggestMeasurementAdjustmentsInputSchema },
  output: { schema: SuggestMeasurementAdjustmentsOutputSchema },
  prompt: `You are an expert master tailor with decades of experience in creating bespoke clothing. A user will provide you with their measurements, the type of garment they want, and their desired fit. They may also provide a reference image.

Your task is to analyze this information and provide specific, actionable adjustments to standard patterns to achieve the perfect fit. Your suggestions should be precise (e.g., "+1.5 inches", "-0.75 inches").

You must also provide a clear, concise reasoning for your suggestions, explaining why each adjustment is necessary based on the provided data.

Garment Type: {{{garmentType}}}
Desired Fit: {{{desiredFit}}}

Measurements (in inches):
{{#each measurements}}
- {{ @key }}: {{ this }}
{{/each}}

{{#if referenceImage}}
Reference Image:
{{media url=referenceImage}}
{{/if}}

Please provide your expert analysis.`,
});

const suggestMeasurementAdjustmentsFlow = ai.defineFlow(
  {
    name: 'suggestMeasurementAdjustmentsFlow',
    inputSchema: SuggestMeasurementAdjustmentsInputSchema,
    outputSchema: SuggestMeasurementAdjustmentsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
