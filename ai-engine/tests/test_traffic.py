"""Tests for traffic and fuel-efficiency scoring."""

import pytest
from app.scoring.traffic import (
    score_traffic,
    score_travel_time,
    fuel_efficiency_estimate,
    score_fuel_efficiency,
)


class TestScoreTraffic:

    def test_lowest_congestion_scores_best(self):
        scores = score_traffic([0.75, 0.40, 0.50])
        assert scores[1] == pytest.approx(1.0)  # 0.40 = least congestion
        assert scores[0] == pytest.approx(0.0)  # 0.75 = most congestion

    def test_scores_in_range(self):
        for s in score_traffic([0.1, 0.5, 0.9]):
            assert 0.0 <= s <= 1.0

    def test_identical_values(self):
        assert score_traffic([0.5, 0.5]) == [0.5, 0.5]


class TestScoreTravelTime:

    def test_shortest_time_scores_best(self):
        scores = score_travel_time([20, 24, 28])
        assert scores[0] == pytest.approx(1.0)  # 20 min = shortest
        assert scores[2] == pytest.approx(0.0)  # 28 min = longest

    def test_identical_values(self):
        assert score_travel_time([15, 15]) == [0.5, 0.5]


class TestFuelEfficiencyEstimate:

    def test_no_traffic_equals_distance(self):
        """traffic=0 → factor 1.0, so estimate = distance."""
        assert fuel_efficiency_estimate(10.0, 0.0) == pytest.approx(10.0)

    def test_max_traffic_adds_50pct(self):
        """traffic=1 → factor 1.5, so estimate = distance * 1.5."""
        assert fuel_efficiency_estimate(10.0, 1.0) == pytest.approx(15.0)

    def test_higher_traffic_worse(self):
        low = fuel_efficiency_estimate(8.0, 0.2)
        high = fuel_efficiency_estimate(8.0, 0.8)
        assert high > low

    def test_longer_distance_worse(self):
        short = fuel_efficiency_estimate(5.0, 0.5)
        long = fuel_efficiency_estimate(15.0, 0.5)
        assert long > short


class TestScoreFuelEfficiency:

    def test_best_efficiency_scores_highest(self):
        distances = [7.5, 8.2, 9.0]
        traffic = [0.75, 0.40, 0.50]
        scores = score_fuel_efficiency(distances, traffic)
        for s in scores:
            assert 0.0 <= s <= 1.0

    def test_score_direction(self):
        """Short + low traffic should beat long + high traffic."""
        scores = score_fuel_efficiency([5.0, 15.0], [0.1, 0.9])
        assert scores[0] > scores[1]

    def test_identical(self):
        scores = score_fuel_efficiency([10, 10], [0.5, 0.5])
        assert scores == [0.5, 0.5]
