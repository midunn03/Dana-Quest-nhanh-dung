# Dana Quest working context

This is the separate `midunn03/Dana-Quest-nhanh-dung` repository. Work only in this repository; do not push or redirect remotes to `midunn03/Dana-Quest`.

Before UI changes, read STYLE_PIXEL.md and the relevant screen stylesheet. src/ExperienceTokens.css owns shared tokens. Screens own their CSS; avoid !important and trailing patch layers. Font defaults are 24px with self-hosted Tiny5 for VI and Pixelify Sans Bold as the authorized EN fallback; Game Paused is not supplied/licensed here.

Routes are selected in src/App.tsx using hashes. Read the matching screen, hooks, server handler and tests before changing behavior. Preserve data IDs, API/storage contracts, quest answers, reward accounting and progress/navigation guards unless the user explicitly requests those behavior changes. Keep mobile and desktop functionality equivalent.

Run npm run build, npm test -- --maxWorkers=2 and npm run lint after changes. Preserve existing test expectations; add a regression for a genuine behavior fix. Browser .cjs scripts use the original Windows runtime paths and may need environment-specific path adaptation.

Read docs/ENV.md for local setup. Read docs/READABILITY-UI-POLISH.md and docs/SEARCH-QUEST-CARD-FIX.md when touching quest play/exit, creator cards, Discovery ordering, global search, active quest card or account sidebar. These reports describe the latest UI changes; historical documents may describe older demo flows.

Keep .data/, credentials, private account records, database files, uploaded user media, node_modules and dist out of commits. No deployment or push to other repositories is authorized by a request to edit this code.
