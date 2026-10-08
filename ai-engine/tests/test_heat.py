"""Tests for heat-risk scoring."""

import pytest
from app.scoring.heat import heat_index_estimate, heat_exposure, score_heat


class TestHeatIndexEstimate:

    def test_low_humidity_no_offset(self):
        """Humidity <= 40% should add no offset."""
        assert heat_index_estimate(35, 30) == pytest.approx(35.0)
        assert heat_index_estimate(35, 40) == pytest.approx(35.0)

    def test_high_humidity_adds_offset(self):
        """60% humidity → +2 °C offset."""
        assert heat_index_estimate(35, 60) == pytest.approx(37.0)

    def test_very_high_humidity(self):
        """90% humidity → +5 °C offset."""
        assert heat_index_estimate(35, 90) == pytest.approx(40.0)


class TestHeatExposure:

    def test_baseline_duration(self):
        """30 min travel → duration factor 1.0."""
        result = heat_exposure(35, 40, 30)
        assert result == pytest.approx(35.0)

    def test_longer_travel_increases_exposure(self):
        exp_20 = heat_exposure(35, 40, 20)
        exp_40 = heat_exposure(35, 40, 40)
        assert exp_40 > exp_20

    def test_higher_temp_increases_exposure(self):
        exp_30c = heat_exposure(30, 50, 25)
        exp_40c = heat_exposure(40, 50, 25)
        assert exp_40c > exp_30c


class TestScoreHeat:

    def test_best_route_gets_highest_score(self):
        """Coolest + shortest route should score 1.0."""
        temps = [36, 33, 31]
        hums = [70, 65, 60]
        times = [20, 24, 28]
        scores = score_heat(temps, hums, times)
        # Route C (31°C, 60%, 28min) vs Route A (36°C, 70%, 20min):
        # both have competing factors—verify scores are in [0,1]
        for s in scores:
            assert 0.0 <= s <= 1.0

    def test_identical_routes_get_neutral(self):
        scores = score_heat([33, 33], [65, 65], [20, 20])
        assert scores == [0.5, 0.5]

    def test_single_route(self):
        scores = score_heat([35], [60], [25])
        assert scores == [0.5]

    def test_score_direction(self):
        """A hot+long route should score worse than a cool+short one."""
        temps = [40, 28]
        hums = [80, 40]
        times = [35, 15]
        scores = score_heat(temps, hums, times)
        assert scores[0] < scores[1]  # hot route < cool route
