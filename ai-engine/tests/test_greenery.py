"""Tests for greenery / shade scoring."""

import pytest
from app.scoring.greenery import score_greenery


class TestScoreGreenery:

    def test_highest_greenery_scores_best(self):
        scores = score_greenery([0.20, 0.70, 0.55])
        assert scores[1] == pytest.approx(1.0)  # 0.70 is highest
        assert scores[0] == pytest.approx(0.0)  # 0.20 is lowest

    def test_scores_in_range(self):
        scores = score_greenery([0.1, 0.5, 0.9])
        for s in scores:
            assert 0.0 <= s <= 1.0

    def test_identical_values(self):
        scores = score_greenery([0.5, 0.5, 0.5])
        assert scores == [0.5, 0.5, 0.5]

    def test_single_route(self):
        assert score_greenery([0.6]) == [0.5]

    def test_empty(self):
        assert score_greenery([]) == []

    def test_zero_and_one(self):
        scores = score_greenery([0.0, 1.0])
        assert scores[0] == pytest.approx(0.0)
        assert scores[1] == pytest.approx(1.0)
