# Panier & Commande

## Panier (CartContext)

- Stocké en **localStorage** — persiste entre les sessions
- Actions disponibles : `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, `CLEAR`, `TOGGLE_DRAWER`
- Drawer latéral `CartDrawer.tsx` — s'ouvre à l'ajout d'un produit

## Flux commande

```
Page panier → saisie email + choix livraison + code promo
    ↓
POST /api/checkout/session
    ↓
Stripe Checkout (hébergé par Stripe)
    ↓
Succès → redirect /confirmation
Annulation → redirect /panier
```

## Frais de livraison

Calculés côté client sur la page panier, envoyés dans le payload checkout comme `line_item` séparé.

## Codes promo

- Gérés dans le panel admin → Promos
- `promoCode` + `discountRate` envoyés au checkout
- Stripe applique la réduction sur le total

## Confirmation

Page `/confirmation` — affichée après paiement Stripe réussi.  
Le panier est vidé (`CLEAR`) après confirmation.

## Fichiers clés

- `context/CartContext.tsx` — état et actions du panier
- `context/OrderContext.tsx` — historique des commandes
- `components/CartDrawer.tsx` — tiroir panier
- `app/panier/page.tsx` — page panier
- `app/confirmation/page.tsx` — page confirmation
- `app/api/checkout/session/route.ts` — création session Stripe
