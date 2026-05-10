# Routes API

## Checkout

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/checkout` | Crée une session Stripe Checkout |
| POST | `/api/checkout/session` | Variante avec support codes promo + frais livraison |

### Payload checkout
```json
{
  "items": [{ "product": { "shortName": "...", "size": "XL", "dimensions": "80x30cm", "price": 19.99 }, "quantity": 1 }],
  "shipping": 4.99,
  "customerEmail": "user@email.com",
  "promoCode": "PROMO10",
  "discountRate": 0.10
}
```

## Upload

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/upload` | Upload image vers Vercel Blob, retourne l'URL |

## Variables d'env nécessaires pour les routes

- `STRIPE_SECRET_KEY` — authentification Stripe
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob pour les uploads
