"""Template-based natural language generation is intentionally explainable."""

def generate_summary(weather: dict, user_type: str = "general") -> str:
    rain = weather.get("rain_probability", 0)
    if rain >= 60:
        advice = "Carry an umbrella and allow extra time for travel."
    elif weather.get("uv_index", 0) >= 6:
        advice = "Plan outdoor time earlier and use sun protection."
    else:
        advice = "It is a comfortable window for outdoor plans."
    return f"It is {weather.get('temperature', 0)} C now with a {rain}% chance of rain. {advice}"
