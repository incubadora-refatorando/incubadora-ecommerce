import Link from 'next/link';
import { Card } from '@/shared/components/ui/card';
import { Order } from '../types';
import { OrderStatus } from './OrderStatus';
import { Button } from '@/shared/components/ui/button';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-dark">
            Pedido #{order.id}
          </h3>
          <p className="text-sm text-gray-medium mt-1">
            {formatDate(order.created_at)}
          </p>
        </div>
        <OrderStatus status={order.status} />
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">Valor Total</span>
          <span className="font-semibold text-gray-dark">
            {formatPrice(order.total_amount)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">Email</span>
          <span className="text-gray-dark">{order.customer_email}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Link href={`/orders/${order.id}`}>
          <Button variant="outline" className="w-full">
            Ver Detalhes
          </Button>
        </Link>
      </div>
    </Card>
  );
}
