import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, CartItemKind } from "./cart.types";

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  containsService: boolean;
  subtotalDkk: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const LS_KEY = "losningpro_cart_v2";

function inferKind(record: Record<string, unknown>): CartItemKind {
  if (record.kind === "service") return "service";
  if (record.kind === "product") return "product";

  const category = typeof record.category === "string" ? record.category.toLowerCase() : "";
  if (category.includes("service")) return "service";

  return "product";
}

function sanitizeCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const record = item as Record<string, unknown>;

      const id = typeof record.id === "string" ? record.id : "";
      const name = typeof record.name === "string" ? record.name : "";

      const priceDkk =
        typeof record.priceDkk === "number"
          ? record.priceDkk
          : typeof record.price === "number"
            ? record.price
            : 0;

      const quantity =
        typeof record.quantity === "number" && Number.isFinite(record.quantity)
          ? Math.max(1, Math.floor(record.quantity))
          : 1;

      const image = typeof record.image === "string" ? record.image : undefined;
      const stripePriceId =
        typeof record.stripePriceId === "string" ? record.stripePriceId : undefined;

      const category = typeof record.category === "string" ? record.category : undefined;
      const relatedIds = Array.isArray(record.relatedIds)
        ? record.relatedIds.filter((x): x is string => typeof x === "string")
        : undefined;

      const kind = inferKind(record);

      if (!id || !name) return null;

      return {
        id,
        name,
        priceDkk,
        quantity,
        image,
        stripePriceId,
        kind,
        category,
        relatedIds,
      };
    })
    .filter((item): item is CartItem => item !== null);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      if (!raw) return;
      setItems(sanitizeCartItems(JSON.parse(raw)));
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const api = useMemo<CartContextValue>(() => {
    const add: CartContextValue["add"] = (item, qty = 1) => {
      const safeQty = Number.isFinite(qty) ? Math.max(1, Math.floor(qty)) : 1;

      setItems((prev) => {
        const index = prev.findIndex((entry) => entry.id === item.id);

        if (index >= 0) {
          const copy = [...prev];
          copy[index] = {
            ...copy[index],
            quantity: copy[index].quantity + safeQty,
          };
          return copy;
        }

        return [...prev, { ...item, quantity: safeQty }];
      });
    };

    const remove = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

    const inc = (id: string) =>
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );

    const dec = (id: string) =>
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
      );

    const clear = () => setItems([]);

    const subtotalDkk = items.reduce((sum, item) => sum + item.priceDkk * item.quantity, 0);
    const containsService = items.some((item) => item.kind === "service");

    return { items, add, remove, inc, dec, clear, containsService, subtotalDkk };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return value;
}
