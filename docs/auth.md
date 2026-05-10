# Authentification

## Fonctionnement

L'auth est **100% côté client via localStorage** — pas de base de données, pas de JWT serveur.

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  adresse?: string;
  complement?: string;
  codePostal?: string;
  ville?: string;
  pays?: string;
}
```

## Actions disponibles (AuthContext)

| Fonction | Description |
|----------|-------------|
| `login(email, password)` | Vérifie les credentials en localStorage |
| `register(name, email, password, address?)` | Crée un compte en localStorage |
| `logout()` | Supprime la session |
| `updateUser(updates)` | Met à jour les infos utilisateur |

## Limitations

- Pas de vrai backend auth → un utilisateur peut modifier ses données localStorage
- Pas de récupération de mot de passe
- Les données ne sont pas partagées entre appareils

## Pages

- `app/connexion/page.tsx` — formulaire login
- `app/inscription/page.tsx` — formulaire inscription

## Note

Si un vrai système d'auth est nécessaire à l'avenir, la migration vers Supabase (comme BetProLive) serait la voie recommandée.
