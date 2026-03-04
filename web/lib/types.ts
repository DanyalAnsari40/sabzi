// Core Business Types

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
  company?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  isFeatured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  categoryId: string;
  price: number;
  unit: string; // e.g., "kg", "L", "box"
  minOrderQuantity: number;
  stock: number;
  image: string;
  sku: string;
  certifications: string[];
  origin: string;
  shelf_life_days: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RFQItem {
  productId: string;
  quantity: number;
  unit: string;
}

export interface RequestForQuote {
  id: string;
  userId: string;
  user?: User;
  items: RFQItem[];
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  status: "pending" | "reviewed" | "quoted" | "completed";
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quote {
  id: string;
  rfqId: string;
  rfq?: RequestForQuote;
  items: QuoteItem[];
  totalPrice: number;
  validUntil: Date;
  status: "pending" | "sent" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

export interface QuoteItem {
  productId: string;
  product?: Product;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
  updatedAt: Date;
}

export interface Dashboard {
  totalProducts: number;
  totalCategories: number;
  pendingRFQs: number;
  pendingQuotes: number;
  monthlyRevenue: number;
  totalOrders: number;
}
