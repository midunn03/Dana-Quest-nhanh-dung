# Dana Quest — nhanh dung

Private source snapshot of `Dana-Quest-nhanh-dung`, prepared for UI fixes and code review. This repository is separate from the original Dana-Quest repository and starts with a fresh Git history.

## Run locally

Node.js 24 is the version configured by the project. Install dependencies and start Vite:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

Open http://127.0.0.1:5174/. Vite registers the local Node API middleware. Environment variables are optional for the default local setup; see [docs/ENV.md](docs/ENV.md). The Python service under backend/ is optional for the pixel/event proxy endpoints configured in vite.config.ts.

## Verify

```sh
npm run build
npm test -- --maxWorkers=2
npm run lint
```

The latest verified baseline contains 238 tests. Standalone browser scripts in tests/ and scripts/ currently refer to the original Windows Chrome/runtime paths; adapt those paths to your execution environment rather than changing game expectations.

## Find the code

- React/TypeScript screens: src/; hash-route selection: src/App.tsx.
- Node API: server/; shared quest contracts: shared/; authored catalog: src/data/.
- VI/EN localization: src/i18n/.
- Pixel style and local font assets: STYLE_PIXEL.md, src/ExperienceTokens.css, public/fonts/.
- Latest UI work: docs/READABILITY-UI-POLISH.md, docs/SEARCH-QUEST-CARD-FIX.md and docs/FONT-MIGRATION-REPORT.md.
- Existing detailed documentation/reference images: Dana-Quest-Documentation-v2.2/.

Treat historical plans and the [legacy README](docs/LEGACY-README.md) as context; the current source and existing tests define actual behavior. Some reports link to local .data/ evidence intentionally excluded from this repository.

## Snapshot exclusions

No node_modules, dist, .data runtime/account records, local environment secrets, database/media uploads or old Git history are included. One large ZIP containing duplicate screenshot source archives was omitted; unpacked reference images and application assets remain included. No GitHub Actions deployment workflow was added.
