'use client';

import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';

interface CartSummaryProps {
  subtotal: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

export function CartSummary({ subtotal, onCheckout, isLoading = false }: CartSummaryProps) {
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <Card className="p-6 space-y-4 sticky top-4">
      <h2 className="text-xl font-bold text-gray-dark">Order Summary</h2>

      <div className="space-y-3 border-b border-border pb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">Subtotal</span>
          <span className="font-medium text-gray-dark">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">Shipping</span>
          {shipping === 0 ? (
            <span className="font-medium text-green-600">Free</span>
          ) : (
            <span className="font-medium text-gray-dark">{formatPrice(shipping)}</span>
          )}
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-medium">Tax (10%)</span>
          <span className="font-medium text-gray-dark">{formatPrice(tax)}</span>
        </div>
      </div>

      <div className="flex justify-between text-lg font-bold">
        <span className="text-gray-dark">Total</span>
        <span className="text-primary">{formatPrice(total)}</span>
      </div>

      {subtotal < 200 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            Add {formatPrice(200 - subtotal)} more to get free shipping!
          </p>
        </div>
      )}

      <Button
        onClick={onCheckout}
        disabled={isLoading || subtotal === 0}
        className="w-full"
        size="lg"
      >
        {isLoading ? 'Processing...' : 'Proceed to Checkout'}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-medium pt-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Secure Checkout</span>
      </div>
    </Card>
  );
}
