# Product flow

```mermaid
flowchart LR
  A[User profile] --> B[Saved location]
  B --> C[Weather provider]
  C --> D[Data processing]
  D --> E[AI personalization engine]
  E --> F[Relevance and risk analysis]
  F --> G[Personalized homepage]
  G --> H[Forecast]
  G --> I[Alerts]
  G --> J[Recommendations]
```

Priority is deliberately explainable: `Severity + Location + User Relevance = Alert Priority`.

Normal weather surfaces forecast, AQI and UV. Rain increases commute risk and radar prominence. Heat increases UV and safety guidance. Severe conditions elevate emergency instructions above routine content.
