"""Reusable min-max normalization for route scoring factors.

Every factor is normalized to the 0–1 range so that:
    1.0 = best possible value for that factor
    0.0 = worst possible value for that factor

Two directions are supported:
    "higher_is_better"  — e.g. greenery, water accessibility
    "lower_is_better"   — e.g. heat exposure, AQI, traffic

When min == max (all routes have the same value for a factor),
the function returns a neutral 0.5 to avoid division-by-zero
and avoid artificially penalizing or rewarding that factor.
"""

from typing import List, Literal

Direction = Literal["higher_is_better", "lower_is_better"]


def normalize(
    value: float,
    min_val: float,
    max_val: float,
    direction: Direction,
) -> float:
    """Normalize *value* into [0, 1] given the observed range.

    Parameters
    ----------
    value:
        The raw value for one route on one factor.
    min_val, max_val:
        The minimum and maximum observed across *all* candidate routes
        for this factor.
    direction:
        "higher_is_better" — raw high values map to 1.0.
        "lower_is_better"  — raw low values map to 1.0 (inverted).

    Returns
    -------
    float in [0, 1] where 1.0 is best.
    """
    if max_val == min_val:
        return 0.5

    if direction == "higher_is_better":
        return (value - min_val) / (max_val - min_val)

    # lower_is_better: invert so that the lowest raw value → 1.0
    return (max_val - value) / (max_val - min_val)


def normalize_batch(
    values: List[float],
    direction: Direction,
) -> List[float]:
    """Normalize a list of values (one per candidate route).

    Derives min/max from the list itself, then normalizes each entry.
    Useful when scoring several routes on one factor at once.

    Returns a list of floats in [0, 1].
    """
    if not values:
        return []

    lo = min(values)
    hi = max(values)
    return [normalize(v, lo, hi, direction) for v in values]
