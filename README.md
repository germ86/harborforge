# HarborForge

HarborForge is an Angular + Firebase project. This phase focuses on **build/deploy reliability** and CI/CD stability.

## Required project ID
- **Firebase Project ID:** `harborforge-412b3`

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start local dev server:
   ```bash
   npm run start
   ```
3. Build locally:
   ```bash
   npm run build
   ```

## Environment variables
Copy `.env.example` to `.env.local` and fill values:

```env
NG_APP_FIREBASE_API_KEY=
NG_APP_FIREBASE_AUTH_DOMAIN=
NG_APP_FIREBASE_PROJECT_ID=
NG_APP_FIREBASE_STORAGE_BUCKET=
NG_APP_FIREBASE_MESSAGING_SENDER_ID=
NG_APP_FIREBASE_APP_ID=
NG_APP_FIREBASE_MEASUREMENT_ID=
```

### Important security note
Firebase Web config values are **frontend configuration**, not backend secrets. Do not commit service-account keys, private keys, or other real secrets.

## Firebase Hosting
- Hosting config is in `firebase.json`.
- Public directory is set to Angular browser output: `dist/harborforge/browser`.
- SPA routing rewrite points all routes to `index.html`.

Manual deploy:
```bash
npm ci
npm run build
firebase deploy --project harborforge-412b3 --only hosting
```

## Cloud Build
Cloud Build pipeline is defined in `cloudbuild.yaml` and performs:
1. `npm ci`
2. `npm run build`
3. `firebase deploy --project=harborforge-412b3 --only=hosting`

## CI/CD acceptance checks
The pipeline/repo should satisfy:
1. `npm ci` succeeds.
2. `npm run build` succeeds.
3. `dist/harborforge/browser` exists after build.
4. `firebase.json` points to `dist/harborforge/browser`.
5. `cloudbuild.yaml` exists with install/build/deploy steps.
6. `.gitignore` excludes generated files (`dist`, `node_modules`, `.angular`, coverage, caches, logs).
7. `package-lock.json` is committed.
8. No generated artifacts are tracked.
9. This README documents setup and deployment flow.
