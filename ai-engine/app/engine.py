"""EnviroHealth Intelligence — AI/Risk Engine entry point.

This module provides the top-level function that the backend calls.
It accepts a list of route dicts and a user profile, and returns
scored, ranked routes with explanations.

Input/output schemas follow Sections 17–18 of the project spec.
"""

from typing import Any, Dict, List

from app.optimizer import rank_routes
from app.explainer import explain_recommendation


def score_routes(
    routes: List[Dict[str, Any]],
    user_profile: str = "normal_commuter",
) -> List[Dict[str, Any]]:
    """Score, rank, and explain a set of candidate routes.

    Parameters
    ----------
    routes:
        List of route dicts with keys: route_id, travel_time, distance,
        temperature, humidity, aqi, green_cover, water_points,
        hospital_access, traffic.
    user_profile:
        "normal_commuter" or "heat_sensitive".

    Returns
    -------
    List of result dicts sorted best-first, each containing:
        route_id, factor_scores, overall_score, rank, recommended,
        explanation.
    """
    ranked = rank_routes(routes, profile=user_profile)
    explanations = explain_recommendation(ranked, routes)

    for entry in ranked:
        entry["explanation"] = explanations[entry["route_id"]]

    return ranked
