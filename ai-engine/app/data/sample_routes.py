"""Prototype / illustrative route data for testing and demo.

These routes are loosely modeled on the Seawoods → VESIT demo scenario
from the project specification.  All environmental values are
*simulated* — not real measurements.

Each route dict follows the input schema described in the project spec
(Section 17), with fields relevant to the currently implemented
scoring factors.
"""

DEMO_ROUTES = [
    {
        "route_id": "route_A",
        "travel_time": 20,       # minutes
        "distance": 7.5,         # km
        "temperature": 36,       # °C
        "humidity": 70,          # %
        "aqi": 160,              # India NAQI
        "green_cover": 0.20,     # fraction 0–1
        "water_points": 0,
        "hospital_access": 0.30, # proximity score 0–1
        "traffic": 0.75,         # congestion 0–1 (1 = worst)
    },
    {
        "route_id": "route_B",
        "travel_time": 24,
        "distance": 8.2,
        "temperature": 33,
        "humidity": 65,
        "aqi": 105,
        "green_cover": 0.70,
        "water_points": 2,
        "hospital_access": 0.80,
        "traffic": 0.40,
    },
    {
        "route_id": "route_C",
        "travel_time": 28,
        "distance": 9.0,
        "temperature": 31,
        "humidity": 60,
        "aqi": 85,
        "green_cover": 0.55,
        "water_points": 1,
        "hospital_access": 0.60,
        "traffic": 0.50,
    },
]
