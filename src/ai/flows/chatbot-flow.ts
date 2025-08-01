'use server';
/**
 * @fileOverview A chatbot AI agent for the PerfectFit-Tailors platform.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { orders, customers } from '@/lib/data';
import { Message } from 'genkit';

const ChatInputSchema = z.object({
  query: z.string(),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;
export type ChatOutput = string;

const getOrderDetails = ai.defineTool(
  {
    name: 'getOrderDetails',
    description: 'Get details for a specific order using its Order ID (e.g., ORD001).',
    inputSchema: z.object({
      orderId: z.string().describe('The ID of the order to look up.'),
    }),
    outputSchema: z.string(),
  },
  async ({ orderId }) => {
    const order = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
    if (!order) {
      return `Order with ID ${orderId} not found.`;
    }
    const customer = customers.find(c => c.name === order.customerName);
    return JSON.stringify({ ...order, customer });
  }
);

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  tools: [getOrderDetails],
  system: `You are a helpful AI assistant for the 'PerfectFit-Tailors' web application. Your name is 'FitBot'.
You are embedded as a chatbot on the website.
Your purpose is to assist tailors by providing information about the platform's features, customer data, and specific order details.
Be concise and helpful in your responses.
You can access order information using the 'getOrderDetails' tool. If a user asks about an order, encourage them to provide the Order ID.
Do not make up information you don't have access to.

Platform Features:
- Dashboard: Overview of earnings, orders, and customers.
- Customers: Manage customer list, view their history. Premium customers are marked with a star.
- Orders: Track all orders, view their status (Pending, In Progress, Ready, Delivered). Premium customer orders are prioritized.
- Designs: A catalog of clothing designs.
- Reports: View earnings charts and other business reports.
- Charges: Manage service charges.
- Profile & Settings: Manage user profile and store settings.

When asked about a specific order, use the getOrderDetails tool and summarize the information clearly for the tailor, paying special attention to any notes about customer preferences.`,
});

export async function chat(input: ChatInput): Promise<ChatOutput> {
  const { query, history = [] } = input;
  
  const messages = history.map(h => new Message({
      role: h.role,
      content: [{text: h.content}],
  }));
  messages.push(new Message({
      role: 'user',
      content: [{text: query}],
  }));

  const llmResponse = await ai.generate({
    prompt: query,
    history: messages.slice(0, -1), // History is all but the last message
    model: prompt.model,
    tools: [getOrderDetails],
    config: {
      system: prompt.config?.system
    }
  });

  return llmResponse.text;
}
