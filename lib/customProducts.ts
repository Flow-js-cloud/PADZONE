import { PRODUCTS } from "./products";
import type { Product, ProductCategory, ProductSize } from "./products";

const KEY        = "pz-custom-products";
const HIDDEN_KEY = "pz-hidden-products";
const OVERRIDES_KEY = "pz-product-overrides";
const PROMOS_KEY    = "pz-product-promos";

type Override = { stock?: number; price?: number };

export type ProductPromo = { promoPrice: number; active: boolean };

function getOverrides(): Record<string, Override> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(OVERRIDES_KEY) ?? "{}"); } catch { return {}; }
}

export function setProductOverride(id: string, data: Override): void {
  const overrides = getOverrides();
  overrides[id] = { ...overrides[id], ...data };
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
}

export function getProductPromos(): Record<string, ProductPromo> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(PROMOS_KEY) ?? "{}"); } catch { return {}; }
}

export function setProductPromo(id: string, promoPrice: number): void {
  const promos = getProductPromos();
  promos[id] = { promoPrice, active: true };
  localStorage.setItem(PROMOS_KEY, JSON.stringify(promos));
}

export function toggleProductPromo(id: string): void {
  const promos = getProductPromos();
  if (promos[id]) {
    promos[id].active = !promos[id].active;
    localStorage.setItem(PROMOS_KEY, JSON.stringify(promos));
  }
}

export function removeProductPromo(id: string): void {
  const promos = getProductPromos();
  delete promos[id];
  localStorage.setItem(PROMOS_KEY, JSON.stringify(promos));
}

function applyOverrides(products: Product[]): Product[] {
  const overrides = getOverrides();
  const promos    = getProductPromos();
  return products.map(p => {
    let result = { ...p };
    const o = overrides[p.id];
    if (o) {
      if (o.stock !== undefined) result.stock = o.stock;
      if (o.price !== undefined) result.price = o.price;
    }
    const promo = promos[p.id];
    if (promo?.active) {
      result.originalPrice = result.price;
      result.price = promo.promoPrice;
    }
    return result;
  });
}

/* ── Custom products ───────────────────────────────────────────── */
export function getCustomProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

export function saveCustomProducts(products: Product[]): void {
  localStorage.setItem(KEY, JSON.stringify(products));
}

/* ── Hidden static products ────────────────────────────────────── */
export function getHiddenIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(HIDDEN_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function saveHiddenIds(ids: string[]): void {
  localStorage.setItem(HIDDEN_KEY, JSON.stringify(ids));
}

/* ── Aggregate ─────────────────────────────────────────────────── */
export function getAllProducts(): Product[] {
  const hidden = getHiddenIds();
  const all = [...PRODUCTS.filter(p => !hidden.includes(p.id)), ...getCustomProducts()];
  return applyOverrides(all);
}

/* ── CRUD ──────────────────────────────────────────────────────── */
export function addCustomProduct(product: Omit<Product, "id" | "slug">): Product {
  const id   = `custom-${Date.now()}`;
  const slug = product.shortName.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + id.slice(-6);
  const newProduct: Product = { ...product, id, slug } as Product;
  saveCustomProducts([...getCustomProducts(), newProduct]);
  return newProduct;
}

export function updateCustomProduct(id: string, updates: Omit<Product, "id" | "slug">): void {
  saveCustomProducts(
    getCustomProducts().map(p => p.id === id ? { ...p, ...updates } : p)
  );
}

export function deleteProduct(id: string): void {
  if (id.startsWith("custom-")) {
    saveCustomProducts(getCustomProducts().filter(p => p.id !== id));
  } else {
    const hidden = getHiddenIds();
    if (!hidden.includes(id)) saveHiddenIds([...hidden, id]);
  }
}

/** Edit a static product: hide original + create a custom copy with edits */
export function overrideStaticProduct(originalId: string, updates: Omit<Product, "id" | "slug">): Product {
  const hidden = getHiddenIds();
  if (!hidden.includes(originalId)) saveHiddenIds([...hidden, originalId]);
  return addCustomProduct(updates);
}

export { type Product, type ProductCategory, type ProductSize };
