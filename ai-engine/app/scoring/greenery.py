"""Greenery / shade scoring for a route.

Uses a green-cover fraction (0–1) representing the proportion of the
route that has meaningful tree cover or green space.

Direction: higher is better (more greenery → better score after
normalization).
"""

from typing import List

from app.normalization import normalize_batch


def score_greenery(green_covers: List[float]) -> List[float]:
    """Normalized greenery scores for candidate routes.

    Parameters
    ----------
    green_covers:
        List of green-cover fractions (0.0–1.0) for each route.

    Returns list of floats in [0, 1] where 1.0 = most greenery.
    """
    return normalize_batch(green_covers, direction="higher_is_better")
