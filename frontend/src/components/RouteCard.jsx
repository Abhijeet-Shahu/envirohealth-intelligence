import { Clock, MapPin, Thermometer, Wind, Trees, Car, Droplets, HeartPulse, Check, Flame } from 'lucide-react'

const statusConfig = {
  LOW: { color: 'text-emerald-600 dark:text-mint-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-500' },
  HIGH: { color: 'text-error', bg: 'bg-error/10', dot: 'bg-error' },
  MEDIUM: { color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10', dot: 'bg-amber-500' },
  MODERATE: { color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10', dot: 'bg-amber-500' },
  GOOD: { color: 'text-emerald-600 dark:text-mint-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-500' },
}

function StatusPill({ label, value, icon: Icon }) {
  const cfg = statusConfig[value] || statusConfig.MEDIUM
  return (
    <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg ${cfg.bg}`}>
      <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
      <span className="text-xs text-charcoal-500 dark:text-charcoal-400 font-medium">{label}</span>
      <span className={`text-xs font-bold ${cfg.color} ml-auto`}>{value}</span>
    </div>
  )
}

export default function RouteCard({ route, onSelect, selected }) {
  const isRecommended = route.recommended
  const cardBorder = isRecommended
    ? 'border-emerald-500/40 ring-2 ring-emerald-500/20'
    : selected
    ? 'border-teal-500/30 ring-2 ring-teal-500/10'
    : 'border-charcoal-200/30 dark:border-charcoal-700/40'

  return (
    <div
      onClick={() => onSelect(route.id)}
      className={`relative cursor-pointer glass-strong rounded-2xl p-5 border ${cardBorder} transition-all duration-300 hover:scale-[1.01] hover:shadow-xl animate-slide-up`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: route.color }}>
            {route.id}
          </div>
          <div>
            <h3 className="font-bold text-charcoal-900 dark:text-white">{route.name}</h3>
            {isRecommended && (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-mint-400 uppercase tracking-wider flex items-center gap-1">
                <Check className="w-3 h-3" /> Recommended
              </span>
            )}
          </div>
        </div>
        {/* Score circle */}
        <div className="relative w-14 h-14">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-charcoal-200 dark:text-charcoal-700" />
            <circle
              cx="28" cy="28" r="24" fill="none" stroke={route.color} strokeWidth="4"
              strokeDasharray={`${(route.score / 100) * 150.8} 150.8`}
              strokeLinecap="round"
              className="score-ring-progress"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-charcoal-900 dark:text-white">{route.score}</span>
          </div>
        </div>
      </div>

      {/* Duration & distance */}
      <div className="flex items-center gap-4 mb-3 text-sm">
        <div className="flex items-center gap-1.5 text-charcoal-700 dark:text-charcoal-200">
          <Clock className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold">{route.duration} min</span>
        </div>
        <div className="flex items-center gap-1.5 text-charcoal-700 dark:text-charcoal-200">
          <MapPin className="w-4 h-4 text-teal-500" />
          <span className="font-semibold">{route.distance} km</span>
        </div>
      </div>

      {/* Status pills */}
      <div className="grid grid-cols-2 gap-2">
        <StatusPill label="Heat" value={route.heat} icon={Thermometer} />
        <StatusPill label="AQI" value={route.aqi} icon={Wind} />
        <StatusPill label="Green" value={route.greenCover} icon={Trees} />
        <StatusPill label="Traffic" value={route.traffic} icon={Car} />
        <StatusPill label="Water" value={route.water > 0 ? `${route.water} pts` : 'None'} icon={Droplets} />
        <StatusPill label="Healthcare" value={route.healthcare} icon={HeartPulse} />
      </div>

      {/* Recommended badge */}
      {isRecommended && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <Flame className="w-3.5 h-3.5 text-emerald-500" />
          <p className="text-xs text-emerald-700 dark:text-mint-300 font-medium">+4 min, but significantly better environmental and health conditions</p>
        </div>
      )}
    </div>
  )
}
