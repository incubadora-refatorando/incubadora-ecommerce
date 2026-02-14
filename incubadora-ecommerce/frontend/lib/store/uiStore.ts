import { create } from 'zustand';

interface UIState {
  searchQuery: string;
  isMobileMenuOpen: boolean;
  setSearchQuery: (query: string) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchQuery: '',
  isMobileMenuOpen: false,

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  setMobileMenuOpen: (isOpen: boolean) => set({ isMobileMenuOpen: isOpen }),
}));
