# Offline Notes Lab

A beginner-friendly offline-first Progressive Web App built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

## Verify the build

```bash
npm run check
npm run build
npm run preview
```

## PWA test

1. Open the production preview while online.
2. Reload once so the service worker can register.
3. Open browser Developer Tools → Application.
4. Confirm the manifest and service worker.
5. Open Network and switch to Offline.
6. Reload the page.
7. Create a note and refresh again.
8. Check Cache Storage.

Notes are stored separately in `localStorage`.

## Deployment

Deploy the generated `dist` folder to an HTTPS static host.
