"""Tests for the optimizer — weighted scoring and route ranking."""

import pytest
from app.optimizer import compute_factor_scores, overall_score, rank_routes
from app.data.sample_routes import DEMO_ROUTES
from app.profiles import FACTORS


class TestComputeFactorScores:

    def test_returns_one_dict_per_route(self):
        result = compute_factor_scores(DEMO_ROUTES)
        assert len(result) == len(DEMO_ROUTES)

    def test_all_factors_present(self):
        result = compute_factor_scores(DEMO_ROUTES)
        for fs in result:
            for f in FACTORS:
                assert f in fs

    def test_scores_in_range(self):
        result = compute_factor_scores(DEMO_ROUTES)
        for fs in result:
            for f in FACTORS:
                assert 0.0 <= fs[f] <= 1.0, f"{f} out of range: {fs[f]}"

    def test_empty_routes(self):
        assert compute_factor_scores([]) == []


class TestOverallScore:

    def test_perfect_scores_give_one(self):
        perfect = {f: 1.0 for f in FACTORS}
        assert overall_score(perfect, "normal_commuter") == pytest.approx(1.0)

    def test_zero_scores_give_zero(self):
        zeros = {f: 0.0 for f in FACTORS}
        assert overall_score(zeros, "normal_commuter") == pytest.approx(0.0)

    def test_different_profiles_different_scores(self):
        """A route strong in heat/pollution should score differently."""
        mixed = {
            "heat": 0.9, "pollution": 0.9, "greenery": 0.8,
            "water": 0.7, "healthcare": 0.7,
            "traffic": 0.2, "travel_time": 0.2, "fuel_efficiency": 0.3,
        }
        nc = overall_score(mixed, "normal_commuter")
        hs = overall_score(mixed, "heat_sensitive")
        # heat_sensitive weights health factors more → higher score
        assert hs > nc


class TestRankRoutes:

    def test_returns_correct_count(self):
        ranked = rank_routes(DEMO_ROUTES, "normal_commuter")
        assert len(ranked) == 3

    def test_sorted_descending(self):
        ranked = rank_routes(DEMO_ROUTES, "normal_commuter")
        scores = [r["overall_score"] for r in ranked]
        assert scores == sorted(scores, reverse=True)

    def test_ranks_assigned(self):
        ranked = rank_routes(DEMO_ROUTES, "normal_commuter")
        assert [r["rank"] for r in ranked] == [1, 2, 3]

    def test_only_first_is_recommended(self):
        ranked = rank_routes(DEMO_ROUTES, "normal_commuter")
        assert ranked[0]["recommended"] is True
        for r in ranked[1:]:
            assert r["recommended"] is False

    def test_each_result_has_factor_scores(self):
        ranked = rank_routes(DEMO_ROUTES, "normal_commuter")
        for r in ranked:
            assert "factor_scores" in r
            assert "overall_score" in r
            assert "route_id" in r

    def test_different_profile_may_change_ranking(self):
        nc = rank_routes(DEMO_ROUTES, "normal_commuter")
        hs = rank_routes(DEMO_ROUTES, "heat_sensitive")
        # Not guaranteed to differ, but the scores should differ
        nc_scores = {r["route_id"]: r["overall_score"] for r in nc}
        hs_scores = {r["route_id"]: r["overall_score"] for r in hs}
        # At least one route's score should change
        changed = any(
            nc_scores[rid] != hs_scores[rid]
            for rid in nc_scores
        )
        assert changed
