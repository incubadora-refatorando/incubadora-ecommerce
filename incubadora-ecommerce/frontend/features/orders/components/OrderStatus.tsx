import { Badge } from '@/shared/components/ui/badge';

interface OrderStatusProps {
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
}

export function OrderStatus({ status }: OrderStatusProps) {
  const statusConfig = {
    pending: { label: 'Pendente', variant: 'secondary' as const },
    paid: { label: 'Pago', variant: 'default' as const },
    shipped: { label: 'Enviado', variant: 'default' as const },
    delivered: { label: 'Entregue', variant: 'default' as const },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
