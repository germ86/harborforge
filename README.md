# harborforge
Industrial Shipyard & Maritime Management Simulator

## Projektbeschreibung (Phase 1)
Harborforge ist in Phase 1 ein spielbarer Vertical Slice für ein maritimes Management-Spiel:
- Du verwaltest Aufträge in einer Werft.
- Zeit vergeht in Tagen und beeinflusst den Projektfortschritt.
- Abgeschlossene Aufträge führen zu einer Auszahlung, die im UI sichtbar wird.

Der Fokus in dieser Phase liegt auf einem stabilen Kern-Loop, Firebase-Integration und reproduzierbaren Build-/Deployment-Prozessen.

## Voraussetzungen
- **Node.js 20 LTS** (empfohlen; mindestens Node 18.18+ für Vite 5).
- **npm** (wird mit Node installiert).

Prüfen:
```bash
node -v
npm -v
```

## Lokale Entwicklung
Installiere Abhängigkeiten und starte den Dev-Server:

```bash
npm install
npm run dev
```

Produktions-Build lokal prüfen:

```bash
npm run build
```

## Benötigte `.env`-Variablen
Lege lokal eine `.env` (oder `.env.local`) mit folgenden Variablen an:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

> Hinweis: Leere Werte führen typischerweise dazu, dass Firebase nicht korrekt initialisiert wird.

## Core-Gameplay-Loop (für Tester)
1. **Auftrag annehmen**: Im Spiel einen verfügbaren Auftrag starten.
2. **Tage fortschreiten**: Mehrere Tage simulieren/weiterklicken und den Fortschritt beobachten.
3. **Abschluss + Auszahlung**: Auf Abschlussstatus achten und prüfen, ob die Auszahlung im HUD/Statusbereich verbucht wird.

## Firebase Hosting Deployment-Flow

### Lokal (manuell)
1. `.env`-Variablen setzen.
2. Build erzeugen:
   ```bash
   npm install
   npm run build
   ```
3. Bei Bedarf lokal Hosting testen (Firebase CLI erforderlich):
   ```bash
   firebase emulators:start --only hosting
   ```
4. Deployment ausführen:
   ```bash
   firebase deploy --only hosting
   ```

### GitHub Actions (automatisch)
Die Pipeline in `.github/workflows/firebase-hosting.yml` arbeitet in zwei Stufen:
- **build-and-test**: `npm ci` + `npm run build` und Verifikation, dass `dist/` erzeugt wurde.
- **deploy**: läuft nur außerhalb von Pull Requests, baut erneut und deployed auf Firebase Hosting.

Wichtig:
- `package-lock.json` muss committed sein (`npm ci`-Anforderung).
- GitHub Repository Secrets müssen gesetzt sein.

#### Erforderliche GitHub Secrets
- `FIREBASE_SERVICE_ACCOUNT_HARBORFORGE` (Service-Account-JSON für Firebase Hosting Deployments)
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

## Troubleshooting

### 1) Fehlende Secrets in GitHub Actions
**Symptome:** Workflow scheitert beim Build oder Deploy, ENV-Werte sind `undefined`.

**Lösung:**
- Unter *Repository → Settings → Secrets and variables → Actions* prüfen, ob alle oben gelisteten Secrets existieren.
- Secret-Namen exakt übernehmen (inkl. Groß-/Kleinschreibung).

### 2) Build-Fehler bei `npm run build`
**Symptome:** TypeScript-/Vite-Fehler oder `npm ci` schlägt in CI fehl.

**Lösung:**
- Lokal einmal sauber installieren:
  ```bash
  rm -rf node_modules
  npm install
  npm run build
  ```
- Node-Version auf 20 LTS angleichen.
- Prüfen, ob `package-lock.json` aktuell und committed ist.

### 3) Leere oder ungültige `VITE_FIREBASE_*`-Werte
**Symptome:** Firebase initialisiert nicht, leere Oberfläche/Runtime-Fehler in der Konsole.

**Lösung:**
- `.env` auf Vollständigkeit prüfen.
- Keine Anführungszeichen/Leerzeichenfehler in den Werten.
- Dev-Server nach Änderungen an `.env` neu starten (`npm run dev`).
