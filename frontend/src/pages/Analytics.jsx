import { BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line, CartesianGrid } from 'recharts'
import { TrendingUp, Clock, MapPin, Thermometer, Trees, Fuel, Leaf } from 'lucide-react'
import { chartData, radarData, mockRoutes } from '../data/mockData'

export default function Analytics() {
  const stats = [
    { label: 'Travel Time', value: '24 min', icon: Clock, color: '#059669' },
    { label: 'Distance', value: '8.2 km', icon: MapPin, color: '#14b8a6' },
    { label: 'Heat Exposure', value: 'Low', icon: Thermometer, color: '#f97316' },
    { label: 'Green Coverage', value: '70%', icon: Trees, color: '#10b981' },
    { label: 'Fuel Efficiency', value: '+12%', icon: Fuel, color: '#0d9488' },
    { label: 'Emission Reduction', value: '8%', icon: Leaf, color: '#34d399' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-charcoal-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-500" /> Your Route Impact
        </h1>
        <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">Estimated environmental and health impact of your routes. Values are illustrative.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="glass-strong rounded-2xl p-4 border border-charcoal-200/30 dark:border-charcoal-700/40 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${stat.color}15` }}>
                <Icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
              <p className="text-xs text-charcoal-400 dark:text-charcoal-500 font-medium">{stat.label}</p>
              <p className="text-base font-bold text-charcoal-900 dark:text-white">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Bar chart comparison */}
        <div className="glass-strong rounded-3xl p-6 border border-charcoal-200/30 dark:border-charcoal-700/40">
          <h3 className="font-bold text-charcoal-900 dark:text-white mb-1">Route Comparison</h3>
          <p className="text-xs text-charcoal-400 dark:text-charcoal-500 mb-4">Side-by-side metrics for Route A, B, and C</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
              <XAxis dataKey="metric" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid rgba(148,163,184,0.2)',
                  background: 'rgba(15,23,42,0.9)',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="A" fill="#ef4444" radius={[6, 6, 0, 0]} name="Route A" />
              <Bar dataKey="B" fill="#10b981" radius={[6, 6, 0, 0]} name="Route B (Recommended)" />
              <Bar dataKey="C" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Route C" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div className="glass-strong rounded-3xl p-6 border border-charcoal-200/30 dark:border-charcoal-700/40">
          <h3 className="font-bold text-charcoal-900 dark:text-white mb-1">Multi-Factor Analysis</h3>
          <p className="text-xs text-charcoal-400 dark:text-charcoal-500 mb-4">Route scoring across key dimensions</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(148,163,184,0.15)" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <PolarRadiusAxis tick={{ fontSize: 9, fill: '#94a3b8' }} angle={90} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid rgba(148,163,184,0.2)',
                  background: 'rgba(15,23,42,0.9)',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Radar dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} name="Route A" />
              <Radar dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.25} name="Route B" />
              <Radar dataKey="C" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} name="Route C" />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend line chart */}
      <div className="glass-strong rounded-3xl p-6 border border-charcoal-200/30 dark:border-charcoal-700/40">
        <h3 className="font-bold text-charcoal-900 dark:text-white mb-1">Weekly EnviroHealth Score Trend</h3>
        <p className="text-xs text-charcoal-400 dark:text-charcoal-500 mb-4">Illustrative trend of your route scores over the past week</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={[
            { day: 'Mon', score: 78 },
            { day: 'Tue', score: 82 },
            { day: 'Wed', score: 85 },
            { day: 'Thu', score: 80 },
            { day: 'Fri', score: 88 },
            { day: 'Sat', score: 91 },
            { day: 'Sun', score: 91 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid rgba(148,163,184,0.2)',
                background: 'rgba(15,23,42,0.9)',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-charcoal-100/40 dark:bg-charcoal-800/40 border border-charcoal-200/30 dark:border-charcoal-700/40">
        <p className="text-xs text-charcoal-500 dark:text-charcoal-400 text-center">
          All data shown is estimated, potential and illustrative. EnviroHealth Intelligence is a decision-support tool, not a medical or diagnostic device.
        </p>
      </div>
    </div>
  )
}
