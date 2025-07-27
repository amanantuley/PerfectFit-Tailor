import { LayoutDashboard, Users, ShoppingBag, PencilRuler, BarChart3, CircleDollarSign, Wand2, User } from 'lucide-react';

export type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  hidden?: boolean;
};

export const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/customers/[id]', label: 'Customer Details', icon: User, hidden: true },
  { href: '/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/designs', label: 'Designs', icon: PencilRuler },
  { href: '/assistant', label: 'AI Assistant', icon: Wand2 },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/charges', label: 'Charges', icon: CircleDollarSign },
];
