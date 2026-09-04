# React Native frontend handoff

The root `src/` app is the runnable SIH prototype shell because it can be previewed immediately with Vite. The production mobile client should be moved into this folder as an Expo React Native app, keeping the same screen contracts and REST API responses:

- Splash -> Auth -> Onboarding -> Home
- Home / Map / AI Assistant / Alerts / Profile tabs
- Firebase Auth and FCM notification adapters
- API client for `/api/v1`

The visual language, information hierarchy, fallback data and interaction copy are already represented in the root prototype.
