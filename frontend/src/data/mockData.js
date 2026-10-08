export const mockRoutes = [
  {
    id: 'A',
    name: 'Route A',
    duration: 20,
    distance: 8.0,
    score: 68,
    recommended: false,
    color: '#ef4444',
    heat: 'HIGH',
    aqi: 'HIGH',
    greenCover: 'LOW',
    traffic: 'HIGH',
    water: 0,
    healthcare: 'LOW',
    path: [
      [19.0061, 73.0198],
      [19.0150, 73.0250],
      [19.0220, 73.0300],
      [19.0300, 73.0350],
      [19.0380, 73.0420],
    ],
    metrics: {
      heatExposure: '78%',
      airQualityIndex: 165,
      greenCoverage: 20,
      fuelEfficiency: -5,
      emissionReduction: -2,
    },
  },
  {
    id: 'B',
    name: 'Route B',
    duration: 24,
    distance: 8.2,
    score: 91,
    recommended: true,
    color: '#10b981',
    heat: 'LOW',
    aqi: 'MODERATE',
    greenCover: 'HIGH',
    traffic: 'LOW',
    water: 2,
    healthcare: 'GOOD',
    path: [
      [19.0061, 73.0198],
      [19.0080, 73.0150],
      [19.0120, 73.0180],
      [19.0180, 73.0220],
      [19.0250, 73.0280],
      [19.0320, 73.0350],
      [19.0380, 73.0420],
    ],
    metrics: {
      heatExposure: '32% lower',
      airQualityIndex: 105,
      greenCoverage: 70,
      fuelEfficiency: 12,
      emissionReduction: 8,
    },
  },
  {
    id: 'C',
    name: 'Route C',
    duration: 22,
    distance: 8.5,
    score: 78,
    recommended: false,
    color: '#f59e0b',
    heat: 'MEDIUM',
    aqi: 'MODERATE',
    greenCover: 'MEDIUM',
    traffic: 'MEDIUM',
    water: 1,
    healthcare: 'MEDIUM',
    path: [
      [19.0061, 73.0198],
      [19.0100, 73.0220],
      [19.0160, 73.0260],
      [19.0240, 73.0320],
      [19.0300, 73.0380],
      [19.0380, 73.0420],
    ],
    metrics: {
      heatExposure: '50%',
      airQualityIndex: 120,
      greenCoverage: 45,
      fuelEfficiency: 5,
      emissionReduction: 3,
    },
  },
]

export const mapMarkers = [
  { id: 1, position: [19.0150, 73.0220], type: 'water', label: 'Water Station - Sector 14' },
  { id: 2, position: [19.0250, 73.0320], type: 'healthcare', label: 'Community Health Center' },
  { id: 3, position: [19.0200, 73.0250], type: 'green', label: 'Green Cover - 70% Canopy' },
  { id: 4, position: [19.0120, 73.0280], type: 'heat', label: 'Heat Risk Zone - High Exposure' },
  { id: 5, position: [19.0080, 73.0200], type: 'aqi', label: 'AQI Hotspot - PM2.5 Elevated' },
  { id: 6, position: [19.0280, 73.0360], type: 'water', label: 'Water Station - Near Station' },
  { id: 7, position: [19.0180, 73.0240], type: 'green', label: 'Shaded Pathway - Tree Lined' },
]

export const savedRoutes = [
  {
    id: 'sr1',
    from: 'Seawoods',
    to: 'VESIT',
    distance: 8.2,
    duration: 24,
    score: 91,
    lastAnalyzed: '2 hours ago',
    recommended: 'B',
  },
  {
    id: 'sr2',
    from: 'Home',
    to: 'College',
    distance: 5.5,
    duration: 18,
    score: 84,
    lastAnalyzed: 'Yesterday',
    recommended: 'B',
  },
  {
    id: 'sr3',
    from: 'College',
    to: 'Hackathon Venue',
    distance: 3.2,
    duration: 12,
    score: 88,
    lastAnalyzed: '3 days ago',
    recommended: 'A',
  },
  {
    id: 'sr4',
    from: 'Seawoods',
    to: 'Nerul Station',
    distance: 4.0,
    duration: 15,
    score: 79,
    lastAnalyzed: '5 days ago',
    recommended: 'C',
  },
]

export const environmentalMetrics = [
  { key: 'heat', label: 'Heat Exposure', value: '32% lower', icon: 'Thermometer', status: 'good', progress: 32, color: '#10b981' },
  { key: 'aqi', label: 'Air Quality', value: 'AQI 105', subtitle: 'Moderate', icon: 'Wind', status: 'moderate', progress: 52, color: '#f59e0b' },
  { key: 'green', label: 'Green Coverage', value: '70%', icon: 'Trees', status: 'good', progress: 70, color: '#10b981' },
  { key: 'water', label: 'Water Access', value: '2 points', icon: 'Droplets', status: 'good', progress: 80, color: '#14b8a6' },
  { key: 'healthcare', label: 'Healthcare Access', value: 'Good', icon: 'HeartPulse', status: 'good', progress: 75, color: '#059669' },
  { key: 'traffic', label: 'Traffic', value: 'Low', icon: 'Car', status: 'good', progress: 25, color: '#34d399' },
  { key: 'fuel', label: 'Fuel Efficiency', value: 'Potentially better', icon: 'Fuel', status: 'good', progress: 62, color: '#0d9488' },
  { key: 'emission', label: 'Emission Impact', value: 'Potential reduction', icon: 'Leaf', status: 'good', progress: 58, color: '#059669' },
]

export const chartData = [
  { metric: 'Heat', A: 78, B: 32, C: 50 },
  { metric: 'AQI', A: 165, B: 105, C: 120 },
  { metric: 'Green %', A: 20, B: 70, C: 45 },
  { metric: 'Traffic', A: 80, B: 25, C: 50 },
  { metric: 'Score', A: 68, B: 91, C: 78 },
]

export const radarData = [
  { metric: 'Speed', A: 85, B: 60, C: 72 },
  { metric: 'Low Heat', A: 25, B: 90, C: 55 },
  { metric: 'Air Quality', A: 30, B: 65, C: 58 },
  { metric: 'Greenery', A: 20, B: 88, C: 50 },
  { metric: 'Healthcare', A: 35, B: 78, C: 55 },
  { metric: 'Low Traffic', A: 20, B: 85, C: 50 },
]

export const profilePresets = {
  normal: {
    travelTime: 40,
    heatProtection: 30,
    airQuality: 50,
    greenery: 35,
    waterAccess: 20,
    healthcare: 25,
  },
  heatSensitive: {
    travelTime: 20,
    heatProtection: 90,
    airQuality: 70,
    greenery: 60,
    waterAccess: 65,
    healthcare: 70,
  },
}

export const notifications = [
  { id: 1, title: 'Air quality alert', message: 'AQI in Seawoods has improved to Moderate', time: '5 min ago', type: 'success' },
  { id: 2, title: 'Route analyzed', message: 'Route B recommended for Seawoods → VESIT', time: '2 hours ago', type: 'info' },
  { id: 3, title: 'Heat advisory', message: 'High temperature expected near Route A', time: '3 hours ago', type: 'warning' },
]

export const locations = ['Seawoods', 'VESIT', 'Nerul', 'Belapur', 'Kharghar', 'Vashi', 'CBD Belapur', 'Juinagar', 'Sanpada', 'Turbhe']
