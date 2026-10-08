import { LayoutDashboard, Route, HeartPulse, BarChart3, Bookmark } from 'lucide-react'

const items = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'planner', label: 'Plan', icon: Route },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'health', label: 'Health', icon: HeartPulse },
  { id: 'analytics', label: 'Stats', icon: BarChart3 },
]

export default function BottomNav({ activePage, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden glass-strong border-t border-charcoal-200/30 dark:border-charcoal-700/30 px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          const Icon = item.icon
          const active = activePage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200
              ${active ? 'text-emerald-600 dark:text-mint-300' : 'text-charcoal-400 dark:text-charcoal-500'}`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500" />}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
