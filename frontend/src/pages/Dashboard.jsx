import { ArrowRight, Sparkles, TrendingUp, Leaf, Thermometer, Wind, Clock, MapPin } from 'lucide-react'
import RouteSearch from '../components/RouteSearch'
import { useRouteStore } from '../store'
import { mockRoutes } from '../data/mockData'

export default function Dashboard({ onNavigate }) {
  const { setSelectedRoute } = useRouteStore()
  const recommended = mockRoutes.find((r) => r.recommended)

  const handleAnalyze = () => {
    setSelectedRoute('B')
    onNavigate('planner')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-600 via-teal-600 to-emerald-800 p-6 md:p-10">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(52,211,153,0.3) 0%, transparent 60%), radial-gradient(circle at 80% 30%, rgba(20,184,166,0.3) 0%, transparent 60%)`
        }} />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-mint-300/10 blur-3xl animate-float" />

        <div className="relative grid lg:grid-cols-2 gap-6 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> AI-Assisted Route Intelligence
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Find the route that's <span className="text-mint-200">better for you.</span>
            </h1>
            <p className="text-white/80 text-sm md:text-base mt-3 max-w-md">
              Go beyond the fastest route. Compare travel time, heat, air quality, greenery, traffic and health accessibility.
            </p>
            <button
              onClick={() => onNavigate('planner')}
              className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-700 font-semibold text-sm hover:scale-105 transition-transform duration-200 shadow-xl"
            >
              Start Planning <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden lg:block">
            <RouteSearch onAnalyze={handleAnalyze} />
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Recommended Score', value: '91/100', icon: TrendingUp, color: '#10b981' },
          { label: 'AQI Status', value: '105 Moderate', icon: Wind, color: '#f59e0b' },
          { label: 'Green Coverage', value: '70%', icon: Leaf, color: '#14b8a6' },
          { label: 'Heat Exposure', value: '32% Lower', icon: Thermometer, color: '#0d9488' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="glass-strong rounded-2xl p-4 border border-charcoal-200/30 dark:border-charcoal-700/40 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: `${stat.color}15` }}>
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-xs text-charcoal-400 dark:text-charcoal-500 font-medium">{stat.label}</p>
              <p className="text-lg font-bold text-charcoal-900 dark:text-white">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Quick access cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('planner')}
          className="cursor-pointer glass-strong rounded-2xl p-5 border border-charcoal-200/30 dark:border-charcoal-700/40 hover:scale-[1.02] transition-transform duration-200 group"
        >
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-3 shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-charcoal-900 dark:text-white">Route Planner</h3>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">Compare routes by health, environment & time</p>
          <div className="flex items-center gap-1 text-emerald-600 dark:text-mint-400 text-sm font-medium mt-2 group-hover:gap-2 transition-all">
            Plan a route <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('health')}
          className="cursor-pointer glass-strong rounded-2xl p-5 border border-charcoal-200/30 dark:border-charcoal-700/40 hover:scale-[1.02] transition-transform duration-200 group"
        >
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-teal-500 to-mint-500 flex items-center justify-center mb-3 shadow-lg">
            <Thermometer className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-charcoal-900 dark:text-white">Health Profile</h3>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">Personalize routes based on your health needs</p>
          <div className="flex items-center gap-1 text-emerald-600 dark:text-mint-400 text-sm font-medium mt-2 group-hover:gap-2 transition-all">
            Set preferences <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('analytics')}
          className="cursor-pointer glass-strong rounded-2xl p-5 border border-charcoal-200/30 dark:border-charcoal-700/40 hover:scale-[1.02] transition-transform duration-200 group"
        >
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-mint-500 to-emerald-600 flex items-center justify-center mb-3 shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-bold text-charcoal-900 dark:text-white">Analytics</h3>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">Track your environmental impact over time</p>
          <div className="flex items-center gap-1 text-emerald-600 dark:text-mint-400 text-sm font-medium mt-2 group-hover:gap-2 transition-all">
            View insights <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Mobile route search */}
      <div className="lg:hidden">
        <RouteSearch onAnalyze={handleAnalyze} />
      </div>
    </div>
  )
}
