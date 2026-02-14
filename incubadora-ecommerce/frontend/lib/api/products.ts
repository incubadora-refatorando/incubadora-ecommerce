import apiClient from './client';
import { Product } from '@/lib/types';

export const productsApi = {
  getAll: () => apiClient.get<Product[]>('/products'),

  getById: (id: number) => apiClient.get<Product>(`/products/${id}`),
};
