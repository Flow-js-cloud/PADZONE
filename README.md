# PadZone — E-commerce de Tapis Gaming

Boutique en ligne spécialisée dans les tapis de souris gaming premium : Anime, RGB, Jeux Vidéo, Bureautique. Next.js App Router, Stripe, Vercel Blob.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js (App Router) |
| Langage | TypeScript |
| Style | Tailwind CSS |
| Animations | Framer Motion |
| Paiements | Stripe Checkout |
| Upload images | Vercel Blob |
| Auth | localStorage (côté client) |
| Hébergement | Vercel |

## Structure

```
├── app/
│   ├── categories/[...slug]/   Pages catégories
│   ├── produits/[slug]/        Fiches produits
│   ├── panier/                 Page panier
│   ├── confirmation/           Confirmation commande
│   ├── admin/                  Panel admin
│   └── api/                    checkout, upload
├── components/                 Composants React
├── context/                    Auth, Cart, Orders, Wishlist
├── lib/                        Catalogue produits (statique)
└── docs/                       Documentation (Obsidian)
```

## Variables d'environnement

```env
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
BLOB_READ_WRITE_TOKEN=
```

## Commandes

```bash
npm run dev      # Développement local
npm run build    # Build production
```

## Documentation

Documentation complète dans `/docs/` — ouvrir avec Obsidian (Open folder as vault → `docs/`).
