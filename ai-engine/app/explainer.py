"""Explainable recommendation generator.

Produces a human-readable explanation of why a route was recommended,
following the project spec's principle of transparent, explainable
decision-support (Section 15).

Explanations describe *estimated* / *relative* qualities — not
medically validated claims.
"""

from typing import Any, Dict, List


# Friendly labels for each factor
_FACTOR_LABELS = {
    "heat": "estimated heat exposure",
    "pollution": "air quality / pollution exposure",
    "greenery": "greenery and shade",
    "water": "water accessibility",
    "healthcare": "healthcare accessibility",
    "traffic": "traffic congestion",
    "travel_time": "travel time",
    "fuel_efficiency": "estimated fuel efficiency",
}


def _top_strengths(
    factor_scores: Dict[str, float],
    n: int = 3,
) -> List[str]:
    """Return the top-n factor names where this route scores highest."""
    ranked = sorted(factor_scores.items(), key=lambda x: x[1], reverse=True)
    return [name for name, _score in ranked[:n]]


def _top_weaknesses(
    factor_scores: Dict[str, float],
    n: int = 2,
) -> List[str]:
    """Return the bottom-n factor names where this route scores lowest."""
    ranked = sorted(factor_scores.items(), key=lambda x: x[1])
    return [name for name, _score in ranked[:n]]


def explain_route(
    result: Dict[str, Any],
    route_data: Dict[str, Any],
) -> str:
    """Generate a one-paragraph explanation for a single scored route.

    Parameters
    ----------
    result:
        Output from rank_routes() for one route (must have
        factor_scores, overall_score, recommended).
    route_data:
        Original route input dict (for raw values like travel_time).
    """
    rid = result["route_id"]
    fs = result["factor_scores"]
    score_pct = round(result["overall_score"] * 100)

    strengths = _top_strengths(fs)
    strength_parts = [_FACTOR_LABELS.get(s, s) for s in strengths]

    lines = []
    if result.get("recommended"):
        lines.append(
            f"{rid} is the recommended route "
            f"(EnviroHealth Score: {score_pct}/100)."
        )
    else:
        lines.append(
            f"{rid} scored {score_pct}/100."
        )

    lines.append(
        f"It takes approximately {route_data['travel_time']} minutes "
        f"over {route_data['distance']} km."
    )

    lines.append(
        "Its strongest factors are "
        + ", ".join(strength_parts[:-1])
        + f" and {strength_parts[-1]}."
    )

    weaknesses = _top_weaknesses(fs)
    weak_parts = [_FACTOR_LABELS.get(w, w) for w in weaknesses]
    lines.append(
        "Trade-offs include "
        + " and ".join(weak_parts)
        + "."
    )

    return " ".join(lines)


def explain_recommendation(
    ranked: List[Dict[str, Any]],
    routes: List[Dict[str, Any]],
) -> Dict[str, str]:
    """Generate explanations for all ranked routes.

    Parameters
    ----------
    ranked:
        Output from rank_routes() — sorted best-first.
    routes:
        Original route input list (same order as originally passed).

    Returns
    -------
    Dict mapping route_id → explanation string.
    """
    # Build a lookup for original route data by route_id
    route_map = {r["route_id"]: r for r in routes}

    explanations = {}
    for result in ranked:
        rid = result["route_id"]
        route_data = route_map[rid]
        explanations[rid] = explain_route(result, route_data)

    return explanations
