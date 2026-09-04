"""Explainable weather-risk classification for the MVP."""

def classify_risk(rain_probability: int, uv_index: int, aqi: int, severe: bool = False) -> dict:
    if severe:
        return {"label": "severe", "score": 95, "reasons": ["official severe-weather signal"]}
    score = min(100, round(rain_probability * 0.55 + max(0, uv_index - 3) * 7 + max(0, aqi - 50) * 0.2))
    label = "high" if score >= 70 else "moderate" if score >= 40 else "low"
    return {"label": label, "score": score, "reasons": ["rain probability", "UV and air quality context"]}
