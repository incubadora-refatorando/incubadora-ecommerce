import { Product } from '@/features/products/types';

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: Date | string;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
  subtotal: number;
}

export interface CartResponse {
  cartItems: CartItemWithProduct[];
  total: number;
}

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}

export interface UpdateCartRequest {
  quantity: number;
}
