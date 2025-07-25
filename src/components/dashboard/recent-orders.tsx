"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/types";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const recentOrders: Order[] = [
  { id: "ORD002", customerName: "Priya Patel", dueDate: "2024-08-12", status: "Ready", total: 2500, isPremium: true },
  { id: "ORD004", customerName: "Sneha Reddy", dueDate: "2024-08-20", status: "Pending", total: 3200, isPremium: true },
  { id: "ORD001", customerName: "Rohan Sharma", dueDate: "2024-08-15", status: "In Progress", total: 1500, isPremium: false },
  { id: "ORD003", customerName: "Amit Singh", dueDate: "2024-08-10", status: "Delivered", total: 800, isPremium: false },
];

const statusVariantMap: Record<Order['status'], 'secondary' | 'default' | 'outline'> = {
    'Pending': 'secondary',
    'In Progress': 'default',
    'Ready': 'outline',
    'Delivered': 'default'
};

export function RecentOrders() {
  const { t } = useLanguage();
  
  const sortedOrders = [...recentOrders].sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Recent Orders')}</CardTitle>
        <CardDescription>{t('An overview of your most recent orders.')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Customer')}</TableHead>
              <TableHead>{t('Amount')}</TableHead>
              <TableHead>{t('Status')}</TableHead>
              <TableHead>{t('Due Date')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow key={order.id} className={order.isPremium ? 'bg-amber-100/50 dark:bg-amber-900/20' : ''}>
                <TableCell>
                  <div className="font-medium flex items-center gap-2">
                    {order.customerName}
                    {order.isPremium && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.id}
                  </div>
                </TableCell>
                <TableCell>₹{order.total.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[order.status]} className={order.status === 'Ready' ? 'bg-accent text-accent-foreground' : ''}>
                    {t(order.status)}
                  </Badge>
                </TableCell>
                <TableCell>{order.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
