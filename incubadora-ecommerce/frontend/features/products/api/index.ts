import apiClient from '@/shared/lib/api-client';
import { Product } from '../types';

export const productsApi = {
  getAll: () => apiClient.get<Product[]>('/products'),

  getById: (id: number) => apiClient.get<Product>(`/products/${id}`),
};
