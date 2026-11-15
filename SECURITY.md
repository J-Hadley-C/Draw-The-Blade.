# Sécurité & mise en route

## Premier lancement (local)

1. `cd backend && composer install`
2. Créer `backend/.env.local` (jamais versionné) :
   ```
   APP_SECRET=<64 caractères hexadécimaux aléatoires>
   ADMIN_TOKEN=<64 caractères hexadécimaux aléatoires>
   ```
   Générer une valeur : `openssl rand -hex 32`
3. Démarrer MySQL (WAMP), puis `start.bat`.
4. Se connecter à l'admin avec la valeur de `ADMIN_TOKEN`.

> Tant que `ADMIN_TOKEN` est vide, trop court (< 32 caractères) ou égal à `CHANGE_ME`,
> **toutes** les routes admin répondent 503.

## Ce qui est protégé

| Sujet | Mesure |
|---|---|
| Jeton admin | Comparaison à temps constant, mode fermé, blocage 15 min après 8 échecs par IP (429) |
| Uploads | Liste blanche (jpg/png/webp, mp3/wav/ogg), type lu dans le contenu, 5 Mo / 40 Mo max, noms aléatoires, `.htaccess` sans exécution |
| Données | Validation Symfony (genre, BPM, prix, durée, longueurs), JSON invalide → 400 |
| Abus | Contact : 5 messages/h/IP + champ piège. Like : 1/jour/beat/IP. Écoute : 1/30 min/beat/IP |
| CORS | Limité à `CORS_ALLOW_ORIGIN` (regex) |
| En-têtes API | CSP, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS (HTTPS), no-store |
| Front | React en build production avec SRI, CSP `<meta>`, jeton admin en `sessionStorage` |
| Dépendances | `composer audit` : 0 faille (à relancer régulièrement) |

## Passage en production — à faire

- `APP_ENV=prod` et `APP_DEBUG=0` (sinon les pages d'erreur Symfony détaillées sont visibles).
- `CORS_ALLOW_ORIGIN='^https://votre-domaine\.com$'` dans `.env.local`.
- Mettre `API_BASE` (dans `project/ui_kits/config.js`) **et** les origines de `connect-src` / `img-src` / `media-src`
  de la balise CSP des 4 pages HTML sur l'URL HTTPS de l'API.
- Servir en HTTPS ; utiliser un utilisateur MySQL dédié avec mot de passe (pas `root` sans mot de passe).
- Faire pointer le serveur web sur `backend/public` ; `project/` est servi séparément.
- Sauvegarder la base et `backend/public/uploads/beats/`.
- **Changer le jeton** : l'ancien `CHANGE_ME` reste visible dans l'historique git du dépôt public.

## Limites connues

- Les pages compilent encore le JSX dans le navigateur (Babel) : il faudra un build (Vite) pour la vitesse et pour retirer `unsafe-eval` de la CSP.
- Pas de paiement en ligne : « Commander » mène au formulaire de contact.
- `/api/beats/{id}/stream` sert le fichier complet à tout le monde.
