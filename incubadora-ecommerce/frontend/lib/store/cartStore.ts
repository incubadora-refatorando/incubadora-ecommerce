import { create } from 'zustand';
import { CartItemWithProduct, CartResponse } from '@/lib/types';
import apiClient from '@/lib/api/client';

interface CartState {
  items: CartItemWithProduct[];
  total: number;
  itemCount: number;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get<CartResponse>('/cart');
      const { cartItems, total } = response.data;
      const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      set({ items: cartItems, total, itemCount, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addItem: async (productId: number, quantity: number) => {
    try {
      await apiClient.post('/cart/add', {
        product_id: productId,
        quantity,
      });
      await get().fetchCart();
    } catch (error) {
      throw error;
    }
  },

  updateQuantity: async (cartItemId: number, quantity: number) => {
    try {
      await apiClient.put(`/cart/${cartItemId}`, { quantity });
      await get().fetchCart();
    } catch (error) {
      throw error;
    }
  },

  removeItem: async (cartItemId: number) => {
    try {
      await apiClient.delete(`/cart/${cartItemId}`);
      await get().fetchCart();
    } catch (error) {
      throw error;
    }
  },

  clearCart: () => {
    set({ items: [], total: 0, itemCount: 0 });
  },
}));
