"""Weighted multi-factor route optimizer.

Takes per-route normalized scores for each factor, applies user-profile
weights, produces an overall score, and ranks candidate routes.

This is the core decision engine described in the project spec (Section 14).
The overall score is a weighted sum — not an ML prediction.
"""

from typing import Any, Dict, List

from app.scoring.heat import score_heat
from app.scoring.pollution import score_pollution
from app.scoring.greenery import score_greenery
from app.scoring.accessibility import score_water, score_healthcare
from app.scoring.traffic import (
    score_traffic,
    score_travel_time,
    score_fuel_efficiency,
)
from app.profiles import get_weights, FACTORS


def compute_factor_scores(routes: List[Dict[str, Any]]) -> List[Dict[str, float]]:
    """Compute normalized [0–1] scores for every factor across routes.

    Parameters
    ----------
    routes:
        List of route dicts matching the input schema (Section 17).

    Returns
    -------
    List of dicts, one per route, mapping factor name → normalized score.
    """
    n = len(routes)
    if n == 0:
        return []

    temps = [r["temperature"] for r in routes]
    hums = [r["humidity"] for r in routes]
    times = [r["travel_time"] for r in routes]
    aqis = [r["aqi"] for r in routes]
    greens = [r["green_cover"] for r in routes]
    water_pts = [r["water_points"] for r in routes]
    hospital = [r["hospital_access"] for r in routes]
    traffic = [r["traffic"] for r in routes]
    dists = [r["distance"] for r in routes]

    heat_scores = score_heat(temps, hums, times)
    poll_scores = score_pollution(aqis, times)
    green_scores = score_greenery(greens)
    water_scores = score_water(water_pts)
    health_scores = score_healthcare(hospital)
    traffic_scores = score_traffic(traffic)
    tt_scores = score_travel_time(times)
    fuel_scores = score_fuel_efficiency(dists, traffic)

    result = []
    for i in range(n):
        result.append({
            "heat": heat_scores[i],
            "pollution": poll_scores[i],
            "greenery": green_scores[i],
            "water": water_scores[i],
            "healthcare": health_scores[i],
            "traffic": traffic_scores[i],
            "travel_time": tt_scores[i],
            "fuel_efficiency": fuel_scores[i],
        })
    return result


def overall_score(
    factor_scores: Dict[str, float],
    profile: str = "normal_commuter",
) -> float:
    """Compute a single overall score for one route.

    Weights are normalized so they sum to 1 before multiplying.

    Returns a float in [0, 1] where 1.0 = best overall.
    """
    weights = get_weights(profile)
    total_weight = sum(weights.get(f, 0) for f in FACTORS)
    if total_weight == 0:
        return 0.0

    score = 0.0
    for f in FACTORS:
        w = weights.get(f, 0)
        score += (w / total_weight) * factor_scores.get(f, 0)
    return score


def rank_routes(
    routes: List[Dict[str, Any]],
    profile: str = "normal_commuter",
) -> List[Dict[str, Any]]:
    """Score and rank candidate routes for a given user profile.

    Parameters
    ----------
    routes:
        List of route dicts (input schema).
    profile:
        User profile name (e.g. "normal_commuter", "heat_sensitive").

    Returns
    -------
    List of result dicts sorted best-first, each containing:
        route_id, factor_scores, overall_score, rank, recommended
    """
    factor_scores_list = compute_factor_scores(routes)

    scored = []
    for i, route in enumerate(routes):
        fs = factor_scores_list[i]
        os = overall_score(fs, profile)
        scored.append({
            "route_id": route["route_id"],
            "factor_scores": fs,
            "overall_score": round(os, 4),
        })

    # Sort by overall_score descending (best first)
    scored.sort(key=lambda x: x["overall_score"], reverse=True)

    # Assign rank and recommended flag
    for rank, entry in enumerate(scored, start=1):
        entry["rank"] = rank
        entry["recommended"] = (rank == 1)

    return scored
