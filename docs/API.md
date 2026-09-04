# Mausam AI REST API

Base URL: `/api/v1`

- `GET /weather/current?location=New%20Delhi` returns current conditions.
- `GET /weather/forecast?location=New%20Delhi` returns hourly and daily forecasts.
- `GET /homepage?user_type=student&location=New%20Delhi` returns ranked homepage modules.
- `POST /assistant` accepts `{ "question": "Will it rain today?", "location": "New Delhi" }`.

Production routes should add Firebase bearer-token validation and user-scoped CRUD routes for preferences, saved locations, alerts, recommendations, and interactions. Provider adapters should normalize Mausam/IMD-compatible data into the same weather contract used by the UI.
