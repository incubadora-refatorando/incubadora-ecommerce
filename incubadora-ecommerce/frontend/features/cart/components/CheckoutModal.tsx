'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card } from '@/shared/components/ui/card';
import { checkoutSchema, CheckoutFormData } from '@/features/orders/schemas';
import apiClient from '@/shared/lib/api-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const { clearCart, fetchCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      const response = await apiClient.post('/orders', {
        customer_email: data.customerEmail,
        shipping_address: data.shippingAddress,
      });

      toast.success('Pedido criado com sucesso!');
      clearCart();
      await fetchCart();
      reset();
      onClose();
      router.push(`/orders/${response.data.id}`);
    } catch (error) {
      toast.error('Erro ao criar pedido');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-dark">Finalizar Compra</h2>
          <button
            onClick={onClose}
            className="text-gray-medium hover:text-gray-dark transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-dark mb-2">
              Email
            </label>
            <Input
              id="customerEmail"
              type="email"
              {...register('customerEmail')}
              placeholder="seu@email.com"
            />
            {errors.customerEmail && (
              <p className="text-sm text-error mt-1">{errors.customerEmail.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-dark mb-2">
              Endereço de Entrega
            </label>
            <Input
              id="shippingAddress"
              {...register('shippingAddress')}
              placeholder="Rua, Número, Bairro, Cidade, Estado, CEP"
            />
            {errors.shippingAddress && (
              <p className="text-sm text-error mt-1">{errors.shippingAddress.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Criando Pedido...' : 'Finalizar Pedido'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
