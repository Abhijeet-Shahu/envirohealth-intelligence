from fastapi import FastAPI
from pydantic import BaseModel

from services.route_scoring import calculate_route_score

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
            "travel_time_min": 20,
            "heat_risk": 0.8,
            "pollution_risk": 0.7,
            "traffic": 0.9,
            "green_cover": 0.2,
            "water_access": 0.1,
            "healthcare_access": 0.3,
            "efficiency": 0.5
        },
        {
            "route_id": "Route B",
            "distance_km": 8.2,
            "travel_time_min": 24,
            "heat_risk": 0.3,
            "pollution_risk": 0.4,
            "traffic": 0.4,
            "green_cover": 0.7,
            "water_access": 0.8,
            "healthcare_access": 0.9,
            "efficiency": 0.8
        },
        {
            "route_id": "Route C",
            "distance_km": 9.1,
            "travel_time_min": 22,
            "heat_risk": 0.5,
            "pollution_risk": 0.5,
            "traffic": 0.6,
            "green_cover": 0.5,
            "water_access": 0.4,
            "healthcare_access": 0.6,
            "efficiency": 0.7
        }
    ]

    # Calculate score for every route
    for route in routes:
        route["envirohealth_score"] = calculate_route_score(route)

    # Find the route with the highest score
    best_route = max(
        routes,
        key=lambda route: route["envirohealth_score"]
    )

    # Mark the best route as recommended
    for route in routes:
        route["recommended"] = (
            route["route_id"] == best_route["route_id"]
        )

    return {
        "source": request.source,
        "destination": request.destination,
        "recommended_route": best_route["route_id"],
        "routes": routes
    }