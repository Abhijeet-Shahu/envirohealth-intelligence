"""Water and healthcare accessibility scoring for a route.

Water accessibility: based on count of water points along the route.
    Direction: higher is better (more water points → better).

Healthcare accessibility: based on a proximity score (0–1) representing
    how close/accessible hospitals are along the route.
    Direction: higher is better.
"""

from typing import List

from app.normalization import normalize_batch


def score_water(water_points: List[int]) -> List[float]:
    """Normalized water-accessibility scores for candidate routes.

    Parameters
    ----------
    water_points:
        Count of water points along each route.

    Returns list of floats in [0, 1] where 1.0 = most water access.
    """
    return normalize_batch(
        [float(w) for w in water_points],
        direction="higher_is_better",
    )


def score_healthcare(hospital_access_scores: List[float]) -> List[float]:
    """Normalized healthcare-accessibility scores for candidate routes.

    Parameters
    ----------
    hospital_access_scores:
        Proximity/accessibility score (0–1) for each route.

    Returns list of floats in [0, 1] where 1.0 = best healthcare access.
    """
    return normalize_batch(hospital_access_scores, direction="higher_is_better")
