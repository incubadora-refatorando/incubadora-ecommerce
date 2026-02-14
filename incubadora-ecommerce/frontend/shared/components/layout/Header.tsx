'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Phone } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';
import { Input } from '@/shared/components/ui/input';
import { useCartStore } from '@/features/cart/store';
import { useAuthStore } from '@/features/auth/store';
import { useUIStore } from '@/shared/store/uiStore';
import { useEffect } from 'react';

export function Header() {
  const { itemCount, fetchCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const { searchQuery, setSearchQuery } = useUIStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  return (
    <header className="w-full">
      {/* Top Banner */}
      <div className="bg-primary text-white text-sm py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              +55 11 1234-5678
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>🔥 Get 50% Off on Selected Items</span>
            <Link href="/products" className="font-semibold hover:underline">
              Shop Now
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span>Eng</span>
            <span>|</span>
            <span>Location</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-border py-4 px-4">
        <div className="container mx-auto flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <ShoppingCart className="w-8 h-8 text-primary" />
            <span>Shopcart</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-gray-dark hover:text-primary transition">
              Categories
            </Link>
            <Link href="/products" className="text-gray-dark hover:text-primary transition">
              Deals
            </Link>
            <Link href="/products" className="text-gray-dark hover:text-primary transition">
              What's New
            </Link>
            <Link href="/products" className="text-gray-dark hover:text-primary transition">
              Delivery
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <Input
              type="text"
              placeholder="Search Products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-medium" />
          </div>

          {/* Account & Cart */}
          <div className="flex items-center gap-6">
            <Link
              href={isAuthenticated ? '/orders' : '/login'}
              className="flex items-center gap-2 text-gray-dark hover:text-primary transition"
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:inline">Account</span>
            </Link>

            <Link href="/cart" className="relative flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-gray-dark hover:text-primary transition" />
              {itemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
              <span className="hidden lg:inline text-gray-dark">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
