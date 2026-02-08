export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  role: 'client' | 'admin';
  created_at: Date;
  updated_at: Date;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string | null;
  role: 'client' | 'admin';
  created_at: Date;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: 'client' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

// Orders
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered';

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: OrderStatus;
  customer_email: string;
  shipping_address: string;
  payment_status: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface OrderItemInput {
  product_id: number;
  quantity: number;
}

export interface CreateOrderRequest {
  customer_email: string;
  shipping_address: string;
  items: OrderItemInput[];
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}
