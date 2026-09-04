npm install
npm run dev
# Mausam AI

Mausam AI is a SIH 2026 prototype for a personalized weather homepage. The product principle is: **Mausam does not just tell users the weather; it tells them what the weather means for them.**

## MVP demo

The root app is a Vite + React demo that runs entirely on local fallback data, so it remains usable without weather API credentials. It includes Home, Map, AI Assistant, Alerts, and Profile flows, with responsive desktop/mobile layouts, light/dark appearance, saved locations, AI prompts, and commute intelligence.

```bash
npm install
npm run dev
```

## Planned production architecture

- `frontend/`: React Native / Expo application for Android and iOS.
- `backend/`: FastAPI REST API, auth boundary, weather provider adapters, and services.
- `ai_ml/`: explainable ranking, risk scoring, and summary generation.
- `database/`: MySQL schema and demo seed data.
- `tests/`: API and model tests.
- `docs/`: API contract and product flow.

## Personalization model

Homepage relevance is calculated from user profile, preferences, location, current conditions, forecast, time, severity, and interaction history. Alert priority follows:

`Severity + Location + User Relevance = Alert Priority`

The first production iteration should use a transparent weighted model before introducing a trained model. This makes recommendations explainable to users and judges.

## Environment

Copy `.env.example` to `.env` and provide only the credentials required for the selected weather provider, Firebase, and MySQL deployment. Never commit secrets.
