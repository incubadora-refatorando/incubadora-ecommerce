'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Product } from '../types';
import { ProductRating } from './ProductRating';
import { useCartStore } from '@/features/cart/store';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await addItem(product.id, 1);
      toast.success('Product added to cart!');
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative aspect-square bg-gray-light">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-medium">
              No Image
            </div>
          )}
          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-light transition">
            <Heart className="w-4 h-4 text-gray-dark" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-gray-dark group-hover:text-primary transition truncate">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-sm text-gray-medium line-clamp-2">
              {product.description}
            </p>
          )}

          <ProductRating rating={4.5} count={121} />

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-dark">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="w-full mt-2"
          >
            Add to Cart
          </Button>

          {product.stock === 0 && (
            <span className="text-xs text-error">Out of stock</span>
          )}
        </div>
      </Card>
    </Link>
  );
}
