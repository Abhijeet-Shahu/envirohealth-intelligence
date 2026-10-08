import { Bookmark, Clock, MapPin, Trash2, RefreshCw, Plus, ArrowRight } from 'lucide-react'
import { savedRoutes } from '../data/mockData'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function SavedRoutes({ onNavigate }) {
  const [routes, setRoutes] = useState(savedRoutes)

  const handleRemove = (id) => {
    setRoutes(routes.filter((r) => r.id !== id))
    toast.success('Route removed')
  }

  const handleAnalyze = (route) => {
    toast.success(`Re-analyzing ${route.from} → ${route.to}...`)
    onNavigate('planner')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-charcoal-900 dark:text-white flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-emerald-500" /> Saved Routes
          </h1>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">Your frequently used routes, ready to re-analyze.</p>
        </div>
        <button
          onClick={() => onNavigate('planner')}
          className="btn bg-linear-to-r from-emerald-500 to-teal-500 text-white border-none rounded-xl gap-2 hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" /> New Route
        </button>
      </div>

      {/* Route cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {routes.map((route, i) => (
          <div
            key={route.id}
            className="glass-strong rounded-2xl p-5 border border-charcoal-200/30 dark:border-charcoal-700/40 hover:scale-[1.01] transition-transform duration-200 animate-slide-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Route info */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-charcoal-900 dark:text-white text-sm">{route.from}</p>
                  <div className="flex items-center gap-1 text-xs text-charcoal-400">
                    <ArrowRight className="w-3 h-3" />
                    <span className="font-medium text-charcoal-600 dark:text-charcoal-300">{route.to}</span>
                  </div>
                </div>
              </div>
              {/* Score */}
              <div className="text-right">
                <div className="text-2xl font-bold gradient-text">{route.score}</div>
                <p className="text-[10px] text-charcoal-400">EnviroHealth Score</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-charcoal-600 dark:text-charcoal-300 mb-3">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-500" /> {route.duration} min
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-500" /> {route.distance} km
              </span>
            </div>

            {/* Last analyzed */}
            <div className="text-xs text-charcoal-400 dark:text-charcoal-500 mb-3">
              Last analyzed: {route.lastAnalyzed} · Recommended: Route {route.recommended}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleAnalyze(route)}
                className="flex-1 btn btn-sm bg-emerald-500/10 text-emerald-600 dark:text-mint-400 border-emerald-500/20 hover:bg-emerald-500/20 rounded-xl gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Analyze Again
              </button>
              <button
                onClick={() => handleRemove(route.id)}
                className="btn btn-sm btn-ghost text-error hover:bg-error/10 rounded-xl"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {routes.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-charcoal-100/50 dark:bg-charcoal-800/50 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8 text-charcoal-400" />
          </div>
          <h3 className="font-bold text-charcoal-700 dark:text-charcoal-200">No saved routes yet</h3>
          <p className="text-sm text-charcoal-400 mt-1">Plan and save routes to access them quickly here.</p>
          <button onClick={() => onNavigate('planner')} className="mt-4 btn bg-emerald-500 text-white border-none rounded-xl gap-2">
            <Plus className="w-4 h-4" /> Plan a Route
          </button>
        </div>
      )}
    </div>
  )
}
