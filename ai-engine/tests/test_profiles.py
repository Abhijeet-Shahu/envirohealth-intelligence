"""Tests for user profiles and weight presets."""

import pytest
from app.profiles import get_weights, PROFILES, FACTORS


class TestProfiles:

    def test_normal_commuter_exists(self):
        w = get_weights("normal_commuter")
        assert isinstance(w, dict)
        for f in FACTORS:
            assert f in w

    def test_heat_sensitive_exists(self):
        w = get_weights("heat_sensitive")
        assert isinstance(w, dict)
        for f in FACTORS:
            assert f in w

    def test_unknown_profile_falls_back(self):
        """Unknown profile should return normal_commuter weights."""
        w = get_weights("unknown_xyz")
        assert w == PROFILES["normal_commuter"]

    def test_weights_sum_to_one(self):
        """Each profile's weights should sum to 1.0."""
        for name, weights in PROFILES.items():
            total = sum(weights.values())
            assert total == pytest.approx(1.0), f"{name} weights sum to {total}"

    def test_heat_sensitive_prioritizes_heat(self):
        nc = get_weights("normal_commuter")
        hs = get_weights("heat_sensitive")
        assert hs["heat"] > nc["heat"]
        assert hs["pollution"] > nc["pollution"]

    def test_normal_commuter_prioritizes_travel(self):
        nc = get_weights("normal_commuter")
        hs = get_weights("heat_sensitive")
        assert nc["travel_time"] > hs["travel_time"]
        assert nc["fuel_efficiency"] > hs["fuel_efficiency"]
