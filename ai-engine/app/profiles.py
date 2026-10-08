"""User-profile weight presets for multi-factor route optimization.

Each profile maps factor names to relative weights.  Weights do not
need to sum to 1 — they are normalized at scoring time.

Two profiles are required by the spec:
    - normal_commuter: prioritizes travel efficiency
    - heat_sensitive:  prioritizes health/environmental factors
"""

from typing import Dict

# Factor names used consistently across the scoring engine
FACTORS = [
    "heat",
    "pollution",
    "greenery",
    "water",
    "healthcare",
    "traffic",
    "travel_time",
    "fuel_efficiency",
]

ProfileWeights = Dict[str, float]

PROFILES: Dict[str, ProfileWeights] = {
    "normal_commuter": {
        "heat":            0.08,
        "pollution":       0.08,
        "greenery":        0.05,
        "water":           0.04,
        "healthcare":      0.05,
        "traffic":         0.20,
        "travel_time":     0.30,
        "fuel_efficiency": 0.20,
    },
    "heat_sensitive": {
        "heat":            0.25,
        "pollution":       0.20,
        "greenery":        0.15,
        "water":           0.10,
        "healthcare":      0.10,
        "traffic":         0.05,
        "travel_time":     0.10,
        "fuel_efficiency": 0.05,
    },
}


def get_weights(profile: str) -> ProfileWeights:
    """Return weights for a profile name.

    Falls back to normal_commuter if the profile is unknown.
    """
    return PROFILES.get(profile, PROFILES["normal_commuter"])
