import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant } from '../types/product';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variant: ProductVariant, qty?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, variant: ProductVariant, qty: number = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.variant.id === variant.id);
          if (existing) {
            const updatedItems = state.items.map((item) =>
              item.variant.id === variant.id
                ? { ...item, quantity: item.quantity + qty }
                : item
            );
            return {
              items: updatedItems,
              totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
              totalPrice: updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
            };
          }
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}`,
            product,
            variant,
            quantity: qty,
          };
          const updatedItems = [...state.items, newItem];
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
          };
        });
      },

      removeItem: (variantId: string) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.variant.id !== variantId);
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
          };
        });
      },

      updateQuantity: (variantId: string, qty: number) => {
        if (qty <= 0) {
          get().removeItem(variantId);
          return;
        }
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.variant.id === variantId ? { ...item, quantity: qty } : item
          );
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
          };
        });
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),

      openCart: () => set({ isOpen: true }),

      closeCart: () => set({ isOpen: false }),

      totalItems: 0,
      totalPrice: 0,
    }),
    {
      name: 'arc-cart',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);
