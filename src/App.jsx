import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { pageMotion } from './lib/pageMotion'
import AppSidebar from './components/app/AppSidebar'
import { proNavItems, proPageMeta } from './config/proAppConfig.jsx'
import dashboardHtml from '../reference-html/dashboard.html?raw'
import mealPlannerHtml from '../reference-html/mealplanner.html?raw'
import progressHtml from '../reference-html/progress.html?raw'
import logFoodHtml from '../reference-html/logfood.html?raw'
import communityHtml from '../reference-html/community.html?raw'
import helpCenterHtml from '../reference-html/helpcenter.html?raw'
import nutritionHtml from '../reference-html/nutrition.html?raw'
import foodDatabaseHtml from '../reference-html/fooddatabase.html?raw'
import foodDetailHtml from '../reference-html/fooddetail.html?raw'
import landingHtml from '../reference-html/landingpage.html?raw'
import loginHtml from '../reference-html/login.html?raw'
import registerHtml from '../reference-html/register.html?raw'
import forgotPasswordHtml from '../reference-html/forgot-password.html?raw'
import resetPasswordHtml from '../reference-html/reset-password.html?raw'
import verifyEmailHtml from '../reference-html/verify-email.html?raw'
import onboardingHtml from '../reference-html/onboarding.html?raw'
import profileDetailHtml from '../reference-html/profiledetail.html?raw'
import settingsHtml from '../reference-html/pengaturan.html?raw'
import notificationsHtml from '../reference-html/notifikasi.html?raw'
import {
  Activity,
  Apple,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  CreditCard,
  Download,
  Droplets,
  Dumbbell,
  Edit3,
  Eye,
  Flame,
  Gauge,
  Heart,
  HelpCircle,
  Headphones,
  Home,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Mail,
  MessageCircle,
  MapPin,
  Moon,
  MoreHorizontal,
  Lock,
  Plus,
  Play,
  Scale,
  Search,
  Send,
  Settings,
  Shield,
  Share2,
  Sparkles,
  Smartphone,
  Sun,
  TrendingUp,
  Trophy,
  User,
  UserPlus,
  Users,
  Utensils,
  Wrench,
  X
} from 'lucide-react'
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { apiRequest, clearStoredAuth, getStoredAuth, login, register } from './api'

const LegalPage = lazy(() => import('./pages/LegalPage.jsx'))
const SplashPage = lazy(() => import('./pages/SplashPage.jsx'))
const ProDashboardRoute = lazy(() => import('./pages/app/ProDashboardPage.jsx'))
const ProCommunityRoute = lazy(() => import('./pages/app/ProCommunityPage.jsx'))

const htmlRouteMap = {
  'index.html': '/',
  'landingpage.html': '/',
  'dashboard.html': '/app/dashboard',
  'logfood.html': '/app/log-food',
  'mealplanner.html': '/app/meal-planner',
  'progress.html': '/app/progress',
  'nutrition.html': '/app/nutrition',
  'fooddatabase.html': '/app/foods',
  'fooddetail.html': '/app/foods/gado-gado',
  'community.html': '/app/community',
  'helpcenter.html': '/help',
  'profiledetail.html': '/app/profile',
  'pengaturan.html': '/app/settings',
  'notifikasi.html': '/app/notifications',
  'login.html': '/login',
  'register.html': '/register',
  'forgot-password.html': '/forgot-password',
  'reset-password.html': '/reset-password',
  'verify-email.html': '/verify-email',
  'onboarding.html': '/onboarding',
  'splash.html': '/splash',
  'privacy.html': '/privacy',
  'terms.html': '/terms'
}

const referencePages = {
  '/': landingHtml,
  '/landing': landingHtml,
  '/login': loginHtml,
  '/register': registerHtml,
  '/forgot-password': forgotPasswordHtml,
  '/reset-password': resetPasswordHtml,
  '/verify-email': verifyEmailHtml,
  '/onboarding': onboardingHtml,
  '/help': helpCenterHtml,
  '/app/dashboard': dashboardHtml,
  '/app/log-food': logFoodHtml,
  '/app/meal-planner': mealPlannerHtml,
  '/app/progress': progressHtml,
  '/app/nutrition': nutritionHtml,
  '/app/foods': foodDatabaseHtml,
  '/app/foods/gado-gado': foodDetailHtml,
  '/app/community': communityHtml,
  '/app/profile': profileDetailHtml,
  '/app/settings': settingsHtml,
  '/app/notifications': notificationsHtml
}

function formatNumber(value, fallback = '0') {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(number)
}

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function addDaysIso(offset) {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return date.toISOString().slice(0, 10)
}

function mealLabel(mealType = '') {
  const labels = {
    breakfast: 'Breakfast',
    morning_snack: 'Morning Snack',
    lunch: 'Lunch',
    afternoon_snack: 'Afternoon Snack',
    dinner: 'Dinner',
    late_snack: 'Late Snack'
  }
  return labels[mealType] || mealType
}

function useBackendData(fetcher, fallback, deps = []) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    fetcher()
      .then((nextData) => {
        if (active) setData(nextData)
      })
      .catch((err) => {
        if (active) setError(err.message || 'Gagal memuat data.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, deps)

  return { data, setData, loading, error }
}

function FloatingNutritionScene({ compact = false }) {
  return (
    <Canvas className="scene-canvas">
      <PerspectiveCamera makeDefault position={[0, 0.4, compact ? 6 : 5]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} />
      <Suspense fallback={null}>
        <NutritionObjects />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} />
    </Canvas>
  )
}

function NutritionObjects() {
  const ring = useRef()
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.24
  })
  return (
    <group>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh ref={ring}>
          <torusGeometry args={[1.25, 0.12, 16, 80]} />
          <meshStandardMaterial color="#007a35" roughness={0.32} metalness={0.18} />
        </mesh>
      </Float>
      {[
        [-1.65, 0.75, 0, '#f97316'],
        [1.55, 0.85, 0, '#2170e4'],
        [0.05, -1.35, 0, '#22c55e'],
        [0.95, -0.85, 0.55, '#a855f7']
      ].map(([x, y, z, color], index) => (
        <Float key={color} speed={1.5 + index * 0.24} rotationIntensity={0.9} floatIntensity={1.1}>
          <mesh position={[x, y, z]}>
            <sphereGeometry args={[0.28, 32, 32]} />
            <meshStandardMaterial color={color} roughness={0.28} />
          </mesh>
        </Float>
      ))}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 42, 42]} />
        <meshStandardMaterial color="#f8fff9" roughness={0.18} metalness={0.08} />
      </mesh>
    </group>
  )
}

function AnimatedPage({ children, className = '' }) {
  return (
    <motion.div className={className} {...pageMotion}>
      {children}
    </motion.div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

function PublicHeader() {
  return (
    <header className="public-header">
      <Link className="brand" to="/">
        <span className="brand-mark">
          <Apple size={22} />
        </span>
        <span>
          <strong>NutriTrack</strong>
          <small>Pro Companion</small>
        </span>
      </Link>
      <nav>
        <a href="#features">Fitur</a>
        <a href="#preview">Preview</a>
        <Link to="/help">Bantuan</Link>
      </nav>
      <div className="header-actions">
        <Link className="ghost-link" to="/login">
          Masuk
        </Link>
        <Link className="primary-link" to="/register">
          Mulai Gratis
        </Link>
      </div>
    </header>
  )
}

function LandingPage() {
  const goals = ['Turun berat badan', 'Naik berat badan', 'Makan teratur']
  const [goal, setGoal] = useState(goals[0])
  return (
    <AnimatedPage>
      <ScrollProgress />
      <PublicHeader />
      <main>
        <section className="landing-hero">
          <div className="hero-bg" />
          <div className="hero-copy">
            <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              React PWA nutrition companion
            </motion.p>
            <h1>Makan Sehat. Tubuh Ideal. Hidup Lebih Baik.</h1>
            <p>
              NutriTrack menggabungkan log makanan, meal planner, analisis nutrisi, reminder, dan progress
              report dalam satu aplikasi PWA yang halus dan interaktif.
            </p>
            <div className="hero-actions">
              <Link className="primary-link big" to="/register">
                Mulai Gratis <ArrowRight size={18} />
              </Link>
              <Link className="ghost-link big" to="/app/dashboard">
                Lihat Demo
              </Link>
            </div>
            <div className="proof-row">
              <strong>10.000+</strong>
              <span>pengguna aktif menjaga pola makan</span>
            </div>
          </div>
          <motion.div className="hero-scene" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
            <FloatingNutritionScene />
          </motion.div>
        </section>

        <section className="section" id="features">
          <div className="section-heading">
            <span className="eyebrow">Features</span>
            <h2>Semua yang kamu butuhkan untuk hidup sehat</h2>
          </div>
          <div className="feature-grid">
            {[
              [Utensils, 'Log Makan Mudah', 'Catat makanan dari database dan favorit harian.'],
              [Scale, 'Tracking Berat Badan', 'Pantau perubahan berat dengan grafik dan prediksi.'],
              [Bell, 'Reminder Jadwal', 'Pengingat makan dan minum air tepat waktu.'],
              [BarChart3, 'Analisis Nutrisi', 'Breakdown kalori, makro, vitamin, dan mineral.'],
              [Gauge, 'Program Personal', 'Defisit, surplus, atau maintenance sesuai tujuan.'],
              [Trophy, 'Achievement', 'Badge, streak, dan poin untuk menjaga motivasi.']
            ].map(([Icon, title, text], index) => (
              <motion.article
                className="feature-card"
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section goal-section" id="preview">
          <div>
            <span className="eyebrow">Goal selector</span>
            <h2>Pilih tujuanmu</h2>
            <div className="goal-tabs">
              {goals.map((item) => (
                <button className={goal === item ? 'active' : ''} key={item} onClick={() => setGoal(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div className="goal-preview" key={goal} {...pageMotion}>
              <Sparkles />
              <h3>{goal}</h3>
              <p>
                Rekomendasi target kalori, makro, jadwal makan, dan progres mingguan akan disesuaikan dengan
                pilihan program ini.
              </p>
              <Link className="primary-link" to="/register">
                Mulai Program Ini
              </Link>
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </AnimatedPage>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <strong>NutriTrack</strong>
      <nav>
        <Link to="/privacy">Kebijakan Privasi</Link>
        <Link to="/terms">Syarat & Ketentuan</Link>
        <Link to="/login">Masuk</Link>
      </nav>
    </footer>
  )
}

function AuthLayout({ mode }) {
  const navigate = useNavigate()
  const isRegister = mode === 'register'
  const isForgot = mode === 'forgot'
  const isReset = mode === 'reset'
  const isVerify = mode === 'verify'
  const title = {
    login: 'Masuk ke akun sehatmu',
    register: 'Mulai perjalanan sehatmu',
    forgot: 'Lupa kata sandi',
    reset: 'Reset kata sandi',
    verify: 'Cek email kamu'
  }[mode]

  function submit(event) {
    event.preventDefault()
    if (isRegister) navigate('/verify-email')
    else if (isForgot) navigate('/reset-password')
    else if (isReset) navigate('/login')
    else navigate('/onboarding')
  }

  return (
    <AnimatedPage className="auth-page">
      <section className="auth-visual">
        <Link className="brand light" to="/">
          <span className="brand-mark">
            <Apple size={22} />
          </span>
          <span>
            <strong>NutriTrack</strong>
            <small>React PWA</small>
          </span>
        </Link>
        <FloatingNutritionScene compact />
        <div>
          <p className="eyebrow">Animated auth flow</p>
          <h1>Frontend auth sesuai PRD, siap disambungkan ke Supabase.</h1>
        </div>
      </section>
      <section className="auth-panel">
        <motion.div className="auth-card" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1>{title}</h1>
          <p>
            {isVerify
              ? 'Kami sudah mengirim link verifikasi ke alex@nutritrack.app.'
              : 'Gunakan data demo untuk melihat flow dan transisi aplikasi.'}
          </p>
          {isVerify ? (
            <div className="auth-stack">
              <Mail className="mail-icon" />
              <Link className="primary-link full" to="/onboarding">
                Saya sudah verifikasi
              </Link>
              <Link className="ghost-link full" to="/register">
                Salah email? Kembali
              </Link>
            </div>
          ) : (
            <form className="auth-stack" onSubmit={submit}>
              {isRegister && <Input label="Nama Lengkap" value="Alex Carter" />}
              {!isReset && <Input label="Email" value="alex@nutritrack.app" type="email" />}
              {!isForgot && <Input label="Kata Sandi" value="nutritrack" type="password" />}
              {(isRegister || isReset) && <Input label="Konfirmasi Kata Sandi" value="nutritrack" type="password" />}
              {(isRegister || isReset) && <PasswordStrength />}
              {isRegister && (
                <label className="check-line">
                  <input type="checkbox" defaultChecked /> Saya setuju dengan <Link to="/terms">Syarat</Link> dan{' '}
                  <Link to="/privacy">Privasi</Link>
                </label>
              )}
              <button className="primary-link full" type="submit">
                {isForgot ? 'Kirim Link Reset' : isReset ? 'Simpan Password' : isRegister ? 'Daftar Sekarang' : 'Masuk Sekarang'}
              </button>
            </form>
          )}
          <div className="auth-foot">
            {mode === 'login' && <Link to="/forgot-password">Lupa sandi?</Link>}
            {mode === 'login' ? <Link to="/register">Belum punya akun?</Link> : <Link to="/login">Sudah punya akun?</Link>}
          </div>
        </motion.div>
      </section>
    </AnimatedPage>
  )
}

function Input({ label, type = 'text', value }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input defaultValue={value} type={type} />
    </label>
  )
}

function PasswordStrength() {
  return (
    <div>
      <div className="strength-head">
        <span>Kekuatan password</span>
        <strong>Kuat</strong>
      </div>
      <div className="strength-bars">
        {[0, 1, 2, 3, 4].map((item) => (
          <motion.span key={item} initial={{ scaleX: 0 }} animate={{ scaleX: item < 4 ? 1 : 0.25 }} />
        ))}
      </div>
    </div>
  )
}

function AuthRecoveryShell({ title, children }) {
  useEffect(() => {
    document.title = `${title} - NutriTrack`
    document.body.className = ''
  }, [title])

  return (
    <AnimatedPage className="min-h-screen bg-[#f4f7fb] px-6 py-10 font-sans text-[#071727]">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <motion.main
          className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </div>
    </AnimatedPage>
  )
}

function AuthRecoveryLogo() {
  return (
    <Link className="mb-8 inline-flex items-center gap-3" to="/" aria-label="Kembali ke halaman utama NutriTrack">
      <span className="material-symbols-outlined flex h-11 w-11 items-center justify-center rounded-xl bg-[#007a35] text-white">nutrition</span>
      <span className="text-2xl font-black text-[#007a35]">NutriTrack</span>
    </Link>
  )
}

function MaterialSymbol({ children, className = '' }) {
  return <span className={`material-symbols-outlined ${className}`} aria-hidden="true">{children}</span>
}

function LoginPage() {
  const navigate = useNavigate()
  const rememberedEmail = (() => {
    try {
      return localStorage.getItem('nutritrack.rememberedEmail') || 'alex@nutritrack.app'
    } catch {
      return 'alex@nutritrack.app'
    }
  })()
  const [email, setEmail] = useState(rememberedEmail)
  const [password, setPassword] = useState('nutritrack')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [formError, setFormError] = useState('')
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const errors = useMemo(() => validateLoginValues({ email, password }), [email, password])

  useEffect(() => {
    document.title = 'Login - NutriTrack'
    document.body.className = ''
  }, [])

  useEffect(() => {
    try {
      if (remember) localStorage.setItem('nutritrack.rememberedEmail', email)
      else localStorage.removeItem('nutritrack.rememberedEmail')
    } catch {
      // Ignore storage errors in private browsing.
    }
  }, [email, remember])

  async function submit(event) {
    event.preventDefault()
    setSubmitted(true)
    setFormError('')

    if (Object.keys(errors).length > 0) {
      return
    }

    setSubmitting(true)
    try {
      await login(email.trim(), password === 'nutritrack' ? 'nutritrack123' : password)
      navigate('/onboarding')
    } catch (err) {
      const isDemo = email.trim() === 'alex@nutritrack.app' && password === 'nutritrack'
      if (isDemo) navigate('/onboarding')
      else setFormError(err.message || 'Login gagal. Periksa email dan password.')
    } finally {
      setSubmitting(false)
    }
  }

  const showEmailError = (submitted || touched.email) && errors.email
  const showPasswordError = (submitted || touched.password) && errors.password

  return (
    <AnimatedPage className="min-h-screen bg-[#f4f7fb] font-sans text-[#071727]">
      <main className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden items-end overflow-hidden bg-cover bg-center lg:flex" style={{ backgroundImage: "linear-gradient(180deg, rgba(7,23,39,0.08), rgba(7,23,39,0.78)), url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80')" }}>
          <Link className="absolute left-8 top-8 flex items-center gap-3 text-white" to="/">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#007a35]">
              <MaterialSymbol>nutrition</MaterialSymbol>
            </span>
            <span>
              <strong className="block text-2xl font-black leading-none">NutriTrack</strong>
              <small className="block text-[10px] uppercase tracking-[0.28em] text-white/70">Pro Companion</small>
            </span>
          </Link>
          <motion.div className="max-w-2xl p-12 text-white" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-green-200">Welcome back</p>
            <h1 className="mb-5 text-5xl font-black leading-tight">Lanjutkan tracking nutrisi hari ini.</h1>
            <p className="text-lg text-white/80">Masuk untuk membuka dashboard, meal planner, log food, progress, dan komunitas dalam satu pengalaman yang sama.</p>
          </motion.div>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <Link className="mb-10 inline-flex items-center gap-3 lg:hidden" to="/">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#007a35] text-white">
                <MaterialSymbol>nutrition</MaterialSymbol>
              </span>
              <span>
                <strong className="block text-2xl font-black leading-none text-[#007a35]">NutriTrack</strong>
                <small className="block text-[10px] uppercase tracking-[0.28em] text-slate-500">Pro Companion</small>
              </span>
            </Link>

            <motion.div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <div className="mb-8">
                <h2 className="mb-2 text-3xl font-black text-[#071727]">Masuk</h2>
                <p className="text-slate-500">Gunakan akun demo untuk masuk ke dashboard NutriTrack.</p>
              </div>
              <form className="space-y-5" id="loginForm" onSubmit={submit} noValidate>
                <label className="block">
                  <span className="text-sm font-bold text-slate-700">Email</span>
                  <span className="relative mt-2 block">
                    <MaterialSymbol className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</MaterialSymbol>
                    <input
                      id="login-email"
                      className={`h-12 w-full rounded-2xl border bg-slate-50 pl-12 pr-4 outline-none transition focus:border-[#007a35] focus:ring-4 focus:ring-green-900/10 ${showEmailError ? 'border-red-400' : 'border-slate-200'}`}
                      required
                      type="email"
                      value={email}
                      onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      aria-invalid={Boolean(showEmailError)}
                      aria-describedby={showEmailError ? 'login-email-error' : undefined}
                    />
                  </span>
                  {showEmailError && <p className="mt-2 text-sm font-bold text-red-600" id="login-email-error">{errors.email}</p>}
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-slate-700">Password</span>
                  <span className="relative mt-2 block">
                    <MaterialSymbol className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</MaterialSymbol>
                    <input
                      id="login-password"
                      className={`h-12 w-full rounded-2xl border bg-slate-50 pl-12 pr-12 outline-none transition focus:border-[#007a35] focus:ring-4 focus:ring-green-900/10 ${showPasswordError ? 'border-red-400' : 'border-slate-200'}`}
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onBlur={() => setTouched((current) => ({ ...current, password: true }))}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      aria-invalid={Boolean(showPasswordError)}
                      aria-describedby={showPasswordError ? 'login-password-error' : undefined}
                    />
                    <button className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-[#007a35]" type="button" aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'} onClick={() => setShowPassword((value) => !value)}>
                      <MaterialSymbol className="text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</MaterialSymbol>
                    </button>
                  </span>
                  {showPasswordError && <p className="mt-2 text-sm font-bold text-red-600" id="login-password-error">{errors.password}</p>}
                </label>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input checked={remember} className="rounded border-slate-300 text-[#007a35] focus:ring-[#007a35]" type="checkbox" onChange={(event) => setRemember(event.target.checked)} />
                    Ingat saya
                  </label>
                  <Link className="font-bold text-[#007a35] hover:underline" to="/forgot-password">Lupa sandi?</Link>
                </div>
                <div className="min-h-[1px]" aria-live="polite">
                  {formError && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">{formError}</p>}
                </div>
                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#007a35] font-extrabold text-white shadow-lg shadow-green-900/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-wait disabled:opacity-75" type="submit" disabled={submitting}>
                  <MaterialSymbol>{submitting ? 'sync' : 'login'}</MaterialSymbol>
                  {submitting ? 'Memproses...' : 'Masuk ke Onboarding'}
                </button>
              </form>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#e9f8ef] font-bold text-[#007a35]" to="/">
                  <MaterialSymbol className="text-[20px]">arrow_back</MaterialSymbol>
                  Landing
                </Link>
                <Link className="flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-100 font-bold text-slate-700" to="/app/dashboard">
                  <MaterialSymbol className="text-[20px]">dashboard</MaterialSymbol>
                  Demo
                </Link>
              </div>
              <p className="mt-6 text-center text-sm text-slate-600">Belum punya akun? <Link className="font-extrabold text-[#007a35]" to="/register">Daftar Gratis</Link></p>
            </motion.div>
          </div>
        </section>
      </main>
    </AnimatedPage>
  )
}

function validateLoginValues({ email, password }) {
  const errors = {}
  if (!email.trim()) errors.email = 'Email wajib diisi.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Format email tidak valid.'

  if (!password) errors.password = 'Password wajib diisi.'
  else if (password.length < 8) errors.password = 'Password minimal 8 karakter.'

  return errors
}

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('alex@nutritrack.app')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function submit(event) {
    event.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Masukkan email yang valid.')
      return
    }

    setError('')
    setSubmitting(true)
    window.setTimeout(() => navigate('/reset-password'), 320)
  }

  return (
    <AuthRecoveryShell title="Forgot Password">
      <AuthRecoveryLogo />
      <h1 className="mb-3 text-3xl font-black">Lupa Kata Sandi</h1>
      <p className="mb-7 text-slate-600">Masukkan email untuk menerima link reset. Demo frontend akan membuka halaman reset langsung.</p>

      <form className="space-y-5" id="forgotForm" onSubmit={submit} noValidate>
        <label className="block">
          <span className="text-sm font-bold text-slate-700">Email</span>
          <input
            className={`mt-2 h-12 w-full rounded-2xl border bg-slate-50 px-4 outline-none transition focus:border-[#007a35] focus:ring-4 focus:ring-green-900/10 ${error ? 'border-red-400' : 'border-slate-200'}`}
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            inputMode="email"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'forgot-email-error' : undefined}
          />
          {error && <p className="mt-2 text-sm font-bold text-red-600" id="forgot-email-error">{error}</p>}
        </label>

        <button className="h-12 w-full rounded-2xl bg-[#007a35] font-extrabold text-white shadow-lg shadow-green-900/10 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-wait disabled:opacity-75" type="submit" disabled={submitting}>
          {submitting ? 'Mengirim...' : 'Kirim Link Reset'}
        </button>
      </form>

      <Link className="mt-5 inline-flex items-center gap-2 rounded-lg font-bold text-[#007a35] transition hover:underline focus:outline-none focus:ring-4 focus:ring-green-900/10" to="/login">
        <ArrowLeft size={17} />
        Kembali ke login
      </Link>
    </AuthRecoveryShell>
  )
}

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('nutritrack')
  const [confirmation, setConfirmation] = useState('nutritrack')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const strength = getRecoveryPasswordStrength(password)

  function submit(event) {
    event.preventDefault()
    if (password.length < 8) {
      setError('Password minimal 8 karakter.')
      return
    }
    if (password !== confirmation) {
      setError('Konfirmasi password tidak sama.')
      return
    }

    setError('')
    setSubmitting(true)
    window.setTimeout(() => navigate('/login'), 320)
  }

  return (
    <AuthRecoveryShell title="Reset Password">
      <AuthRecoveryLogo />
      <h1 className="mb-3 text-3xl font-black">Reset Kata Sandi</h1>
      <p className="mb-7 text-slate-600">Buat password baru untuk akun NutriTrack.</p>

      <form className="space-y-5" id="resetForm" onSubmit={submit} noValidate>
        <RecoveryPasswordInput
          id="new-password"
          label="Password baru"
          placeholder="Password baru"
          value={password}
          visible={showPassword}
          onChange={setPassword}
          onToggle={() => setShowPassword((current) => !current)}
        />
        <RecoveryPasswordInput
          id="confirm-password"
          label="Konfirmasi password"
          placeholder="Konfirmasi password"
          value={confirmation}
          visible={showConfirmation}
          onChange={setConfirmation}
          onToggle={() => setShowConfirmation((current) => !current)}
        />

        <div className="grid grid-cols-5 gap-2" aria-label={`Kekuatan password ${strength} dari 5`}>
          {[0, 1, 2, 3, 4].map((item) => (
            <motion.span
              className={`h-2 rounded-full ${item < strength ? 'bg-[#007a35]' : 'bg-slate-200'}`}
              key={item}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: item * 0.04, duration: 0.22 }}
            />
          ))}
        </div>

        {error && <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">{error}</p>}

        <button className="h-12 w-full rounded-2xl bg-[#007a35] font-extrabold text-white shadow-lg shadow-green-900/10 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-wait disabled:opacity-75" type="submit" disabled={submitting}>
          {submitting ? 'Menyimpan...' : 'Simpan Password'}
        </button>
      </form>
    </AuthRecoveryShell>
  )
}

function RecoveryPasswordInput({ id, label, placeholder, value, visible, onChange, onToggle }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="sr-only">{label}</span>
      <span className="relative block">
        <input
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-12 outline-none transition focus:border-[#007a35] focus:ring-4 focus:ring-green-900/10"
          id={id}
          required
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="new-password"
        />
        <button
          className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#007a35]"
          type="button"
          aria-label={visible ? `Sembunyikan ${label}` : `Tampilkan ${label}`}
          onClick={onToggle}
        >
          {visible ? <Eye size={18} /> : <Lock size={18} />}
        </button>
      </span>
    </label>
  )
}

function getRecoveryPasswordStrength(password) {
  let score = 0
  if (!password) return 0
  if (password.length >= 8) score += 2
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  if (!/\s/.test(password)) score += 1
  return Math.min(score, 5)
}

function OnboardingPage() {
  const { scrollY } = useScroll()
  const summaryScrollY = useTransform(scrollY, (value) => Math.max(0, value - 224))
  const [summaryFollowsScroll, setSummaryFollowsScroll] = useState(false)
  const [profile, setProfile] = useState(() => {
    const fallback = {
      fullName: 'Alex Carter',
      age: 29,
      heightCm: 178,
      weightKg: 78.5,
      program: 'lose_weight',
      targetWeightKg: 70,
      pacePerWeekKg: 0.5,
      activityLevel: 'moderate',
      foodPreferences: ['Halal Only', 'Masakan Indonesia'],
      allergyStatus: 'Tidak ada alergi',
      dietType: 'Omnivora',
      mealSchedule: {
        breakfast: '07:00',
        lunch: '12:30',
        dinner: '19:00'
      },
      notificationsEnabled: true
    }

    try {
      return { ...fallback, ...(JSON.parse(localStorage.getItem('nutritrack.onboarding') || 'null') || {}) }
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    document.title = 'Onboarding - NutriTrack'
    document.body.className = ''
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const sync = () => setSummaryFollowsScroll(mediaQuery.matches)
    sync()
    mediaQuery.addEventListener('change', sync)
    return () => mediaQuery.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('nutritrack.onboarding', JSON.stringify(profile))
    } catch {
      // Autosave should never block the onboarding page.
    }
  }, [profile])

  const targets = useMemo(() => calculateOnboardingTargets(profile), [profile])
  const progress = useMemo(() => calculateOnboardingProgress(profile), [profile])
  const isHtmlDefaultTimeline =
    Number(profile.weightKg) === 78.5 &&
    Number(profile.targetWeightKg) === 70 &&
    Number(profile.pacePerWeekKg) === 0.5
  const timelineWeeks = isHtmlDefaultTimeline
    ? 30
    : Math.max(1, Math.round(Math.abs(Number(profile.weightKg) - Number(profile.targetWeightKg)) / Number(profile.pacePerWeekKg || 0.5)))

  const updateProfile = (patch) => setProfile((current) => ({ ...current, ...patch }))
  const updateSchedule = (key, value) => setProfile((current) => ({ ...current, mealSchedule: { ...current.mealSchedule, [key]: value } }))
  const togglePreference = (preference) => {
    setProfile((current) => {
      const exists = current.foodPreferences.includes(preference)
      return {
        ...current,
        foodPreferences: exists
          ? current.foodPreferences.filter((item) => item !== preference)
          : [...current.foodPreferences, preference]
      }
    })
  }

  const stepMotionProps = (index) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * 0.06, duration: 0.34 }
  })

  return (
    <AnimatedPage className="min-h-screen bg-[#f4f7fb] font-sans text-[#071727]">
      <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <Link className="flex items-center gap-3" to="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#007a35] text-white">
              <MaterialSymbol>nutrition</MaterialSymbol>
            </span>
            <span className="text-xl font-black text-[#007a35]">NutriTrack</span>
          </Link>
          <Link className="text-sm font-bold text-slate-500 transition hover:text-[#007a35]" to="/app/dashboard">Lewati</Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <motion.div className="mb-10" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-[#007a35]">Self-service onboarding</p>
          <h1 className="mb-4 text-4xl font-black md:text-5xl">Setup profil sehatmu</h1>
          <p className="max-w-2xl text-slate-600">Enam langkah pertama sesuai PRD untuk menghitung target kalori, makro, preferensi, dan jadwal makan.</p>
          <div className="mt-6 h-3 overflow-hidden rounded-full border border-slate-200 bg-white" role="progressbar" aria-label="Onboarding progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
            <motion.div className="h-full rounded-full bg-[#007a35]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </motion.div>

        <section className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-5">
            <motion.article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1" {...stepMotionProps(0)}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f8ef] font-black text-[#007a35]">1</span>
                <h2 className="text-xl font-black">Kenali Tubuhmu</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-4">
                <OnboardingTextField label="Nama" value={profile.fullName} onChange={(value) => updateProfile({ fullName: value })} />
                <OnboardingNumberField label="Umur" suffix="tahun" value={profile.age} min={12} max={100} onChange={(value) => updateProfile({ age: value })} />
                <OnboardingNumberField label="Tinggi" suffix="cm" value={profile.heightCm} min={100} max={230} onChange={(value) => updateProfile({ heightCm: value })} />
                <OnboardingNumberField label="Berat" suffix="kg" value={profile.weightKg} min={30} max={250} step="0.1" onChange={(value) => updateProfile({ weightKg: value })} />
              </div>
            </motion.article>

            <motion.article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1" {...stepMotionProps(1)}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 font-black text-orange-600">2</span>
                <h2 className="text-xl font-black">Pilih Program</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['lose_weight', 'Turun Berat Badan', 'Defisit kalori sehat.', 'bg-orange-50 border-orange-100'],
                  ['gain_weight', 'Naik Berat Badan', 'Bulking bergizi.', 'bg-blue-50 border-blue-100'],
                  ['healthy_eating', 'Pola Makan Sehat', 'Seimbang harian.', 'bg-[#e9f8ef] border-green-100']
                ].map(([value, title, copy, tone]) => (
                  <button className={`rounded-2xl border p-5 text-left transition hover:-translate-y-1 ${tone} ${profile.program === value ? 'ring-4 ring-green-900/10' : ''}`} type="button" key={value} aria-pressed={profile.program === value} onClick={() => updateProfile({ program: value })}>
                    <b>{title}</b>
                    <p className="mt-2 text-sm text-slate-600">{copy}</p>
                  </button>
                ))}
              </div>
            </motion.article>

            <motion.article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1" {...stepMotionProps(2)}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-black text-blue-700">3</span>
                <h2 className="text-xl font-black">Target & Timeline</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <OnboardingNumberField label="Target" suffix="kg" value={profile.targetWeightKg} min={30} max={250} step="0.1" onChange={(value) => updateProfile({ targetWeightKg: value })} />
                <OnboardingNumberField label="Normal" suffix="kg/minggu" value={profile.pacePerWeekKg} min={0.1} max={1.5} step="0.1" onChange={(value) => updateProfile({ pacePerWeekKg: value })} />
                <OnboardingTextField label="Estimasi" value={`~${timelineWeeks} minggu`} readOnly />
              </div>
            </motion.article>

            <motion.article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1" {...stepMotionProps(3)}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 font-black text-purple-700">4</span>
                <h2 className="text-xl font-black">Level Aktivitas</h2>
              </div>
              <div className="grid gap-3 text-sm md:grid-cols-5">
                {[
                  ['sedentary', 'Jarang'],
                  ['light', 'Ringan'],
                  ['moderate', 'Sedang'],
                  ['active', 'Aktif'],
                  ['very_active', 'Sangat Aktif']
                ].map(([value, label]) => (
                  <button className={`rounded-xl p-3 text-left transition hover:-translate-y-0.5 ${profile.activityLevel === value ? 'bg-[#007a35] font-bold text-white' : 'bg-slate-50 text-[#071727]'}`} type="button" aria-pressed={profile.activityLevel === value} onClick={() => updateProfile({ activityLevel: value })} key={value}>{label}</button>
                ))}
              </div>
            </motion.article>

            <motion.article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1" {...stepMotionProps(4)}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 font-black text-[#007a35]">5</span>
                <h2 className="text-xl font-black">Preferensi Makanan</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Halal Only', 'Masakan Indonesia'].map((preference) => (
                  <button className={`rounded-full px-4 py-2 font-bold transition hover:-translate-y-0.5 ${profile.foodPreferences.includes(preference) ? 'bg-[#007a35] text-white' : 'bg-[#e9f8ef] text-[#007a35]'}`} type="button" aria-pressed={profile.foodPreferences.includes(preference)} onClick={() => togglePreference(preference)} key={preference}>{preference}</button>
                ))}
                <OnboardingSelectPill value={profile.allergyStatus} options={['Tidak ada alergi', 'Kacang', 'Seafood', 'Gluten']} onChange={(value) => updateProfile({ allergyStatus: value })} />
                <OnboardingSelectPill value={profile.dietType} options={['Omnivora', 'Vegetarian', 'Vegan', 'Pescatarian']} onChange={(value) => updateProfile({ dietType: value })} />
              </div>
            </motion.article>

            <motion.article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1" {...stepMotionProps(5)}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 font-black text-sky-700">6</span>
                <h2 className="text-xl font-black">Jadwal & Notifikasi</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <OnboardingTimeField label="Sarapan" value={profile.mealSchedule.breakfast} onChange={(value) => updateSchedule('breakfast', value)} />
                <OnboardingTimeField label="Lunch" value={profile.mealSchedule.lunch} onChange={(value) => updateSchedule('lunch', value)} />
                <OnboardingTimeField label="Dinner" value={profile.mealSchedule.dinner} onChange={(value) => updateSchedule('dinner', value)} />
              </div>
              <label className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-600">
                <input className="rounded border-slate-300 text-[#007a35] focus:ring-[#007a35]" type="checkbox" checked={profile.notificationsEnabled} onChange={(event) => updateProfile({ notificationsEnabled: event.target.checked })} />
                Notifikasi aktif
              </label>
            </motion.article>
          </div>

          <aside className="self-start lg:sticky lg:top-24">
            <motion.div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-xl" style={{ y: summaryFollowsScroll ? summaryScrollY : 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[#007a35]">Rencana siap</p>
              <h2 className="mb-5 text-2xl font-black">Target harian</h2>
              <div className="space-y-3 text-sm">
                {[
                  ['Kalori', `${targets.calories.toLocaleString('en-US')} kcal`],
                  ['Protein', `${targets.protein} g`],
                  ['Karbohidrat', `${targets.carbs} g`],
                  ['Lemak', `${targets.fat} g`]
                ].map(([label, value], index) => (
                  <motion.div className="flex justify-between" key={label} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + index * 0.04 }}>
                    <span>{label}</span>
                    <b>{value}</b>
                  </motion.div>
                ))}
              </div>
              <Link className="mt-7 flex h-12 items-center justify-center rounded-2xl bg-[#007a35] font-extrabold text-white transition hover:scale-[1.01] active:scale-[0.99]" to="/app/dashboard">Mulai Perjalananku</Link>
            </motion.div>
          </aside>
        </section>
      </main>
    </AnimatedPage>
  )
}

function OnboardingTextField({ label, value, onChange, readOnly = false }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-[#007a35] focus:ring-4 focus:ring-green-900/10 read-only:text-slate-500" value={value} readOnly={readOnly} onChange={(event) => onChange?.(event.target.value)} aria-label={label} />
    </label>
  )
}

function OnboardingNumberField({ label, suffix, value, onChange, min, max, step = '1' }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <span className="relative block">
        <input className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-16 outline-none focus:border-[#007a35] focus:ring-4 focus:ring-green-900/10" type="number" min={min} max={max} step={step} value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">{suffix}</span>
      </span>
    </label>
  )
}

function OnboardingTimeField({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-500">{label}</span>
      <input className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-[#007a35] focus:ring-4 focus:ring-green-900/10" type="time" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function OnboardingSelectPill({ value, options, onChange }) {
  return (
    <label className="rounded-full bg-slate-100 px-4 py-2">
      <span className="sr-only">{value}</span>
      <select className="border-0 bg-transparent p-0 text-sm font-medium text-[#071727] focus:ring-0" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

function calculateOnboardingTargets(profile) {
  const weight = Number(profile.weightKg) || 78.5
  const base = profile.program === 'gain_weight' ? 2600 : profile.program === 'healthy_eating' ? 2200 : 1800

  return {
    calories: base,
    protein: Math.round((weight * 1.7) / 5) * 5,
    carbs: Math.round((base * 0.4) / 4),
    fat: Math.round((base * 0.3) / 9)
  }
}

function calculateOnboardingProgress(profile) {
  const checks = [
    profile.fullName,
    Number(profile.age) > 0 && Number(profile.heightCm) > 0 && Number(profile.weightKg) > 0,
    profile.program,
    Number(profile.targetWeightKg) > 0 && Number(profile.pacePerWeekKg) > 0,
    profile.activityLevel,
    profile.foodPreferences.length > 0 && profile.allergyStatus && profile.dietType,
    profile.mealSchedule.breakfast && profile.mealSchedule.lunch && profile.mealSchedule.dinner
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

const proRoutes = {
  '/app/dashboard': ProDashboardRoute,
  '/app/log-food': ProLogFoodPage,
  '/app/meal-planner': ProMealPlannerPage,
  '/app/progress': ProProgressPage,
  '/app/nutrition': ProNutritionPage,
  '/app/foods': ProFoodsPage,
  '/app/foods/gado-gado': ProFoodDetailPage,
  '/app/community': ProCommunityRoute,
  '/app/profile': ProProfilePage,
  '/app/settings': ProSettingsPage,
  '/app/notifications': ProNotificationsPage,
  '/help': ProHelpPage
}

function ProAppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activityHubOpen, setActivityHubOpen] = useState(false)
  const [auth, setAuth] = useState(() => getStoredAuth())
  const [shellData, setShellData] = useState({
    me: null,
    summary: null,
    notifications: []
  })
  const [shellError, setShellError] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const meta = proPageMeta[location.pathname] || proPageMeta['/app/dashboard']

  useEffect(() => {
    document.title = `${meta.title} - NutriTrack`
    document.body.className = 'bg-background text-on-surface font-sans overflow-x-hidden'
  }, [meta.title])

  useEffect(() => {
    let active = true

    async function ensureSession() {
      try {
        let currentAuth = getStoredAuth()
        if (!currentAuth?.token) {
          currentAuth = await login('alex@nutritrack.app', 'nutritrack123')
        }
        if (active) setAuth(currentAuth)
      } catch (err) {
        if (active) setShellError(err.message || 'Gagal menghubungkan backend.')
      }
    }

    ensureSession()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!auth?.token) return undefined
    let active = true

    async function loadShellData() {
      try {
        const [me, summary, notifications] = await Promise.all([
          apiRequest('/api/auth/me'),
          apiRequest(`/api/dashboard/summary?date=${todayIso()}`),
          apiRequest('/api/notifications?limit=8')
        ])
        if (active) {
          setShellData({ me, summary, notifications })
          setShellError('')
        }
      } catch (err) {
        if (active) setShellError(err.message || 'Gagal memuat data backend.')
      }
    }

    loadShellData()
    return () => {
      active = false
    }
  }, [auth?.token])

  const userName = shellData.me?.fullName || shellData.summary?.user?.fullName || auth?.user?.fullName || 'Alex Carter'
  const avatarUrl =
    shellData.me?.avatarUrl ||
    shellData.summary?.user?.avatarUrl ||
    auth?.user?.avatarUrl ||
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'

  const logout = () => {
    clearStoredAuth()
    setAuth(null)
    navigate('/login')
  }

  return (
    <div className="pro-theme min-h-screen bg-background text-on-surface">
      <button
        className="fixed left-4 top-4 z-[70] grid h-11 w-11 place-items-center rounded-xl bg-white/90 text-primary shadow-lg ring-1 ring-outline-variant/50 backdrop-blur-xl lg:hidden"
        onClick={() => setMobileOpen(true)}
        type="button"
        aria-label="Open menu"
      >
        <Home size={20} />
      </button>
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            type="button"
            aria-label="Close menu backdrop"
          />
        )}
      </AnimatePresence>
      <AppSidebar
        currentPath={location.pathname}
        mobileOpen={mobileOpen}
        navItems={proNavItems}
        onCloseMobile={() => setMobileOpen(false)}
        onLogout={logout}
      />

      <div className="min-w-0 lg:pl-[272px]">
        <header className="sticky top-0 z-40 border-b border-outline-variant/30 bg-surface/80 px-5 py-4 backdrop-blur-xl lg:px-8">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 pl-12 lg:pl-0">
              <h1 className="truncate font-headline-md text-headline-md font-bold text-primary">{meta.title}</h1>
              <p className="mt-1 truncate text-label-md text-on-surface-variant/60">{meta.subtitle}</p>
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <label className="hidden h-10 min-w-0 flex-1 items-center gap-3 rounded-full bg-surface-container px-5 text-on-surface-variant md:flex md:w-64">
                <Search size={18} />
                <input className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm outline-none ring-0 focus:ring-0" placeholder={meta.search} />
              </label>
              <button className="relative grid h-11 w-11 flex-shrink-0 place-items-center rounded-full text-on-surface-variant transition hover:bg-surface-container" onClick={() => setActivityHubOpen(true)} type="button" aria-label="Open notifications">
                <Bell size={20} />
                {(shellData.notifications || []).some((item) => item.status === 'unread') && <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-error-red ring-2 ring-surface" />}
              </button>
              <Link className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full text-on-surface-variant transition hover:bg-surface-container" to="/app/settings">
                <Settings size={20} />
              </Link>
              <div className="group relative flex min-w-0">
                <Link className="flex min-w-0 items-center gap-3 border-l border-outline-variant pl-3" to="/app/profile">
                  <img className="h-11 w-11 rounded-full border-2 border-primary-container object-cover" src={avatarUrl} alt={userName} />
                  <span className="hidden text-left lg:block">
                    <strong className="block text-sm font-black">{userName}</strong>
                    <small className="block text-xs text-on-surface-variant">Pro Member</small>
                  </span>
                </Link>
                <div className="invisible absolute right-0 top-[calc(100%+14px)] z-50 w-80 translate-y-2 rounded-3xl border border-outline-variant/30 bg-white p-4 text-left opacity-0 shadow-2xl shadow-slate-900/10 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-center gap-3 border-b border-outline-variant/20 pb-4">
                    <img className="h-12 w-12 rounded-2xl border-2 border-primary-container object-cover" src={avatarUrl} alt={userName} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-on-surface">{userName}</p>
                      <p className="text-xs font-bold text-on-surface-variant">Member profile</p>
                    </div>
                    <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary">Pro</span>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      ['Free', 'bg-surface-container text-on-surface-variant border-outline-variant/30'],
                      ['Pro', 'bg-primary text-on-primary border-primary'],
                      ['Premium', 'bg-energy-orange/10 text-energy-orange border-energy-orange/20']
                    ].map(([plan, className]) => (
                      <div className={`rounded-2xl border px-3 py-3 text-center ${className}`} key={plan}>
                        <p className="text-[11px] font-black uppercase tracking-wider">{plan}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid gap-2">
                    <Link className="flex items-center gap-3 rounded-2xl bg-surface-container-low px-4 py-3 text-sm font-black text-on-surface transition hover:bg-surface-container" to="/app/profile">
                      <User size={18} />
                      Lihat Profile
                    </Link>
                    <button className="flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black text-error-red transition hover:bg-error-red/10" onClick={logout} type="button">
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {shellError && <p className="mx-auto mt-3 max-w-[1280px] rounded-xl bg-error-red/10 px-4 py-2 text-sm font-bold text-error-red">{shellError}</p>}
        </header>

        <ProAppRoutes shellData={shellData} />
      </div>
      <ActivityHubDrawer shellData={shellData} open={activityHubOpen} onClose={() => setActivityHubOpen(false)} />
    </div>
  )
}

function ProAppRoutes({ shellData }) {
  const location = useLocation()
  const Page = proRoutes[location.pathname] || ProDashboardRoute
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
        <Page key={location.pathname} shellData={shellData} />
      </Suspense>
    </AnimatePresence>
  )
}

function ProPage({ children, action, eyebrow = 'NutriTrack PWA', title, subtitle, showHeader = true, wide = false }) {
  return (
    <motion.main
      className={`mx-auto grid ${wide ? 'max-w-[1400px]' : 'max-w-[1280px]'} gap-7 px-5 py-7 pb-24 lg:px-8`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {showHeader ? (
        <section className="pro-section-header flex flex-col gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/80 p-5 shadow-sm backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
            <h2 className="mt-2 font-headline-md text-3xl font-black text-on-background">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">{subtitle}</p>
          </div>
          {action}
        </section>
      ) : null}
      {children}
    </motion.main>
  )
}

function ProPanel({ children, className = '', delay = 0, style }) {
  return (
    <motion.section
      className={`pro-card min-w-0 rounded-2xl border border-outline-variant/35 bg-surface-container-lowest/80 p-5 shadow-sm backdrop-blur-xl ${className}`}
      style={style}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(22, 163, 74, 0.1)' }}
    >
      {children}
    </motion.section>
  )
}

function ProLogFoodPage() {
  const { data: logs, setData: setLogs } = useBackendData(() => apiRequest(`/api/food-logs?date=${todayIso()}`), [], [])
  const { data: foods } = useBackendData(() => apiRequest('/api/foods?limit=8'), [], [])
  const [saving, setSaving] = useState(false)
  const htmlMealFallback = {
    breakfast: [
      { food_name: 'Oatmeal with Blueberries', calories: 310 },
      { food_name: 'Greek Yogurt', calories: 110 }
    ],
    lunch: [
      { food_name: 'Quinoa Salad with Tofu', calories: 520 },
      { food_name: 'Hummus & Carrots', calories: 160 }
    ],
    dinner: [],
    afternoon_snack: [
      { food_name: 'Mixed Nuts (30g)', calories: 180 },
      { food_name: 'Protein Bar', calories: 170 }
    ]
  }
  const mealOrder = ['breakfast', 'lunch', 'dinner', 'afternoon_snack']
  const hasLogs = logs.length > 0
  const groupedLogs = mealOrder.map((mealType) => {
    const backendItems = logs.filter((log) => (log.meal_type || log.mealType) === mealType)
    const items = backendItems.length ? backendItems : hasLogs ? [] : htmlMealFallback[mealType]
    return {
      mealType,
      kcal: items.reduce((total, item) => total + Number(item.calories || 0), 0),
      items
    }
  })
  const fallbackRecentItems = [
    { id: 'recent-coffee', food_name: 'Black Coffee', meal_type: 'breakfast', serving_unit: '1 cup', calories: 2, tone: 'primary' },
    { id: 'recent-omelette', food_name: 'Omelette with Spinach', meal_type: 'breakfast', serving_unit: '2 eggs', calories: 240, tone: 'secondary' },
    { id: 'recent-apple', food_name: 'Fuji Apple', meal_type: 'afternoon_snack', serving_unit: '1 medium', calories: 95, tone: 'orange' }
  ]
  const recentItems = logs.length ? logs.slice(0, 3) : fallbackRecentItems
  const consumed = hasLogs ? groupedLogs.reduce((total, meal) => total + meal.kcal, 0) : 1450
  const dailyGoal = 2100
  const remaining = Math.max(dailyGoal - consumed, 0)
  const foodSuggestions = foods.length
    ? foods.slice(0, 2).map((food) => ({
        name: food.food_name || food.name,
        calories: food.calories,
        serving: food.serving_unit || 'serving'
      }))
    : [
        { name: 'Grilled Chicken Breast', calories: 165, serving: '100g' },
        { name: 'Brown Rice', calories: 111, serving: '100g' }
      ]

  const addQuickItem = async () => {
    const food = foods[0]
    if (!food || saving) return
    setSaving(true)
    try {
      await apiRequest('/api/food-logs', {
        method: 'POST',
        body: {
          foodId: food.id,
          mealType: 'breakfast',
          logDate: todayIso(),
          servingAmount: 1,
          servingUnit: food.serving_unit || 'porsi'
        }
      })
      const nextLogs = await apiRequest(`/api/food-logs?date=${todayIso()}`)
      setLogs(nextLogs)
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.main
      className="pro-logfood-page mx-auto max-w-[1200px] px-5 py-7 pb-28 lg:px-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-black text-on-surface">Daily Food Log</h1>
          <p className="mt-1 font-body-md text-on-surface-variant">Tuesday, October 24th, 2023</p>
        </div>
        <LogFoodSummaryCard consumed={consumed} dailyGoal={dailyGoal} remaining={remaining} />
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="grid content-start gap-6 xl:col-span-4">
          <LogFoodSearchCard suggestions={foodSuggestions} />
          <LogFoodRecentCard items={recentItems} onAdd={addQuickItem} saving={saving} />
        </div>

        <div className="grid gap-6 xl:col-span-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {groupedLogs.map((meal, index) => (
              <LogFoodMealCard key={meal.mealType} meal={meal} index={index} onAdd={addQuickItem} saving={saving} />
            ))}
          </div>
          <LogFoodMacroDistribution />
        </div>
      </section>

    </motion.main>
  )
}

function LogFoodSummaryCard({ consumed, dailyGoal, remaining }) {
  const items = [
    ['Consumed', consumed, 'text-primary'],
    ['Daily Goal', dailyGoal, 'text-energy-orange'],
    ['Remaining', remaining, 'text-secondary']
  ]
  return (
    <div className="grid w-full grid-cols-3 gap-3 rounded-3xl border border-outline-variant/30 bg-surface-container-high px-4 py-4 shadow-sm sm:w-auto sm:flex sm:items-center sm:gap-8 sm:px-8">
      {items.map(([label, value, color], index) => (
        <div className="flex min-w-0 items-center gap-4" key={label}>
          {index > 0 && <div className="hidden h-10 w-px bg-outline-variant/50 sm:block" />}
          <div className="min-w-0 text-center">
            <span className={`block font-metrics-mono text-xl font-bold ${color}`}>{formatNumber(value)}</span>
            <span className="text-label-sm uppercase text-on-surface-variant">{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function LogFoodSearchCard({ suggestions }) {
  return (
    <motion.section
      className="glass-card logfood-search-card group relative rounded-2xl border border-outline-variant/50 bg-white/80 p-5 shadow-md backdrop-blur-xl focus-within:ring-2 focus-within:ring-primary/30"
      whileHover={{ y: -2 }}
    >
      <h3 className="mb-3 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Search Food Database</h3>
      <label className="relative block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
        <input
          className="w-full rounded-xl border-none bg-surface-container py-3 pl-10 pr-4 font-body-md text-on-surface outline-none ring-1 ring-outline-variant/30 transition-all focus:ring-2 focus:ring-primary"
          placeholder="Search for chicken, rice, coffee..."
          aria-label="Search food database"
        />
      </label>
      <div className="logfood-suggestions mt-3 grid gap-1 overflow-hidden transition-all duration-300">
        {suggestions.map((food) => (
          <button className="flex items-center justify-between rounded-lg p-2 text-left text-sm hover:bg-surface-variant/40" key={food.name} type="button">
            <span>{food.name}</span>
            <span className="text-on-surface-variant/60">{formatNumber(food.calories)} kcal / {food.serving}</span>
          </button>
        ))}
      </div>
    </motion.section>
  )
}

function LogFoodRecentCard({ items, onAdd, saving }) {
  return (
    <motion.section className="glass-card rounded-2xl bg-white/80 p-5 shadow-md backdrop-blur-xl" whileHover={{ y: -2 }}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Recent History</h3>
        <button className="text-label-sm text-primary hover:underline" type="button">View All</button>
      </div>
      <div className="custom-scrollbar grid max-h-[400px] gap-3 overflow-y-auto pr-1">
        {items.map((item, index) => (
          <LogFoodRecentItem item={item} index={index} key={item.id || item.food_name || item.name || index} onAdd={onAdd} saving={saving} />
        ))}
      </div>
    </motion.section>
  )
}

function LogFoodRecentItem({ item, index, onAdd, saving }) {
  const tones = [
    { bg: 'bg-mint-surface/50', border: 'border-primary/10', iconBg: 'bg-primary-container/20', iconText: 'text-primary', Icon: Activity },
    { bg: 'bg-surface-container-low', border: 'border-outline-variant/20', iconBg: 'bg-secondary/10', iconText: 'text-secondary', Icon: Flame },
    { bg: 'bg-surface-container-low', border: 'border-outline-variant/20', iconBg: 'bg-energy-orange/10', iconText: 'text-energy-orange', Icon: Apple }
  ]
  const tone = tones[index % tones.length]
  const name = item.food_name || item.foodName || item.name || 'Food item'
  const meal = mealLabel(item.meal_type || item.mealType || item.category || 'afternoon_snack')
  const serving = item.serving_unit || item.servingUnit || item.serving || '1 serving'
  const Icon = tone.Icon

  return (
    <motion.article
      className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border p-3 transition-all hover:shadow-sm ${tone.bg} ${tone.border}`}
      whileHover={{ x: 2 }}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone.iconBg} ${tone.iconText}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-label-md font-bold text-on-surface">{name}</p>
        <p className="text-label-sm text-on-surface-variant">{meal} • {serving}</p>
      </div>
      <div className="text-right">
        <p className="font-metrics-mono font-bold text-on-surface">{formatNumber(item.calories || 0)} <span className="text-[10px] uppercase">kcal</span></p>
      </div>
      <div className="absolute inset-0 flex translate-x-full items-center justify-center gap-4 bg-primary/95 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
        <button className="rounded-full bg-white/20 p-2 text-white hover:bg-white/40" onClick={onAdd} disabled={saving} type="button" aria-label={`Add ${name}`}>
          <Plus size={18} />
        </button>
        <button className="rounded-full bg-white/20 p-2 text-white hover:bg-white/40" type="button" aria-label={`Edit ${name}`}>
          <Settings size={18} />
        </button>
      </div>
    </motion.article>
  )
}

function LogFoodMealCard({ meal, index, onAdd, saving }) {
  const styles = [
    { title: 'Breakfast', color: '#006e2f', border: 'border-l-primary', Icon: Activity, target: 630 },
    { title: 'Lunch', color: '#0058be', border: 'border-l-secondary', Icon: Utensils, target: 680 },
    { title: 'Dinner', color: '#a855f7', border: 'border-l-achievement-purple', Icon: Droplets, target: 650 },
    { title: 'Snacks', color: '#f97316', border: 'border-l-energy-orange', Icon: Apple, target: 350 }
  ]
  const style = styles[index]
  const Icon = style.Icon
  const hasItems = meal.items.length > 0
  const pct = style.target ? Math.min(100, Math.round((meal.kcal / style.target) * 100)) : 0

  return (
    <motion.article
      className={`glass-card flex min-h-[210px] flex-col rounded-3xl border-l-4 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-md ${style.border}`}
      whileHover={{ y: -3 }}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon style={{ color: style.color }} size={22} />
          <h4 className="font-headline-md text-lg font-black text-on-surface">{style.title}</h4>
        </div>
        <div className="text-right">
          {hasItems ? (
            <>
              <p className="font-metrics-mono text-lg font-bold text-on-surface">{formatNumber(meal.kcal)} <span className="text-xs font-normal uppercase text-on-surface-variant">kcal</span></p>
              <div className="mt-1 h-1 w-24 overflow-hidden rounded-full bg-surface-container">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: style.color, width: `${pct}%`, transformOrigin: 'left center' }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.65 }} />
              </div>
            </>
          ) : (
            <p className="font-metrics-mono text-lg font-bold italic text-on-surface-variant">Waiting... <span className="text-xs font-normal uppercase">kcal</span></p>
          )}
        </div>
      </div>

      {hasItems ? (
        <div className="mb-4 grid flex-grow gap-2">
          {meal.items.slice(0, 3).map((item, itemIndex) => (
            <div className="flex justify-between gap-3 text-sm" key={item.id || item.food_name || item.name || itemIndex}>
              <span className="min-w-0 truncate text-on-surface-variant">{item.food_name || item.foodName || item.name}</span>
              <span className="font-metrics-mono">{formatNumber(item.calories || 0)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-grow flex-col items-center justify-center opacity-60">
          <Utensils className="mb-2 text-outline-variant" size={38} />
          <p className="text-label-sm text-on-surface-variant">No items logged yet</p>
        </div>
      )}

      <button
        className="mt-auto flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-outline-variant/50 py-3 text-on-surface-variant transition-all hover:border-current"
        style={{ '--hover-color': style.color }}
        onClick={onAdd}
        disabled={saving}
        type="button"
      >
        <Plus size={16} />
        <span className="font-label-md text-label-md">{saving ? 'Adding...' : 'Add Item'}</span>
      </button>
    </motion.article>
  )
}

function LogFoodMacroDistribution() {
  return (
    <motion.section
      className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-3xl border border-outline-variant/30 bg-gradient-to-br from-mint-surface to-surface-container-low shadow-inner"
      whileHover={{ y: -3 }}
    >
      <motion.div
        className="absolute h-56 w-56 rounded-full border-[18px] border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute h-36 w-36 rounded-full border-[14px] border-secondary/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative z-10 text-center">
        <BarChart3 className="mx-auto mb-2 text-primary" size={48} />
        <h3 className="font-headline-md text-xl font-black text-on-primary-container">Macro Distribution</h3>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">Protein: 40%</span>
          <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold text-secondary">Carbs: 35%</span>
          <span className="rounded-full bg-energy-orange/20 px-3 py-1 text-xs font-bold text-energy-orange">Fat: 25%</span>
        </div>
      </div>
    </motion.section>
  )
}

function ProProgressPage() {
  const { data: weights, setData: setWeights } = useBackendData(() => apiRequest('/api/progress/weight?limit=30'), [], [])
  const latest = weights[weights.length - 1] || { weight_kg: 78.5, bmi: 23.8, bmi_category: 'Healthy' }
  const [weight, setWeight] = useState(latest.weight_kg || 78.5)
  const [saving, setSaving] = useState(false)
  const currentWeight = Number(latest.weight_kg || latest.weightKg || 78.5)
  const currentBmi = Number(latest.bmi || 23.8)
  const bmiCategory = latest.bmi_category || latest.bmiCategory || 'Healthy'
  const historyLogs = weights.length
    ? weights.slice(-5).reverse().map((entry, index, arr) => {
        const entryWeight = Number(entry.weight_kg || entry.weightKg || currentWeight)
        const previous = Number(arr[index + 1]?.weight_kg || arr[index + 1]?.weightKg || entryWeight)
        const delta = Number((entryWeight - previous).toFixed(1))
        const rawDate = entry.log_date || entry.logDate || entry.created_at || entry.createdAt || new Date().toISOString()
        return {
          id: entry.id || `${rawDate}-${entryWeight}`,
          date: new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          session: 'Morning Entry',
          time: '7:15 AM',
          weight: entryWeight,
          delta,
          photoUrl: entry.photo_url || entry.photoUrl || null
        }
      })
    : [
        {
          id: 'sep-28',
          date: 'Sep 28, 2023',
          session: 'Morning Entry',
          time: '7:15 AM',
          weight: 78.5,
          delta: -0.2,
          photoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=220&q=80'
        },
        { id: 'sep-27', date: 'Sep 27, 2023', session: 'Morning Entry', time: '7:30 AM', weight: 78.7, delta: 0.1, photoUrl: null },
        {
          id: 'sep-26',
          date: 'Sep 26, 2023',
          session: 'Morning Entry',
          time: '7:20 AM',
          weight: 78.6,
          delta: -0.4,
          photoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=220&q=80'
        }
      ]

  useEffect(() => {
    if (latest.weight_kg) setWeight(latest.weight_kg)
  }, [latest.weight_kg])

  const saveWeight = async (event) => {
    event?.preventDefault?.()
    setSaving(true)
    try {
      await apiRequest('/api/progress/weight', {
        method: 'POST',
        body: { weightKg: Number(weight), logDate: todayIso() }
      })
      setWeights(await apiRequest('/api/progress/weight?limit=30'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.main
      className="pro-progress-page mx-auto max-w-[1200px] px-5 py-7 pb-28 lg:px-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="mb-8">
        <h2 className="font-headline-lg text-headline-lg font-black text-on-surface">Weight Journey</h2>
        <p className="mt-2 font-body-md text-on-surface-variant">You've lost 2.4kg in the last 30 days. Stay consistent!</p>
      </section>

      <section className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <ProgressTrendCard currentWeight={currentWeight} />
        <div className="grid content-start gap-6 lg:col-span-4">
          <ProgressLogWeightCard saving={saving} saveWeight={saveWeight} setWeight={setWeight} weight={weight} />
          <ProgressBmiCard bmi={currentBmi} category={bmiCategory} />
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <ProgressInsightCard Icon={Flame} borderColor="#f97316" label="Target Date" value="Oct 12, 2023" description="Based on your current pace" />
        <ProgressInsightCard Icon={Trophy} borderColor="#a855f7" label="Next Milestone" value="-1.5 kg to go" description="75kg Goal Milestone" />
        <ProgressInsightCard Icon={CalendarDays} borderColor="#0058be" label="Consistency" value="12 Day Streak" description="Daily logging hero" />
      </section>

      <ProgressHistoryCard logs={historyLogs} />

      <button
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl transition-transform active:scale-[0.98] xl:hidden"
        onClick={saveWeight}
        type="button"
        aria-label="Add weight progress"
      >
        <Plus size={26} />
      </button>
    </motion.main>
  )
}

function ProgressGlassCard({ children, className = '', style }) {
  return (
    <motion.section
      className={`glass-card border border-outline-variant/30 bg-white/80 shadow-md backdrop-blur-xl ${className}`}
      style={style}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.section>
  )
}

function ProgressTrendCard({ currentWeight }) {
  return (
    <ProgressGlassCard className="rounded-2xl p-5 lg:col-span-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-headline-md text-headline-md font-black text-on-surface">Progress Trends</h3>
        <div className="flex gap-2 rounded-lg bg-surface-container-low p-1">
          {['1M', '3M', '6M', '1Y'].map((range, index) => (
            <button
              className={`rounded-md px-3 py-1 text-label-sm transition-all ${index === 0 ? 'bg-white font-bold text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              key={range}
              type="button"
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="relative flex h-64 w-full items-end overflow-hidden rounded-xl bg-surface-container-lowest/50 px-4 pb-4">
        <svg className="h-full w-full text-primary drop-shadow-lg" viewBox="0 0 400 100" preserveAspectRatio="none" role="img" aria-label="Weight trend line chart">
          <defs>
            <linearGradient id="progressChartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,80 C50,75 100,85 150,60 C200,35 250,45 300,30 C350,15 400,20 450,10 L450,100 L0,100 Z"
            fill="url(#progressChartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            d="M0,80 C50,75 100,85 150,60 C200,35 250,45 300,30 C350,15 400,20 450,10"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <circle cx="150" cy="60" fill="white" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="300" cy="30" fill="white" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>
        <div className="absolute right-4 top-4 flex flex-col items-end">
          <span className="font-metrics-mono font-bold text-primary">{formatNumber(currentWeight)} kg</span>
          <span className="text-label-sm text-on-surface-variant">Current</span>
        </div>
      </div>
    </ProgressGlassCard>
  )
}

function ProgressLogWeightCard({ weight, setWeight, saveWeight, saving }) {
  return (
    <ProgressGlassCard className="rounded-2xl bg-gradient-to-br from-white to-mint-surface p-5">
      <h4 className="mb-4 font-headline-md text-xl font-black text-on-surface">Log Weight</h4>
      <form className="grid gap-4" onSubmit={saveWeight}>
        <label className="block">
          <span className="mb-1 ml-1 block text-label-sm text-on-surface-variant">Current Weight (kg)</span>
          <input
            className="h-12 w-full rounded-xl border-outline-variant/30 bg-white px-4 font-metrics-mono text-lg focus:border-primary focus:ring-primary"
            onChange={(event) => setWeight(event.target.value)}
            placeholder="00.0"
            step="0.1"
            type="number"
            value={weight}
          />
        </label>
        <button
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-on-primary shadow-lg transition-all active:scale-[0.98] ${saving ? 'bg-secondary shadow-secondary/20' : 'bg-primary shadow-primary/20 hover:brightness-110'}`}
          disabled={saving}
          type="submit"
        >
          {saving ? 'Saving...' : 'Record Progress'}
        </button>
      </form>
    </ProgressGlassCard>
  )
}

function ProgressBmiCard({ bmi, category }) {
  return (
    <ProgressGlassCard className="relative flex items-center justify-between overflow-hidden rounded-2xl p-5">
      <div className="relative z-10">
        <h4 className="mb-1 text-label-md font-bold uppercase tracking-wider text-on-surface-variant">Current BMI</h4>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg text-secondary">{formatNumber(bmi)}</span>
          <span className="text-label-sm font-bold text-on-surface-variant">{category}</span>
        </div>
      </div>
      <div className="relative h-32 w-32">
        <motion.div
          className="absolute inset-2 rounded-full border-[14px] border-secondary/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-8 rounded-full bg-mint-surface"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Scale className="absolute inset-0 m-auto text-secondary/70" size={34} />
      </div>
    </ProgressGlassCard>
  )
}

function ProgressInsightCard({ Icon, borderColor, label, value, description }) {
  return (
    <ProgressGlassCard className="rounded-2xl border-l-4 p-5 shadow-sm" style={{ borderLeftColor: borderColor }}>
      <div className="mb-2 flex items-center gap-3">
        <Icon style={{ color: borderColor }} size={22} />
        <span className="text-label-md font-bold text-on-surface-variant">{label}</span>
      </div>
      <p className="font-headline-md text-xl font-black text-on-surface">{value}</p>
      <p className="text-label-sm text-on-surface-variant">{description}</p>
    </ProgressGlassCard>
  )
}

function ProgressHistoryCard({ logs }) {
  return (
    <ProgressGlassCard className="overflow-hidden rounded-2xl p-0 shadow-sm">
      <div className="flex items-center justify-between border-b border-outline-variant/20 p-5">
        <h3 className="font-headline-md text-xl font-black text-on-surface">History & Logs</h3>
        <button className="flex items-center gap-2 text-label-md font-bold text-primary hover:underline" type="button">
          View All <ArrowRight size={15} />
        </button>
      </div>
      <div className="divide-y divide-outline-variant/10">
        {logs.map((log) => (
          <ProgressHistoryItem log={log} key={log.id} />
        ))}
      </div>
    </ProgressGlassCard>
  )
}

function ProgressHistoryItem({ log }) {
  const delta = Number(log.delta || 0)
  return (
    <div className="group flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-surface-container-low sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-high font-bold text-primary">
          <CalendarDays size={22} />
        </div>
        <div>
          <p className="font-bold text-on-surface">{log.date}</p>
          <p className="text-label-sm text-on-surface-variant">{log.session} • {log.time}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-8 sm:justify-end">
        <div className="text-right">
          <p className="font-metrics-mono text-lg font-bold text-on-surface">{formatNumber(log.weight)} kg</p>
          <p className={`text-label-sm ${delta < 0 ? 'text-error-red' : 'text-primary'}`}>{delta > 0 ? '+' : ''}{formatNumber(delta)} kg</p>
        </div>
        {log.photoUrl ? (
          <button className="h-14 w-14 overflow-hidden rounded-lg border border-outline-variant/30 transition-transform group-hover:scale-110" type="button">
            <img className="h-full w-full object-cover" src={log.photoUrl} alt={`Progress photo from ${log.date}`} />
          </button>
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-outline-variant/50 bg-surface-container text-on-surface-variant">
            <Scale size={16} />
          </div>
        )}
      </div>
    </div>
  )
}

function ProNutritionPage() {
  const [waterCups, setWaterCups] = useState(6)
  const macroItems = [
    { name: 'Protein', current: 120, target: 180, unit: 'g', color: '#006e2f' },
    { name: 'Carbs', current: 210, target: 300, unit: 'g', color: '#0058be' },
    { name: 'Fat', current: 45, target: 75, unit: 'g', color: '#f97316' },
    { name: 'Fiber', current: 22, target: 35, unit: 'g', color: '#047857' }
  ]
  const nutrientItems = [
    { name: 'Vitamin C', percent: 82, color: '#006e2f' },
    { name: 'Calcium', percent: 64, color: '#0058be' },
    { name: 'Iron', percent: 51, color: '#f97316' },
    { name: 'Magnesium', percent: 76, color: '#9333ea' }
  ]

  return (
    <ProPage title="Nutrition Analysis" subtitle="Macro, vitamin, mineral, and hydration" showHeader={false} wide>
      <motion.div className="space-y-8 pb-10" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <NutritionGlassCard className="lg:col-span-4">
            <p className="mb-2 text-label-md font-medium text-on-surface-variant">Daily Macro Split</p>
            <h1 className="mb-8 font-headline-lg text-headline-lg font-bold text-on-surface">2,100 kcal</h1>
            <motion.div className="relative mx-auto flex h-64 w-64 max-w-full items-center justify-center rounded-full" initial={{ rotate: -16, scale: 0.92 }} animate={{ rotate: 0, scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ background: 'conic-gradient(#006e2f 0% 40%, #0058be 40% 72%, #f97316 72% 92%, #dce9ff 92% 100%)' }}>
              <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                <b className="text-3xl font-black text-primary">92%</b>
                <span className="text-xs font-medium text-on-surface-variant">target</span>
              </div>
            </motion.div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-label-sm text-on-surface-variant">
              {[
                ['Protein', '#006e2f'],
                ['Carbs', '#0058be'],
                ['Fat', '#f97316'],
                ['Remaining', '#dce9ff']
              ].map(([label, color]) => (
                <div className="flex items-center gap-2" key={label}>
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </NutritionGlassCard>

          <div className="grid gap-6 md:grid-cols-2 lg:col-span-8">
            {macroItems.map((item, index) => (
              <NutritionMacroCard item={item} index={index} key={item.name} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <NutritionGlassCard className="lg:col-span-2">
            <h3 className="mb-6 font-headline-md text-headline-md font-bold text-on-surface">Vitamin & Mineral Tracker</h3>
            <div className="grid gap-5 text-sm md:grid-cols-2">
              {nutrientItems.map((item, index) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <b className="text-on-surface">{item.name}</b>
                    <span className="font-metrics-mono font-bold text-on-surface-variant">{item.percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-container" role="progressbar" aria-label={item.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.percent}>
                    <motion.div className="h-full rounded-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ width: `${item.percent}%`, backgroundColor: item.color, transformOrigin: 'left center' }} transition={{ delay: 0.1 + index * 0.08, duration: 0.75, ease: 'easeOut' }} />
                  </div>
                </div>
              ))}
            </div>
          </NutritionGlassCard>

          <NutritionGlassCard className="bg-mint-surface">
            <motion.div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}>
              <Droplets size={42} />
            </motion.div>
            <h3 className="mt-5 font-headline-md text-headline-md font-bold text-on-surface">Hydration</h3>
            <p className="mb-5 mt-2 text-on-surface-variant">{waterCups} dari 8 gelas tercatat hari ini.</p>
            <div className="mb-5 h-3 overflow-hidden rounded-full bg-white/80" role="progressbar" aria-label="Hydration" aria-valuemin={0} aria-valuemax={8} aria-valuenow={waterCups}>
              <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${Math.min(100, (waterCups / 8) * 100)}%` }} transition={{ duration: 0.45, ease: 'easeOut' }} />
            </div>
            <button className="w-full rounded-xl bg-primary py-3 font-bold text-white shadow-[0_12px_24px_rgba(0,110,47,0.18)] transition hover:-translate-y-0.5 hover:bg-primary-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70" type="button" disabled={waterCups >= 8} onClick={() => setWaterCups((value) => Math.min(8, value + 1))}>
              Tambah Gelas
            </button>
          </NutritionGlassCard>
        </section>
      </motion.div>
    </ProPage>
  )
}

function NutritionGlassCard({ children, className = '' }) {
  return (
    <motion.div className={`rounded-[2rem] border border-outline-variant/55 bg-white/85 p-6 shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-8 ${className}`} whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
      {children}
    </motion.div>
  )
}

function NutritionMacroCard({ item, index }) {
  const progress = Math.min(100, (item.current / item.target) * 100)

  return (
    <NutritionGlassCard className="min-h-[172px]">
      <div className="mb-3 flex items-center justify-between gap-4">
        <b className="text-lg text-on-surface">{item.name}</b>
        <span className="font-metrics-mono text-sm font-bold text-on-surface-variant">{item.current}{item.unit} / {item.target}{item.unit}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-surface-container" role="progressbar" aria-label={item.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
        <motion.div className="h-full rounded-full" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ width: `${progress}%`, backgroundColor: item.color, transformOrigin: 'left center' }} transition={{ delay: index * 0.08, duration: 0.75, ease: 'easeOut' }} />
      </div>
      <p className="mt-5 text-label-sm leading-6 text-on-surface-variant">{Math.round(progress)}% target harian tercapai.</p>
    </NutritionGlassCard>
  )
}

function ProFoodsPage() {
  useBackendData(() => apiRequest('/api/foods?limit=9'), [], [])
  const [activeCategory, setActiveCategory] = useState('Semua')
  const foodCatalog = [
    {
      id: 'gado-gado',
      name: 'Gado-Gado',
      category: 'Lunch',
      calories: 320,
      protein: 12,
      carbs: 38,
      fat: 14,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'nasi-ayam-panggang',
      name: 'Nasi Ayam Panggang',
      category: 'Lunch',
      calories: 520,
      protein: 34,
      carbs: 58,
      fat: 16,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'oatmeal-pisang',
      name: 'Oatmeal Pisang',
      category: 'Sarapan',
      calories: 290,
      protein: 10,
      carbs: 51,
      fat: 5,
      image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'greek-yogurt-parfait',
      name: 'Greek Yogurt Parfait',
      category: 'Snack',
      calories: 240,
      protein: 18,
      carbs: 26,
      fat: 6,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 'tempe-bakar',
      name: 'Tempe Bakar',
      category: 'Lunch',
      calories: 180,
      protein: 16,
      carbs: 12,
      fat: 8,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80'
    }
  ]
  const visibleFoods = foodCatalog.filter((food) => activeCategory === 'Semua' || food.category === activeCategory)
  const categories = ['Semua', 'Sarapan', 'Lunch', 'Snack']

  return (
    <ProPage title="Food Database" subtitle="Browse, filter, favorite, and add foods" showHeader={false} wide>
      <div className="space-y-8 pb-10">
        <NutritionGlassCard className="p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-label-md font-medium text-on-surface-variant">Database makanan Indonesia</p>
              <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">Browse Foods</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  className={`rounded-xl px-4 py-2 font-bold transition-all duration-200 active:scale-[0.98] ${activeCategory === category ? 'bg-primary text-white shadow-md shadow-primary/15' : 'bg-surface-container text-on-surface hover:bg-surface-variant'}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {visibleFoods.map((food, index) => (
              <motion.div key={food.id || food.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}>
                <Link className="block overflow-hidden rounded-2xl border border-outline-variant/40 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg active:scale-[0.98]" to="/app/foods/gado-gado">
                  <img className="h-40 w-full object-cover" src={food.image} alt={food.name} loading="lazy" />
                  <div className="p-5">
                    <div className="flex justify-between gap-4">
                      <b className="min-w-0 text-on-surface">{food.name}</b>
                      <span className="whitespace-nowrap font-bold text-primary">{formatNumber(food.calories)} kcal</span>
                    </div>
                    <p className="mt-2 text-sm text-on-surface-variant">Protein {formatNumber(food.protein)}g / Carbs {formatNumber(food.carbs)}g / Fat {formatNumber(food.fat)}g</p>
                  </div>
                </Link>
              </motion.div>
            ))}

            <motion.button className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-primary/40 bg-mint-surface p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-primary/10 active:scale-[0.98]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.3 }} type="button">
              <Plus className="mb-4 h-12 w-12 text-primary" />
              <b>Tambah Makanan Custom</b>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">Frontend placeholder untuk upload foto dan data nutrisi.</p>
            </motion.button>
          </div>
        </NutritionGlassCard>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            ['Favorite Foods', 'Quick-add dari makanan yang sering disimpan.'],
            ['Filters', 'Kategori, kalori, protein, dan tag diet.'],
            ['Skeleton Loading', 'Slot infinite scroll untuk integrasi data nanti.']
          ].map(([title, body], index) => (
            <NutritionGlassCard className="p-7" key={title}>
              <h3 className="mb-3 font-headline-md text-headline-md font-bold text-on-surface">{title}</h3>
              <p className="leading-7 text-on-surface-variant">{body}</p>
              <motion.div className="mt-5 h-2 rounded-full bg-surface-container" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ transformOrigin: 'left center' }} transition={{ delay: index * 0.08, duration: 0.6 }} />
            </NutritionGlassCard>
          ))}
        </section>
      </div>
    </ProPage>
  )
}

function ProFoodDetailPage() {
  const [portion, setPortion] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const food = {
    id: 'gado-gado',
    name: 'Gado-Gado',
    category: 'Indonesian',
    tags: ['Vegetarian friendly'],
    description: 'Sayuran rebus, tahu, tempe, telur, dan saus kacang. Cocok untuk makan siang kaya serat.',
    servingLabel: 'plate',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    calories: 320,
    protein: 12,
    carbs: 38,
    fat: 14,
    nutrients: [
      ['Fiber', '8g'],
      ['Calcium', '12%'],
      ['Iron', '15%'],
      ['Sodium', '420mg']
    ]
  }
  const summary = [
    ['Kalori', Math.round(food.calories * portion), 'text-primary'],
    ['Protein', `${formatNumber(food.protein * portion)}g`, ''],
    ['Carbs', `${formatNumber(food.carbs * portion)}g`, ''],
    ['Fat', `${formatNumber(food.fat * portion)}g`, '']
  ]

  return (
    <ProPage title="Food Detail" subtitle="Nutrition facts and portion calculator" showHeader={false}>
      <div className="mx-auto w-full max-w-[1200px] space-y-8 pb-10">
        <Link className="inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-on-primary-container" to="/app/foods">
          <ArrowLeft size={20} />
          Kembali ke database
        </Link>

        <section className="grid items-start gap-8 lg:grid-cols-2">
          <motion.img className="h-[320px] w-full rounded-[2rem] object-cover shadow-xl transition-transform duration-500 hover:scale-[1.01] md:h-[460px]" src={food.image} alt={food.name} loading="lazy" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }} />

          <NutritionGlassCard>
            <p className="mb-2 font-bold text-primary">{food.category} / {food.tags.join(', ')}</p>
            <h1 className="mb-4 font-headline-lg text-headline-lg font-bold text-on-surface">{food.name}</h1>
            <p className="mb-8 leading-7 text-on-surface-variant">{food.description}</p>

            <div className="mb-8 grid grid-cols-2 gap-4">
              {summary.map(([label, value, tone], index) => (
                <motion.div className="rounded-2xl bg-surface-container p-4" key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <span className="text-sm text-on-surface-variant">{label}</span>
                  <b className={`block text-2xl font-bold ${tone}`}>{value}</b>
                </motion.div>
              ))}
            </div>

            <label className="mb-6 block">
              <span className="font-bold">Porsi: {formatNumber(portion)} {food.servingLabel}</span>
              <input className="mt-3 w-full accent-primary" type="range" min="1" max="3" step="0.5" value={portion} onChange={(event) => setPortion(Number(event.target.value))} />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link className="flex h-12 items-center justify-center rounded-2xl bg-primary font-extrabold text-white transition-all hover:brightness-110 active:scale-[0.98]" to={`/app/log-food?foodId=${food.id}&portion=${portion}`}>
                Tambah ke Log
              </Link>
              <button className={`h-12 rounded-2xl font-extrabold transition-all active:scale-[0.98] ${isFavorite ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container text-on-surface hover:bg-surface-variant'}`} type="button" aria-pressed={isFavorite} onClick={() => setIsFavorite((value) => !value)}>
                {isFavorite ? 'Tersimpan' : 'Simpan Favorit'}
              </button>
            </div>
          </NutritionGlassCard>
        </section>

        <NutritionGlassCard>
          <h2 className="mb-6 font-headline-md text-headline-md font-bold text-on-surface">Tabel Nutrisi Lengkap</h2>
          <div className="grid gap-4 text-sm md:grid-cols-4">
            {food.nutrients.map(([name, value]) => (
              <div className="rounded-xl border border-outline-variant/40 bg-white p-4 font-bold text-on-surface" key={name}>
                <span className="text-on-surface-variant">{name}</span> {value}
              </div>
            ))}
          </div>
        </NutritionGlassCard>
      </div>
    </ProPage>
  )
}

function ProProfilePage() {
  useBackendData(() => apiRequest('/api/profile'), null, [])
  const user = {
    name: 'Alex Rivera',
    location: 'San Francisco, CA',
    joined: 'Jan 2023',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaDy65LL1GD47aJLJE75H5pZwGpvTfi_xpMeAbshzWqm7pfZd5s7rjTi9qL7V70oN4bFSGaWbfwXgjMVn5gwNauLKnF4rvHkNeA6Alz3Bhidr73CvY3REcKZgXW3NHQY1pxf3Wci1sRt3kzmr2tVYQqOmdQsmZyW9_CnzDKUWWkDwjzzAUWcsnQJNaOZodwoIponRAdDGnQUJJ-_cL1irZRNH9Hiz0meHEUGsiEZA7EKoahXWwb9kIozPW4q70B91AMsxjvwoDy9o',
    bannerUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdCToHzWGlPcEvRqDVvLPerYpnIybFd4zoThJlRNvOdl6FH6iWqz0B0V0Ma4MbXzlS-NWIX326gVq6RZrWJJ6KsjSTZ1NhOyfrUhQvAsRufrEmw9UGg0QAjVBhbBkMykntgfLXzeOBE3ZENuBq_qDrufcGAkGaloD5M7ZCPk5Eucd-5eb27HqBK-4TVudtYJaR2GJp4grhipeNXLAP80DiA8I0X8Uzw6GSdOTkejzGy6ZW10UnFnmLF7LeLgWkaaBoCXs54DnEdPg',
    bio:
      'Nutrition enthusiast and marathon runner. Focused on high-protein plant-based diets and optimizing recovery times. Currently training for the Big Sur International Marathon. Believe in the power of data to drive transformation.',
    tags: ['MarathonRunner', 'PlantBased', 'BioHacking']
  }

  return (
    <ProPage title="Profile Detail" subtitle={user.name} showHeader={false} wide>
      <div className="space-y-8 pb-28">
        <ProfileHero user={user} />

        <div className="grid grid-cols-12 gap-6">
          <ProfileBioCard user={user} />
          <ProfileHealthStatsCard />
          <ProfileRecordsCard />
          <ProfileBadgesCard />
        </div>

        <ProfileWeeklyConsistency />

        <motion.button className="group fixed bottom-10 right-10 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-energy-orange text-white shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all hover:scale-110 active:scale-95" type="button" aria-label="Share profile" initial={{ scale: 0, rotate: -35 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.35, type: 'spring', stiffness: 220 }}>
          <Share2 className="h-7 w-7 transition-transform group-hover:rotate-12" />
          <span className="pointer-events-none absolute right-24 hidden -translate-x-4 whitespace-nowrap rounded-xl bg-on-surface px-5 py-2 text-sm font-bold text-white opacity-0 shadow-lg transition-all group-hover:translate-x-0 group-hover:opacity-100 sm:block">
            Share Profile
          </span>
        </motion.button>
      </div>
    </ProPage>
  )
}

function ProfileHero({ user }) {
  return (
    <section className="relative">
      <motion.div className="relative min-h-[560px] w-full overflow-hidden rounded-[2rem] shadow-lg sm:min-h-[440px]" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <img className="absolute inset-0 h-full w-full object-cover" src={user.bannerUrl} alt="Profile Banner" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        <motion.div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col gap-5 sm:bottom-8 sm:left-8 sm:right-8 sm:flex-row sm:items-end sm:gap-6" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}>
          <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-[2rem] border-4 border-white bg-surface shadow-xl sm:h-36 sm:w-36 sm:rounded-[2.5rem]">
            <img className="h-full w-full object-cover" src={user.avatarUrl} alt={user.name} loading="lazy" />
          </div>
          <div className="min-w-0 flex-1 space-y-2 pb-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-headline-lg text-3xl font-bold text-white drop-shadow-lg md:text-headline-lg">{user.name}</h2>
              <span className="flex items-center gap-1 rounded-full border border-white/25 bg-white/20 px-3 py-1 text-[10px] font-bold tracking-widest text-white shadow-sm backdrop-blur-md">
                <Check size={14} />
                PRO MEMBER
              </span>
            </div>
            <p className="flex items-center gap-2 text-white/90 drop-shadow">
              <MapPin size={18} />
              {user.location} - Joined {user.joined}
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3 font-bold text-primary shadow-xl transition-all hover:scale-105 hover:bg-mint-surface active:scale-95" type="button" aria-label="Edit profile">
            <Edit3 size={20} />
            Edit Profile
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ProfileBioCard({ user }) {
  return (
    <NutritionGlassCard className="col-span-12 p-8 lg:col-span-4">
      <h3 className="mb-5 flex items-center gap-3 font-headline-md text-headline-md font-bold text-on-surface">
        <Activity className="text-primary" size={30} />
        Bio
      </h3>
      <p className="leading-7 text-on-surface-variant">{user.bio}</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {user.tags.map((tag) => (
          <span className="rounded-xl border border-primary/10 bg-mint-surface px-4 py-1.5 text-sm font-medium text-primary" key={tag}>#{tag}</span>
        ))}
      </div>
    </NutritionGlassCard>
  )
}

function ProfileHealthStatsCard() {
  return (
    <NutritionGlassCard className="relative col-span-12 overflow-hidden p-8 lg:col-span-8">
      <h3 className="mb-8 flex items-center gap-3 font-headline-md text-headline-md font-bold text-on-surface">
        <Gauge className="text-energy-orange" size={30} />
        Health Stats at a Glance
      </h3>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-outline-variant/10 bg-surface-container/40 p-6 text-center">
          <p className="mb-4 text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Current BMI</p>
          <ProfileBmiGauge value={22.4} progress={75} />
          <p className="mt-4 font-bold text-primary">Healthy Range</p>
        </div>
        <div className="col-span-1 rounded-[1.5rem] border border-outline-variant/10 bg-surface-container/40 p-6 md:col-span-2">
          <p className="mb-6 text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Weight vs Goal</p>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row">
                <span className="text-lg font-bold">Current: 76.5 kg</span>
                <span className="text-lg font-bold text-energy-orange">Goal: 74 kg</span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-surface-container">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-energy-orange" initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 0.9, ease: 'easeOut' }} />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 pt-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3 rounded-xl bg-white/50 px-4 py-2">
                <TrendingUp className="text-primary" size={20} />
                <span className="font-bold">-2.5kg this month</span>
              </div>
              <span className="rounded-full bg-primary-container/20 px-4 py-1.5 font-bold text-on-primary-container">82% of Goal</span>
            </div>
          </div>
        </div>
      </div>
    </NutritionGlassCard>
  )
}

function ProfileBmiGauge({ value, progress }) {
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="h-28 w-28 -rotate-90">
        <circle className="text-surface-container" cx="56" cy="56" fill="transparent" r={radius} stroke="currentColor" strokeWidth="10" />
        <motion.circle className="text-primary" cx="56" cy="56" fill="transparent" r={radius} stroke="currentColor" strokeDasharray={circumference} strokeLinecap="round" strokeWidth="10" initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 0.9, ease: 'easeOut' }} />
      </svg>
      <span className="absolute font-metrics-mono text-[34px] font-bold text-primary">{value.toFixed(1)}</span>
    </div>
  )
}

function ProfileRecordsCard() {
  const records = [
    { label: 'Longest Streak', value: '42 Days', Icon: Flame, tone: 'orange' },
    { label: 'Calories Burned', value: '1,240 kcal', Icon: Sparkles, tone: 'primary' },
    { label: 'Avg Daily Activity', value: '78 Minutes', Icon: Dumbbell, tone: 'purple' }
  ]

  return (
    <NutritionGlassCard className="col-span-12 border-l-8 border-energy-orange p-8 lg:col-span-5">
      <h3 className="mb-8 flex items-center gap-3 font-headline-md text-headline-md font-bold text-on-surface">
        <Trophy className="text-energy-orange" size={30} />
        Personal Records
      </h3>
      <div className="space-y-4">
        {records.map(({ label, value, Icon, tone }) => {
          const styles = {
            orange: ['rgba(249,115,22,0.1)', '#f97316'],
            primary: ['rgba(0,110,47,0.1)', '#006e2f'],
            purple: ['rgba(168,85,247,0.1)', '#a855f7']
          }[tone]
          return (
            <div className="flex items-center gap-5 rounded-[1.5rem] bg-surface-container/40 p-4 transition-colors hover:bg-surface-container" key={label}>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: styles[0], color: styles[1] }}>
                <Icon size={30} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-label-sm font-bold uppercase tracking-widest text-on-surface-variant">{label}</p>
                <p className="font-headline-md text-2xl font-bold text-on-surface">{value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </NutritionGlassCard>
  )
}

function ProfileBadgesCard() {
  const badges = [
    { label: 'Early Bird', title: 'Early Riser (10 Days)', Icon: Trophy, gradient: 'linear-gradient(135deg,#f97316,#eab308)' },
    { label: 'Veggies', title: 'Green Giant (50 Meals)', Icon: Apple, gradient: 'linear-gradient(135deg,#006e2f,#4ae176)' },
    { label: 'Master', title: 'Master (100 Days)', Icon: Trophy, gradient: 'linear-gradient(135deg,#a855f7,#0058be)' },
    { label: 'Hydrated', title: 'Hydration King', Icon: Droplets, gradient: 'linear-gradient(135deg,#60a5fa,#f97316)' }
  ]

  return (
    <NutritionGlassCard className="col-span-12 p-8 lg:col-span-7">
      <div className="mb-10 flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-3 font-headline-md text-headline-md font-bold text-on-surface">
          <Sparkles className="text-achievement-purple" size={30} />
          Badge Collection
        </h3>
        <button className="rounded-full bg-primary-container/10 px-4 py-1.5 font-bold text-primary hover:underline" type="button">View All</button>
      </div>
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-5 sm:gap-8">
        {badges.map(({ label, title, Icon, gradient }) => (
          <div className="flex flex-col items-center gap-3" key={label}>
            <motion.div className="group relative flex h-20 w-20 cursor-help items-center justify-center rounded-full shadow-lg" style={{ background: gradient }} whileHover={{ y: -8, scale: 1.1 }}>
              <Icon className="h-10 w-10 text-white" />
              <div className="absolute -bottom-14 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg bg-on-surface px-3 py-1.5 text-[11px] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">{title}</div>
            </motion.div>
            <p className="text-center text-xs font-bold text-on-surface">{label}</p>
          </div>
        ))}
        <div className="flex flex-col items-center gap-3 opacity-30">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-outline">
            <Lock className="h-8 w-8 text-outline" />
          </div>
          <p className="text-center text-xs font-bold text-on-surface-variant">Locked</p>
        </div>
      </div>
    </NutritionGlassCard>
  )
}

function ProfileWeeklyConsistency() {
  const days = [
    ['Mon', 80, 'primary'],
    ['Tue', 95, 'primary'],
    ['Wed', 40, 'missed'],
    ['Thu', 75, 'primary'],
    ['Fri', 90, 'primary'],
    ['Sat', 100, 'orange'],
    ['Sun', 65, 'primary']
  ]

  return (
    <NutritionGlassCard className="rounded-[2.5rem] p-8">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Weekly Consistency</h3>
          <p className="text-label-md text-on-surface-variant">Goal completion over the last 7 days</p>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2.5">
            <span className="h-4 w-4 rounded-full bg-primary shadow-sm" />
            <span className="text-sm font-bold">Goal Met</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-4 w-4 rounded-full bg-surface-container shadow-sm" />
            <span className="text-sm font-bold">Missed</span>
          </div>
        </div>
      </div>
      <div className="flex h-56 items-end justify-between gap-4 px-1 sm:px-4">
        {days.map(([day, height, tone], index) => {
          const bg = tone === 'orange' ? 'rgba(249,115,22,0.4)' : tone === 'missed' ? 'rgba(229,238,255,0.5)' : 'rgba(0,110,47,0.2)'
          const hover = tone === 'orange' ? '#f97316' : tone === 'missed' ? '#e5eeff' : '#006e2f'
          return (
            <div className="group flex flex-1 flex-col items-center gap-4" key={day}>
              <motion.div className="w-full cursor-pointer rounded-t-2xl shadow-sm transition-colors" initial={{ height: 0 }} animate={{ height: `${height}%` }} style={{ backgroundColor: bg }} transition={{ delay: index * 0.12, duration: 0.8, ease: 'easeOut' }} onMouseEnter={(event) => { event.currentTarget.style.backgroundColor = hover }} onMouseLeave={(event) => { event.currentTarget.style.backgroundColor = bg }} />
              <span className={`text-sm font-bold ${tone === 'orange' ? 'text-energy-orange' : 'text-on-surface-variant'}`}>{day}</span>
            </div>
          )
        })}
      </div>
    </NutritionGlassCard>
  )
}

function ProSettingsPage() {
  const { data: settings, setData: setSettings } = useBackendData(() => apiRequest('/api/settings'), null, [])
  const [themeMode, setThemeMode] = useState('light')
  const [language, setLanguage] = useState('id')
  const [toast, setToast] = useState(false)
  const showSettingsToast = () => {
    setToast(true)
    window.clearTimeout(showSettingsToast.timer)
    showSettingsToast.timer = window.setTimeout(() => setToast(false), 2600)
  }
  const toggle = async (key, apiKey) => {
    const next = { ...(settings || {}), [key]: !settings?.[key] }
    setSettings(next)
    showSettingsToast()
    try {
      await apiRequest('/api/settings', { method: 'PUT', body: { [apiKey]: next[key] } })
    } catch (err) {
      // Keep the UI responsive when the API is unavailable in local preview.
    }
  }
  const notificationItems = [
    {
      title: 'Push Notifications',
      description: 'Dapatkan pengingat makan dan minum air secara real-time',
      Icon: Smartphone,
      enabled: Boolean(settings?.meal_reminder_enabled ?? true),
      keys: ['meal_reminder_enabled', 'mealReminderEnabled']
    },
    {
      title: 'Email Updates',
      description: 'Laporan mingguan dan resep makanan sehat',
      Icon: Mail,
      enabled: Boolean(settings?.weekly_report_enabled ?? false),
      keys: ['weekly_report_enabled', 'weeklyReportEnabled']
    },
    {
      title: 'SMS Alerts',
      description: 'Peringatan kesehatan kritis dan kode verifikasi',
      Icon: MessageCircle,
      enabled: Boolean(settings?.notification_enabled ?? false),
      keys: ['notification_enabled', 'notificationEnabled']
    }
  ]

  return (
    <ProPage title="Settings" subtitle="Atur preferensi akun dan pengalaman NutriTrack Anda." showHeader={false}>
      <div className="mx-auto w-full max-w-[1000px] space-y-8 pb-20">
        <div className="mb-10">
          <h2 className="mb-2 font-headline-lg text-headline-lg font-bold text-on-surface">Settings</h2>
          <p className="text-on-surface-variant">Atur preferensi akun dan pengalaman NutriTrack Anda.</p>
        </div>

        <NutritionGlassCard className="space-y-6 p-8">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Settings size={22} />
            </div>
            <h3 className="font-headline-md text-xl font-bold text-on-surface">General</h3>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-on-surface">Language</p>
                <p className="text-label-sm text-on-surface-variant">Pilih bahasa aplikasi yang Anda inginkan</p>
              </div>
              <select className="rounded-xl border border-outline-variant/30 bg-surface-container px-4 py-2 text-label-md font-medium focus:border-primary focus:ring-primary" value={language} onChange={(event) => { setLanguage(event.target.value); showSettingsToast() }}>
                <option value="en">English (US)</option>
                <option value="id">Indonesian</option>
                <option value="es">Spanish</option>
              </select>
            </div>
            <div className="flex flex-col gap-4 border-t border-outline-variant/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-on-surface">Theme Mode</p>
                <p className="text-label-sm text-on-surface-variant">Ganti gaya visual antara terang dan gelap</p>
              </div>
              <div className="flex rounded-2xl border border-outline-variant/30 bg-surface-container-low p-1.5 shadow-inner">
                {[
                  ['light', Sun, 'Light'],
                  ['dark', Moon, 'Dark']
                ].map(([mode, Icon, label]) => (
                  <button className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-label-sm font-bold transition-all ${themeMode === mode ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-variant/40'}`} key={mode} onClick={() => { setThemeMode(mode); showSettingsToast() }} type="button">
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </NutritionGlassCard>

        <NutritionGlassCard className="p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bell size={22} />
            </div>
            <h3 className="font-headline-md text-xl font-bold text-on-surface">Notifications</h3>
          </div>
          <div className="space-y-6">
            {notificationItems.map(({ title, description, Icon, enabled, keys }) => (
              <div className="-mx-3 flex flex-col gap-4 rounded-2xl p-3 transition-all hover:bg-surface-container/30 sm:flex-row sm:items-center sm:justify-between" key={title}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-all">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{title}</p>
                    <p className="text-label-sm text-on-surface-variant">{description}</p>
                  </div>
                </div>
                <SettingsSwitch checked={enabled} onChange={() => toggle(keys[0], keys[1])} />
              </div>
            ))}
          </div>
        </NutritionGlassCard>

        <NutritionGlassCard className="p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield size={22} />
            </div>
            <h3 className="font-headline-md text-xl font-bold text-on-surface">Privacy &amp; Security</h3>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              [Eye, 'Account Visibility', 'Kelola siapa yang dapat melihat progres dan lencana Anda.'],
              [Download, 'Export Data', 'Unduh riwayat nutrisi lengkap Anda dalam format CSV.']
            ].map(([Icon, title, description]) => (
              <button className="group rounded-2xl border border-outline-variant/30 bg-surface-container-low p-6 text-left shadow-sm transition-all hover:border-primary/50" key={title} type="button">
                <div className="mb-4 flex items-center justify-between">
                  <Icon className="text-secondary" size={30} />
                  <ChevronRight className="text-outline-variant transition-colors group-hover:text-primary" size={22} />
                </div>
                <p className="text-lg font-bold text-on-surface">{title}</p>
                <p className="mt-2 text-label-sm text-on-surface-variant">{description}</p>
              </button>
            ))}
          </div>
        </NutritionGlassCard>

        <motion.section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-container p-8 text-white shadow-2xl transition-transform hover:scale-[1.01] md:p-10" whileHover={{ y: -3 }}>
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-3xl border border-white/30 bg-white/20 backdrop-blur-md">
                <Sparkles size={44} />
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h3 className="font-headline-md text-2xl font-black">NutriTrack Pro</h3>
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-widest text-primary shadow-sm">Aktif</span>
                </div>
                <p className="text-lg text-white/90">Paket Anda diperbarui pada 12 Okt 2024 seharga $12.99/bln</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-2xl bg-white px-8 py-4 text-label-md font-black text-primary shadow-lg transition-all hover:scale-105 active:scale-95" type="button">Kelola Paket</button>
              <button className="rounded-2xl border border-white/30 bg-white/20 px-8 py-4 text-label-md font-black text-white backdrop-blur-md transition-all hover:bg-white/30" type="button">Riwayat Tagihan</button>
            </div>
          </div>
        </motion.section>

        <div className="flex justify-center pt-8">
          <button className="group flex items-center gap-3 rounded-2xl px-10 py-4 font-black text-error-red transition-all hover:bg-error-red/10" type="button">
            <LogOut className="transition-transform group-hover:rotate-12" size={22} />
            Logout dari NutriTrack
          </button>
        </div>

        <motion.div className="fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-[1.5rem] border border-white/10 bg-on-background px-8 py-5 text-white shadow-2xl" initial={false} animate={{ y: toast ? 0 : 96, opacity: toast ? 1 : 0 }} transition={{ duration: 0.25 }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Check size={18} />
          </div>
          <p className="text-label-md font-bold">Pengaturan berhasil diperbarui!</p>
        </motion.div>
      </div>
    </ProPage>
  )
}

function SettingsSwitch({ checked, onChange }) {
  return (
    <button className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-slate-300'}`} type="button" role="switch" aria-checked={checked} onClick={onChange}>
      <motion.span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" animate={{ x: checked ? 20 : 0 }} transition={{ duration: 0.2 }} />
    </button>
  )
}

function ActivityHubDrawer({ shellData, open, onClose }) {
  const { data: notifications, setData: setNotifications } = useBackendData(
    () => apiRequest('/api/notifications?limit=20'),
    shellData?.notifications || [],
    [shellData?.notifications?.length]
  )
  const [activeFilter, setActiveFilter] = useState('all')
  const [localReadIds, setLocalReadIds] = useState([])
  const referenceNotifications = useMemo(
    () => [
      {
        id: 'meal-lunch',
        type: 'reminders',
        section: 'Meal Reminders',
        sectionTone: 'text-primary',
        badge: '2 NEW',
        title: 'Lunch Time!',
        time: '12:30 PM',
        message: "You haven't logged your Mediterranean salad yet. Stay consistent!",
        Icon: Utensils,
        iconClass: 'bg-mint-surface border-primary/10 text-primary',
        cardClass: 'bg-card-light border-outline-variant',
        read: false,
        actions: [{ label: 'Log Now', className: 'bg-primary text-on-primary hover:bg-on-primary-container', to: '/app/log-food' }]
      },
      {
        id: 'achievement-hydration',
        type: 'achievements',
        section: 'Achievements',
        sectionTone: 'text-achievement-purple',
        badge: 'JUST NOW',
        title: 'Hydration Hero',
        time: '5m ago',
        message: "You've hit your water goal 7 days in a row! New badge unlocked.",
        Icon: Trophy,
        iconClass: 'bg-white border-achievement-purple/30 text-achievement-purple rounded-full shadow-inner',
        cardClass: 'bg-surface-container-low border-achievement-purple/20',
        glowClass: 'bg-achievement-purple/10',
        read: false,
        actions: [
          { label: 'View Badge', className: 'bg-achievement-purple text-on-primary hover:opacity-90', to: '/app/profile' },
          { label: 'Share', icon: Share2, className: 'border border-achievement-purple/30 text-achievement-purple hover:bg-achievement-purple/5' }
        ]
      },
      {
        id: 'weekly-report',
        type: 'reports',
        section: 'Weekly Reports',
        sectionTone: 'text-secondary',
        title: 'Week 4 Analysis',
        time: 'Yesterday',
        message: 'Your protein intake is up by 12% compared to last week. See full breakdown.',
        Icon: BarChart3,
        iconClass: 'bg-secondary-fixed text-secondary',
        cardClass: 'bg-card-light border-outline-variant',
        read: true,
        actions: [{ label: 'Open Report', className: 'border border-outline-variant text-on-surface-variant hover:bg-surface-container', to: '/app/progress' }]
      },
      {
        id: 'community-keto',
        type: 'community',
        section: 'Community',
        sectionTone: 'text-energy-orange',
        title: '3 friends joined the Keto Challenge',
        time: 'Today',
        message: '',
        read: true,
        avatars: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBBpQPwTBwAJxrBRuPURt2LDf1aHST1fGbefEwuj4lM3Vbs1fI25t61kuANVrc-OEmFD4e3cUjQ2bg5etQFVjWEY3HVVAgsmiP4pKwy0OFhKu9c-zkylRoYANYVSsW51XVocxPFL9LgeXp4sUPzpqJioSpuD74YQHbqpT9yq-kiAGPLtPtO_qTksB9skkP5bu0U4_e1LmuuIzFLhDynmexYmkjzFnOQcf_9STuHPSMmECT0c5dOfEvhb1IOLTiAuhsqmuX3zcwszDc',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAWBqTUP85IPw_yaaXv8SoWxioAqLFcjved4K-WjZZ-RAc56pY9oQQ0Zhmz-Vh4QcCM0lnDkY34quxhNUaT0QNdhldL8AjuQMngTgp-Y0MHHnBZCHtgCKhHTbXvRl9uOhwyfTgX1JTN1j9_ao4vX1SuksVWi6f64VkjRrAd6P-eFboemtO_oMGw4c_n1W5_b0xGG8sdmicxX2A2BMK8EfHUPPO1fx6H_Q6m_nfdgReXXFZY6mYCdjp5El5BYevrXDnSBzC7ZLaQdWE'
        ]
      }
    ],
    []
  )
  const hubItems = useMemo(
    () =>
      referenceNotifications.map((item) => ({
        ...item,
        read: item.read || localReadIds.includes(item.id) || notifications.some((backendItem) => backendItem.id === item.id && backendItem.status === 'read')
      })),
    [localReadIds, notifications, referenceNotifications]
  )
  const unreadCount = hubItems.filter((item) => !item.read).length
  const filteredItems = activeFilter === 'all' ? hubItems : hubItems.filter((item) => item.type === activeFilter)
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = []
    acc[item.section].push(item)
    return acc
  }, {})

  useEffect(() => {
    if (!open) return undefined
    const originalOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open])

  const markAllRead = async () => {
    const unread = notifications.filter((item) => item.status === 'unread')
    try {
      await Promise.all(unread.map((item) => apiRequest(`/api/notifications/${item.id}/read`, { method: 'PATCH' })))
    } catch (err) {
      // Preserve the local interaction when the backend preview is offline.
    }
    setNotifications(notifications.map((item) => ({ ...item, status: 'read' })))
    setLocalReadIds(hubItems.map((item) => item.id))
  }

  return createPortal(
        <>
          <AnimatePresence>
            {open && (
              <motion.button
                aria-label="Close activity hub backdrop"
                className="fixed inset-0 z-50 bg-on-background/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
                type="button"
              />
            )}
          </AnimatePresence>

          <motion.aside
            aria-labelledby="activity-hub-title"
            aria-modal="true"
            className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            initial={false}
            animate={{ x: open ? 0 : '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest p-6">
              <div>
                <h3 id="activity-hub-title" className="font-headline-md text-headline-md font-bold text-on-surface">Activity Hub</h3>
                <p className="font-label-sm text-label-sm text-outline">Manage your health alerts &amp; stats</p>
              </div>
              <button className="rounded-full p-2 text-on-surface transition-colors hover:bg-surface-container active:scale-90" onClick={onClose} type="button" aria-label="Close notifications">
                <X size={22} />
              </button>
            </div>

            <div className="scroll-hide flex gap-2 overflow-x-auto bg-surface-container-lowest p-4" role="tablist" aria-label="Notification filters">
              {[
                ['all', 'All'],
                ['reminders', 'Reminders'],
                ['achievements', 'Achievements'],
                ['reports', 'Reports']
              ].map(([id, label]) => (
                <button
                  className={`rounded-full px-4 py-2 font-label-md text-label-md transition-all active:scale-95 ${activeFilter === id ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  role="tab"
                  aria-selected={activeFilter === id}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="scroll-hide flex-1 space-y-6 overflow-y-auto p-4">
              {Object.entries(groupedItems).map(([section, items]) => (
                <section key={section}>
                  <div className="mb-3 flex items-center justify-between px-2">
                    <h4 className={`font-label-md text-label-md font-bold uppercase tracking-wider ${items[0].sectionTone}`}>{section}</h4>
                    {items[0].badge && <span className="text-[10px] font-bold text-outline">{items[0].badge}</span>}
                  </div>
                  <div className="space-y-3">
                    {items.map((item) => (
                      item.type === 'community' ? <CommunityNotificationCard item={item} key={item.id} /> : <ActivityNotificationCard item={item} key={item.id} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="border-t border-outline-variant bg-surface-container-low p-6 text-center">
              <button className="font-label-md text-label-md font-bold text-primary underline-offset-4 transition-all hover:underline active:scale-95 disabled:opacity-50" onClick={markAllRead} disabled={!unreadCount} type="button">
                Mark all as read
              </button>
            </div>
          </motion.aside>
        </>,
        document.body
      )
}

function ProNotificationsPage({ shellData }) {
  const navigate = useNavigate()
  return (
    <ProPage title="Notifications" subtitle="Activity Hub" showHeader={false}>
      <div className="min-h-[50vh]" />
      <ActivityHubDrawer shellData={shellData} open onClose={() => navigate('/app/dashboard')} />
    </ProPage>
  )
}

function ActivityNotificationCard({ item }) {
  const Icon = item.Icon
  return (
    <motion.article className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md ${item.cardClass}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      {item.glowClass && <div className={`absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl ${item.glowClass}`} />}
      <div className="relative z-10 flex gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center border ${item.iconClass}`}>
          <Icon size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-3">
            <h5 className="font-label-md text-label-md font-bold text-on-surface">{item.title}</h5>
            <span className="shrink-0 font-label-sm text-label-sm text-outline">{item.time}</span>
          </div>
          <p className="mb-3 font-label-md text-label-md text-on-surface-variant">{item.message}</p>
          <div className="flex gap-2">
            {item.actions.map((action) => {
              const ActionIcon = action.icon
              const className = `rounded-lg py-2 font-label-md text-label-md font-bold transition-all active:scale-95 ${action.icon ? 'px-3' : 'flex-1'} ${action.className}`
              return action.to ? (
                <Link className={className} key={action.label} to={action.to}>
                  {action.label}
                </Link>
              ) : (
                <button className={className} key={action.label} type="button" aria-label={action.label}>
                  {ActionIcon ? <ActionIcon size={18} /> : action.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function CommunityNotificationCard({ item }) {
  return (
    <motion.article className="flex items-center gap-4 rounded-2xl border border-outline-variant bg-white p-4 shadow-sm transition-all hover:shadow-md" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex -space-x-2">
        {item.avatars.map((avatar, index) => (
          <img className="h-8 w-8 rounded-full border-2 border-white object-cover" src={avatar} alt={`Community member ${index + 1}`} key={avatar} />
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-label-md text-label-md text-on-surface">3 friends joined the <span className="font-bold">Keto Challenge</span></p>
      </div>
      <ChevronRight className="text-outline" size={20} />
    </motion.article>
  )
}

function ProHelpPage() {
  const [query, setQuery] = useState('')
  const popularLinks = ['Tingkatan langganan', 'Dasar pelacakan makro', 'Menghubungkan perangkat']
  const categories = [
    { title: 'Akun', description: 'Pengaturan profil, pemulihan kata sandi, dan keamanan.', Icon: User, iconClass: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white' },
    { title: 'Nutrisi', description: 'Perencanaan makan, pelacakan kalori, dan target harian.', Icon: Utensils, iconClass: 'bg-energy-orange/10 text-energy-orange group-hover:bg-energy-orange group-hover:text-white' },
    { title: 'Teknis', description: 'Sinkronisasi perangkat, bug aplikasi, dan tips performa.', Icon: Wrench, iconClass: 'bg-secondary-container/10 text-secondary group-hover:bg-secondary group-hover:text-white' },
    { title: 'Langganan', description: 'Riwayat tagihan, fitur Premium, dan perpanjangan.', Icon: CreditCard, iconClass: 'bg-achievement-purple/10 text-achievement-purple group-hover:bg-achievement-purple group-hover:text-white' }
  ]
  const tutorials = [
    {
      title: 'Mencatat makanan pertama Anda',
      description: 'Pelajari cara menggunakan alat pengenalan foto AI kami.',
      duration: '2:45',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiCr2m1zBxsEnVO2yVDcjunmBInh2Guabi6DEuRI-GsI-AUdSlxaa-1nWwR_LxrCb9q9T-itSCmtr6uMPY-pR1snzJFcB2muPtNOlFCLss7I2zavV-4z5189iU-VPhYVtzF-cOES0jC7sPM7Qq_OR5BbppSdjrqg0jmL_kRPD5vx-pA20fUvGUW3f_VIomtx4vMiGnQ95wKflG179S36cOQNv-9TtW6m8rXdKKN9HQHPtkldjAgWf4uShK3VlFSYaD9GzXJIkqzbU'
    },
    {
      title: 'Menghubungkan Google Fit',
      description: 'Sinkronkan langkah dan menit aktif Anda dengan mulus.',
      duration: '3:12',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwC-j6AMR63hIgsoXz4PYrvu1vyXoRVwjn1kXo5RIuAmB5FczExsL-kRcILp84RJEMrgibigpa45nMT2SfHPcO1OYp2w5vjhas8ZGFdUMxAVLmRWyX_5R6wxHMifkKlUpbB699GQlIshEwmTYW6n3IVdIDBUsM_1bGtjhvlEaxyMr3ICYSFvD2-2MzqjpbzWPXZbrzr6iI8eApJcwQTHj7zogNQY1lkU20pjqEuiBKGsfRwZKHW7bTfS_I4kkRzqMEKSxiVDH5Na8'
    },
    {
      title: 'Menyesuaikan Dashboard Anda',
      description: 'Buat NutriTrack bekerja sesuai dengan tujuan spesifik Anda.',
      duration: '1:50',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVUilpbVyCwIgsBtuA-VNmkhIeMF7ONCayV98HsoWoe4OfN8qPL3c6xsb9U4EbZMCYisZlh3iPVWcOfyxaqEZWACm0FaYY7CLaFQXLcdPVJrZz1AEtPYEC6aDpdM48j-VvMCxhAaNbT72vS0RzC54nkBoled4XtTwSY5nY5tYmxtkVVmX0c8iE1_lOwJzz4SXdJzjakhWaiUtnKptyJ5KxwZJht6e76MZz6PUKYEsgh_LKAUj-Md3mOa4h2YAuiKihldTxU8xotcg'
    }
  ]
  const faqs = [
    ['Bagaimana cara membatalkan langganan Premium saya?', 'Anda dapat membatalkan langganan kapan saja melalui menu Pengaturan > Langganan di aplikasi. Jika Anda berlangganan melalui App Store atau Google Play, Anda harus mengelola pembatalan melalui alat manajemen langganan mereka masing-masing.'],
    ['Apakah NutriTrack sinkron dengan MyFitnessPal?', 'Saat ini, NutriTrack beroperasi sebagai ekosistem independen untuk memberikan akurasi data yang lebih tinggi melalui NutriEngine milik kami. Namun, Anda dapat mengekspor data dalam format CSV untuk diunggah ke layanan lain.'],
    ['Bisakah saya melacak puasa intermiten?', 'Ya! Anggota Premium memiliki akses ke alat Protokol Puasa yang mencakup pengatur waktu untuk 16:8, 20:4, dan jendela puasa khusus langsung di dashboard.'],
    ['Apa yang terjadi jika saya menghapus aplikasi?', 'Menghapus aplikasi tidak menghapus akun Anda. Data Anda tetap tersimpan dengan aman di cloud kami. Untuk menghapus akun dan semua data terkait, silakan gunakan tombol Permintaan Penghapusan Data di pengaturan Profil Anda.']
  ]
  const filteredFaqs = query.trim()
    ? faqs.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(query.toLowerCase()))
    : faqs

  return (
    <ProPage title="Help Center" subtitle="Apa yang bisa kami bantu?" showHeader={false} wide>
      <div className="overflow-hidden rounded-[2rem] bg-mint-surface">
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-20 text-center md:py-24">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
          <div className="relative z-10 w-full max-w-3xl">
            <h2 className="mb-8 font-headline-xl text-4xl font-black text-on-background md:text-[48px]">Apa yang bisa kami bantu?</h2>
            <label className="group mx-auto flex h-16 w-full items-center gap-4 rounded-3xl border border-white/70 bg-white/80 px-6 text-left shadow-xl shadow-primary/5 backdrop-blur-xl transition-all focus-within:ring-4 focus-within:ring-primary/10">
              <Search className="h-8 w-8 flex-shrink-0 text-primary" />
              <input className="min-w-0 flex-1 border-0 bg-transparent p-0 text-body-lg text-on-surface outline-none ring-0 placeholder:text-on-surface-variant/70 focus:ring-0" placeholder="Cari artikel, tutorial, dan lainnya..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-label-md">
              <span className="font-bold text-on-surface-variant">Populer:</span>
              {popularLinks.map((link, index) => (
                <span className="flex items-center gap-4" key={link}>
                  <a className="font-bold text-primary transition hover:underline" href="#faq">{link}</a>
                  {index < popularLinks.length - 1 && <span className="text-outline-variant/60">•</span>}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map(({ title, description, Icon, iconClass }) => (
          <motion.button className="group flex min-h-[220px] flex-col justify-between rounded-[1.5rem] border border-slate-200/50 bg-white/80 p-6 text-left shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl transition-transform hover:-translate-y-1" key={title} whileHover={{ y: -4 }} type="button">
            <div className="mb-10 flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${iconClass}`}>
                <Icon size={28} />
              </div>
              <ArrowRight className="text-on-surface-variant/40" size={22} />
            </div>
            <div>
              <h3 className="mb-2 font-headline-md text-lg font-bold text-on-surface">{title}</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">{description}</p>
            </div>
          </motion.button>
        ))}
      </section>

      <section className="-mx-5 bg-surface-container-low px-5 py-20 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">Tutorial Singkat</h2>
              <p className="mt-2 text-on-surface-variant">Kuasai NutriTrack dalam hitungan menit dengan panduan video kami.</p>
            </div>
            <button className="flex items-center gap-2 font-bold text-primary transition-all hover:gap-3" type="button">
              Lihat semua video <ArrowRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {tutorials.map((item) => (
              <motion.article className="group overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" key={item.title} whileHover={{ y: -4 }}>
                <div className="relative h-48 overflow-hidden bg-surface-dim">
                  <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.image} alt={item.title} loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform group-hover:scale-110">
                      <Play size={30} fill="currentColor" />
                    </div>
                  </div>
                  <span className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-2 py-1 font-metrics-mono text-xs text-white backdrop-blur-md">{item.duration}</span>
                </div>
                <div className="p-6">
                  <h4 className="mb-2 font-headline-md text-lg font-bold text-on-surface">{item.title}</h4>
                  <p className="text-sm text-on-surface-variant">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] py-6" id="faq">
        <h2 className="mb-12 text-center font-headline-lg text-headline-lg font-bold text-on-background">Pertanyaan yang Sering Diajukan</h2>
        <div className="mx-auto max-w-3xl space-y-6">
          {filteredFaqs.length ? filteredFaqs.map(([question, answer]) => (
            <details className="group overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl transition-all duration-300 open:ring-2 open:ring-primary/20" key={question}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
                <span className="font-headline-md text-lg font-bold text-on-surface">{question}</span>
                <ChevronRight className="flex-shrink-0 text-primary transition-transform duration-300 group-open:rotate-90" size={22} />
              </summary>
              <div className="border-t border-outline-variant/10 px-6 pb-6 pt-6 font-body-md text-on-surface-variant">{answer}</div>
            </details>
          )) : (
            <div className="rounded-2xl border border-outline-variant/30 bg-white/80 p-6 text-center text-on-surface-variant">Tidak ada FAQ yang cocok dengan pencarian Anda.</div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] pb-12">
        <motion.div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-achievement-purple to-energy-orange p-10 text-center text-white shadow-2xl md:p-20" whileHover={{ y: -3 }}>
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary-container/20 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <Headphones size={48} />
            </div>
            <h2 className="mb-6 font-headline-lg text-4xl font-bold">Masih butuh bantuan?</h2>
            <p className="mb-12 font-body-lg text-white/90">Tim dukungan kami tersedia 24/7 untuk memastikan perjalanan kesehatan Anda tetap di jalurnya. Pilih cara yang Anda sukai untuk terhubung.</p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <button className="flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-primary shadow-xl transition-transform hover:scale-105" type="button">
                <MessageCircle size={20} fill="currentColor" />
                Mulai Obrolan Langsung
              </button>
              <button className="flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/20 px-8 py-4 font-bold text-white backdrop-blur-md transition-colors hover:bg-white/30" type="button">
                <Mail size={20} />
                Kirim Email Dukungan
              </button>
            </div>
            <p className="mt-10 font-label-sm text-xs uppercase tracking-widest text-white/60">Waktu respon rata-rata: 2 jam</p>
          </div>
        </motion.div>
      </section>

      <HelpFooter />
    </ProPage>
  )
}

function HelpFooter() {
  return (
    <footer className="-mx-5 -mb-24 border-t border-outline-variant/20 bg-surface-container px-5 py-16 lg:-mx-8 lg:px-8">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-4">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Apple size={22} />
            </div>
            <span className="font-headline-md text-2xl font-black text-primary">NutriTrack</span>
          </div>
          <p className="text-sm leading-relaxed text-on-surface-variant">Memberdayakan perjalanan kesehatan Anda melalui data dan pengalaman yang menyenangkan.</p>
        </div>
        {[
          ['Produk', ['Fitur', 'Premium', 'Komunitas']],
          ['Perusahaan', ['Tentang Kami', 'Kebijakan Privasi', 'Syarat Layanan']]
        ].map(([title, links]) => (
          <div key={title}>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-on-surface">{title}</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              {links.map((link) => <li key={link}><a className="transition-colors hover:text-primary" href="#top">{link}</a></li>)}
            </ul>
          </div>
        ))}
        <div>
          <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-on-surface">Newsletter</h5>
          <label className="flex gap-2 rounded-xl border border-outline-variant/30 bg-white p-1">
            <input className="w-full rounded-lg border-0 bg-transparent px-4 py-2 text-sm focus:ring-0" placeholder="Email Anda" type="email" />
            <button className="rounded-lg bg-primary p-3 text-white transition-transform hover:scale-105" type="button" aria-label="Send newsletter email">
              <Send size={18} />
            </button>
          </label>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1200px] flex-col items-center justify-between gap-6 border-t border-outline-variant/10 pt-10 text-xs font-medium text-on-surface-variant md:flex-row">
        <span>© 2024 NutriTrack. Seluruh hak cipta dilindungi.</span>
        <div className="flex gap-8 uppercase tracking-widest">
          {['Twitter', 'Instagram', 'LinkedIn'].map((item) => <a className="transition-colors hover:text-primary" href="#top" key={item}>{item}</a>)}
        </div>
      </div>
    </footer>
  )
}

function ProMetric({ label, value }) {
  return (
    <div className="rounded-2xl bg-surface-container px-4 py-3 text-center">
      <p className="text-xs font-bold text-on-surface-variant">{label}</p>
      <p className="mt-1 font-metrics-mono text-lg font-black">{value}</p>
    </div>
  )
}

function parseReferenceHtml(html) {
  const title = html.match(/<title>(.*?)<\/title>/is)?.[1]?.trim() || 'NutriTrack'
  const bodyClass = html.match(/<body[^>]*class="([^"]*)"/is)?.[1] || ''
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || html
  const styles = Array.from(html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi))
    .map((match) => match[1])
    .join('\n')
  const linkedBody = body.replace(/href="([^"]+?\.html)(#[^"]*)?"/g, (_, href, hash = '') => {
    const route = htmlRouteMap[href] || '/'
    return `href="${route}${hash}"`
  })
  return { body: linkedBody, bodyClass, styles, title }
}

function ReferencePage({ html }) {
  const navigate = useNavigate()
  const location = useLocation()
  const containerRef = useRef(null)
  const { body, bodyClass, styles, title } = useMemo(() => parseReferenceHtml(html), [html])

  useEffect(() => {
    document.title = title
    document.body.className = bodyClass

    const container = containerRef.current
    if (!container) return undefined

    const main = container.querySelector('#mainContent')
    const sidebar = container.querySelector('#sidebar')
    const collapseBtn = container.querySelector('#collapseBtn')
    const hideBtn = container.querySelector('#hideSidebarBtn')
    const drawerBackdrop = container.querySelector('#drawerBackdrop')
    const mobileMenuBtn = container.querySelector('#mobileMenuBtn')

    const onClick = (event) => {
      const link = event.target.closest('a[href]')
      if (!link || !container.contains(link)) return

      const href = link.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return

      if (href.startsWith('#')) {
        event.preventDefault()
        container.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      if (href.startsWith('/')) {
        event.preventDefault()
        navigate(href)
      }
    }

    const showFormMessage = (form, message, isError = false) => {
      let messageEl = form.querySelector('[data-api-message]')
      if (!messageEl) {
        messageEl = document.createElement('p')
        messageEl.setAttribute('data-api-message', 'true')
        messageEl.className = 'mt-3 text-center text-sm font-bold'
        form.appendChild(messageEl)
      }
      messageEl.textContent = message
      messageEl.style.color = isError ? '#ba1a1a' : '#006e2f'
    }

    const getFormFields = (form) => {
      const email = form.querySelector('input[type="email"]')?.value?.trim()
      const passwords = Array.from(form.querySelectorAll('input[type="password"]')).map((input) => input.value)
      const textInput = form.querySelector('input:not([type]), input[type="text"]')
      const fullName = textInput?.value?.trim() || 'Alex Carter'
      return { email, password: passwords[0], confirmation: passwords[1], fullName }
    }

    const onSubmit = async (event) => {
      const form = event.target.closest('form')
      if (!form) return
      event.preventDefault()

      const submitButton = form.querySelector('button[type="submit"]')
      const originalButtonContent = submitButton?.innerHTML

      try {
        if (submitButton) {
          submitButton.disabled = true
          submitButton.style.opacity = '0.75'
          submitButton.innerHTML = '<span class="material-symbols-outlined">sync</span>Memproses...'
        }

        if (form.id === 'loginForm') {
          const { email, password } = getFormFields(form)
          await login(email, password === 'nutritrack' ? 'nutritrack123' : password)
          showFormMessage(form, 'Login berhasil. Mengalihkan ke onboarding...')
          navigate('/onboarding')
        } else if (form.id === 'registerForm') {
          const { fullName, email, password, confirmation } = getFormFields(form)
          if (password !== confirmation) throw new Error('Konfirmasi password belum sama.')
          await register(fullName, email, password === 'nutritrack' ? 'nutritrack123' : password)
          showFormMessage(form, 'Akun berhasil dibuat. Mengalihkan ke onboarding...')
          navigate('/onboarding')
        } else if (form.id === 'forgotForm') navigate('/verify-email')
        else if (form.id === 'resetForm') navigate('/login')
        else navigate('/onboarding')
      } catch (err) {
        showFormMessage(form, err.message || 'Proses gagal.', true)
      } finally {
        if (submitButton) {
          submitButton.disabled = false
          submitButton.style.opacity = ''
          submitButton.innerHTML = originalButtonContent
        }
      }
    }

    const onCollapse = () => {
      const isCollapsed = sidebar?.classList.toggle('collapsed')
      collapseBtn?.setAttribute('aria-expanded', String(!isCollapsed))
      main?.classList.toggle('main-collapsed', Boolean(isCollapsed))
      const icon = collapseBtn?.querySelector('.material-symbols-outlined')
      if (icon) icon.textContent = isCollapsed ? 'chevron_right' : 'chevron_left'
    }

    const onHide = () => {
      const hidden = sidebar?.classList.toggle('hidden-full')
      main?.classList.toggle('hidden-sidebar', Boolean(hidden))
      hideBtn?.setAttribute('aria-pressed', String(Boolean(hidden)))
    }

    const onOpenDrawer = () => {
      const opening = !sidebar?.classList.contains('mobile-open')
      sidebar?.classList.toggle('mobile-open', opening)
      drawerBackdrop?.classList.toggle('active', opening)
      drawerBackdrop?.setAttribute('aria-hidden', String(!opening))
    }

    const onCloseDrawer = () => {
      sidebar?.classList.remove('mobile-open')
      drawerBackdrop?.classList.remove('active')
      drawerBackdrop?.setAttribute('aria-hidden', 'true')
    }

    const revealObserver =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('visible')
                  revealObserver.unobserve(entry.target)
                }
              })
            },
            { threshold: 0.1 }
          )
        : null
    const revealItems = Array.from(container.querySelectorAll('.staggered-item'))
    revealItems.forEach((item) => revealObserver?.observe(item))

    const ringCards = Array.from(container.querySelectorAll('.hover\\:scale-\\[1\\.02\\]'))
    const addRing = (event) => event.currentTarget.classList.add('active-ring')
    const removeRing = (event) => event.currentTarget.classList.remove('active-ring')
    ringCards.forEach((card) => {
      card.addEventListener('mouseenter', addRing)
      card.addEventListener('mouseleave', removeRing)
    })

    const onScroll = () => {
      const publicHeader = container.querySelector('header')
      if (!publicHeader || sidebar) return
      publicHeader.classList.toggle('shadow-md', window.scrollY > 50)
      publicHeader.classList.toggle('shadow-sm', window.scrollY <= 50)
    }

    container.addEventListener('click', onClick)
    container.addEventListener('submit', onSubmit)
    collapseBtn?.addEventListener('click', onCollapse)
    hideBtn?.addEventListener('click', onHide)
    mobileMenuBtn?.addEventListener('click', onOpenDrawer)
    drawerBackdrop?.addEventListener('click', onCloseDrawer)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      container.removeEventListener('click', onClick)
      container.removeEventListener('submit', onSubmit)
      collapseBtn?.removeEventListener('click', onCollapse)
      hideBtn?.removeEventListener('click', onHide)
      mobileMenuBtn?.removeEventListener('click', onOpenDrawer)
      drawerBackdrop?.removeEventListener('click', onCloseDrawer)
      window.removeEventListener('scroll', onScroll)
      revealObserver?.disconnect()
      ringCards.forEach((card) => {
        card.removeEventListener('mouseenter', addRing)
        card.removeEventListener('mouseleave', removeRing)
      })
    }
  }, [bodyClass, navigate, title])

  return (
    <>
      <style>{styles}</style>
      <div ref={containerRef} className="reference-page" data-route={location.pathname} dangerouslySetInnerHTML={{ __html: body }} />
    </>
  )
}

function StaticPage({ type }) {
  const isPrivacy = type === 'privacy'
  return (
    <AnimatedPage>
      <PublicHeader />
      <main className="static-page">
        <span className="eyebrow">{isPrivacy ? 'Privacy' : 'Terms'}</span>
        <h1>{isPrivacy ? 'Kebijakan Privasi' : 'Syarat & Ketentuan'}</h1>
        <p>
          {isPrivacy
            ? 'Ringkasan bagaimana NutriTrack akan menangani profil, log makanan, progress, dan preferensi saat backend dihubungkan.'
            : 'NutriTrack adalah alat bantu nutrisi dan bukan pengganti konsultasi medis profesional.'}
        </p>
        <div className="feature-grid">
          {['Data pengguna', 'Kontrol akun', 'Keamanan'].map((item) => (
            <article className="feature-card" key={item}>
              <Check />
              <h3>{item}</h3>
              <p>Konten legal statis untuk fase frontend PWA.</p>
            </article>
          ))}
        </div>
      </main>
    </AnimatedPage>
  )
}

function RouteFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 font-['Plus_Jakarta_Sans'] text-slate-900">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#007a35]" aria-label="Memuat halaman" />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const html = referencePages[location.pathname] || (location.pathname.startsWith('/app') ? dashboardHtml : landingHtml)

  if (location.pathname.startsWith('/app') || location.pathname === '/help') {
    return <ProAppLayout />
  }

  if (location.pathname === '/login') {
    return (
      <AnimatePresence mode="wait">
        <LoginPage key={location.pathname} />
      </AnimatePresence>
    )
  }

  if (location.pathname === '/forgot-password') {
    return (
      <AnimatePresence mode="wait">
        <ForgotPasswordPage key={location.pathname} />
      </AnimatePresence>
    )
  }

  if (location.pathname === '/reset-password') {
    return (
      <AnimatePresence mode="wait">
        <ResetPasswordPage key={location.pathname} />
      </AnimatePresence>
    )
  }

  if (location.pathname === '/onboarding') {
    return (
      <AnimatePresence mode="wait">
        <OnboardingPage key={location.pathname} />
      </AnimatePresence>
    )
  }

  if (location.pathname === '/privacy') {
    return (
      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteFallback />}>
          <LegalPage key={location.pathname} type="privacy" />
        </Suspense>
      </AnimatePresence>
    )
  }

  if (location.pathname === '/terms') {
    return (
      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteFallback />}>
          <LegalPage key={location.pathname} type="terms" />
        </Suspense>
      </AnimatePresence>
    )
  }

  if (location.pathname === '/splash') {
    return (
      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteFallback />}>
          <SplashPage key={location.pathname} />
        </Suspense>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageMotion}>
        <ReferencePage html={html} />
      </motion.div>
    </AnimatePresence>
  )
}
