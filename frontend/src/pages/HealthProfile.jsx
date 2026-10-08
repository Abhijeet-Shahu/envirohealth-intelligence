import { HeartPulse, Clock, Thermometer, Wind, Trees, Droplets, Building2, Sparkles, RotateCcw, User } from 'lucide-react'
import { usePreferenceStore } from '../store'
import { profilePresets } from '../data/mockData'
import { useState } from 'react'
import toast from 'react-hot-toast'

const priorities = [
  { key: 'travelTime', label: 'Travel Time', icon: Clock, color: '#059669' },
  { key: 'heatProtection', label: 'Heat Protection', icon: Thermometer, color: '#f97316' },
  { key: 'airQuality', label: 'Air Quality', icon: Wind, color: '#14b8a6' },
  { key: 'greenery', label: 'Greenery', icon: Trees, color: '#10b981' },
  { key: 'waterAccess', label: 'Water Access', icon: Droplets, color: '#0d9488' },
  { key: 'healthcare', label: 'Healthcare', icon: Building2, color: '#ef4444' },
]

export default function HealthProfile() {
  const { profile, priorities: values, setProfile, setPriority, resetPriorities } = usePreferenceStore()
  const [localValues, setLocalValues] = useState(values)

  const handleProfileChange = (p) => {
    setProfile(p)
    setLocalValues(profilePresets[p])
    toast.success(`Switched to ${p === 'normal' ? 'Normal Commuter' : 'Heat-Sensitive'} profile`)
  }

  const handleSlider = (key, val) => {
    setLocalValues((prev) => ({ ...prev, [key]: val }))
    setPriority(key, val)
  }

  const handlePersonalize = () => {
    toast.success('Route personalized! Recommended route may change based on your priorities.')
  }

  const handleReset = () => {
    resetPriorities()
    setLocalValues(profilePresets.normal)
    setProfile('normal')
    toast.success('Preferences reset to default')
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal-900 dark:text-white flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-emerald-500" /> Your Travel Profile
        </h1>
        <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">Personalize route recommendations based on your health priorities.</p>
      </div>

      {/* Profile selection */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div
          onClick={() => handleProfileChange('normal')}
          className={`cursor-pointer glass-strong rounded-2xl p-5 border-2 transition-all duration-300 hover:scale-[1.01]
          ${profile === 'normal' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-charcoal-200/30 dark:border-charcoal-700/40'}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-charcoal-900 dark:text-white">Normal Commuter</h3>
              <p className="text-xs text-charcoal-400 dark:text-charcoal-500">Balanced priorities</p>
            </div>
          </div>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Optimizes for a mix of speed, comfort and environmental factors.</p>
        </div>

        <div
          onClick={() => handleProfileChange('heatSensitive')}
          className={`cursor-pointer glass-strong rounded-2xl p-5 border-2 transition-all duration-300 hover:scale-[1.01]
          ${profile === 'heatSensitive' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-charcoal-200/30 dark:border-charcoal-700/40'}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
              <Thermometer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-charcoal-900 dark:text-white">Heat-Sensitive</h3>
              <p className="text-xs text-charcoal-400 dark:text-charcoal-500">Health-first routing</p>
            </div>
          </div>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Prioritizes shade, water access, air quality and healthcare proximity.</p>
        </div>
      </div>

      {/* Priorities */}
      <div className="glass-strong rounded-3xl p-6 border border-charcoal-200/30 dark:border-charcoal-700/40">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-charcoal-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" /> Adjustable Priorities
          </h3>
          <button onClick={handleReset} className="btn btn-ghost btn-sm rounded-xl gap-1.5 text-charcoal-500">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        <div className="space-y-5">
          {priorities.map((p) => {
            const Icon = p.icon
            const val = localValues[p.key] ?? 50
            return (
              <div key={p.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: p.color }} />
                    <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">{p.label}</span>
                  </div>
                  <span className="text-sm font-bold text-charcoal-900 dark:text-white tabular-nums">{val}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={val}
                  onChange={(e) => handleSlider(p.key, parseInt(e.target.value))}
                  className="w-full"
                  style={{ background: `linear-gradient(to right, ${p.color} ${val}%, rgba(148,163,184,0.2) ${val}%)` }}
                />
              </div>
            )
          })}
        </div>

        <div className="mt-5 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
          <p className="text-xs text-emerald-700 dark:text-mint-300 font-medium">
            Changing priorities can change the recommended route. Higher priority = more weight in route scoring.
          </p>
        </div>

        <button
          onClick={handlePersonalize}
          className="w-full mt-4 btn bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-none rounded-2xl h-12 font-semibold shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.01]"
        >
          Personalize Route
        </button>
      </div>

      {/* What-If Simulator */}
      <div className="glass-strong rounded-3xl p-6 border border-charcoal-200/30 dark:border-charcoal-700/40">
        <h3 className="font-bold text-charcoal-900 dark:text-white mb-1">What-If Simulator</h3>
        <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mb-5">What matters most to you? Adjust and recalculate.</p>

        <div className="space-y-5">
          {[
            { key: 'travelTime', label: 'Faster arrival', icon: Clock, color: '#059669' },
            { key: 'heatProtection', label: 'Lower heat exposure', icon: Thermometer, color: '#f97316' },
            { key: 'airQuality', label: 'Better air quality', icon: Wind, color: '#14b8a6' },
            { key: 'greenery', label: 'More greenery', icon: Trees, color: '#10b981' },
            { key: 'healthcare', label: 'Better healthcare access', icon: Building2, color: '#ef4444' },
            { key: 'traffic', label: 'Lower congestion', icon: Clock, color: '#0d9488' },
          ].map((item) => {
            const Icon = item.icon
            const val = localValues[item.key] ?? 50
            return (
              <div key={item.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: item.color }} />
                    <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-charcoal-900 dark:text-white tabular-nums">{val}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={val}
                  onChange={(e) => handleSlider(item.key, parseInt(e.target.value))}
                  className="w-full"
                  style={{ background: `linear-gradient(to right, ${item.color} ${val}%, rgba(148,163,184,0.2) ${val}%)` }}
                />
              </div>
            )
          })}
        </div>

        <button
          onClick={() => toast.success('Route recalculated with updated priorities!')}
          className="w-full mt-5 btn btn-outline border-emerald-500/40 text-emerald-600 dark:text-mint-400 hover:bg-emerald-500/10 rounded-2xl h-12 font-semibold"
        >
          Recalculate Route
        </button>
      </div>
    </div>
  )
}
