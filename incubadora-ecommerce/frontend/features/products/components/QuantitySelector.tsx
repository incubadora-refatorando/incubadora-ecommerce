'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
  min?: number;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  max = 99,
  min = 1,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center border border-border rounded-lg w-fit">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="rounded-r-none"
      >
        <Minus className="w-4 h-4" />
      </Button>

      <div className="px-6 py-2 text-sm font-medium border-x border-border min-w-[3rem] text-center">
        {quantity}
      </div>

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="rounded-l-none"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
