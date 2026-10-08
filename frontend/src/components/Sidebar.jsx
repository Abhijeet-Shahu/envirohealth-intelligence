import { Leaf, LayoutDashboard, Route, Bookmark, HeartPulse, BarChart3, Settings, LogOut, X } from 'lucide-react'
import { useAuthStore, useNavStore } from '../store'
import { useState } from 'react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'planner', label: 'Route Planner', icon: Route },
  { id: 'saved', label: 'Saved Routes', icon: Bookmark },
  { id: 'health', label: 'Health Profile', icon: HeartPulse },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ activePage, onNavigate, onLogout }) {
  const { user } = useAuthStore()
  const { sidebarOpen, setSidebarOpen } = useNavStore()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleNav = (page) => {
    onNavigate(page)
    setSidebarOpen(false)
  }

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    setShowLogoutModal(false)
    onLogout()
  }

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 z-50 flex flex-col transition-transform duration-300 ease-out
        bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-xl border-r border-charcoal-200/50 dark:border-charcoal-700/50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-charcoal-900 dark:text-white leading-tight">EnviroHealth</h1>
              <p className="text-[10px] text-emerald-600 dark:text-mint-400 font-medium">Intelligence</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden btn btn-ghost btn-sm btn-circle">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 py-2 text-[10px] font-semibold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider">Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon
            const active = activePage === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative
                ${active
                  ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-mint-300'
                  : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-charcoal-100/50 dark:hover:bg-charcoal-800/50'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-r-full" />
                )}
                <Icon className={`w-[18px] h-[18px] transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-105'}`} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* User profile */}
        <div className="p-3 border-t border-charcoal-200/50 dark:border-charcoal-700/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-charcoal-100/50 dark:bg-charcoal-800/50">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-charcoal-900 dark:text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-charcoal-400 dark:text-charcoal-500 truncate">{user?.email || 'user@envirohealth.ai'}</p>
            </div>
            <button
              onClick={handleLogoutClick}
              className="btn btn-ghost btn-sm btn-circle text-charcoal-400 hover:text-error"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="modal modal-open">
          <div className="modal-box glass-strong rounded-2xl max-w-sm">
            <div className="flex flex-col items-center text-center py-2">
              <div className="w-14 h-14 rounded-full bg-error/10 flex items-center justify-center mb-4">
                <LogOut className="w-7 h-7 text-error" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 dark:text-white">Log out?</h3>
              <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">You'll need to sign in again to access your routes and health profile.</p>
            </div>
            <div className="modal-action mt-4">
              <button onClick={() => setShowLogoutModal(false)} className="btn btn-ghost rounded-xl">Cancel</button>
              <button onClick={confirmLogout} className="btn bg-error text-white border-error hover:bg-error/90 rounded-xl">Log out</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowLogoutModal(false)} />
        </div>
      )}
    </>
  )
}
