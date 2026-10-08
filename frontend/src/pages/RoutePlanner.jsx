import { Map as MapIcon, Sparkles } from 'lucide-react'
import RouteSearch from '../components/RouteSearch'
import MapView from '../components/MapView'
import RouteCard from '../components/RouteCard'
import AIExplanation from '../components/AlExplanation'
import EnvironmentalMetrics from '../components/EnvironmentalMetrics'
import { useRouteStore } from '../store'
import { mockRoutes } from '../data/mockData'
import { useState } from 'react'

export default function RoutePlanner() {
  const { selectedRoute, setSelectedRoute, analyzed } = useRouteStore()
  const [showResults, setShowResults] = useState(true)
  const selectedRouteData = mockRoutes.find((r) => r.id === selectedRoute) || mockRoutes[1]

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal-900 dark:text-white">Route Planner</h1>
        <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Find the route that's better for you.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-4">
        {/* Left: search + route cards */}
        <div className="lg:col-span-4 space-y-4">
          <RouteSearch onAnalyze={() => setShowResults(true)} />

          {showResults && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-charcoal-700 dark:text-charcoal-200 px-1">Route Comparison</h3>

              {/* Mobile: horizontal scroll / Desktop: stacked */}
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible scrollbar-hide pb-2 lg:pb-0 snap-x">
                {mockRoutes.map((route) => (
                  <div key={route.id} className="min-w-70 lg:min-w-0 snap-start">
                    <RouteCard route={route} onSelect={setSelectedRoute} selected={selectedRoute === route.id} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: map + metrics */}
        <div className="lg:col-span-8 space-y-4">
          {/* Map */}
          <div className="h-100 md:h-120 rounded-3xl overflow-hidden border border-charcoal-200/30 dark:border-charcoal-700/40 shadow-xl">
            <MapView selectedRoute={selectedRoute} />
          </div>

          {showResults && (
            <>
              {/* AI Explanation */}
              <AIExplanation route={selectedRouteData} />

              {/* Environmental Metrics */}
              <div>
                <h3 className="text-sm font-bold text-charcoal-700 dark:text-charcoal-200 mb-3 px-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> Environmental Metrics
                </h3>
                <EnvironmentalMetrics />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
