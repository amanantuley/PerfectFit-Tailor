"use client";

import { useState } from "react";
import { MoreHorizontal, PlusCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Order } from "@/types";
import { orders } from "@/lib/data";
import { useLanguage } from "@/contexts/language-context";

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


export default function OrdersPage() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  
  const sortedOrders = [...orders].sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('Orders')}</CardTitle>
            <CardDescription>{t('Manage all your customer orders. Premium orders are prioritized.')}</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {t('Add Order')}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('Add New Order')}</DialogTitle>
                <DialogDescription>
                  {t('Fill in the details for the new order.')}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer" className="text-right">{t('Customer')}</Label>
                  <Input id="customer" placeholder={t("Customer Name")} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">{t('Due Date')}</Label>
                  <Input id="dueDate" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="total" className="text-right">{t('Total (₹)')}</Label>
                  <Input id="total" type="number" placeholder="2000" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">{t('Status')}</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={t('Select status')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">{t('Pending')}</SelectItem>
                      <SelectItem value="in-progress">{t('In Progress')}</SelectItem>
                      <SelectItem value="ready">{t('Ready')}</SelectItem>
                      <SelectItem value="delivered">{t('Delivered')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>{t('Cancel')}</Button>
                <Button type="submit">{t('Save Order')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Order ID')}</TableHead>
              <TableHead>{t('Customer')}</TableHead>
              <TableHead>{t('Status')}</TableHead>
              <TableHead>{t('Due Date')}</TableHead>
              <TableHead className="text-right">{t('Total')}</TableHead>
              <TableHead><span className="sr-only">{t('Actions')}</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow key={order.id} className={order.isPremium ? 'bg-amber-100/50 dark:bg-amber-900/20' : ''}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {order.customerName}
                    {order.isPremium && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColorMap[order.status]} variant={statusVariantMap[order.status]}>{t(order.status)}</Badge>
                </TableCell>
                <TableCell>{order.dueDate}</TableCell>
                <TableCell className="text-right">₹{order.total.toLocaleString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t('Actions')}</DropdownMenuLabel>
                      <DropdownMenuItem>{t('View Details')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('Generate Invoice')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('Delete')}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
