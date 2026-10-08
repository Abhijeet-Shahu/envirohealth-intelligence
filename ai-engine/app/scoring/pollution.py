"""Pollution / AQI risk scoring for a route.

Uses the AQI value and travel duration to estimate relative pollution
exposure along a route.  Values are *illustrative / prototype*.

Direction: lower is better (less pollution exposure → better score
after normalization).
"""

from typing import List

from app.normalization import normalize_batch


def pollution_exposure(aqi: float, travel_time_min: float) -> float:
    """Raw pollution-exposure value for one route.

    Higher AQI and longer travel time both increase exposure.
    Duration is referenced against a 30-minute baseline.

    Returns an unbounded positive number (lower is better).
    """
    duration_factor = travel_time_min / 30.0
    return aqi * duration_factor


def aqi_category(aqi: float) -> str:
    """Human-readable AQI category (India NAQI breakpoints).

    Useful for explanation text — not used in the numeric score.
    """
    if aqi <= 50:
        return "Good"
    if aqi <= 100:
        return "Satisfactory"
    if aqi <= 200:
        return "Moderate"
    if aqi <= 300:
        return "Poor"
    if aqi <= 400:
        return "Very Poor"
    return "Severe"


def score_pollution(
    aqis: List[float],
    travel_times: List[float],
) -> List[float]:
    """Normalized pollution scores for candidate routes.

    Returns list of floats in [0, 1] where 1.0 = lowest pollution
    exposure.
    """
    raw = [
        pollution_exposure(a, t)
        for a, t in zip(aqis, travel_times)
    ]
    return normalize_batch(raw, direction="lower_is_better")
