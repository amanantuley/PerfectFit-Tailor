
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useLanguage } from "@/contexts/language-context";

const chartData = [
  { month: "January", earnings: 1860 },
  { month: "February", earnings: 3050 },
  { month: "March", earnings: 2370 },
  { month: "April", earnings: 730 },
  { month: "May", earnings: 2090 },
  { month: "June", earnings: 2140 },
];

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--chart-1))",
  },
};

export function EarningsChart() {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Earnings Overview')}</CardTitle>
        <CardDescription>{t('Your earnings over the last 6 months.')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-earnings)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-earnings)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => t(value, value)?.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="earnings"
              type="natural"
              fill="url(#colorEarnings)"
              stroke="var(--color-earnings)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
