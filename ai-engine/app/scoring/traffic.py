"""Traffic and travel-efficiency scoring for a route.

Traffic congestion: 0–1 where 1 = worst congestion.
    Direction: lower is better (less traffic → better).

Travel time scoring:
    Direction: lower is better (shorter travel → better).

Fuel efficiency is *estimated* from traffic and distance — routes with
lower congestion and shorter distance are assumed to have potentially
better fuel efficiency.  This is a prototype estimate, not a validated
vehicle-specific calculation.
"""

from typing import List

from app.normalization import normalize_batch


def score_traffic(traffic_levels: List[float]) -> List[float]:
    """Normalized traffic scores for candidate routes.

    Parameters
    ----------
    traffic_levels:
        Congestion level (0–1, where 1 = worst) for each route.

    Returns list of floats in [0, 1] where 1.0 = least congestion.
    """
    return normalize_batch(traffic_levels, direction="lower_is_better")


def score_travel_time(travel_times: List[float]) -> List[float]:
    """Normalized travel-time scores for candidate routes.

    Returns list of floats in [0, 1] where 1.0 = shortest travel time.
    """
    return normalize_batch(travel_times, direction="lower_is_better")


def fuel_efficiency_estimate(
    distance_km: float,
    traffic: float,
) -> float:
    """Estimated fuel-efficiency value for one route (lower is better).

    Higher congestion and longer distance increase estimated fuel use.
    The traffic penalty models stop-and-go conditions using a simple
    multiplier.

    Returns an unbounded positive number representing *relative*
    estimated fuel consumption — not actual litres or cost.
    """
    # stop-and-go multiplier: traffic 0 → factor 1.0, traffic 1 → factor 1.5
    congestion_factor = 1.0 + (traffic * 0.5)
    return distance_km * congestion_factor


def score_fuel_efficiency(
    distances: List[float],
    traffic_levels: List[float],
) -> List[float]:
    """Normalized fuel-efficiency scores for candidate routes.

    Returns list of floats in [0, 1] where 1.0 = best estimated
    fuel efficiency (lowest estimated consumption).
    """
    raw = [
        fuel_efficiency_estimate(d, t)
        for d, t in zip(distances, traffic_levels)
    ]
    return normalize_batch(raw, direction="lower_is_better")
