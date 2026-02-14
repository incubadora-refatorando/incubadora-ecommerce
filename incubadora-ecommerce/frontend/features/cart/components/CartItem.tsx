'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { CartItemWithProduct } from '../types';
import { useCartStore } from '../store';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemWithProduct;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.product.stock) {
      toast.error(`Only ${item.product.stock} items available in stock`);
      return;
    }

    try {
      await updateQuantity(item.id, newQuantity);
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const handleRemove = async () => {
    try {
      await removeItem(item.id);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-border">
      {/* Product Image */}
      <Link href={`/products/${item.product.id}`} className="relative w-24 h-24 flex-shrink-0 bg-gray-light rounded-lg overflow-hidden">
        {item.product.image_url ? (
          <Image
            src={item.product.image_url}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-medium text-xs">
            No Image
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${item.product.id}`}
            className="font-semibold text-gray-dark hover:text-primary transition"
          >
            {item.product.name}
          </Link>
          {item.product.description && (
            <p className="text-sm text-gray-medium line-clamp-1 mt-1">
              {item.product.description}
            </p>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-4 py-1 text-sm font-medium border-x border-border min-w-[3rem] text-center">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {item.product.stock < 5 && item.product.stock > 0 && (
            <span className="text-xs text-orange-500">
              Only {item.product.stock} left
            </span>
          )}
        </div>
      </div>

      {/* Price and Remove */}
      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleRemove}
          className="text-gray-medium hover:text-error"
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        <div className="text-right">
          <div className="font-bold text-lg text-gray-dark">
            {formatPrice(item.subtotal)}
          </div>
          <div className="text-xs text-gray-medium">
            {formatPrice(item.product.price)} each
          </div>
        </div>
      </div>
    </div>
  );
}
