import { Sparkles, TrendingUp, Leaf, ShieldCheck } from 'lucide-react'

export default function AIExplanation({ route }) {
  if (!route) return null

  return (
    <div className="relative overflow-hidden glass-strong rounded-3xl p-6 border border-emerald-500/20 shadow-xl animate-slide-up">
      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl animate-pulse-soft" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-teal-500/10 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-charcoal-900 dark:text-white text-lg">Why Route {route.id}?</h3>
              <p className="text-xs text-charcoal-400 dark:text-charcoal-500">AI-assisted recommendation</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-mint-400 uppercase tracking-wider px-2.5 py-1 rounded-lg bg-emerald-500/10 flex items-center gap-1.5 animate-pulse-soft">
            <ShieldCheck className="w-3 h-3" /> AI-Assisted
          </span>
        </div>

        {/* Explanation */}
        <p className="text-sm text-charcoal-700 dark:text-charcoal-200 leading-relaxed">
          Route {route.id} takes approximately <span className="font-bold text-emerald-600 dark:text-mint-400">4 minutes longer</span> but provides
          {' '}<span className="font-bold text-emerald-600 dark:text-mint-400">lower estimated heat exposure</span>,
          {' '}<span className="font-bold text-emerald-600 dark:text-mint-400">better greenery and shade</span>,
          {' '}<span className="font-bold text-emerald-600 dark:text-mint-400">lower congestion</span> and
          {' '}<span className="font-bold text-emerald-600 dark:text-mint-400">access to water and healthcare</span>.
        </p>

        {/* Key highlights */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <p className="text-xs font-bold text-charcoal-900 dark:text-white">32% Lower</p>
            <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500">Heat Exposure</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-teal-500/5 border border-teal-500/10">
            <Leaf className="w-5 h-5 text-teal-500 mx-auto mb-1" />
            <p className="text-xs font-bold text-charcoal-900 dark:text-white">70% Green</p>
            <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500">Coverage</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-mint-500/5 border border-mint-500/10">
            <ShieldCheck className="w-5 h-5 text-mint-500 mx-auto mb-1" />
            <p className="text-xs font-bold text-charcoal-900 dark:text-white">Low Traffic</p>
            <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500">Congestion</p>
          </div>
        </div>

        <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500 mt-3 text-center">
          This is an illustrative recommendation based on estimated environmental data. Not medical advice.
        </p>
      </div>
    </div>
  )
}
