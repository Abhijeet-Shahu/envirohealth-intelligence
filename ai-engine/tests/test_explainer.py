"""Tests for the explainer — recommendation explanations."""

import pytest
from app.explainer import explain_route, explain_recommendation
from app.optimizer import rank_routes
from app.data.sample_routes import DEMO_ROUTES


class TestExplainRoute:

    def setup_method(self):
        self.ranked = rank_routes(DEMO_ROUTES, "normal_commuter")
        self.route_map = {r["route_id"]: r for r in DEMO_ROUTES}

    def test_recommended_route_mentions_recommended(self):
        best = self.ranked[0]
        text = explain_route(best, self.route_map[best["route_id"]])
        assert "recommended" in text.lower()

    def test_non_recommended_shows_score(self):
        second = self.ranked[1]
        text = explain_route(second, self.route_map[second["route_id"]])
        assert "scored" in text.lower()

    def test_mentions_travel_time(self):
        best = self.ranked[0]
        route_data = self.route_map[best["route_id"]]
        text = explain_route(best, route_data)
        assert str(route_data["travel_time"]) in text

    def test_mentions_distance(self):
        best = self.ranked[0]
        route_data = self.route_map[best["route_id"]]
        text = explain_route(best, route_data)
        assert str(route_data["distance"]) in text

    def test_returns_string(self):
        best = self.ranked[0]
        text = explain_route(best, self.route_map[best["route_id"]])
        assert isinstance(text, str)
        assert len(text) > 20


class TestExplainRecommendation:

    def test_returns_one_explanation_per_route(self):
        ranked = rank_routes(DEMO_ROUTES, "heat_sensitive")
        explanations = explain_recommendation(ranked, DEMO_ROUTES)
        assert len(explanations) == len(DEMO_ROUTES)

    def test_all_route_ids_present(self):
        ranked = rank_routes(DEMO_ROUTES, "normal_commuter")
        explanations = explain_recommendation(ranked, DEMO_ROUTES)
        for r in DEMO_ROUTES:
            assert r["route_id"] in explanations

    def test_explanations_are_non_empty(self):
        ranked = rank_routes(DEMO_ROUTES, "normal_commuter")
        explanations = explain_recommendation(ranked, DEMO_ROUTES)
        for text in explanations.values():
            assert len(text) > 0
