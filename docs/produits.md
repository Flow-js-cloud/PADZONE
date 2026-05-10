# Produits

## Structure d'un produit

```typescript
interface Product {
  id: string;           // ex: "dbz-goku-xl"
  slug: string;         // ex: "tapis-dragon-ball-z-goku-xl"
  name: string;         // Nom complet
  shortName: string;    // Nom court (affiché panier/Stripe)
  price: number;        // Prix en €
  originalPrice?: number; // Prix barré (promo)
  category: ProductCategory;
  subCategory: string;
  size: ProductSize;    // S | M | L | XL | XXL | XXXL
  dimensions: string;   // ex: "80 × 30 cm"
  gradient: string;     // CSS gradient pour fond carte
  accentColor: string;  // Couleur accent
  rating: number;       // Note /5
  reviews: number;      // Nombre d'avis
  badge?: string;       // "BEST-SELLER" | "NEW" | etc.
  description: string;
  images?: string[];    // URLs images (Vercel Blob)
  features: string[];   // Liste des caractéristiques
  isNew?: boolean;
  isBestSeller?: boolean;
  isRGB?: boolean;
  stock: number;
}
```

## Catégories

| ID | Description |
|----|-------------|
| `anime` | Tapis gaming thème anime (DBZ, Naruto, One Piece...) |
| `jeux` | Thème jeux vidéo |
| `rgb` | Tapis avec effets RGB |
| `standard` | Tapis gaming classiques |
| `bureautique` | Tapis pour usage bureau |

## Tailles disponibles

| Taille | Usage typique |
|--------|---------------|
| S | Souris uniquement |
| M | Setup compact |
| L | Setup standard |
| XL | Grand setup |
| XXL | Desk pad |
| XXXL | Full desk |

## Gestion du catalogue

Les produits sont définis statiquement dans `lib/products.ts` (tableau `PRODUCTS`).  
Les produits personnalisés/customs sont dans `lib/customProducts.ts`.

**Pour ajouter un produit** : ajouter un objet dans le tableau `PRODUCTS` de `lib/products.ts`.  
**Pour modifier** : panel admin → Produits → Modifier (les modifications custom sont dans `lib/customProducts.ts`).

## Images

Stockées sur **Vercel Blob** via `POST /api/upload`.  
L'uploader admin se trouve dans `components/admin/ImageUploader.tsx`.
