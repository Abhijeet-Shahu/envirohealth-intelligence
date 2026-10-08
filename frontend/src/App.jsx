import { useEffect, useState } from 'react'
import { useAuthStore, useThemeStore } from './store'
import { Toaster } from 'react-hot-toast'
import AuthPage from './components/AuthPage'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import Dashboard from './pages/Dashboard'
import RoutePlanner from './pages/RoutePlanner'
import HealthProfile from './pages/HealthProfile'
import Analytics from './pages/Analytics'
import SavedRoutes from './pages/SavedRoutes'
import Settings from './pages/Settings'

function App() {
  const { isAuthenticated, logout } = useAuthStore()
  const { theme } = useThemeStore()
  const [authMode, setAuthMode] = useState('login')
  const [activePage, setActivePage] = useState('dashboard')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'enviroDark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'enviroLight')
    }
  }, [theme])

  if (!isAuthenticated) {
    return (
      <>
        <AuthPage mode={authMode} onNavigate={setAuthMode} onAuthSuccess={() => setActivePage('dashboard')} />
        <Toaster position="top-center" toastOptions={{
          style: {
            borderRadius: '12px',
            background: theme === 'dark' ? '#1e293b' : '#fff',
            color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
            border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
            fontSize: '13px',
          },
        }} />
      </>
    )
  }

  const handleNavigate = (page) => {
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = () => {
    logout()
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard onNavigate={handleNavigate} />
      case 'planner': return <RoutePlanner />
      case 'health': return <HealthProfile />
      case 'analytics': return <Analytics />
      case 'saved': return <SavedRoutes onNavigate={handleNavigate} />
      case 'settings': return <Settings />
      default: return <Dashboard onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content" data-theme={theme === 'dark' ? 'enviroDark' : 'enviroLight'}>
      <div className="flex">
        <Sidebar activePage={activePage} onNavigate={handleNavigate} onLogout={handleLogout} />

        <div className="flex-1 flex flex-col min-w-0">
          <Navbar activePage={activePage} onNavigate={handleNavigate} onLogout={handleLogout} />

          <main className="flex-1 p-4 lg:p-6 pb-20 lg:pb-6 overflow-x-hidden">
            {renderPage()}
          </main>
        </div>
      </div>

      <BottomNav activePage={activePage} onNavigate={handleNavigate} />

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: theme === 'dark' ? '#1e293b' : '#fff',
            color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
            border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
            fontSize: '13px',
          },
        }}
      />
    </div>
  )
}

export default App
