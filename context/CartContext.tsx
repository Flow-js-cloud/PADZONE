"use client";

import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import type { Product } from "@/lib/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
  | { type: "CLEAR" }
  | { type: "TOGGLE_DRAWER" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(i => i.product.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map(i =>
            i.product.id === action.payload.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.product.id !== action.payload) };
    case "UPDATE_QTY":
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter(i => i.product.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.payload.id ? { ...i, quantity: action.payload.qty } : i
        ),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE_DRAWER":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_DRAWER":
      return { ...state, isOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("pz-cart");
    if (saved) {
      try {
        const items = JSON.parse(saved) as CartItem[];
        items.forEach(item => dispatch({ type: "ADD_ITEM", payload: item.product }));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("pz-cart", JSON.stringify(state.items));
    }
  }, [state.items, mounted]);

  const total = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      state,
      addItem: (p) => dispatch({ type: "ADD_ITEM", payload: p }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
      updateQty: (id, qty) => dispatch({ type: "UPDATE_QTY", payload: { id, qty } }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      toggleDrawer: () => dispatch({ type: "TOGGLE_DRAWER" }),
      openDrawer: () => dispatch({ type: "OPEN_DRAWER" }),
      closeDrawer: () => dispatch({ type: "CLOSE_DRAWER" }),
      total,
      itemCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
