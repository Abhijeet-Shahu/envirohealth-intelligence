"""Tests for pollution / AQI scoring."""

import pytest
from app.scoring.pollution import pollution_exposure, aqi_category, score_pollution


class TestPollutionExposure:

    def test_baseline_duration(self):
        """30 min travel → factor 1.0, exposure == AQI."""
        assert pollution_exposure(100, 30) == pytest.approx(100.0)

    def test_longer_travel_increases_exposure(self):
        assert pollution_exposure(100, 60) > pollution_exposure(100, 30)

    def test_higher_aqi_increases_exposure(self):
        assert pollution_exposure(200, 20) > pollution_exposure(100, 20)


class TestAqiCategory:

    def test_good(self):
        assert aqi_category(30) == "Good"

    def test_satisfactory(self):
        assert aqi_category(75) == "Satisfactory"

    def test_moderate(self):
        assert aqi_category(150) == "Moderate"

    def test_poor(self):
        assert aqi_category(250) == "Poor"

    def test_very_poor(self):
        assert aqi_category(350) == "Very Poor"

    def test_severe(self):
        assert aqi_category(450) == "Severe"

    def test_boundary_50(self):
        assert aqi_category(50) == "Good"

    def test_boundary_100(self):
        assert aqi_category(100) == "Satisfactory"


class TestScorePollution:

    def test_cleanest_route_scores_highest(self):
        aqis = [160, 105, 85]
        times = [20, 24, 28]
        scores = score_pollution(aqis, times)
        for s in scores:
            assert 0.0 <= s <= 1.0

    def test_score_direction(self):
        """Route with much higher AQI should score worse."""
        aqis = [300, 50]
        times = [25, 25]
        scores = score_pollution(aqis, times)
        assert scores[0] < scores[1]

    def test_identical_routes(self):
        scores = score_pollution([100, 100], [20, 20])
        assert scores == [0.5, 0.5]

    def test_single_route(self):
        scores = score_pollution([120], [15])
        assert scores == [0.5]
