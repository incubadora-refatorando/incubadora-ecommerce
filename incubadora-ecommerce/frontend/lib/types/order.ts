export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  customer_email: string;
  shipping_address: string;
  payment_status: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export interface CreateOrderRequest {
  customer_email: string;
  shipping_address: string;
  items: {
    product_id: number;
    quantity: number;
  }[];
}
