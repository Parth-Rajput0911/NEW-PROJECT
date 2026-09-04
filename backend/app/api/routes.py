from datetime import datetime
from fastapi import APIRouter
from pydantic import BaseModel, Field
from app.services.personalization import rank_homepage

router = APIRouter()

class AssistantRequest(BaseModel):
    question: str = Field(min_length=2, max_length=500)
    location: str = "New Delhi"

@router.get("/weather/current")
def current_weather(location: str = "New Delhi"):
    return {"location": location, "temperature": 28, "feels_like": 31, "humidity": 78, "rain_probability": 66, "aqi": 42, "uv_index": 5, "source": "demo"}

@router.get("/weather/forecast")
def forecast(location: str = "New Delhi"):
    return {"location": location, "hourly": [{"time": "17:00", "temperature": 28, "rain_probability": 66}], "daily": []}

@router.get("/homepage")
def homepage(user_type: str = "student", location: str = "New Delhi"):
    context = {"user_type": user_type, "location": location, "severity": "moderate", "rain_probability": 66, "time": datetime.now().hour}
    return {"context": context, "items": rank_homepage(context)}

@router.post("/assistant")
def assistant(payload: AssistantRequest):
    return {"answer": "Rain is likely after 2 PM. Carry an umbrella for your return journey.", "location": payload.location, "question": payload.question}
