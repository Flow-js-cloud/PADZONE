# Architecture

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js (App Router) |
| Langage | TypeScript |
| Style | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Paiements | Stripe Checkout |
| Upload images | Vercel Blob |
| Hébergement | Vercel |
| Auth | localStorage (pas de DB — auth côté client) |
| Données produits | Fichiers TypeScript statiques (`lib/products.ts`) |

## Structure des dossiers

```
padzone/
├── app/
│   ├── page.tsx                  # Page d'accueil
│   ├── categories/[...slug]/     # Pages catégories dynamiques
│   ├── produits/[slug]/          # Pages produits dynamiques
│   ├── panier/                   # Page panier
│   ├── confirmation/             # Page confirmation commande
│   ├── connexion/                # Login
│   ├── inscription/              # Register
│   ├── admin/                    # Panel admin
│   │   ├── page.tsx              # Dashboard
│   │   ├── produits/             # Gestion produits
│   │   ├── commandes/            # Gestion commandes
│   │   ├── clients/              # Liste clients
│   │   ├── stats/                # Statistiques
│   │   ├── promos/               # Codes promo
│   │   └── parametres/           # Paramètres site
│   └── api/
│       ├── checkout/             # Création session Stripe
│       └── upload/               # Upload images (Vercel Blob)
├── components/
│   ├── Navbar.tsx                # Navigation
│   ├── Footer.tsx                # Pied de page
│   ├── CartDrawer.tsx            # Tiroir panier
│   ├── ProductCard.tsx           # Carte produit
│   ├── SearchOverlay.tsx         # Recherche
│   ├── ReviewForm.tsx            # Formulaire avis
│   ├── IntroAnimation.tsx        # Animation d'intro
│   ├── SiteLayout.tsx            # Layout global
│   └── admin/                   # Composants admin
├── context/
│   ├── AuthContext.tsx           # Auth (localStorage)
│   ├── CartContext.tsx           # Panier (localStorage)
│   ├── OrderContext.tsx          # Commandes
│   └── WishlistContext.tsx       # Liste de souhaits
├── lib/
│   ├── products.ts               # Catalogue produits (données statiques)
│   ├── customProducts.ts         # Produits personnalisés
│   ├── reviews.ts                # Avis produits
│   └── userReviews.ts            # Avis utilisateurs
└── docs/                         # Cette documentation
```

## Flux principal

```
Visiteur → Browse produits → Fiche produit → Ajouter au panier
    ↓
CartDrawer → Page panier → Saisie email + code promo
    ↓
POST /api/checkout → Stripe Checkout Session
    ↓
Paiement Stripe → Redirect /confirmation
```

## Points clés

- **Pas de base de données** — les produits sont définis dans `lib/products.ts`
- **Auth localStorage** — pas de JWT, pas de Supabase, tout en local browser
- **Panier localStorage** — persiste entre les sessions navigateur
- **Images** — stockées sur Vercel Blob (upload via `/api/upload`)
