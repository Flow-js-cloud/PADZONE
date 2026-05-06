"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

interface WishlistContextValue {
  items: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("pz-wishlist") ?? "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("pz-wishlist", JSON.stringify(items));
  }, [items]);

  const toggle = useCallback((id: string) => {
    setItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }, []);

  const has = useCallback((id: string) => items.includes(id), [items]);

  return (
    <WishlistContext.Provider value={{ items, toggle, has, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
