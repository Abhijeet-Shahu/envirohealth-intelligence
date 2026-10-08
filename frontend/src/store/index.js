import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'envirohealth-theme' }
  )
)

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email) => set({ user: { email, name: email.split('@')[0] }, isAuthenticated: true }),
      signup: (name, email) => set({ user: { name, email }, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'envirohealth-auth' }
  )
)

export const useRouteStore = create((set) => ({
  fromLocation: 'Seawoods',
  toLocation: 'VESIT',
  healthAwareMode: true,
  selectedRoute: 'B',
  analyzed: false,
  routes: [],
  setFrom: (from) => set({ fromLocation: from }),
  setTo: (to) => set({ toLocation: to }),
  toggleHealthAware: () => set((state) => ({ healthAwareMode: !state.healthAwareMode })),
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  setAnalyzed: (val) => set({ analyzed: val }),
  setRoutes: (routes) => set({ routes }),
}))

export const usePreferenceStore = create(
  persist(
    (set) => ({
      profile: 'normal',
      priorities: {
        travelTime: 40,
        heatProtection: 30,
        airQuality: 50,
        greenery: 35,
        waterAccess: 20,
        healthcare: 25,
      },
      setProfile: (profile) => set({ profile }),
      setPriority: (key, value) =>
        set((state) => ({ priorities: { ...state.priorities, [key]: value } })),
      resetPriorities: () =>
        set({
          priorities: {
            travelTime: 40,
            heatProtection: 30,
            airQuality: 50,
            greenery: 35,
            waterAccess: 20,
            healthcare: 25,
          },
        }),
    }),
    { name: 'envirohealth-prefs' }
  )
)

export const useNavStore = create((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (val) => set({ sidebarOpen: val }),
}))
