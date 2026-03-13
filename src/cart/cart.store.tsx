import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "./cart.types";

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  subtotalDkk: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const LS_KEY = "losningpro_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const api = useMemo<CartContextValue>(() => {
    const add: CartContextValue["add"] = (item, qty = 1) => {
      setItems(prev => {
        const idx = prev.findIndex(p => p.id === item.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
          return copy;
        }
        return [...prev, { ...item, quantity: qty }];
      });
    };

    const remove = (id: string) => setItems(prev => prev.filter(p => p.id !== id));
    const inc = (id: string) => setItems(prev => prev.map(p => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)));
    const dec = (id: string) =>
      setItems(prev =>
        prev
          .map(p => (p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p))
      );

    const clear = () => setItems([]);

    const subtotalDkk = items.reduce((sum, it) => sum + it.priceDkk * it.quantity, 0);

    return { items, add, remove, inc, dec, clear, subtotalDkk };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
