
"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { useLanguage } from "@/contexts/language-context";

const orderVolumeData = [
  { month: "Jan", orders: 32 },
  { month: "Feb", orders: 45 },
  { month: "Mar", orders: 38 },
  { month: "Apr", orders: 51 },
  { month: "May", orders: 42 },
  { month: "Jun", orders: 60 },
];

const orderVolumeConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-2))",
  },
};

export default function ReportsPage() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <EarningsChart />
      <Card>
        <CardHeader>
          <CardTitle>{t('Order Volume')}</CardTitle>
          <CardDescription>
            {t('Your total orders over the last 6 months.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={orderVolumeConfig} className="h-[200px] w-full">
            <BarChart data={orderVolumeData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
       <Card className="lg:col-span-2">
        <CardHeader>
            <CardTitle>{t('Popular Styles')}</CardTitle>
            <CardDescription>{t('Most frequently ordered designs.')}</CardDescription>
        </CardHeader>
        <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>{t('Classic Sherwani')} <span className="font-semibold text-foreground">(42 orders)</span></li>
                <li>{t('Formal Shirt')} <span className="font-semibold text-foreground">(35 orders)</span></li>
                <li>{t('Anarkali Suit')} <span className="font-semibold text-foreground">(28 orders)</span></li>
                <li>{t('Designer Blouse')} <span className="font-semibold text-foreground">(19 orders)</span></li>
                <li>{t('Straight-fit Pants')} <span className="font-semibold text-foreground">(15 orders)</span></li>
            </ol>
        </CardContent>
      </Card>
    </div>
  );
}
