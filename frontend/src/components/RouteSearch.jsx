import { MapPin, Navigation, Sparkles, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useRouteStore } from '../store'
import { locations } from '../data/mockData'
import toast from 'react-hot-toast'

export default function RouteSearch({ onAnalyze }) {
  const { fromLocation, toLocation, healthAwareMode, setFrom, setTo, toggleHealthAware, setAnalyzed, setRoutes } = useRouteStore()
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)

  const handleAnalyze = () => {
    if (!fromLocation || !toLocation) {
      toast.error('Please select both locations')
      return
    }
    setAnalyzed(true)
    setRoutes([])
    toast.success('Routes analyzed successfully!')
    if (onAnalyze) onAnalyze()
  }

  const LocationDropdown = ({ value, onSelect, open, setOpen, placeholder }) => (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-charcoal-100/50 dark:bg-charcoal-800/50 border border-charcoal-200/50 dark:border-charcoal-700/50 hover:border-emerald-500/50 transition-all duration-200 text-left"
      >
        <MapPin className="w-5 h-5 text-emerald-500 flex-none" />
        <span className={`flex-1 text-sm font-medium ${value ? 'text-charcoal-900 dark:text-white' : 'text-charcoal-400'}`}>
          {value || placeholder}
        </span>
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-0 right-0 z-50 glass-strong rounded-2xl shadow-2xl border border-charcoal-200/30 dark:border-charcoal-700/40 overflow-hidden max-h-60 overflow-y-auto animate-scale-in origin-top">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => { onSelect(loc); setOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-500/10 transition-colors ${value === loc ? 'text-emerald-600 dark:text-mint-400 font-semibold bg-emerald-500/5' : 'text-charcoal-700 dark:text-charcoal-200'}`}
            >
              {loc}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="glass-strong rounded-3xl p-5 shadow-xl border border-charcoal-200/30 dark:border-charcoal-700/40">
      <div className="space-y-3">
        {/* From */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500 ml-1">From</label>
          <div className="mt-1">
            <LocationDropdown
              value={fromLocation}
              onSelect={setFrom}
              open={fromOpen}
              setOpen={setFromOpen}
              placeholder="Starting point"
            />
          </div>
        </div>

        {/* Swap icon */}
        <div className="flex justify-center -my-1">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <Navigation className="w-4 h-4 text-emerald-500 rotate-90" />
          </div>
        </div>

        {/* To */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500 ml-1">To</label>
          <div className="mt-1">
            <LocationDropdown
              value={toLocation}
              onSelect={setTo}
              open={toOpen}
              setOpen={setToOpen}
              placeholder="Destination"
            />
          </div>
        </div>

        {/* Health-aware mode toggle */}
        <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <div>
              <span className="text-sm font-semibold text-charcoal-900 dark:text-white">Health-Aware Mode</span>
              <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500">Optimize for health & environment</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={healthAwareMode}
            onChange={toggleHealthAware}
            className="toggle toggle-primary toggle-sm"
          />
        </div>

        {/* Analyze button */}
        <button
          onClick={handleAnalyze}
          className="w-full btn bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-none rounded-2xl h-12 font-semibold shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-emerald-500/40 group"
        >
          Analyze Routes
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}
