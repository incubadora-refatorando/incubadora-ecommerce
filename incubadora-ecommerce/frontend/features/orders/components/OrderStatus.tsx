import { Badge } from '@/shared/components/ui/badge';

interface OrderStatusProps {
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
}

export function OrderStatus({ status }: OrderStatusProps) {
  const statusConfig = {
    pending: { label: 'Pending', variant: 'secondary' as const },
    paid: { label: 'Paid', variant: 'default' as const },
    shipped: { label: 'Shipped', variant: 'default' as const },
    delivered: { label: 'Delivered', variant: 'default' as const },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
