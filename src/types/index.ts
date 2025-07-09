export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  isPremium: boolean;
};

export type Order = {
  id: string;
  customerName: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Ready' | 'Delivered';
  total: number;
  isPremium: boolean;
  notes?: string;
};

export type Design = {
  id: string;
  title: string;
  tags: string[];
  imageUrl: string;
};

export type StatCard = {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
};
