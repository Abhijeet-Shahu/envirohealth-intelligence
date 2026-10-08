import requests


def get_routes(start_lon, start_lat, end_lon, end_lat):
    """
    Get routes from OSRM.
    """

    url = (
        f"https://router.project-osrm.org/route/v1/driving/"
        f"{start_lon},{start_lat};{end_lon},{end_lat}"
    )

    params = {
    "alternatives": "true",
    "overview": "full",
    "geometries": "geojson"
}

    response = requests.get(url, params=params)

    response.raise_for_status()

    data = response.json()

    routes = []

    for route in data["routes"]:
        routes.append({
    "distance_km": round(route["distance"] / 1000, 2),
    "travel_time_min": round(route["duration"] / 60, 2),
    "geometry": route["geometry"]
})

    return routes
if __name__ == "__main__":
    routes = get_routes(
        72.998,
        19.017,
        72.869,
        19.045
    )

    print(routes)