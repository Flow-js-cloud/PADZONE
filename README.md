# PadZone — E-commerce de Tapis de Souris Gaming

Boutique en ligne spécialisée dans les tapis de souris gaming premium : RGB, Anime, Jeux Vidéo, Bureautique. Construit avec Next.js 14, déployé sur Vercel.

---

## Stack technique

| Technologie | Usage |
|---|---|
| Next.js 14 (App Router) | Framework React fullstack |
| TypeScript | Typage statique |
| Tailwind CSS | Styles utilitaires |
| Framer Motion | Animations |
| Vercel Blob | Stockage des images produits |
| Stripe | Paiement en ligne |
| Vercel | Déploiement & hébergement |

---

## Fonctionnalités

**Boutique**
- Catalogue produits avec filtres par catégorie, taille et prix
- Page produit avec galerie d'images, avis clients et CTA sticky mobile
- Panier avec drawer animé et gestion des quantités
- Wishlist persistée dans le localStorage
- Recherche live en overlay
- Checkout via Stripe

**Panel Admin** (`/admin`)
- Gestion des produits (ajout, modification, suppression)
- Upload d'images via drag & drop (Vercel Blob)
- Gestion des commandes et clients
- Codes promo
- Statistiques

---

## Installation locale

```bash
# 1. Cloner le repo
git clone https://github.com/flow-js-cloud/padzone.git
cd padzone

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env.local
# Remplir .env.local avec tes clés

# 4. Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Variables d'environnement

Copie `.env.example` en `.env.local` et remplis chaque valeur.

| Variable | Description | Où l'obtenir |
|---|---|---|
| `BLOB_READ_WRITE_TOKEN` | Token Vercel Blob | vercel.com → Storage → Blob |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe | dashboard.stripe.com |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe | dashboard.stripe.com |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Mot de passe panel admin | Défini par toi |

> **Important** — Ne jamais commiter `.env.local`. Il est dans le `.gitignore`.

---

## Structure du projet

```
padzone/
├── app/                    # Pages Next.js (App Router)
│   ├── admin/              # Panel d'administration
│   ├── api/                # Routes API (upload, checkout)
│   ├── categories/         # Pages catégories
│   ├── produits/[slug]/    # Pages produits
│   └── panier/             # Panier
├── components/             # Composants React réutilisables
│   ├── admin/              # Composants panel admin
│   └── ui/                 # Composants UI génériques
├── context/                # Contexts React (Panier, Wishlist, Auth)
├── lib/                    # Données produits et avis
└── public/                 # Assets statiques (images)
```

---

## Déploiement

Le projet est déployé automatiquement sur Vercel.

```bash
# Déploiement production manuel
npx vercel --prod
```

Les variables d'environnement sont configurées directement dans le dashboard Vercel (Settings → Environment Variables) — elles ne transitent jamais par le repo.

---

## Accès admin

Aller sur `/admin` et saisir le mot de passe défini dans `NEXT_PUBLIC_ADMIN_PASSWORD`.
