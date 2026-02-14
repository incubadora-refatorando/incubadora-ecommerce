'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { OrderWithItems } from '@/features/orders/types';
import { OrderStatus } from '@/features/orders/components/OrderStatus';
import apiClient from '@/shared/lib/api-client';
import { toast } from 'sonner';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiClient.get<OrderWithItems>(`/orders/${params.id}`);
        setOrder(response.data);
      } catch (error) {
        toast.error('Pedido não encontrado');
        router.push('/orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [params.id, router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 w-48 bg-gray-light rounded animate-pulse mb-8" />
          <div className="h-96 bg-gray-light rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar aos Pedidos
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-dark">
              Pedido #{order.id}
            </h1>
            <p className="text-gray-medium mt-2">
              Realizado em {formatDate(order.created_at)}
            </p>
          </div>
          <OrderStatus status={order.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Details */}
          <Card className="md:col-span-2 p-6">
            <h2 className="text-xl font-semibold text-gray-dark mb-4">
              Itens do Pedido
            </h2>

            <div className="space-y-4">
              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-4 border border-border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-dark">
                        Produto ID: {item.product_id}
                      </p>
                      <p className="text-sm text-gray-medium">
                        Quantidade: {item.quantity} × {formatPrice(item.unit_price)}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-dark">
                      {formatPrice(item.subtotal)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-medium">Nenhum item neste pedido</p>
              )}
            </div>
          </Card>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-dark mb-4">Resumo</h3>
              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-medium">Valor Total</span>
                  <span className="font-semibold text-gray-dark">
                    {formatPrice(order.total_amount)}
                  </span>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-medium">Status do Pagamento</span>
                  <span className={order.payment_status ? 'text-green-600' : 'text-orange-500'}>
                    {order.payment_status ? 'Pago' : 'Pendente'}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-dark mb-4">
                Endereço de Entrega
              </h3>
              <p className="text-sm text-gray-medium">
                {order.shipping_address}
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-dark mb-4">
                Email do Cliente
              </h3>
              <p className="text-sm text-gray-medium">
                {order.customer_email}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
