import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Card } from '@/shared/components/ui/card';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  columns?: 2 | 3 | 4;
}

function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-gray-light animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-light animate-pulse rounded" />
        <div className="h-4 bg-gray-light animate-pulse rounded w-2/3" />
        <div className="h-4 bg-gray-light animate-pulse rounded w-1/3" />
        <div className="h-10 bg-gray-light animate-pulse rounded" />
      </div>
    </Card>
  );
}

export function ProductGrid({
  products,
  isLoading = false,
  columns = 4,
}: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  if (isLoading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-medium text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
