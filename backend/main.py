from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class RouteRequest(BaseModel):
    source: str
    destination: str


@app.get("/")
def home():
    return {
        "message": "EnviroHealth Intelligence Backend is running!"
    }


@app.post("/analyze-route")
def analyze_route(request: RouteRequest):

    routes = [
        {
            "route_id": "Route A",
            "distance_km": 7.8,
            "travel_time_min": 20
        },
        {
            "route_id": "Route B",
            "distance_km": 8.2,
            "travel_time_min": 24
        },
        {
            "route_id": "Route C",
            "distance_km": 9.1,
            "travel_time_min": 22
        }
    ]

    return {
        "source": request.source,
        "destination": request.destination,
        "routes": routes
    }