import type { Order, Customer } from "@/types";

export const customers: Customer[] = [
  { id: 'CUST001', name: 'Rohan Sharma', email: 'rohan.sharma@example.com', phone: '9876543210', orderCount: 5, isPremium: false },
  { id: 'CUST002', name: 'Priya Patel', email: 'priya.patel@example.com', phone: '9876543211', orderCount: 8, isPremium: true },
  { id: 'CUST003', name: 'Amit Singh', email: 'amit.singh@example.com', phone: '9876543212', orderCount: 2, isPremium: false },
  { id: 'CUST004', name: 'Sneha Reddy', email: 'sneha.reddy@example.com', phone: '9876543213', orderCount: 12, isPremium: true },
  { id: 'CUST005', name: 'Vikram Mehta', email: 'vikram.mehta@example.com', phone: '9876543214', orderCount: 1, isPremium: false },
];

export const orders: Order[] = [
  { id: "ORD001", customerName: "Rohan Sharma", dueDate: "2024-08-15", status: "In Progress", total: 1500, isPremium: false, notes: "Wants a slim fit shirt with a classic collar." },
  { id: "ORD002", customerName: "Priya Patel", dueDate: "2024-08-12", status: "Ready", total: 2500, isPremium: true, notes: "Designer blouse. Requested extra embroidery on the sleeves." },
  { id: "ORD003", customerName: "Amit Singh", dueDate: "2024-08-10", status: "Delivered", total: 800, isPremium: false, notes: "Standard formal pants, no alterations needed." },
  { id: "ORD004", customerName: "Sneha Reddy", dueDate: "2024-08-20", status: "Pending", total: 3200, isPremium: true, notes: "Anarkali suit for a wedding. Needs it by the 18th if possible. Wants a specific shade of red fabric." },
  { id: "ORD005", customerName: "Vikram Mehta", dueDate: "2024-08-25", status: "In Progress", total: 4500, isPremium: false, notes: "Classic Sherwani. Customer is very particular about the button style." },
];
