"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@/lib/products";

export type OrderStatus = "en-attente" | "expediee" | "livree" | "annulee";

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface OrderCustomer {
  prenom: string;
  nom: string;
  email: string;
  adresse: string;
  complement: string;
  codePostal: string;
  ville: string;
  pays: string;
}

export interface Order {
  id: string;
  date: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  promoCode?: string;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (data: Omit<Order, "id" | "date" | "status">) => Order;
  updateStatus: (id: string, status: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("pz-orders");
    if (saved) {
      try { setOrders(JSON.parse(saved)); } catch {}
    }
  }, []);

  const persist = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem("pz-orders", JSON.stringify(updated));
  };

  const createOrder = (data: Omit<Order, "id" | "date" | "status">): Order => {
    const order: Order = {
      ...data,
      id: `PZ-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString(),
      status: "en-attente",
    };
    persist([order, ...orders]);
    return order;
  };

  const updateStatus = (id: string, status: OrderStatus) => {
    persist(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, updateStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
