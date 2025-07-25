"use client";

import { DollarSign, ShoppingBag, Users, CalendarClock } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex flex-col gap-6">
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {statCards.map((card, index) => (
          <motion.div key={index} variants={itemVariants}>
            <StatCard {...card} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="lg:col-span-3" variants={itemVariants}>
          <EarningsChart />
        </motion.div>
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <RecentOrders />
        </motion.div>
      </motion.div>
    </div>
  );
}