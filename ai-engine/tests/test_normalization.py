"""Tests for the normalization module."""

import pytest
from app.normalization import normalize, normalize_batch


class TestNormalize:
    """Tests for the single-value normalize function."""

    # --- higher_is_better ---

    def test_higher_is_better_max_returns_one(self):
        assert normalize(100, 0, 100, "higher_is_better") == 1.0

    def test_higher_is_better_min_returns_zero(self):
        assert normalize(0, 0, 100, "higher_is_better") == 0.0

    def test_higher_is_better_mid(self):
        assert normalize(50, 0, 100, "higher_is_better") == pytest.approx(0.5)

    # --- lower_is_better ---

    def test_lower_is_better_min_returns_one(self):
        assert normalize(0, 0, 100, "lower_is_better") == 1.0

    def test_lower_is_better_max_returns_zero(self):
        assert normalize(100, 0, 100, "lower_is_better") == 0.0

    def test_lower_is_better_mid(self):
        assert normalize(50, 0, 100, "lower_is_better") == pytest.approx(0.5)

    # --- edge case: min == max ---

    def test_equal_min_max_returns_neutral(self):
        """When all routes share the same value, return 0.5 (neutral)."""
        assert normalize(42, 42, 42, "higher_is_better") == 0.5
        assert normalize(42, 42, 42, "lower_is_better") == 0.5

    # --- range validation ---

    def test_result_within_zero_one(self):
        for val in [10, 30, 50, 70, 90]:
            h = normalize(val, 10, 90, "higher_is_better")
            l = normalize(val, 10, 90, "lower_is_better")
            assert 0.0 <= h <= 1.0
            assert 0.0 <= l <= 1.0

    def test_inverse_directions_sum_to_one(self):
        """For the same value, higher + lower scores should sum to 1."""
        for val in [20, 50, 80]:
            h = normalize(val, 0, 100, "higher_is_better")
            l = normalize(val, 0, 100, "lower_is_better")
            assert h + l == pytest.approx(1.0)


class TestNormalizeBatch:
    """Tests for the batch normalize function."""

    def test_empty_list(self):
        assert normalize_batch([], "higher_is_better") == []

    def test_single_value(self):
        result = normalize_batch([5.0], "higher_is_better")
        assert result == [0.5]

    def test_two_values_higher(self):
        result = normalize_batch([10.0, 20.0], "higher_is_better")
        assert result[0] == pytest.approx(0.0)
        assert result[1] == pytest.approx(1.0)

    def test_two_values_lower(self):
        result = normalize_batch([10.0, 20.0], "lower_is_better")
        assert result[0] == pytest.approx(1.0)
        assert result[1] == pytest.approx(0.0)

    def test_three_routes(self):
        result = normalize_batch([100, 200, 300], "lower_is_better")
        assert result[0] == pytest.approx(1.0)   # lowest raw → best
        assert result[1] == pytest.approx(0.5)
        assert result[2] == pytest.approx(0.0)   # highest raw → worst

    def test_all_same_values(self):
        result = normalize_batch([7, 7, 7], "higher_is_better")
        assert result == [0.5, 0.5, 0.5]
