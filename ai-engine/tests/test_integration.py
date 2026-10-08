"""Integration test: score the demo routes end-to-end."""

import pytest
from app.data.sample_routes import DEMO_ROUTES
from app.scoring.heat import score_heat
from app.scoring.pollution import score_pollution
from app.scoring.greenery import score_greenery


class TestDemoRoutes:
    """Run the implemented scoring factors over the sample route data."""

    def setup_method(self):
        self.routes = DEMO_ROUTES
        self.temps = [r["temperature"] for r in self.routes]
        self.hums = [r["humidity"] for r in self.routes]
        self.times = [r["travel_time"] for r in self.routes]
        self.aqis = [r["aqi"] for r in self.routes]
        self.greens = [r["green_cover"] for r in self.routes]

    def test_three_routes_present(self):
        assert len(self.routes) == 3

    def test_heat_scores(self):
        scores = score_heat(self.temps, self.hums, self.times)
        assert len(scores) == 3
        for s in scores:
            assert 0.0 <= s <= 1.0

    def test_pollution_scores(self):
        scores = score_pollution(self.aqis, self.times)
        assert len(scores) == 3
        for s in scores:
            assert 0.0 <= s <= 1.0

    def test_greenery_scores(self):
        scores = score_greenery(self.greens)
        assert len(scores) == 3
        for s in scores:
            assert 0.0 <= s <= 1.0

    def test_route_b_better_greenery(self):
        """Route B has the highest green cover (0.70)."""
        scores = score_greenery(self.greens)
        assert scores[1] == pytest.approx(1.0)

    def test_route_a_worst_pollution(self):
        """Route A has AQI 160 and shortest time — verify relative rank."""
        scores = score_pollution(self.aqis, self.times)
        # Route A: 160 * (20/30) = 106.7
        # Route B: 105 * (24/30) = 84.0
        # Route C: 85  * (28/30) = 79.3
        # Route A has highest raw exposure → lowest score
        assert scores[0] == pytest.approx(0.0)
