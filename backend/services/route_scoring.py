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
    efficiency_weight = 10

    # Convert risk factors into positive scores
    heat_score = 1 - route["heat_risk"]
    pollution_score = 1 - route["pollution_risk"]
    traffic_score = 1 - route["traffic"]

    # Calculate weighted score
    score = (
        heat_score * heat_weight +
        pollution_score * pollution_weight +
        traffic_score * traffic_weight +
        route["green_cover"] * green_weight +
        route["water_access"] * water_weight +
        route["healthcare_access"] * healthcare_weight +
        route["efficiency"] * efficiency_weight
    )

    return round(score, 2)