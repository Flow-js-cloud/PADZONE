import { PRODUCTS } from "@/lib/products";
import { ModifierClient } from "./ModifierClient";

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ id: p.id }));
}

export default function ModifierProduitPage() {
  return <ModifierClient />;
}
