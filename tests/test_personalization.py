from ai_ml.risk import classify_risk
from ai_ml.summary import generate_summary
from backend.app.services.personalization import rank_homepage


def test_severe_weather_wins_homepage_ranking():
    ranked = rank_homepage({"severity": "severe", "rain_probability": 10})
    assert ranked[0]["id"] == "emergency_alert"


def test_rain_risk_is_explainable():
    result = classify_risk(90, 4, 40)
    assert result["label"] in {"moderate", "high"}
    assert result["reasons"]


def test_summary_mentions_action_for_rain():
    assert "umbrella" in generate_summary({"temperature": 28, "rain_probability": 66})
