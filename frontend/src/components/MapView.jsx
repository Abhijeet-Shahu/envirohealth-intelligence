import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Droplets, HeartPulse, Trees, Thermometer, Wind } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { mockRoutes, mapMarkers } from '../data/mockData'
import { useThemeStore } from '../store'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const markerColors = {
  water: '#14b8a6',
  healthcare: '#ef4444',
  green: '#10b981',
  heat: '#f97316',
  aqi: '#8b5cf6',
}

function RouteLines({ selectedRoute }) {
  return mockRoutes.map((route) => {
    const isSelected = selectedRoute === route.id
    return (
      <Polyline
        key={route.id}
        positions={route.path}
        pathOptions={{
          color: route.color,
          weight: isSelected ? 6 : 4,
          opacity: isSelected ? 1 : 0.5,
          dashArray: route.recommended ? null : '12,8',
          className: isSelected ? 'route-draw-path' : '',
        }}
        eventHandlers={{
          click: () => {},
        }}
      >
        <Tooltip sticky>
          <div className="font-semibold">{route.name} · Score {route.score}/100</div>
        </Tooltip>
      </Polyline>
    )
  })
}

function MapMarkers() {
  return mapMarkers.map((marker) => (
    <CircleMarker
      key={marker.id}
      center={marker.position}
      radius={8}
      pathOptions={{
        color: markerColors[marker.type],
        fillColor: markerColors[marker.type],
        fillOpacity: 0.7,
        weight: 2,
      }}
    >
      <Popup>
        <div className="font-medium">{marker.label}</div>
      </Popup>
    </CircleMarker>
  ))
}

function MapLegend() {
  const items = [
    { type: 'water', icon: Droplets, label: 'Water', color: '#14b8a6' },
    { type: 'healthcare', icon: HeartPulse, label: 'Healthcare', color: '#ef4444' },
    { type: 'green', icon: Trees, label: 'Green/Shaded', color: '#10b981' },
    { type: 'heat', icon: Thermometer, label: 'Heat Risk', color: '#f97316' },
    { type: 'aqi', icon: Wind, label: 'AQI Hotspot', color: '#8b5cf6' },
  ]

  return (
    <div className="absolute bottom-4 left-4 z-1000 glass-strong rounded-2xl p-3 shadow-xl border border-charcoal-200/30 dark:border-charcoal-700/40 animate-fade-in">
      <p className="text-[10px] font-bold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider mb-2 px-1">Map Legend</p>
      <div className="space-y-1.5">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.type} className="flex items-center gap-2 px-1">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              <Icon className="w-3.5 h-3.5 text-charcoal-600 dark:text-charcoal-300" />
              <span className="text-xs text-charcoal-700 dark:text-charcoal-200 font-medium">{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RecommendedBadge({ route }) {
  return (
    <div className="absolute top-4 right-4 z-1000 glass-strong rounded-2xl px-4 py-3 shadow-xl border border-emerald-500/30 animate-slide-in-right">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">{route.score}</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-mint-400 uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-500/10">Recommended</span>
          </div>
          <p className="text-xs font-semibold text-charcoal-900 dark:text-white mt-0.5">EnviroHealth Score {route.score}/100</p>
        </div>
      </div>
    </div>
  )
}

export default function MapView({ selectedRoute }) {
  const { theme } = useThemeStore()
  const mapRef = useRef(null)
  const route = mockRoutes.find((r) => r.id === selectedRoute) || mockRoutes[1]

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current
      setTimeout(() => map.invalidateSize(), 100)
    }
  }, [])

  const center = [19.0200, 73.0300]

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
        ref={mapRef}
        style={{ borderRadius: '1.5rem' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RouteLines selectedRoute={selectedRoute} />
        <MapMarkers />
        {/* Start marker */}
        <Marker position={mockRoutes[0].path[0]}>
          <Popup><div className="font-semibold">Start: Seawoods</div></Popup>
        </Marker>
        {/* End marker */}
        <Marker position={mockRoutes[0].path[mockRoutes[0].path.length - 1]}>
          <Popup><div className="font-semibold">Destination: VESIT</div></Popup>
        </Marker>
      </MapContainer>

      <RecommendedBadge route={route} />
      <MapLegend />
    </div>
  )
}
