"""Tests for the top-level engine entry point."""

import pytest
from app.engine import score_routes
from app.data.sample_routes import DEMO_ROUTES


class TestScoreRoutes:

    def test_returns_all_routes(self):
        results = score_routes(DEMO_ROUTES)
        assert len(results) == 3

    def test_sorted_by_score(self):
        results = score_routes(DEMO_ROUTES)
        scores = [r["overall_score"] for r in results]
        assert scores == sorted(scores, reverse=True)

    def test_has_explanation(self):
        results = score_routes(DEMO_ROUTES)
        for r in results:
            assert "explanation" in r
            assert isinstance(r["explanation"], str)
            assert len(r["explanation"]) > 0

    def test_has_all_fields(self):
        results = score_routes(DEMO_ROUTES)
        for r in results:
            assert "route_id" in r
            assert "factor_scores" in r
            assert "overall_score" in r
            assert "rank" in r
            assert "recommended" in r
            assert "explanation" in r

    def test_normal_commuter_profile(self):
        results = score_routes(DEMO_ROUTES, user_profile="normal_commuter")
        assert results[0]["recommended"] is True

    def test_heat_sensitive_profile(self):
        results = score_routes(DEMO_ROUTES, user_profile="heat_sensitive")
        assert results[0]["recommended"] is True

    def test_different_profiles_may_differ(self):
        nc = score_routes(DEMO_ROUTES, user_profile="normal_commuter")
        hs = score_routes(DEMO_ROUTES, user_profile="heat_sensitive")
        # Overall scores should differ between profiles
        nc_top = nc[0]["overall_score"]
        hs_top = hs[0]["overall_score"]
        nc_id = nc[0]["route_id"]
        hs_id = hs[0]["route_id"]
        # At least scores or top route should differ
        assert nc_top != hs_top or nc_id != hs_id

    def test_output_matches_spec_schema(self):
        """Verify output aligns with Section 18 of the project spec."""
        results = score_routes(DEMO_ROUTES)
        best = results[0]
        assert isinstance(best["overall_score"], float)
        assert best["recommended"] is True
        assert isinstance(best["explanation"], str)
        # factor_scores should contain individual risk/benefit scores
        fs = best["factor_scores"]
        for key in ["heat", "pollution", "greenery", "water",
                     "healthcare", "traffic", "travel_time",
                     "fuel_efficiency"]:
            assert key in fs
            assert 0.0 <= fs[key] <= 1.0
