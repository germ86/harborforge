# harborforge
Industrial Shipyard & Maritime Management Simulator

## CI/CD and Deployment Requirements

The GitHub Actions workflow in `.github/workflows/firebase-hosting.yml` uses `npm ci`, so a committed `package-lock.json` is required for all CI and deploy runs.

### Required GitHub Secrets

Set these repository secrets before running the Firebase workflow:

- `FIREBASE_SERVICE_ACCOUNT_HARBORFORGE` (service account JSON for Firebase Hosting deploys)
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

### Workflow Layout

- `build-and-test`: installs dependencies, builds with `npm run build`, and verifies that `dist/` was produced.
- `deploy`: runs only for non-PR events, rebuilds, and deploys to Firebase Hosting.
