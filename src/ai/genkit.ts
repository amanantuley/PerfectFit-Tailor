import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {defineConfig} from 'genkit';
import { config } from 'dotenv';

config();

export const ai = genkit({
  plugins: [googleAI({apiVersion: 'v1beta'})],
});
