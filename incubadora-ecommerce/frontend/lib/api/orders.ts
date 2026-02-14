import apiClient from './client';
import { Order, OrderWithItems, CreateOrderRequest } from '@/lib/types';

export const ordersApi = {
  create: (data: CreateOrderRequest) => apiClient.post<Order>('/orders', data),

  getAll: () => apiClient.get<OrderWithItems[]>('/orders'),

  getById: (id: number) => apiClient.get<OrderWithItems>(`/orders/${id}`),

  pay: (id: number) => apiClient.post<Order>(`/orders/${id}/pay`),
};
