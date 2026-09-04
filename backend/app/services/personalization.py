"""Small explainable ranking layer for the first Mausam AI release."""


def rank_homepage(context: dict) -> list[dict]:
    items = [
        {"id": "weather_summary", "score": 0.72, "reason": "Always relevant"},
        {"id": "commute_risk", "score": 0.45, "reason": "Useful during commute hours"},
        {"id": "air_quality", "score": 0.35, "reason": "User follows AQI"},
        {"id": "uv_safety", "score": 0.30, "reason": "Moderate UV"},
    ]
    if context.get("rain_probability", 0) >= 60:
        for item in items:
            if item["id"] == "commute_risk":
                item["score"] += 0.4
                item["reason"] = "High rain probability on a saved route"
    if context.get("severity") == "severe":
        items.append({"id": "emergency_alert", "score": 1.0, "reason": "Severity takes priority"})
    return sorted(items, key=lambda item: item["score"], reverse=True)
