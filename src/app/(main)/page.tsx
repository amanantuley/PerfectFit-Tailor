"use client";

import { DollarSign, ShoppingBag, Users, CalendarClock } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { useLanguage } from "@/contexts/language-context";

export default function DashboardPage() {
  const { t } = useLanguage();

  const statCards = [
    {
      icon: DollarSign,
      title: t("Today's Earnings"),
      value: "₹8,520",
      description: t("+20.1% from last month"),
    },
    {
      icon: ShoppingBag,
      title: t("Orders this Week"),
      value: "+12",
      description: t("5 pending, 7 in progress"),
    },
    {
      icon: Users,
      title: t("New Customers"),
      value: "+3",
      description: t("Added this month"),
    },
    {
      icon: CalendarClock,
      title: t("Upcoming Fittings"),
      value: "4",
      description: t("Scheduled for today"),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <EarningsChart />
        </div>
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}
