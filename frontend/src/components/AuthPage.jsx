import { useState } from 'react'
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react'
import { useAuthStore } from '../store'
import ThemeToggle from './ThemeToggle'
import toast from 'react-hot-toast'

export default function AuthPage({
  mode = 'login',
  onNavigate,
  onAuthSuccess,
}) {
  const { login, signup } = useAuthStore()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    remember: false,
    terms: false,
  })

  const isLogin = mode === 'login'

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    if (!isLogin) {
      if (!formData.name) {
        toast.error('Please enter your name')
        return
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match')
        return
      }

      if (!formData.terms) {
        toast.error('Please accept the terms')
        return
      }

      signup(formData.name, formData.email)
      toast.success('Account created successfully!')
    } else {
      login(formData.email)
      toast.success('Welcome back!')
    }

    onAuthSuccess()
  }

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-charcoal-950">

      {/* =========================================================
          LEFT HERO PANEL
      ========================================================= */}
      <div
        className="
          hidden lg:flex
          w-1/2
          h-screen
          relative
          overflow-hidden
          text-white
        "
        style={{
          background:
            'linear-gradient(135deg, #079b83 0%, #0a9e88 50%, #087b6e 100%)',
        }}
      >

        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at 25% 30%,
                rgba(100,255,220,0.13) 0%,
                transparent 32%
              ),
              radial-gradient(
                circle at 75% 75%,
                rgba(100,255,220,0.10) 0%,
                transparent 35%
              )
            `,
          }}
        />

        {/* Circular pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(
                circle,
                rgba(255,255,255,0.07) 0,
                rgba(255,255,255,0.07) 9px,
                transparent 10px
              )
            `,
            backgroundSize: '88px 88px',
          }}
        />

        {/* Decorative glow */}
        <div
          className="
            absolute
            top-[20%]
            left-[25%]
            w-32
            h-32
            rounded-full
            blur-3xl
            pointer-events-none
          "
          style={{
            background: 'rgba(120,255,225,0.10)',
          }}
        />

        <div
          className="
            absolute
            bottom-[18%]
            right-[18%]
            w-40
            h-40
            rounded-full
            blur-3xl
            pointer-events-none
          "
          style={{
            background: 'rgba(120,255,225,0.08)',
          }}
        />

        {/* Hero content */}
        <div
          className="
            relative
            z-10
            flex
            flex-col
            justify-between
            w-full
            h-screen
            p-9
          "
        >

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div
              className="
                w-12
                h-12
                rounded-full
                flex
                items-center
                justify-center
              "
              style={{
                background: 'rgba(255,255,255,0.17)',
              }}
            >
              <Leaf
                className="w-6 h-6 text-white"
                strokeWidth={2}
              />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                EnviroHealth
              </h1>

              <p className="text-sm text-emerald-100">
                Intelligence
              </p>
            </div>

          </div>


          {/* Main hero */}
          <div className="max-w-[650px]">

            <h2
              className="
                text-[40px]
                leading-[1.08]
                font-bold
                tracking-tight
              "
            >
              <span className="text-white">
                Google Maps finds the
                <br />
                fastest route.
              </span>

              <br />

              <span className="text-emerald-200">
                We find the smarter route
              </span>

              <br />

              <span className="text-white">
                for your health, environment
                <br />
                and journey.
              </span>
            </h2>


            {/* Features */}
            <div className="mt-6 space-y-3">

              {[
                'AI-assisted route recommendations',
                'Real-time air quality & heat analysis',
                'Health-aware personalized routing',
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >

                  <div
                    className="
                      w-7
                      h-7
                      rounded-full
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                    style={{
                      background: 'rgba(255,255,255,0.16)',
                    }}
                  >
                    <span className="text-xs text-white">
                      ✓
                    </span>
                  </div>

                  <span className="text-[14px] text-white">
                    {feature}
                  </span>

                </div>
              ))}

            </div>

          </div>


          {/* Footer */}
          <p className="text-xs text-white/65">
            © 2026 EnviroHealth Intelligence. Climate-tech for
            smarter urban mobility.
          </p>

        </div>
      </div>


      {/* =========================================================
          RIGHT AUTH PANEL
      ========================================================= */}
      <div
        className="
          w-full
          lg:w-1/2
          h-screen
          flex
          flex-col
          bg-white
          dark:bg-charcoal-950
        "
      >

        {/* Top bar */}
        <div
          className="
            flex
            items-center
            justify-between
            px-8
            py-3
            shrink-0
          "
        >

          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden">

            <div
              className="
                w-9
                h-9
                rounded-xl
                flex
                items-center
                justify-center
              "
              style={{
                background:
                  'linear-gradient(135deg, #10b981, #14b8a6)',
              }}
            >
              <Leaf className="w-5 h-5 text-white" />
            </div>

            <h1 className="text-sm font-bold">
              EnviroHealth
            </h1>

          </div>

          <div className="ml-auto">
            <ThemeToggle />
          </div>

        </div>


        {/* =====================================================
            FORM CONTAINER
        ===================================================== */}
        <div
          className="
            flex-1
            flex
            items-center
            justify-center
            px-8
            pb-4
            overflow-y-auto
          "
        >

          <div className="w-full max-w-[550px]">

            {/* Heading */}
            <div className="mb-6">

              <h2
                className="
                  text-[30px]
                  leading-tight
                  font-bold
                  text-charcoal-900
                  dark:text-white
                "
              >
                {isLogin
                  ? 'Welcome back'
                  : 'Create your account'}
              </h2>

              <p
                className="
                  text-[15px]
                  text-charcoal-500
                  dark:text-charcoal-400
                  mt-1.5
                "
              >
                {isLogin
                  ? 'Sign in to continue to EnviroHealth Intelligence'
                  : 'Start planning smarter, healthier routes today'}
              </p>

            </div>


            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-3.5"
            >

              {/* =================================================
                  NAME
              ================================================= */}
              {!isLogin && (
                <div>

                  <label
                    className="
                      block
                      text-[14px]
                      font-medium
                      text-charcoal-700
                      dark:text-charcoal-200
                      mb-1.5
                    "
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Your name"
                    className="
                      w-full
                      h-[56px]
                      rounded-xl
                      px-5
                      bg-white
                      dark:bg-charcoal-800
                      border
                      border-charcoal-200
                      dark:border-charcoal-700
                      outline-none
                      focus:border-emerald-500
                      focus:ring-2
                      focus:ring-emerald-500/10
                      text-[15px]
                    "
                  />

                </div>
              )}


              {/* =================================================
                  EMAIL
              ================================================= */}
              <div>

                <label
                  className="
                    block
                    text-[14px]
                    font-medium
                    text-charcoal-700
                    dark:text-charcoal-200
                    mb-1.5
                  "
                >
                  Email
                </label>

                <div className="relative">

                  <Mail
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      w-5
                      h-5
                      text-charcoal-400
                    "
                  />

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    placeholder="you@example.com"
                    className="
                      w-full
                      h-[56px]
                      rounded-xl
                      pl-12
                      pr-5
                      bg-white
                      dark:bg-charcoal-800
                      border
                      border-charcoal-200
                      dark:border-charcoal-700
                      outline-none
                      focus:border-emerald-500
                      focus:ring-2
                      focus:ring-emerald-500/10
                      text-[15px]
                    "
                  />

                </div>

              </div>


              {/* =================================================
                  PASSWORD
              ================================================= */}
              <div>

                <label
                  className="
                    block
                    text-[14px]
                    font-medium
                    text-charcoal-700
                    dark:text-charcoal-200
                    mb-1.5
                  "
                >
                  Password
                </label>

                <div className="relative">

                  <Lock
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      w-5
                      h-5
                      text-charcoal-400
                    "
                  />

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    className="
                      w-full
                      h-[56px]
                      rounded-xl
                      pl-12
                      pr-12
                      bg-white
                      dark:bg-charcoal-800
                      border
                      border-charcoal-200
                      dark:border-charcoal-700
                      outline-none
                      focus:border-emerald-500
                      focus:ring-2
                      focus:ring-emerald-500/10
                      text-[15px]
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-charcoal-400
                      hover:text-charcoal-700
                    "
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>

                </div>

              </div>


              {/* =================================================
                  CONFIRM PASSWORD
              ================================================= */}
              {!isLogin && (
                <div>

                  <label
                    className="
                      block
                      text-[14px]
                      font-medium
                      text-charcoal-700
                      dark:text-charcoal-200
                      mb-1.5
                    "
                  >
                    Confirm Password
                  </label>

                  <div className="relative">

                    <Lock
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        w-5
                        h-5
                        text-charcoal-400
                      "
                    />

                    <input
                      type={
                        showConfirm
                          ? 'text'
                          : 'password'
                      }
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword:
                            e.target.value,
                        })
                      }
                      placeholder="••••••••"
                      className="
                        w-full
                        h-[56px]
                        rounded-xl
                        pl-12
                        pr-12
                        bg-white
                        dark:bg-charcoal-800
                        border
                        border-charcoal-200
                        dark:border-charcoal-700
                        outline-none
                        focus:border-emerald-500
                        focus:ring-2
                        focus:ring-emerald-500/10
                        text-[15px]
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirm(!showConfirm)
                      }
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-charcoal-400
                        hover:text-charcoal-700
                      "
                    >
                      {showConfirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>

                  </div>

                </div>
              )}


              {/* =================================================
                  REMEMBER / FORGOT
              ================================================= */}
              {isLogin ? (
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    pt-1
                  "
                >

                  <label className="flex items-center gap-2.5 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={formData.remember}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          remember:
                            e.target.checked,
                        })
                      }
                      className="
                        w-6
                        h-6
                        rounded-md
                        accent-emerald-500
                      "
                    />

                    <span
                      className="
                        text-[14px]
                        text-charcoal-600
                        dark:text-charcoal-300
                      "
                    >
                      Remember me
                    </span>

                  </label>

                  <button
                    type="button"
                    className="
                      text-[14px]
                      font-medium
                      text-emerald-600
                      hover:underline
                    "
                  >
                    Forgot password?
                  </button>

                </div>
              ) : (
                <label className="flex items-start gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        terms: e.target.checked,
                      })
                    }
                    className="
                      mt-1
                      w-5
                      h-5
                      accent-emerald-500
                    "
                  />

                  <span
                    className="
                      text-sm
                      text-charcoal-600
                      dark:text-charcoal-300
                    "
                  >
                    I agree to the{' '}

                    <span className="text-emerald-600 font-medium">
                      Terms of Service
                    </span>

                    {' '}and{' '}

                    <span className="text-emerald-600 font-medium">
                      Privacy Policy
                    </span>

                  </span>

                </label>
              )}


              {/* =================================================
                  LOGIN BUTTON
              ================================================= */}
              <button
                type="submit"
                className="
                  w-full
                  h-[56px]
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-3
                  text-white
                  text-[15px]
                  font-semibold
                  border-none
                  cursor-pointer
                  shadow-lg
                  shadow-emerald-500/25
                  transition-all
                  duration-300
                  hover:scale-[1.005]
                  hover:shadow-xl
                "
                style={{
                  background:
                    'linear-gradient(90deg, #10b981, #14b8a6)',
                }}
              >

                {isLogin
                  ? 'Log In'
                  : 'Create Account'}

                <ArrowRight className="w-5 h-5" />

              </button>


              {/* =================================================
                  OR DIVIDER
              ================================================= */}
              <div className="flex items-center gap-4 py-0.5">

                <div
                  className="
                    h-px
                    flex-1
                    bg-charcoal-200
                    dark:bg-charcoal-700
                  "
                />

                <span className="text-xs text-charcoal-400">
                  OR
                </span>

                <div
                  className="
                    h-px
                    flex-1
                    bg-charcoal-200
                    dark:bg-charcoal-700
                  "
                />

              </div>


              {/* =================================================
                  GOOGLE BUTTON
              ================================================= */}
              <button
                type="button"
                onClick={() => {
                  login('demo@google.com')
                  toast.success(
                    'Signed in with Google!'
                  )
                  onAuthSuccess()
                }}
                className="
                  w-full
                  h-[56px]
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-3
                  bg-white
                  dark:bg-charcoal-800
                  border
                  border-charcoal-200
                  dark:border-charcoal-700
                  text-[15px]
                  font-semibold
                  text-charcoal-900
                  dark:text-white
                  hover:bg-charcoal-50
                  dark:hover:bg-charcoal-700
                  transition
                "
              >

                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >

                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />

                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />

                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />

                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />

                </svg>

                Continue with Google

              </button>

            </form>


            {/* Sign up */}
            <p
              className="
                text-center
                text-[14px]
                text-charcoal-500
                dark:text-charcoal-400
                mt-4
              "
            >

              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}

              <button
                onClick={() =>
                  onNavigate(
                    isLogin
                      ? 'signup'
                      : 'login'
                  )
                }
                className="
                  text-emerald-600
                  dark:text-mint-400
                  font-semibold
                  hover:underline
                "
              >
                {isLogin
                  ? 'Sign Up'
                  : 'Log In'}
              </button>

            </p>

          </div>

        </div>
      </div>

    </div>
  )
}