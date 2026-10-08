"""Heat-risk scoring for a route.

Estimates relative heat exposure based on temperature, humidity and
travel duration.  Values are *illustrative / prototype* — not
medically validated predictions.

Direction: lower is better (less heat exposure → better score after
normalization).
"""

from typing import List

from app.normalization import normalize_batch


def heat_index_estimate(temperature_c: float, humidity_pct: float) -> float:
    """Simplified heat-index estimate (°C-equivalent).

    Uses a linear approximation suitable for the 25–45 °C range common
    in Indian urban environments.  This is a *prototype* formula — not
    a full Rothfusz regression.

    Returns a value in roughly the same unit as temperature but
    adjusted upward when humidity is high.
    """
    # Every 10 % of humidity above 40 % adds ~1 °C of perceived heat
    humidity_offset = max(0.0, (humidity_pct - 40.0)) * 0.1
    return temperature_c + humidity_offset


def heat_exposure(
    temperature_c: float,
    humidity_pct: float,
    travel_time_min: float,
) -> float:
    """Raw heat-exposure score for one route.

    Combines perceived heat intensity with how long the commuter is
    exposed (travel duration).  Longer time in higher heat → higher
    exposure value.

    Returns an unbounded positive number (lower is better).
    """
    hi = heat_index_estimate(temperature_c, humidity_pct)
    # Scale by travel time; normalize to 30 min as a reference baseline
    duration_factor = travel_time_min / 30.0
    return hi * duration_factor


def score_heat(
    temperatures: List[float],
    humidities: List[float],
    travel_times: List[float],
) -> List[float]:
    """Normalized heat scores for a set of candidate routes.

    Each list element corresponds to one route.  All three lists must
    have the same length.

    Returns list of floats in [0, 1] where 1.0 = lowest heat exposure.
    """
    raw = [
        heat_exposure(t, h, d)
        for t, h, d in zip(temperatures, humidities, travel_times)
    ]
    return normalize_batch(raw, direction="lower_is_better")
