import { Settings as SettingsIcon, Moon, Bell, MapPin, User, Lock, Palette, HeartPulse, ChevronRight } from 'lucide-react'
import { useThemeStore } from '../store'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Settings() {
  const { theme, setTheme } = useThemeStore()
  const [notif, setNotif] = useState({ aqi: true, heat: true, route: false, weekly: true })
  const [location, setLocation] = useState({ auto: true, radius: 5 })

  const sections = [
    {
      title: 'Appearance',
      icon: Palette,
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">Theme</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                onClick={() => { setTheme('light'); toast.success('Light theme enabled') }}
                className={`p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-emerald-500 bg-emerald-500/5' : 'border-charcoal-200/30 dark:border-charcoal-700/40'}`}
              >
                <div className="w-full h-16 rounded-lg bg-linear-to-br from-white to-charcoal-100 mb-2 border border-charcoal-200" />
                <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">Light</span>
              </button>
              <button
                onClick={() => { setTheme('dark'); toast.success('Dark theme enabled') }}
                className={`p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-emerald-500 bg-emerald-500/5' : 'border-charcoal-200/30 dark:border-charcoal-700/40'}`}
              >
                <div className="w-full h-16 rounded-lg bg-linear-to-br from-charcoal-800 to-charcoal-950 mb-2 border border-charcoal-700" />
                <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">Dark</span>
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Health Preferences',
      icon: HeartPulse,
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-charcoal-100/40 dark:bg-charcoal-800/40">
            <div>
              <p className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">Heat sensitivity alerts</p>
              <p className="text-xs text-charcoal-400">Get notified about high heat exposure zones</p>
            </div>
            <input type="checkbox" defaultChecked className="toggle toggle-sm toggle-primary" onChange={() => toast.success('Preference updated')} />
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-charcoal-100/40 dark:bg-charcoal-800/40">
            <div>
              <p className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">Air quality threshold</p>
              <p className="text-xs text-charcoal-400">Alert when AQI exceeds your threshold</p>
            </div>
            <select className="select select-sm select-bordered rounded-xl" onChange={() => toast.success('Threshold updated')}>
              <option>100 (Moderate)</option>
              <option>150 (Unhealthy)</option>
              <option>200 (Very Unhealthy)</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-charcoal-100/40 dark:bg-charcoal-800/40">
            <div>
              <p className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">Prefer green routes</p>
              <p className="text-xs text-charcoal-400">Prioritize routes with high tree cover</p>
            </div>
            <input type="checkbox" defaultChecked className="toggle toggle-sm toggle-primary" onChange={() => toast.success('Preference updated')} />
          </div>
        </div>
      ),
    },
    {
      title: 'Notification Preferences',
      icon: Bell,
      content: (
        <div className="space-y-3">
          {[
            { key: 'aqi', label: 'Air quality alerts', desc: 'AQI changes in your area' },
            { key: 'heat', label: 'Heat advisories', desc: 'High temperature warnings' },
            { key: 'route', label: 'Route recommendations', desc: 'New better routes found' },
            { key: 'weekly', label: 'Weekly impact report', desc: 'Your environmental impact summary' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-charcoal-100/40 dark:bg-charcoal-800/40">
              <div>
                <p className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">{item.label}</p>
                <p className="text-xs text-charcoal-400">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={notif[item.key]}
                onChange={(e) => { setNotif({ ...notif, [item.key]: e.target.checked }); toast.success('Notification preference updated') }}
                className="toggle toggle-sm toggle-primary"
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Location Preferences',
      icon: MapPin,
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-charcoal-100/40 dark:bg-charcoal-800/40">
            <div>
              <p className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">Auto-detect location</p>
              <p className="text-xs text-charcoal-400">Use GPS for start point</p>
            </div>
            <input
              type="checkbox"
              checked={location.auto}
              onChange={(e) => { setLocation({ ...location, auto: e.target.checked }); toast.success('Location preference updated') }}
              className="toggle toggle-sm toggle-primary"
            />
          </div>
          <div className="p-3 rounded-xl bg-charcoal-100/40 dark:bg-charcoal-800/40">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">Search radius</p>
              <span className="text-sm font-bold text-emerald-600 dark:text-mint-400">{location.radius} km</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={location.radius}
              onChange={(e) => setLocation({ ...location, radius: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Account',
      icon: User,
      content: (
        <div className="space-y-3">
          {['Update email', 'Change password', 'Manage connected accounts', 'Export data'].map((action) => (
            <button
              key={action}
              onClick={() => toast.success(`${action} - Coming soon`)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-charcoal-100/40 dark:bg-charcoal-800/40 hover:bg-emerald-500/5 transition-colors"
            >
              <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">{action}</span>
              <ChevronRight className="w-4 h-4 text-charcoal-400" />
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'Privacy',
      icon: Lock,
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-charcoal-100/40 dark:bg-charcoal-800/40">
            <div>
              <p className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">Anonymous analytics</p>
              <p className="text-xs text-charcoal-400">Share anonymous usage data to improve routes</p>
            </div>
            <input type="checkbox" defaultChecked className="toggle toggle-sm toggle-primary" onChange={() => toast.success('Privacy preference updated')} />
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-charcoal-100/40 dark:bg-charcoal-800/40">
            <div>
              <p className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200">Store route history</p>
              <p className="text-xs text-charcoal-400">Save your past routes for better recommendations</p>
            </div>
            <input type="checkbox" defaultChecked className="toggle toggle-sm toggle-primary" onChange={() => toast.success('Privacy preference updated')} />
          </div>
          <button
            onClick={() => toast.success('Data deletion requested')}
            className="w-full p-3 rounded-xl bg-error/5 border border-error/20 text-error text-sm font-medium hover:bg-error/10 transition-colors"
          >
            Delete all my data
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-charcoal-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-emerald-500" /> Settings
        </h1>
        <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">Manage your preferences, privacy and account.</p>
      </div>

      {sections.map((section, i) => {
        const Icon = section.icon
        return (
          <div
            key={i}
            className="glass-strong rounded-3xl p-6 border border-charcoal-200/30 dark:border-charcoal-700/40 animate-slide-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="font-bold text-charcoal-900 dark:text-white">{section.title}</h3>
            </div>
            {section.content}
          </div>
        )
      })}
    </div>
  )
}
