'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useCartStore } from '@/features/cart/store';
import { CartItem } from '@/features/cart/components/CartItem';
import { CartSummary } from '@/features/cart/components/CartSummary';

export default function CartPage() {
  const { items, total, isLoading, fetchCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleCheckout = () => {
    // TODO: Open checkout modal
    setIsCheckingOut(true);
    console.log('Checkout clicked - Modal will be implemented next');
    setTimeout(() => setIsCheckingOut(false), 1000);
  };

  if (isLoading && items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-light rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-light flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-medium" />
          </div>
          <h1 className="text-2xl font-bold text-gray-dark mb-3">Your cart is empty</h1>
          <p className="text-gray-medium mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/products">
            <Button size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-dark mb-2">Shopping Cart</h1>
          <p className="text-gray-medium">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Continue Shopping Link */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary hover:underline mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={total}
              onCheckout={handleCheckout}
              isLoading={isCheckingOut}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
