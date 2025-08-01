
"use client";

import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { customers, orders } from "@/lib/data";
import { useLanguage } from "@/contexts/language-context";
import { MessageSquare, Phone, Star } from "lucide-react";
import type { Order } from "@/types";

const statusVariantMap: Record<Order['status'], 'secondary' | 'default' | 'outline'> = {
    'Pending': 'secondary',
    'In Progress': 'default',
    'Ready': 'outline',
    'Delivered': 'default'
};
const statusColorMap: Record<Order['status'], string> = {
  'Pending': 'bg-muted text-muted-foreground',
  'In Progress': 'bg-primary/20 text-primary',
  'Ready': 'bg-accent/20 text-accent-foreground',
  'Delivered': 'bg-green-500/20 text-green-700 dark:text-green-400'
}

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage();
  const customer = customers.find((c) => c.id === params.id);
  const customerOrders = orders.filter((o) => o.customerName === customer?.name);

  if (!customer) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
             <Avatar className="h-16 w-16">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${customer.name}`} alt={customer.name} />
                <AvatarFallback>{customer.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl flex items-center gap-2 text-rainbow-animation">
                {customer.name}
                {customer.isPremium && <Star className="h-5 w-5 text-amber-500 fill-amber-500" />}
              </CardTitle>
              <CardDescription>{customer.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">{t('Contact Information')}</h3>
            <div className="flex flex-col space-y-2">
                <a href={`tel:${customer.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phone}</span>
                </a>
                <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {t('Send Message')}
                    </Button>
                    <Button size="sm">
                        <Phone className="mr-2 h-4 w-4" />
                        {t('Call')}
                    </Button>
                </div>
            </div>
          </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="text-rainbow-animation">{t('Body Measurements')}</CardTitle>
            </CardHeader>
            <CardContent>
                {customer.measurements ? (
                    <ul className="space-y-2 text-sm">
                        {Object.entries(customer.measurements).map(([key, value]) => (
                            <li key={key} className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">{t(key, key)}</span>
                                <span className="font-medium">{value} {t('inches')}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center text-muted-foreground py-4">
                        <p>{t('No measurements on file.')}</p>
                        <p className="text-xs">{t('Add measurements using the AI Assistant.')}</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-rainbow-animation">{t('Order History')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('Order ID')}</TableHead>
                  <TableHead>{t('Due Date')}</TableHead>
                  <TableHead>{t('Status')}</TableHead>
                  <TableHead className="text-right">{t('Total')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.dueDate}</TableCell>
                    <TableCell>
                        <Badge className={statusColorMap[order.status]} variant={statusVariantMap[order.status]}>{t(order.status)}</Badge>
                    </TableCell>
                    <TableCell className="text-right">₹{order.total.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
