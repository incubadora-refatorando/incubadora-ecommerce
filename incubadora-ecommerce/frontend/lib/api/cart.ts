import apiClient from './client';
import {
  CartResponse,
  CartItem,
  AddToCartRequest,
  UpdateCartRequest,
} from '@/lib/types';

export const cartApi = {
  get: () => apiClient.get<CartResponse>('/cart'),

  add: (data: AddToCartRequest) => apiClient.post<CartItem>('/cart/add', data),

  update: (cartItemId: number, data: UpdateCartRequest) =>
    apiClient.put<CartItem>(`/cart/${cartItemId}`, data),

  remove: (cartItemId: number) => apiClient.delete(`/cart/${cartItemId}`),
};
