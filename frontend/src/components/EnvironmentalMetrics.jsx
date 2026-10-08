import { Thermometer, Wind, Trees, Droplets, HeartPulse, Car, Fuel, Leaf } from 'lucide-react'
import { environmentalMetrics } from '../data/mockData'

const iconMap = {
  Thermometer, Wind, Trees, Droplets, HeartPulse, Car, Fuel, Leaf,
}

export default function EnvironmentalMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {environmentalMetrics.map((metric, idx) => {
        const Icon = iconMap[metric.icon] || Thermometer
        return (
          <div
            key={metric.key}
            className="glass-strong rounded-2xl p-4 border border-charcoal-200/30 dark:border-charcoal-700/40 hover:scale-[1.02] transition-transform duration-200 animate-slide-up"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${metric.color}15` }}>
                <Icon className="w-4 h-4" style={{ color: metric.color }} />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md" style={{ color: metric.color, background: `${metric.color}10` }}>
                {metric.status}
              </span>
            </div>
            <p className="text-xs text-charcoal-400 dark:text-charcoal-500 font-medium">{metric.label}</p>
            <p className="text-base font-bold text-charcoal-900 dark:text-white mt-0.5">{metric.value}</p>
            {metric.subtitle && (
              <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500">{metric.subtitle}</p>
            )}
            {/* Progress bar */}
            <div className="mt-2 h-1.5 rounded-full bg-charcoal-200/50 dark:bg-charcoal-700/50 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${metric.progress}%`, background: metric.color, animationDelay: `${idx * 60}ms` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
