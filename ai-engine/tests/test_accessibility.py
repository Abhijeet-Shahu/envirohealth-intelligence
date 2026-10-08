"""Tests for water and healthcare accessibility scoring."""

import pytest
from app.scoring.accessibility import score_water, score_healthcare


class TestScoreWater:

    def test_most_water_scores_best(self):
        scores = score_water([0, 2, 1])
        assert scores[1] == pytest.approx(1.0)  # 2 points = best
        assert scores[0] == pytest.approx(0.0)  # 0 points = worst

    def test_scores_in_range(self):
        scores = score_water([0, 1, 3, 5])
        for s in scores:
            assert 0.0 <= s <= 1.0

    def test_identical_values(self):
        scores = score_water([2, 2, 2])
        assert scores == [0.5, 0.5, 0.5]

    def test_single_route(self):
        assert score_water([3]) == [0.5]

    def test_zero_water_points(self):
        scores = score_water([0, 0, 1])
        assert scores[0] == pytest.approx(0.0)
        assert scores[1] == pytest.approx(0.0)
        assert scores[2] == pytest.approx(1.0)


class TestScoreHealthcare:

    def test_best_access_scores_highest(self):
        scores = score_healthcare([0.30, 0.80, 0.60])
        assert scores[1] == pytest.approx(1.0)
        assert scores[0] == pytest.approx(0.0)

    def test_scores_in_range(self):
        scores = score_healthcare([0.1, 0.5, 0.9])
        for s in scores:
            assert 0.0 <= s <= 1.0

    def test_identical_values(self):
        scores = score_healthcare([0.5, 0.5])
        assert scores == [0.5, 0.5]

    def test_single_route(self):
        assert score_healthcare([0.7]) == [0.5]
