# Variables d'environnement

## Requises

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (serveur) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe (browser) |
| `BLOB_READ_WRITE_TOKEN` | Token Vercel Blob pour l'upload d'images |

## Optionnelles

| Variable | Description |
|----------|-------------|
| `STRIPE_WEBHOOK_SECRET` | Si webhook Stripe configuré pour les événements |
| `NEXT_PUBLIC_APP_URL` | URL publique du site |

## Notes

- Pas de Supabase — pas de variables DB
- Pas de JWT secret — auth en localStorage
- Les variables `NEXT_PUBLIC_*` sont exposées au browser

## Ajouter sur Vercel

```bash
vercel env add NOM_VARIABLE production --scope <org-id>
```

Vercel project ID : `prj_YIkImT00QCoDNwALwz7l3x9DW6uM`
