import type { Order, Customer } from "@/types";

export const customers: Customer[] = [
  { id: 'CUST001', name: 'Rohan Sharma', email: 'rohan.sharma@example.com', phone: '9876543210', orderCount: 5, isPremium: false, measurements: { 'Chest': 40, 'Waist': 34, 'Sleeve': 25, 'Neck': 15.5 } },
  { id: 'CUST002', name: 'Priya Patel', email: 'priya.patel@example.com', phone: '9876543211', orderCount: 8, isPremium: true, measurements: { 'Bust': 36, 'Waist': 28, 'Hips': 38, 'Blouse Length': 14 } },
  { id: 'CUST003', name: 'Amit Singh', email: 'amit.singh@example.com', phone: '9876543212', orderCount: 2, isPremium: false, measurements: { 'Waist': 36, 'Inseam': 32, 'Thigh': 24 } },
  { id: 'CUST004', name: 'Sneha Reddy', email: 'sneha.reddy@example.com', phone: '9876543213', orderCount: 12, isPremium: true, measurements: { 'Chest': 34, 'Waist': 26, 'Hips': 36, 'Gown Length': 58 } },
  { id: 'CUST005', name: 'Vikram Mehta', email: 'vikram.mehta@example.com', phone: '9876543214', orderCount: 1, isPremium: false, measurements: { 'Chest': 42, 'Shoulder': 18, 'Sherwani Length': 45 } },
];

export const orders: Order[] = [
  { id: "ORD001", customerName: "Rohan Sharma", dueDate: "2024-08-15", status: "In Progress", total: 1500, isPremium: false, notes: "Wants a slim fit shirt with a classic collar." },
  { id: "ORD002", customerName: "Priya Patel", dueDate: "2024-08-12", status: "Ready", total: 2500, isPremium: true, notes: "Designer blouse. Requested extra embroidery on the sleeves. Paid extra for priority." },
  { id: "ORD003", customerName: "Amit Singh", dueDate: "2024-08-10", status: "Delivered", total: 800, isPremium: false, notes: "Standard formal pants, no alterations needed." },
  { id: "ORD004", customerName: "Sneha Reddy", dueDate: "2024-08-20", status: "Pending", total: 3200, isPremium: true, notes: "Anarkali suit for a wedding. Needs it by the 18th if possible. Wants a specific shade of red fabric. Paid extra for priority." },
  { id: "ORD005", customerName: "Vikram Mehta", dueDate: "2024-08-25", status: "In Progress", total: 4500, isPremium: false, notes: "Classic Sherwani. Customer is very particular about the button style." },
];
