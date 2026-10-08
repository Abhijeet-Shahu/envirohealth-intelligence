import { Menu, MapPin, Bell, ChevronDown, User, HeartPulse, Settings as SettingsIcon, Moon, LogOut } from 'lucide-react'
import { useNavStore, useAuthStore } from '../store'
import { useState, useRef, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import { notifications as mockNotifs } from '../data/mockData'

export default function Navbar({ activePage, onNavigate, onLogout }) {
  const { toggleSidebar } = useNavStore()
  const { user, logout } = useAuthStore()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const profileRef = useRef(null)
  const notifRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleProfileNav = (page) => {
    setProfileOpen(false)
    onNavigate(page)
  }

  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-charcoal-200/30 dark:border-charcoal-700/30">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="btn btn-ghost btn-sm btn-circle lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-charcoal-100/50 dark:bg-charcoal-800/50">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">Seawoods, Navi Mumbai</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* AQI status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">AQI 105 · Moderate</span>
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="btn btn-ghost btn-sm btn-circle relative hover:bg-emerald-500/10"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 glass-strong rounded-2xl shadow-2xl border border-charcoal-200/30 dark:border-charcoal-700/40 overflow-hidden animate-scale-in origin-top-right">
                <div className="p-4 border-b border-charcoal-200/30 dark:border-charcoal-700/40">
                  <h3 className="font-bold text-charcoal-900 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {mockNotifs.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-charcoal-100/40 dark:hover:bg-charcoal-800/40 transition-colors border-b border-charcoal-200/20 dark:border-charcoal-700/20">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${n.type === 'success' ? 'bg-emerald-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-teal-500'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-charcoal-900 dark:text-white">{n.title}</p>
                          <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-0.5">{n.message}</p>
                          <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ThemeToggle />

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-xl hover:bg-charcoal-100/50 dark:hover:bg-charcoal-800/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <ChevronDown className="w-4 h-4 text-charcoal-400 hidden sm:block" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-12 w-56 glass-strong rounded-2xl shadow-2xl border border-charcoal-200/30 dark:border-charcoal-700/40 overflow-hidden animate-scale-in origin-top-right">
                <div className="p-3 border-b border-charcoal-200/30 dark:border-charcoal-700/40">
                  <p className="text-sm font-bold text-charcoal-900 dark:text-white">{user?.name || 'User'}</p>
                  <p className="text-xs text-charcoal-400 dark:text-charcoal-500">{user?.email}</p>
                </div>
                <div className="p-1.5">
                  <button onClick={() => handleProfileNav('health')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-charcoal-100/50 dark:hover:bg-charcoal-800/50 transition-colors text-charcoal-700 dark:text-charcoal-200">
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button onClick={() => handleProfileNav('health')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-charcoal-100/50 dark:hover:bg-charcoal-800/50 transition-colors text-charcoal-700 dark:text-charcoal-200">
                    <HeartPulse className="w-4 h-4" /> Health Preferences
                  </button>
                  <button onClick={() => handleProfileNav('settings')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-charcoal-100/50 dark:hover:bg-charcoal-800/50 transition-colors text-charcoal-700 dark:text-charcoal-200">
                    <SettingsIcon className="w-4 h-4" /> Settings
                  </button>
                  <button onClick={() => { setProfileOpen(false); document.querySelector('[data-theme-toggle]')?.click() }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-charcoal-100/50 dark:hover:bg-charcoal-800/50 transition-colors text-charcoal-700 dark:text-charcoal-200">
                    <Moon className="w-4 h-4" /> Theme
                  </button>
                  <div className="divider my-1.5" />
                  <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-error/10 transition-colors text-error">
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
