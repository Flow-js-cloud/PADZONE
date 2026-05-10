# Panel Admin

## Accès

Route `/admin` — protégée par `middleware.ts`.

## Sections

| Section | Route | Description |
|---------|-------|-------------|
| Dashboard | `/admin` | Vue d'ensemble, stats rapides |
| Produits | `/admin/produits` | Liste, ajout, modification, suppression |
| Nouveau produit | `/admin/produits/nouveau` | Formulaire création produit |
| Modifier produit | `/admin/produits/modifier/[id]` | Édition produit existant |
| Commandes | `/admin/commandes` | Liste et gestion des commandes |
| Clients | `/admin/clients` | Liste des clients |
| Stats | `/admin/stats` | Statistiques ventes, revenus |
| Promos | `/admin/promos` | Gestion codes promo et réductions |
| Paramètres | `/admin/parametres` | Configuration du site |

## Gestion produits

- **Ajout** : formulaire avec upload image (Vercel Blob via `ImageUploader`)
- **Modification** : page `/admin/produits/modifier/[id]` — `ModifierClient.tsx`
- Les modifications sont sauvegardées dans `lib/customProducts.ts`

## Upload images

`components/admin/ImageUploader.tsx` → `POST /api/upload` → Vercel Blob → URL retournée et stockée dans le produit.

## Fichiers clés

- `app/admin/layout.tsx` — layout commun admin (sidebar)
- `components/admin/AdminShell.tsx` — shell UI admin
- `components/admin/ImageUploader.tsx` — upload images produits
