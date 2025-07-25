"use client";

import { useState } from "react";
import Link from 'next/link';
import { MoreHorizontal, PlusCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { customers } from "@/lib/data";
import { useLanguage } from "@/contexts/language-context";

export default function CustomersPage() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t('Customers')}</CardTitle>
            <CardDescription>{t('Manage your customers and view their order history.')}</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {t('Add Customer')}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('Add New Customer')}</DialogTitle>
                <DialogDescription>
                  {t('Enter the details of the new customer.')}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">{t('Name')}</Label>
                  <Input id="name" placeholder={t("Customer's full name")} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">{t('Email')}</Label>
                  <Input id="email" type="email" placeholder={t("customer@example.com")} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">{t('Phone')}</Label>
                  <Input id="phone" type="tel" placeholder="9876543210" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>{t('Cancel')}</Button>
                <Button type="submit">{t('Save Customer')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Name')}</TableHead>
              <TableHead className="hidden sm:table-cell">{t('Contact')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('Orders')}</TableHead>
              <TableHead>
                <span className="sr-only">{t('Actions')}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {customer.name}
                    {customer.isPremium && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="text-sm">{customer.email}</div>
                  <div className="text-xs text-muted-foreground">{customer.phone}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{customer.orderCount}</TableCell>
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
                       <DropdownMenuItem asChild>
                        <Link href={`/customers/${customer.id}`}>{t('View Details')}</Link>
                      </DropdownMenuItem>
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
