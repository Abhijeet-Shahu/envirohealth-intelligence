def calculate_route_score(route):
    """
    Calculate the EnviroHealth score for a route.
    Score is between 0 and 100.
    Higher score = better route.
    """

    # Weights
    heat_weight = 20
    pollution_weight = 20
    traffic_weight = 15
    green_weight = 15
    water_weight = 10
    healthcare_weight = 10
    travel_time_weight = 5
    efficiency_weight = 5

    # Convert risk factors into positive scores
    heat_score = 1 - route["heat_risk"]
    pollution_score = 1 - route["pollution_risk"]
    traffic_score = 1 - route["traffic"]

    # Travel time score
    # Lower travel time = higher score
    max_travel_time = 30

    travel_time_score = 1 - (
        route["travel_time_min"] / max_travel_time
    )

    travel_time_score = max(0, travel_time_score)

    # Calculate weighted score
    score = (
        heat_score * heat_weight +
        pollution_score * pollution_weight +
        traffic_score * traffic_weight +
        route["green_cover"] * green_weight +
        route["water_access"] * water_weight +
        route["healthcare_access"] * healthcare_weight +
        travel_time_score * travel_time_weight +
        route["efficiency"] * efficiency_weight
    )

    # Store contribution of each factor
    route["score_breakdown"] = {
        "heat": round(heat_score * heat_weight, 2),
        "pollution": round(pollution_score * pollution_weight, 2),
        "traffic": round(traffic_score * traffic_weight, 2),
        "greenery": round(route["green_cover"] * green_weight, 2),
        "water": round(route["water_access"] * water_weight, 2),
        "healthcare": round(route["healthcare_access"] * healthcare_weight, 2),
        "travel_time": round(travel_time_score * travel_time_weight, 2),
        "efficiency": round(route["efficiency"] * efficiency_weight, 2)
    }

    return round(score, 2)