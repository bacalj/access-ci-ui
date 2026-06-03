# access-ci-ui

The top-level UI component library for ACCESS-CI sites (published as `@access-ci/ui`): bundles
navigation, header/footer, the resource catalog, and the embedded chatbot, with shadow-DOM style
isolation.

## Where this sits

Sits above `access-qa-bot` / `qa-bot-core` in the frontend chain and is **pinned into Drupal** via a
CDN version reference in `headerfooter.js`. It is built and pinned, not auto-deployed. The build,
local-test, and Pantheon multidev release workflow are in `access-ci/DRUPAL_TESTING.md`.

## Run / build

```bash
npm install
npm run dev          # Vite dev server
npm run build        # dual export: ESM + React variant (@access-ci/ui/react)
npm run lint
```

## Conventions & gotchas

- **Shadow DOM** for style isolation; ships UMD + ESM + a React-specific export.
- Host page must load the **Archivo** font family (Google Fonts) or type renders wrong.
- Bundles a pinned `@snf/access-qa-bot` version — when updating the bot, bump that pin and rebuild
  (see `DRUPAL_TESTING.md` for the rc-tag publish dance that keeps prod untouched).
- The `qaBot()` entry takes `isLoggedIn` plus optional `userEmail` / `userName` / `accessId`.

## Key paths

`src/` (components) · `dist/` (built artifacts) · `vite.config.js` (build config).
