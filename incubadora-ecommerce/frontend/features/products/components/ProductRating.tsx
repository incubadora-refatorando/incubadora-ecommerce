import { Star } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface ProductRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ProductRating({ rating, count, size = 'md' }: ProductRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizeClasses[size],
            star <= Math.round(rating)
              ? 'fill-price-highlight text-price-highlight'
              : 'fill-gray-light text-gray-light'
          )}
        />
      ))}
      {count !== undefined && (
        <span className="text-sm text-gray-medium ml-1">({count})</span>
      )}
    </div>
  );
}
