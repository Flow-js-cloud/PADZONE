# Composants

## Layout

| Composant | Description |
|-----------|-------------|
| `SiteLayout.tsx` | Layout global — wrap Navbar + Footer + Providers |
| `Navbar.tsx` | Navigation principale, recherche, icône panier |
| `Footer.tsx` | Pied de page avec liens légaux |

## Panier

| Composant | Description |
|-----------|-------------|
| `CartDrawer.tsx` | Tiroir latéral panier — s'ouvre automatiquement à l'ajout |

## Produits

| Composant | Description |
|-----------|-------------|
| `ProductCard.tsx` | Carte produit avec gradient, badge, ajout panier |
| `ReviewForm.tsx` | Formulaire soumission avis produit |

## UI

| Composant | Description |
|-----------|-------------|
| `SearchOverlay.tsx` | Overlay de recherche plein écran |
| `IntroAnimation.tsx` | Animation d'intro au premier chargement |
| `LegalPage.tsx` | Layout commun pages légales |
| `components/ui/scroll-expansion-hero.tsx` | Hero avec effet d'expansion au scroll |

## Admin

| Composant | Description |
|-----------|-------------|
| `AdminShell.tsx` | Shell UI du panel admin (sidebar + header) |
| `ImageUploader.tsx` | Upload d'images produits vers Vercel Blob |

## Contextes

| Contexte | Hook | Description |
|----------|------|-------------|
| `AuthContext` | `useAuth()` | User, login, register, logout, updateUser |
| `CartContext` | `useCart()` | Items, add/remove/update, drawer open/close |
| `OrderContext` | `useOrders()` | Historique commandes |
| `WishlistContext` | `useWishlist()` | Liste de souhaits |

## Pages dynamiques

| Route | Description |
|-------|-------------|
| `/categories/[...slug]` | Page catégorie filtrée — `CategoryPageClient.tsx` |
| `/produits/[slug]` | Fiche produit — `ProductPageClient.tsx` |
| `/admin/produits/modifier/[id]` | Édition produit — `ModifierClient.tsx` |
