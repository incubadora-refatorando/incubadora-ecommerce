'use client';

import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { Order } from '@/features/orders/types';
import { OrderCard } from '@/features/orders/components/OrderCard';
import apiClient from '@/shared/lib/api-client';
import { toast } from 'sonner';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get<Order[]>('/orders');
        setOrders(response.data);
      } catch (error) {
        toast.error('Erro ao carregar pedidos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-light rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-light flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-medium" />
          </div>
          <h1 className="text-2xl font-bold text-gray-dark mb-3">Nenhum pedido ainda</h1>
          <p className="text-gray-medium">
            Você ainda não realizou nenhum pedido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-dark mb-8">Meus Pedidos</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
