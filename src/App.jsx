import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
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
import splashHtml from '../reference-html/splash.html?raw'
import profileDetailHtml from '../reference-html/profiledetail.html?raw'
import settingsHtml from '../reference-html/pengaturan.html?raw'
import notificationsHtml from '../reference-html/notifikasi.html?raw'
import privacyHtml from '../reference-html/privacy.html?raw'
import termsHtml from '../reference-html/terms.html?raw'
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
  Download,
  Droplets,
  Dumbbell,
  Edit3,
  Eye,
  Flame,
  Gauge,
  Heart,
  HelpCircle,
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
  Scale,
  Search,
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
  Utensils
} from 'lucide-react'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { apiRequest, clearStoredAuth, getStoredAuth, login, register } from './api'

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/log-food', label: 'Log Food', icon: Plus },
  { to: '/app/meal-planner', label: 'Meal Planner', icon: Utensils },
  { to: '/app/progress', label: 'Progress', icon: TrendingUp },
  { to: '/app/nutrition', label: 'Nutrition', icon: BarChart3 },
  { to: '/app/foods', label: 'Foods', icon: Apple },
  { to: '/app/community', label: 'Community', icon: User },
  { to: '/app/profile', label: 'Profile', icon: User }
]

const appPageMeta = {
  '/app/dashboard': { title: 'Good Morning, Alex', subtitle: 'Tuesday, October 24', search: 'Search foods...' },
  '/app/log-food': { title: 'Daily Food Log', subtitle: 'Tuesday, October 24th, 2023', search: 'Search foods...' },
  '/app/meal-planner': { title: 'Meal Architecture', subtitle: 'Weekly Plan', search: 'Search recipes or ingredients...' },
  '/app/progress': { title: 'Weight Journey', subtitle: "You've lost 2.4kg in the last 30 days. Stay consistent!", search: 'Search data...' },
  '/app/nutrition': { title: 'Nutrition Insights', subtitle: 'Macro and micronutrient balance', search: 'Search nutrients...' },
  '/app/foods': { title: 'Food Database', subtitle: 'Verified food details and quick logging', search: 'Search foods...' },
  '/app/foods/gado-gado': { title: 'Food Detail', subtitle: 'Gado-gado nutrition breakdown', search: 'Search foods...' },
  '/app/community': { title: 'Community Hub', subtitle: 'Tuesday, October 24', search: 'Search buddies or challenges...' },
  '/app/profile': { title: 'Profile Detail', subtitle: 'Health identity and preferences', search: 'Search activity...' },
  '/app/settings': { title: 'Settings', subtitle: 'Personalize your NutriTrack experience', search: 'Search settings...' },
  '/app/notifications': { title: 'Notifications', subtitle: 'Smart reminders and alerts', search: 'Search notifications...' }
}

const appRouteComponents = {
  '/app/dashboard': DashboardPage,
  '/app/log-food': LogFoodPage,
  '/app/meal-planner': MealPlannerPage,
  '/app/progress': ProgressPage,
  '/app/nutrition': NutritionPage,
  '/app/foods': FoodsPage,
  '/app/foods/gado-gado': FoodDetailPage,
  '/app/community': CommunityPage,
  '/app/profile': ProfilePage,
  '/app/settings': SettingsPage,
  '/app/notifications': NotificationsPage
}

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
  '/splash': splashHtml,
  '/help': helpCenterHtml,
  '/privacy': privacyHtml,
  '/terms': termsHtml,
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

const pageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
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
    else navigate('/app/dashboard')
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

function OnboardingPage() {
  const steps = [
    ['Data Fisik Dasar', '178 cm', '78.5 kg', User],
    ['Pilih Program', 'Turun Berat Badan', 'Defisit sehat', Flame],
    ['Target & Timeline', '70 kg', '~30 minggu', TrendingUp],
    ['Level Aktivitas', 'Sedang', 'TDEE 2.150', Activity],
    ['Preferensi Makanan', 'Halal Only', 'Indonesia', Apple],
    ['Jadwal Makan', '07:00 / 12:30 / 19:00', 'Reminder aktif', Bell]
  ]
  return (
    <AnimatedPage>
      <PublicHeader />
      <main className="onboarding-page">
        <div className="section-heading left">
          <span className="eyebrow">Self-service onboarding</span>
          <h1>Setup profil sehatmu</h1>
          <p>Enam langkah pertama untuk menghitung target kalori, makro, preferensi, dan jadwal makan.</p>
          <div className="progress-bar">
            <motion.span initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.1 }} />
          </div>
        </div>
        <div className="onboarding-grid">
          {steps.map(([title, value, sub, Icon], index) => (
            <motion.article
              className="setup-card"
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <Icon />
              <span>Step {index + 1}/6</span>
              <h3>{title}</h3>
              <strong>{value}</strong>
              <p>{sub}</p>
            </motion.article>
          ))}
          <aside className="summary-card">
            <h2>Rencana sehatmu siap</h2>
            <Metric label="Target Kalori" value="1,800 kcal" />
            <Metric label="Protein" value="135 g" />
            <Metric label="Karbohidrat" value="180 g" />
            <Metric label="Lemak" value="60 g" />
            <Link className="primary-link full" to="/app/dashboard">
              Mulai Perjalananku
            </Link>
          </aside>
        </div>
      </main>
    </AnimatedPage>
  )
}

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className={`app-shell ${collapsed ? 'collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-head">
          <Link className="brand" to="/app/dashboard">
            <span className="brand-mark">
              <Apple size={22} />
            </span>
            <span className="brand-copy">
              <strong>NutriTrack</strong>
              <small>Pro Companion</small>
            </span>
          </Link>
          <button className="icon-btn" onClick={() => setCollapsed((value) => !value)}>
            <ChevronLeft size={18} />
          </button>
        </div>
        <nav className="side-nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to}>
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="premium-card">
          <Sparkles />
          <strong>Upgrade to Premium</strong>
          <p>AI meal plans, deeper analytics, and smart reports.</p>
          <button>Get Started</button>
        </div>
        <div className="side-footer">
          <NavLink to="/help">
            <HelpCircle size={20} />
            <span>Help Center</span>
          </NavLink>
          <NavLink to="/login">
            <LogOut size={20} />
            <span>Logout</span>
          </NavLink>
        </div>
      </aside>
      <section className="app-main">
        <TopBar />
        <AppRoutes />
      </section>
    </div>
  )
}

function TopBar() {
  const location = useLocation()
  const meta = appPageMeta[location.pathname] || appPageMeta['/app/dashboard']
  return (
    <header className="topbar">
      <div>
        <h2>{meta.title}</h2>
        <p>{meta.subtitle}</p>
      </div>
      <div className="topbar-actions">
        <label className="search-box">
          <Search size={18} />
          <input placeholder={meta.search} />
        </label>
        <Link className="icon-btn" to="/app/notifications">
          <Bell size={20} />
        </Link>
        <Link className="icon-btn" to="/app/settings">
          <Settings size={20} />
        </Link>
        <Link className="profile-chip" to="/app/profile">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Alex Carter" />
          <span>
            <strong>Alex Carter</strong>
            <small>Pro Member</small>
          </span>
        </Link>
      </div>
    </header>
  )
}

function AppRoutes() {
  const location = useLocation()
  const Page = appRouteComponents[location.pathname] || DashboardPage
  return (
    <AnimatePresence mode="wait">
      <Page key={location.pathname} />
    </AnimatePresence>
  )
}

function DashboardPage() {
  return (
    <AnimatedPage className="app-content">
      <div className="dashboard-grid">
        <section className="calorie-card glass-panel">
          <div className="card-head">
            <div>
              <h1>Daily Fuel</h1>
              <p>Energy balance overview</p>
            </div>
            <span className="pill">72% Goal</span>
          </div>
          <div className="ring-wrap">
            <FloatingNutritionScene compact />
            <div className="ring-text">
              <strong>1,640</strong>
              <span>Calories Left</span>
            </div>
          </div>
          <div className="mini-stats">
            <Metric label="Consumed" value="1,260 kcal" />
            <Metric label="Target" value="2,900 kcal" />
          </div>
        </section>
        <MacroCards />
      </div>
      <section className="glass-panel schedule-panel">
        <div className="card-head">
          <div>
            <h2>Today's Schedule</h2>
            <p>4 meals planned, 2 completed</p>
          </div>
          <Link className="primary-link" to="/app/log-food">
            <Plus size={18} /> Log New Meal
          </Link>
        </div>
        <div className="timeline">
          {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((item, index) => (
            <motion.div className="timeline-item" key={item} whileHover={{ y: -4 }}>
              <Check />
              <strong>{item}</strong>
              <span>{index < 2 ? 'Completed' : 'Upcoming'}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </AnimatedPage>
  )
}

function MacroCards() {
  return (
    <div className="macro-grid">
      {[
        ['Protein', '120g / 180g', '#9e4036', Flame],
        ['Carbs', '210g / 300g', '#0058be', Apple],
        ['Fats', '45g / 75g', '#f97316', Droplets],
        ['Fiber', '22g / 35g', '#007a35', Activity]
      ].map(([label, value, color, Icon], index) => (
        <motion.article className="macro-card glass-panel" key={label} whileHover={{ y: -6 }} transition={{ type: 'spring' }}>
          <Icon style={{ color }} />
          <span>{value}</span>
          <h3>{label}</h3>
          <div className="bar">
            <motion.i initial={{ width: 0 }} animate={{ width: `${62 + index * 6}%`, background: color }} />
          </div>
        </motion.article>
      ))}
    </div>
  )
}

function LogFoodPage() {
  return (
    <FeaturePage
      title="Daily Food Log"
      subtitle="Log makanan per sesi dan pantau total kalori real-time."
      icon={Utensils}
      cards={['Breakfast 420 kcal', 'Lunch 680 kcal', 'Dinner waiting', 'Snacks 350 kcal']}
    />
  )
}

function MealPlannerPage() {
  return (
    <FeaturePage
      title="Meal Architecture"
      subtitle="Kalender mingguan, template program, reminder, dan grocery list."
      icon={CalendarDays}
      cards={['Monday 2,120 kcal', 'Tuesday Empty', 'Wednesday 2,240 kcal', 'Grocery List']}
    />
  )
}

function ProgressPage() {
  return (
    <FeaturePage
      title="Weight Journey"
      subtitle="Tracking berat, BMI gauge, milestone, dan laporan mingguan."
      icon={Scale}
      cards={['Current 78.5 kg', 'BMI 23.8 Healthy', 'Target Date', 'Before/After Gallery']}
    />
  )
}

function NutritionPage() {
  return (
    <FeaturePage
      title="Nutrition Analysis"
      subtitle="Breakdown makro, donut chart, vitamin, mineral, dan hidrasi."
      icon={BarChart3}
      cards={['Protein 120g', 'Carbs 210g', 'Hydration 6/8', 'Vitamin C 82%']}
      includeChart
    />
  )
}

function FoodsPage() {
  const foods = ['Gado-Gado', 'Nasi Ayam Panggang', 'Oatmeal Pisang', 'Greek Yogurt Parfait', 'Tempe Bakar']
  return (
    <AnimatedPage className="app-content">
      <PageIntro title="Food Database" subtitle="Browse makanan, filter, favorite, dan tambah custom food." icon={Apple} />
      <div className="food-grid">
        {foods.map((food, index) => (
          <motion.div className="food-card glass-panel" key={food} whileHover={{ y: -6 }}>
            <img
              src={`https://images.unsplash.com/photo-${['1546069901-ba9599a7e63c', '1512058564366-18510be2db19', '1484723091739-30a097e8f929', '1565958011703-44f9829ba187', '1555939594-58d7cb561ad1'][index]}?auto=format&fit=crop&w=800&q=80`}
              alt={food}
            />
            <div>
              <h3>{food}</h3>
              <p>{240 + index * 70} kcal</p>
              <Link to="/app/foods/gado-gado">Detail nutrisi</Link>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedPage>
  )
}

function FoodDetailPage() {
  return (
    <AnimatedPage className="app-content">
      <Link className="back-link" to="/app/foods">
        <ArrowLeft size={18} /> Kembali
      </Link>
      <section className="detail-grid">
        <img
          className="detail-photo"
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
          alt="Gado-Gado"
        />
        <div className="glass-panel detail-panel">
          <span className="eyebrow">Indonesian food</span>
          <h1>Gado-Gado</h1>
          <p>Sayuran, tahu, tempe, telur, dan saus kacang. Cocok untuk makan siang kaya serat.</p>
          <div className="mini-stats">
            <Metric label="Kalori" value="320" />
            <Metric label="Protein" value="12g" />
            <Metric label="Carbs" value="38g" />
            <Metric label="Fat" value="14g" />
          </div>
          <input type="range" min="1" max="3" defaultValue="1" />
          <Link className="primary-link full" to="/app/log-food">
            Tambah ke Log
          </Link>
        </div>
      </section>
    </AnimatedPage>
  )
}

function CommunityPage() {
  return (
    <FeaturePage
      title="Community Hub"
      subtitle="Accountability partners, challenges, leaderboard, dan achievement."
      icon={User}
      cards={['Active Challenges', 'Top Streaks', 'Find Buddies', 'Global Feed']}
    />
  )
}

function ProfilePage() {
  return (
    <FeaturePage
      title="Profile Detail"
      subtitle="Profil user, goal, achievement badge, dan pengaturan preferensi."
      icon={User}
      cards={['Alex Carter', 'Target 70 kg', '12 Achievements', 'Food Preference']}
    />
  )
}

function SettingsPage() {
  return <FeaturePage title="Settings" subtitle="Language, theme, notification, data, and privacy controls." icon={Settings} cards={['Light / Dark / System', 'Meal Reminder', 'Data Export', 'Privacy']} />
}

function NotificationsPage() {
  return <FeaturePage title="Activity Hub" subtitle="Meal reminders, hydration alerts, achievements, and weekly reports." icon={Bell} cards={['Lunch reminder', 'Hydration hero', 'Weekly report', 'Community update']} />
}

function HelpPage() {
  return (
    <AnimatedPage>
      <PublicHeader />
      <main className="help-page">
        <PageIntro title="Help Center" subtitle="Cari artikel, tutorial, dan bantuan setup NutriTrack." icon={HelpCircle} />
        <div className="feature-grid">
          {['Akun', 'Nutrisi', 'Teknis', 'Langganan'].map((item) => (
            <article className="feature-card" key={item}>
              <HelpCircle />
              <h3>{item}</h3>
              <p>Panduan dan FAQ untuk kategori {item.toLowerCase()}.</p>
            </article>
          ))}
        </div>
      </main>
    </AnimatedPage>
  )
}

function FeaturePage({ title, subtitle, icon: Icon, cards, includeChart = false }) {
  return (
    <AnimatedPage className="app-content">
      <PageIntro title={title} subtitle={subtitle} icon={Icon} />
      {includeChart && (
        <section className="glass-panel chart-panel">
          <FloatingNutritionScene compact />
          <div>
            <h2>Macro Distribution</h2>
            <p>Donut 3D interaktif sebagai placeholder visual untuk Recharts/Three.js integration.</p>
          </div>
        </section>
      )}
      <div className="feature-grid">
        {cards.map((card, index) => (
          <motion.article className="feature-card" key={card} whileHover={{ y: -6 }}>
            <Icon />
            <h3>{card}</h3>
            <p>Komponen frontend statis siap disambungkan ke data Supabase.</p>
            <motion.div className="card-meter" initial={{ width: 0 }} animate={{ width: `${55 + index * 10}%` }} />
          </motion.article>
        ))}
      </div>
    </AnimatedPage>
  )
}

function PageIntro({ title, subtitle, icon: Icon }) {
  return (
    <section className="page-intro">
      <div>
        <span className="eyebrow">NutriTrack PWA</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <motion.div className="intro-icon" whileHover={{ rotate: 8, scale: 1.05 }}>
        <Icon />
      </motion.div>
    </section>
  )
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

const proNavItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/log-food', label: 'Log Food', icon: Plus },
  { to: '/app/meal-planner', label: 'Meal Planner', icon: Utensils },
  { to: '/app/progress', label: 'Progress', icon: TrendingUp },
  { to: '/app/nutrition', label: 'Nutrition', icon: BarChart3 },
  { to: '/app/foods', label: 'Foods', icon: Apple },
  { to: '/app/community', label: 'Community', icon: User },
  { to: '/app/profile', label: 'Profile', icon: User }
]

const proPageMeta = {
  '/app/dashboard': { title: 'Good Morning, Alex', subtitle: 'Tuesday, October 24', search: 'Search foods...' },
  '/app/log-food': { title: 'Daily Food Log', subtitle: 'Tuesday, October 24th, 2023', search: 'Search foods...' },
  '/app/meal-planner': { title: 'Meal Architecture', subtitle: 'Weekly Plan', search: 'Search recipes or ingredients...' },
  '/app/progress': { title: 'Weight Journey', subtitle: "You've lost 2.4kg in the last 30 days. Stay consistent!", search: 'Search data...' },
  '/app/nutrition': { title: 'Nutrition Analysis', subtitle: 'Macro, vitamin, mineral, and hydration', search: 'Search nutrients...' },
  '/app/foods': { title: 'Food Database', subtitle: 'Browse, filter, favorite, and add foods', search: 'Search foods...' },
  '/app/foods/gado-gado': { title: 'Food Detail', subtitle: 'Nutrition facts and portion calculator', search: 'Search foods...' },
  '/app/community': { title: 'Community Hub', subtitle: 'Tuesday, October 24', search: 'Search buddies or challenges...' },
  '/app/profile': { title: 'Profile Detail', subtitle: 'Alex Rivera', search: 'Search metrics, meals, or friends...' },
  '/app/settings': { title: 'Settings', subtitle: 'Atur preferensi akun dan pengalaman NutriTrack Anda.', search: 'Search settings...' },
  '/app/notifications': { title: 'Activity Hub', subtitle: 'Smart reminders and weekly reports', search: 'Search notifications...' },
  '/help': { title: 'Help Center', subtitle: 'Find answers and guided support', search: 'Search help...' }
}

const proRoutes = {
  '/app/dashboard': ProDashboardPage,
  '/app/log-food': ProLogFoodPage,
  '/app/meal-planner': ProMealPlannerPage,
  '/app/progress': ProProgressPage,
  '/app/nutrition': ProNutritionPage,
  '/app/foods': ProFoodsPage,
  '/app/foods/gado-gado': ProFoodDetailPage,
  '/app/community': ProCommunityPage,
  '/app/profile': ProProfilePage,
  '/app/settings': ProSettingsPage,
  '/app/notifications': ProNotificationsPage,
  '/help': ProHelpPage
}

function ProAppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
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
      <motion.aside
        className={`pro-sidebar fixed left-0 top-0 z-[60] flex h-dvh w-[272px] flex-col overflow-y-auto border-r border-outline-variant/20 bg-surface-container-low p-4 shadow-md transition-transform duration-300 ${mobileOpen ? 'pro-sidebar-open' : ''}`}
        initial={false}
      >
        <div className="flex min-h-12 items-center gap-3">
          <Link className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-primary text-on-primary" to="/app/dashboard">
            <Apple size={22} />
          </Link>
          <div className="min-w-0">
            <p className="truncate font-headline-md text-[22px] font-black leading-none text-primary">NutriTrack</p>
            <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-outline">Pro Companion</p>
          </div>
          <button className="ml-auto grid h-9 w-9 place-items-center rounded-full text-on-surface-variant lg:hidden" onClick={() => setMobileOpen(false)} type="button" aria-label="Close menu">
            <LogOut size={18} />
          </button>
        </div>

        <nav className="mt-8 grid gap-2">
          {proNavItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to || (to === '/app/foods' && location.pathname.startsWith('/app/foods/'))
            return (
            <NavLink
              className={({ isActive }) =>
                `group flex min-h-11 items-center gap-3 rounded-xl px-4 text-label-md font-bold transition-all duration-200 ${isActive || active ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface'}`
              }
              key={to}
              onClick={() => setMobileOpen(false)}
              to={to}
            >
              <Icon className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
              <span className="truncate">{label}</span>
            </NavLink>
            )
          })}
        </nav>

        <motion.div
          className="upgrade-card-react mt-auto flex-shrink-0 overflow-hidden rounded-2xl border border-secondary/10 bg-gradient-to-br from-secondary-container/80 to-secondary/20 p-4 shadow-sm"
          whileHover={{ y: -3 }}
        >
          <Sparkles className="text-primary" size={22} />
          <p className="mt-3 font-extrabold text-on-background">Upgrade to Premium</p>
          <p className="mt-1 text-xs leading-5 text-on-surface-variant">AI meal plans, smart reports, and deeper analytics.</p>
              <button className="mt-3 h-9 w-full rounded-xl bg-primary text-xs font-black text-on-primary shadow-lg shadow-primary/20" type="button">
            Get Started
          </button>
        </motion.div>

        <div className="mt-3 grid flex-shrink-0 gap-2">
          <NavLink className="flex min-h-10 items-center gap-3 rounded-xl px-4 text-label-md font-bold text-on-surface-variant transition hover:text-on-surface" to="/help">
            <HelpCircle size={20} />
            <span>Help Center</span>
          </NavLink>
          <button className="flex min-h-10 items-center gap-3 rounded-xl px-4 text-left text-label-md font-bold text-on-surface-variant transition hover:text-error-red" onClick={logout} type="button">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

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
              <Link className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full text-on-surface-variant transition hover:bg-surface-container" to="/app/notifications">
                <Bell size={20} />
              </Link>
              <Link className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full text-on-surface-variant transition hover:bg-surface-container" to="/app/settings">
                <Settings size={20} />
              </Link>
              <Link className="flex min-w-0 items-center gap-3 border-l border-outline-variant pl-3" to="/app/profile">
                <img className="h-11 w-11 rounded-full border-2 border-primary-container object-cover" src={avatarUrl} alt={userName} />
                <span className="hidden text-left lg:block">
                  <strong className="block text-sm font-black">{userName}</strong>
                  <small className="block text-xs text-on-surface-variant">Pro Member</small>
                </span>
              </Link>
            </div>
          </div>
          {shellError && <p className="mx-auto mt-3 max-w-[1280px] rounded-xl bg-error-red/10 px-4 py-2 text-sm font-bold text-error-red">{shellError}</p>}
        </header>

        <ProAppRoutes shellData={shellData} />
      </div>
    </div>
  )
}

function ProAppRoutes({ shellData }) {
  const location = useLocation()
  const Page = proRoutes[location.pathname] || ProDashboardPage
  return (
    <AnimatePresence mode="wait">
      <Page key={location.pathname} shellData={shellData} />
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

function ProDashboardPage({ shellData }) {
  const summary = shellData?.summary
  const calories = summary?.calories || { consumed: 1260, target: 2900, remaining: 1640, progress: 72 }
  const macros = summary?.macros || {
    protein: { consumed: 120, target: 180 },
    carbs: { consumed: 210, target: 300 },
    fat: { consumed: 45, target: 75 },
    fiber: { consumed: 22, target: 35 }
  }
  const schedule = summary?.schedule?.length
    ? summary.schedule
    : [
        { mealType: 'breakfast', loggedItems: 1, calories: 420 },
        { mealType: 'lunch', loggedItems: 1, calories: 680 },
        { mealType: 'dinner', loggedItems: 0, calories: 0 },
        { mealType: 'afternoon_snack', loggedItems: 0, calories: 0 }
      ]
  const weight = summary?.weight || { weightKg: 74.2, bmi: 23.8, bmiCategory: 'Healthy' }
  const completedMeals = schedule.filter((item) => Number(item.loggedItems) > 0).length
  const macroCards = [
    { label: 'Protein', Icon: Flame, color: '#9e4036', tint: 'rgba(255, 218, 213, 0.74)', data: macros.protein },
    { label: 'Carbs', Icon: Apple, color: '#0058be', tint: 'rgba(216, 226, 255, 0.78)', data: macros.carbs },
    { label: 'Fats', Icon: Droplets, color: '#f97316', tint: 'rgba(249, 115, 22, 0.12)', data: macros.fat },
    { label: 'Fiber', Icon: Activity, color: '#006e2f', tint: 'rgba(0, 110, 47, 0.1)', data: macros.fiber }
  ]
  const scheduleCards = [
    {
      key: 'breakfast',
      title: 'Breakfast',
      time: '7:30 AM',
      meal: 'Avocado Toast',
      subtitle: `${formatNumber(schedule.find((item) => item.mealType === 'breakfast')?.calories || 420)} kcal`,
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=420&q=80',
      done: Number(schedule.find((item) => item.mealType === 'breakfast')?.loggedItems || 1) > 0
    },
    {
      key: 'lunch',
      title: 'Lunch',
      time: '12:30 PM',
      meal: 'Quinoa Power Bowl',
      subtitle: `${formatNumber(schedule.find((item) => item.mealType === 'lunch')?.calories || 680)} kcal`,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=420&q=80',
      done: Number(schedule.find((item) => item.mealType === 'lunch')?.loggedItems || 1) > 0
    },
    {
      key: 'snack',
      title: 'Snack',
      time: '3:00 PM',
      meal: 'Green Apple & Nuts',
      subtitle: 'Planned',
      image: null,
      done: Number(schedule.find((item) => item.mealType === 'afternoon_snack')?.loggedItems || 0) > 0
    },
    {
      key: 'dinner',
      title: 'Dinner',
      time: '7:00 PM',
      meal: 'Salmon & Asparagus',
      subtitle: 'Planned',
      image: null,
      done: Number(schedule.find((item) => item.mealType === 'dinner')?.loggedItems || 0) > 0
    }
  ]

  return (
    <motion.main
      className="pro-dashboard-page mx-auto max-w-[1400px] space-y-section-gap px-5 py-7 pb-28 lg:px-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="grid grid-cols-12 gap-6">
        <DashboardGlassCard className="col-span-12 flex min-h-[468px] flex-col items-center justify-center rounded-[2rem] p-8 lg:col-span-5">
          <div className="mb-4 flex w-full items-start justify-between gap-4">
            <div>
              <h3 className="font-headline-md text-headline-md font-black text-on-surface">Daily Fuel</h3>
              <p className="mt-1 text-label-md text-on-surface-variant">Energy balance overview</p>
            </div>
            <div className="rounded-full bg-primary-container/20 px-3 py-1 text-label-sm font-bold text-on-primary-container">
              {formatNumber(calories.progress)}% Goal
            </div>
          </div>
          <DashboardCalorieRing progress={calories.progress} remaining={calories.remaining} />
          <div className="mt-4 grid w-full grid-cols-2 gap-4">
            <DashboardMetricTile label="Consumed" value={`${formatNumber(calories.consumed)} kcal`} />
            <DashboardMetricTile label="Target" value={`${formatNumber(calories.target)} kcal`} />
          </div>
        </DashboardGlassCard>

        <div className="col-span-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
          {macroCards.map((macro, index) => (
            <DashboardMacroCard key={macro.label} {...macro} delay={index * 0.06} />
          ))}
        </div>
      </section>

      <DashboardGlassCard className="rounded-[2rem] p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-headline-md text-headline-md font-black text-on-surface">Today's Schedule</h3>
            <p className="mt-1 text-label-md text-on-surface-variant">{scheduleCards.length} meals planned • {completedMeals} completed</p>
          </div>
          <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-label-md font-bold text-white shadow-lg shadow-primary/20" to="/app/log-food">
            <Plus size={18} /> Log New Meal
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {scheduleCards.map((item, index) => (
            <DashboardScheduleCard key={item.key} item={item} delay={index * 0.05} />
          ))}
        </div>
      </DashboardGlassCard>

      <section className="grid grid-cols-12 gap-6">
        <DashboardGlassCard className="col-span-12 rounded-[2rem] p-8 lg:col-span-8">
          <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-headline-md text-headline-md font-black text-on-surface">Weight Trend</h3>
              <p className="mt-1 text-label-md text-on-surface-variant">Last 7 days progress</p>
            </div>
            <div className="text-right">
              <p className="font-metrics-mono text-3xl font-black text-primary">{formatNumber(weight.weightKg || 74.2)} kg</p>
              <p className="text-label-sm uppercase text-on-surface-variant">Current • BMI {formatNumber(weight.bmi || 23.8)}</p>
            </div>
          </div>
          <DashboardWeightTrend />
          <div className="mt-6 grid grid-cols-3 gap-4">
            <DashboardMetricTile label="Start" value="76.0 kg" />
            <DashboardMetricTile label="Current" value={`${formatNumber(weight.weightKg || 74.2)} kg`} />
            <DashboardMetricTile label="Goal" value="70.0 kg" />
          </div>
        </DashboardGlassCard>

        <motion.aside
          className="achievement-gradient col-span-12 flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[2rem] p-8 text-white shadow-xl shadow-orange-500/10 lg:col-span-4"
          whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <Sparkles size={24} />
            </span>
            <span className="font-metrics-mono text-sm font-bold text-white/80">Daily Wisdom</span>
          </div>
          <div>
            <p className="font-headline-md text-3xl font-black leading-tight">Small choices compound into visible progress.</p>
            <p className="mt-4 text-sm leading-6 text-white/82">Keep your dinner balanced and hydration on track to protect today's calorie rhythm.</p>
          </div>
        </motion.aside>
      </section>

      <Link
        className="fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full bg-primary text-white shadow-2xl shadow-primary/25 transition hover:scale-105 lg:bottom-28 lg:right-8"
        to="/app/log-food"
        aria-label="Log food"
      >
        <Plus size={32} strokeWidth={2.6} />
      </Link>
    </motion.main>
  )
}

function DashboardGlassCard({ children, className = '' }) {
  return (
    <motion.section
      className={`glass-card min-w-0 border border-outline-variant/30 bg-white/80 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl ${className}`}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.section>
  )
}

function DashboardMetricTile({ label, value }) {
  return (
    <div className="rounded-2xl bg-surface-container px-4 py-3 text-center">
      <p className="text-label-sm text-on-surface-variant">{label}</p>
      <p className="mt-1 font-metrics-mono text-lg font-bold text-on-surface">{value}</p>
    </div>
  )
}

function DashboardCalorieRing({ progress, remaining }) {
  const normalized = Math.max(0, Math.min(100, Number(progress) || 0))
  const circumference = 2 * Math.PI * 104
  const dashOffset = circumference - (normalized / 100) * circumference

  return (
    <div className="relative my-6 flex h-64 w-64 items-center justify-center">
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 256 256" aria-hidden="true">
        <circle cx="128" cy="128" r="104" fill="none" stroke="rgba(229,238,255,0.95)" strokeWidth="18" />
        <motion.circle
          cx="128"
          cy="128"
          r="104"
          fill="none"
          stroke="#006e2f"
          strokeLinecap="round"
          strokeWidth="18"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <motion.div
        className="absolute inset-8 rounded-full bg-primary/5 shadow-[inset_0_0_28px_rgba(0,110,47,0.08)]"
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10 text-center">
        <p className="font-metrics-mono text-headline-xl font-black text-primary">{formatNumber(remaining)}</p>
        <p className="font-label-md text-on-surface-variant uppercase">Calories Left</p>
      </div>
    </div>
  )
}

function DashboardMacroCard({ label, Icon, color, tint, data, delay = 0 }) {
  const consumed = Number(data?.consumed || 0)
  const target = Number(data?.target || 0)
  const pct = target ? Math.min(100, Math.round((consumed / target) * 100)) : 0

  return (
    <motion.article
      className="glass-card flex min-h-[220px] min-w-0 flex-col justify-between rounded-[1.5rem] border border-outline-variant/30 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.32 }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: tint, color }}>
          <Icon size={21} strokeWidth={2.2} />
        </div>
        <span className="font-metrics-mono text-label-sm font-bold text-on-surface-variant">
          {formatNumber(consumed)}g / {formatNumber(target)}g
        </span>
      </div>
      <div className="mt-8">
        <h4 className="font-headline-md text-lg font-black text-on-surface">{label}</h4>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-surface-container">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color, transformOrigin: 'left center', width: `${pct}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: delay + 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.article>
  )
}

function DashboardScheduleCard({ item, delay = 0 }) {
  return (
    <motion.article
      className={`w-72 shrink-0 rounded-2xl border p-4 ${item.done ? 'border-primary/10 bg-mint-surface/70' : 'border-dashed border-outline-variant/50 bg-white/70'}`}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      {item.image ? (
        <img className="h-32 w-full rounded-xl object-cover" src={item.image} alt={item.meal} />
      ) : (
        <div className="grid h-32 w-full place-items-center rounded-xl bg-surface-container">
          <Utensils className="text-on-surface-variant/40" size={34} />
        </div>
      )}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-label-md text-label-sm uppercase tracking-[0.14em] text-primary">{item.title}</p>
          <h4 className="mt-1 font-headline-md text-lg font-black text-on-surface">{item.meal}</h4>
          <p className="mt-2 text-label-md text-on-surface-variant">{item.time} • {item.subtitle}</p>
        </div>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${item.done ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}>
          {item.done ? <Check size={17} /> : <Plus size={17} />}
        </span>
      </div>
    </motion.article>
  )
}

function DashboardWeightTrend() {
  const points = [72, 70, 68, 61, 56, 48, 42]
  const bars = [44, 52, 59, 66, 74, 82, 88]
  return (
    <div className="relative h-52 overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-mint-surface to-white p-5">
      <div className="absolute inset-x-5 bottom-5 flex h-36 items-end gap-3">
        {bars.map((height, index) => (
          <motion.div
            className="flex-1 rounded-t-xl bg-primary/20"
            key={height}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: index * 0.05, duration: 0.6 }}
          />
        ))}
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 208" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d={`M 42 ${points[0]} C 120 ${points[1]}, 160 ${points[2]}, 220 ${points[3]} S 350 ${points[4]}, 450 ${points[5]} S 610 ${points[6]}, 678 38`}
          fill="none"
          stroke="#006e2f"
          strokeLinecap="round"
          strokeWidth="8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute bottom-5 left-5 right-5 flex justify-between font-metrics-mono text-xs font-bold text-on-surface-variant/70">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </div>
  )
}

function ProMealPlannerPage() {
  const { data: plans } = useBackendData(
    () => apiRequest(`/api/meal-plans?from=${todayIso()}&to=${addDaysIso(6)}`),
    [],
    []
  )
  const fallbackDays = [
    {
      day: 'Monday',
      date: 'Oct 23',
      total: 2120,
      meals: [
        { type: 'Breakfast', title: 'Avocado Toast with Poached Egg', kcal: 420, protein: 18 },
        { type: 'Lunch', title: 'Quinoa & Roasted Veggie Bowl', kcal: 580, protein: 22 },
        { type: 'Dinner', title: 'Pan-Seared Salmon with Asparagus', kcal: 650, protein: 42 }
      ]
    },
    { day: 'Tuesday', date: 'Oct 24', total: 0, meals: [] },
    {
      day: 'Wednesday',
      date: 'Oct 25',
      total: 2240,
      meals: [
        { type: 'Breakfast', title: 'Greek Yogurt Parfait' },
        { type: 'Lunch', title: 'Turkey & Swiss Wrap' },
        { type: 'Dinner', title: 'Beef Stir-fry with Ginger' }
      ]
    },
    { day: 'Thursday', date: 'Oct 26', total: 0, meals: [] }
  ]
  const days = plans.length
    ? Object.values(
        plans.reduce((acc, plan) => {
          const date = String(plan.plan_date || plan.planDate).slice(0, 10)
          acc[date] ||= {
            day: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            total: 0,
            meals: []
          }
          acc[date].total += Number(plan.target_calories || plan.calories || 0)
          acc[date].meals.push({
            type: mealLabel(plan.meal_type || plan.mealType || 'Meal'),
            title: plan.food_name || plan.foodName || plan.name || 'Planned meal',
            kcal: Number(plan.target_calories || plan.calories || 0),
            protein: Number(plan.protein_g || plan.protein || 0)
          })
          return acc
        }, {})
      )
    : fallbackDays

  return (
    <motion.main
      className="pro-mealplanner-page mx-auto max-w-[1400px] px-5 py-7 pb-28 lg:px-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h2 className="font-headline-lg text-headline-lg font-black text-on-surface">Weekly Summary</h2>
          <p className="mt-2 font-body-lg text-body-lg text-on-surface-variant">
            Precision nutrition tailored for your vitality. Manage your week's macros and energy levels with AI-assisted planning.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <MealPlannerMetricCard value="2,450" label="Target kcal" tone="text-energy-orange" />
          <MealPlannerMetricCard value="185g" label="Protein Goal" tone="text-primary" />
        </div>
      </section>

      <section className="custom-scrollbar mt-8 flex snap-x gap-6 overflow-x-auto pb-6">
        {days.slice(0, 7).map((day, index) => (
          <MealPlannerDayCard day={day} index={index} key={`${day.day}-${day.date}`} />
        ))}
      </section>

      <section className="mt-8 grid grid-cols-12 gap-8">
        <MealPlannerShoppingList />
        <div className="col-span-12 flex flex-col gap-8 lg:col-span-4">
          <MealPlannerInsights />
          <MealPlannerAssistantCard />
        </div>
      </section>

      <MealPlannerPantryBanner />

      <button
        className="fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full bg-primary text-on-primary shadow-2xl shadow-primary/25 transition-all hover:scale-110 active:scale-95 lg:bottom-8 lg:right-8"
        type="button"
        aria-label="Add meal"
      >
        <Plus size={32} strokeWidth={2.6} />
      </button>
    </motion.main>
  )
}

function MealPlannerMetricCard({ value, label, tone }) {
  return (
    <motion.div className="glass-card flex min-w-[120px] flex-col items-center rounded-2xl bg-white/80 px-6 py-4 shadow-sm backdrop-blur-xl" whileHover={{ y: -3 }}>
      <span className={`font-metrics-mono text-2xl font-bold ${tone}`}>{value}</span>
      <span className="font-label-sm text-label-sm uppercase tracking-tighter text-on-surface-variant">{label}</span>
    </motion.div>
  )
}

function MealPlannerDayCard({ day, index }) {
  const isEmpty = !day.meals?.length
  return (
    <motion.article
      className="w-[320px] flex-shrink-0 snap-start"
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.32 }}
    >
      <div className="glass-card flex h-full flex-col overflow-hidden rounded-[2rem] border border-outline-variant/30 bg-white/80 backdrop-blur-xl transition-transform hover:scale-[1.01]">
        <div className={`flex items-center justify-between border-b p-6 ${isEmpty ? 'border-outline-variant/20 bg-surface-container-low' : 'border-primary/10 bg-mint-surface/50'}`}>
          <div>
            <span className={`font-label-sm text-label-sm font-bold uppercase tracking-widest ${isEmpty ? 'text-on-surface-variant/60' : 'text-primary'}`}>{day.day}</span>
            <h3 className="font-headline-md text-headline-md font-black text-on-surface">{day.date}</h3>
          </div>
          <span className={`rounded-full px-3 py-1 font-metrics-mono text-xs font-bold ${isEmpty ? 'bg-surface-container-highest text-on-surface-variant' : 'bg-primary text-on-primary'}`}>
            {formatNumber(day.total)} kcal
          </span>
        </div>

        {isEmpty ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 bg-white/40 p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-container-high">
              <Utensils className="text-on-surface-variant/40" size={38} />
            </div>
            <p className="text-center font-label-md text-on-surface-variant">Plan is currently empty</p>
            <button className="rounded-xl bg-primary-container/20 px-6 py-2 text-label-md font-bold text-on-primary-container transition-all hover:bg-primary-container/30" type="button">
              Add Meals
            </button>
          </div>
        ) : (
          <div className="grid gap-4 bg-white/40 p-6">
            {day.meals.map((meal, mealIndex) => (
              <MealPlannerSlot meal={meal} key={`${meal.type}-${meal.title}-${mealIndex}`} />
            ))}
            <MealPlannerSlot empty meal={{ type: 'Snack', title: 'Add a snack...' }} />
          </div>
        )}
      </div>
    </motion.article>
  )
}

function MealPlannerSlot({ meal, empty = false }) {
  if (empty) {
    return (
      <button className="meal-slot-hover rounded-2xl border border-dashed border-outline-variant/50 bg-surface-container p-4 text-left transition-all active:scale-[0.98]" type="button">
        <div className="flex items-center justify-between">
          <p className="text-label-md italic text-on-surface-variant/60">{meal.title}</p>
          <Plus className="text-primary" size={20} />
        </div>
      </button>
    )
  }

  return (
    <button className="meal-slot-hover group/item rounded-2xl border border-outline-variant/20 bg-white p-4 text-left transition-all active:scale-[0.98]" type="button">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{meal.type}</span>
        <Settings className="text-on-surface-variant/40 group-hover/item:text-primary" size={14} />
      </div>
      <p className="font-bold text-on-surface">{meal.title}</p>
      {(meal.kcal || meal.protein) && (
        <p className="mt-1 text-label-sm text-on-surface-variant">
          {meal.kcal ? `${formatNumber(meal.kcal)} kcal` : ''}
          {meal.kcal && meal.protein ? ' • ' : ''}
          {meal.protein ? `${formatNumber(meal.protein)}g Protein` : ''}
        </p>
      )}
    </button>
  )
}

function MealPlannerShoppingList() {
  const categories = [
    {
      title: 'Fresh Produce',
      color: '#006e2f',
      Icon: Apple,
      items: [
        ['Ripe Avocados (3 units)', false],
        ['Baby Spinach (500g)', false],
        ['Fresh Asparagus (1 bundle)', true],
        ['Red Bell Peppers (2 units)', false]
      ]
    },
    {
      title: 'Protein & Dairy',
      color: '#9e4036',
      Icon: Utensils,
      items: [
        ['Atlantic Salmon Fillets (2)', false],
        ['Organic Greek Yogurt (1kg)', false],
        ['Free-range Eggs (12)', true],
        ['Ground Turkey (500g)', false]
      ]
    }
  ]

  return (
    <motion.section className="glass-card col-span-12 flex flex-col rounded-[2.5rem] bg-white/80 p-8 backdrop-blur-xl lg:col-span-8" whileHover={{ y: -3 }}>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-headline-md text-headline-md font-black text-on-surface">Smart Shopping List</h3>
          <p className="text-label-md font-bold uppercase tracking-widest text-on-surface-variant/60">Generated from weekly plan</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl px-4 py-2 font-bold text-primary transition-colors hover:bg-primary-container/10" type="button">
          <CalendarDays size={18} /> Export List
        </button>
      </div>
      <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        {categories.map(({ title, color, Icon, items }) => (
          <div key={title}>
            <div className="mb-5 flex items-center gap-3 font-bold" style={{ color }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}1a` }}>
                <Icon size={19} />
              </div>
              {title}
            </div>
            <ul className="grid gap-4">
              {items.map(([item, checked]) => (
                <li className="flex cursor-pointer items-center gap-4" key={item}>
                  <span className="flex h-5 w-5 items-center justify-center rounded border-2" style={{ borderColor: color, backgroundColor: checked ? color : 'transparent' }}>
                    {checked && <Check className="text-white" size={14} strokeWidth={3} />}
                  </span>
                  <span className={`text-body-md ${checked ? 'text-on-surface-variant/50 line-through' : 'text-on-surface'}`}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-end pt-8">
        <button className="rounded-2xl bg-secondary px-8 py-3 text-label-md font-bold text-on-primary shadow-lg shadow-secondary/20 transition-all hover:scale-105" type="button">
          Send to InstaCart
        </button>
      </div>
    </motion.section>
  )
}

function MealPlannerInsights() {
  return (
    <motion.section className="glass-card rounded-[2.5rem] border border-primary/10 bg-mint-surface/30 p-8 backdrop-blur-xl" whileHover={{ y: -3 }}>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles size={22} />
        </div>
        <h3 className="font-headline-md text-headline-md font-black text-on-surface">Insights</h3>
      </div>
      <div className="grid gap-6">
        <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:h-[80%] before:w-1.5 before:rounded-full before:bg-primary">
          <p className="mb-1 font-bold text-on-surface">Batch Cook Wednesday</p>
          <p className="text-label-md text-on-surface-variant">Your Wednesday lunch and Thursday dinner use similar ingredients. Pre-roast your veggies once!</p>
        </div>
        <div className="relative pl-6 before:absolute before:left-0 before:top-1 before:h-[80%] before:w-1.5 before:rounded-full before:bg-energy-orange">
          <p className="mb-1 font-bold text-on-surface">Fiber Deficiency Detected</p>
          <p className="text-label-md text-on-surface-variant">Current plan is 15% below fiber goal. Consider adding chia seeds to breakfast.</p>
        </div>
        <div className="mt-1 rounded-2xl border border-primary/10 bg-white/60 p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-label-sm font-bold uppercase tracking-widest text-on-surface-variant">Macro Balance</span>
            <span className="font-metrics-mono text-sm font-bold text-primary">92%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-surface-container">
            <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ duration: 0.8 }} />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function MealPlannerAssistantCard() {
  return (
    <motion.section className="achievement-gradient relative flex flex-1 flex-col justify-center overflow-hidden rounded-[2.5rem] p-8 text-white shadow-xl" whileHover={{ y: -3, rotateX: 2 }}>
      <div className="absolute -right-10 -top-10 opacity-20">
        <Sparkles size={148} />
      </div>
      <div className="relative z-10">
        <p className="font-headline-md text-2xl italic leading-snug">"Pantry Inventory Sync is active. We've removed items you already own."</p>
        <div className="mt-6 flex items-center gap-3">
          <div className="h-1 w-10 rounded-full bg-white/40" />
          <p className="text-[10px] font-bold uppercase tracking-widest">Smart Assistant</p>
        </div>
      </div>
    </motion.section>
  )
}

function MealPlannerPantryBanner() {
  return (
    <motion.section className="group relative mt-8 h-64 overflow-hidden rounded-[3rem] shadow-2xl" whileHover={{ y: -3 }}>
      <img
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80"
        alt="Kitchen pantry with organic ingredients"
      />
      <div className="absolute inset-0 flex items-center bg-gradient-to-r from-primary/90 via-primary/40 to-transparent px-8 md:px-16">
        <div className="max-w-md text-on-primary">
          <div className="mb-4 w-fit rounded-2xl bg-white/20 p-3 backdrop-blur-md">
            <Apple size={30} />
          </div>
          <h4 className="font-headline-lg text-headline-lg font-bold">Pantry Inventory Sync</h4>
          <p className="mt-2 font-body-lg text-lg leading-relaxed opacity-90">
            NutriTrack AI is scanning your uploaded pantry photos to automatically remove items you already have.
          </p>
        </div>
      </div>
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

      <button
        className="group fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg shadow-primary/25 transition-all hover:scale-110 active:scale-95 lg:bottom-8 lg:right-8"
        onClick={addQuickItem}
        type="button"
        aria-label="Log food item"
      >
        <Plus className="transition-transform group-hover:rotate-90" size={32} strokeWidth={2.6} />
        <span className="pointer-events-none absolute right-20 hidden translate-x-4 whitespace-nowrap rounded-xl bg-inverse-surface px-4 py-2 font-label-md text-sm text-inverse-on-surface opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          {saving ? 'Adding...' : 'Log Food Item'}
        </span>
      </button>
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

function ProCommunityPage() {
  const challenges = [
    {
      title: '7-Day Keto Sprint',
      description: 'Reset your metabolism with our high-fat, low-carb foundation challenge. Expert curated meal plan included.',
      badge: 'Hot',
      badgeTone: 'orange',
      participants: '+1.2k',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkG6QiMiKBZNiMSsr4m6ISx4oYQMUIJW4Gsb7qZQIuS_e21XEWSQPfp47HVoq20YalHEI_oJd9-_iQtVZmXPcYU9SlCqqupK8Kez7zmIzw_3BH1lKHUnfxvuhGm9bViQNSqegIC9MBH58PoemZW_9McAw1quDkgh1q6mDJMtqyVq6V7Uu6gH6FE9KBSGSWFbRD8RLxlRZDruWj9lO9SawdME5rAzIOw7QdytYftd0qcyMMUZLRURNQFloFeLCtnA_InbD9sDbSotU'
    },
    {
      title: 'Sugar-Free Week',
      description: 'Break the cycle of sugar dependency. 7 days of natural energy and clear focus. Join 3,400 others.',
      badge: 'High Impact',
      badgeTone: 'purple',
      participants: '+3k'
    }
  ]
  const leaderboard = [
    {
      rank: '01',
      name: 'Elena Vance',
      days: '42 Days',
      top: true,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfz-gcdHCC13vC2dVXCHjZoyBYPUW0Yot9uD7FxYjjvKwQszcpTNP__CXZf-XnXgLkvnR4LD0KjsoKeDvzGTso7A3Uae_XhujVYyx0QBcnQJRSzlnLDInIsA17_lrhx_QOVSX8MgEiezUIof6UA0-9Vha5UZZwlVoyehfvE6tH0Rq249AKCg5SwOmLtZ9i1j_fctYIg3nNjQpby1D915EM0VxyxoaPAlgAozI8BG80rrTLS2dnBdfESbxKlDgB7scyyhIGOhi5TC4'
    },
    {
      rank: '02',
      name: 'David Chen',
      days: '38 Days',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw1zLjVPLelW3mlOY53g-6QHryjAZLGOlb2ijqOw2Vskf5OR9UZqSF6TuK-UinRVx474ib49r4YLaxN6PmfinAxpiZe95ZkC6zZt0Sqe02hvnPNe9aXwl7OAmMFVNvRlJK37TcV97gsKGPd6uBot7BL5y5k9RJ-84oNcSc2lqGf9iK_xrY96c7Egg7KRLRNcwlIYNmgHzRx0tmXOeX_Xu43Ef4x3MRkPEMRQaVrg9nes0gCLt4IYFssYTtMXTrXlGCiziYtel-qJE'
    },
    {
      rank: '03',
      name: 'Maria Rossi',
      days: '35 Days',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ0Z2_b0OcAQ4ckVsD9MG5gUHEmBYlUke-c9dp1-3XsODW9E1A4NCB3qAdzfK0IpFNZMkQ6jrDZngi2Q5UuRa_xE3dsOypsE2OYCKQK1xa-B5RgJjbrasip2cUJMMzael5s-ahFgplEfrb1Jofv85KZQ9GZF8uqlVSG6TJKmVjje0MJB4yOJ9Gux_XlhdxAjXr5iLv7lvdNa_n5FicMP_676_MqdBCJmn6xtlhxicaN44Z-pXAv3iAf_BBkeqyepJaAorAMowZSSY'
    }
  ]
  const buddies = [
    {
      name: 'Sophie Morel',
      meta: '92% Match - Vegan Focus',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL_C4t2p95vD1Wgw05Iv-9uIXXZHTRWVY2xzSNy8ViNY2ynYa5P1iiXqRGKz64Pxp1FErdwtNeoDRhvcD_4xxg_K8igwkxW4qcxWEnn51VlnbeCrTV1mR3YD92ySVwxhqelOLQkn8YfkBDMF-2q-Le8rS-ErU-evOkQ136sIRPE-uvzAQnuv0WyJzAcilQ8X0AQLMkwjfkRcl9dsTNhGfdKioEzr3chbp1_2uTVMZ-lu2Vth2gAeteXWaGHcHnIy5ZTzkSA2UwxEc'
    },
    {
      name: 'James Wilson',
      meta: '88% Match - Keto Pro',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR39zPapalQk-Jpn4fH_77ZZJ4dkN7nPTVdmF7CW_Hh4GKTxlpk9aOL3b-we4BXRTEFJbozF7CiNg5EwunWuOAIn7amp1eI_VyA7fZgaZkjSgnCcIU4nlMDTdR1MoDEnur5sTetBkGWYF69HECmU4f742LA5rG_hOE3Y-Tu5yCoNxMa8xQEA8C5JErWzbyp4DrZH91Nfd4raXBnNrs8pcxyPzwymbRJMaHJwqDUcTZEWl5jpw-0llt96pmiG1T6iB6B2OSjUIu59c'
    }
  ]

  return (
    <ProPage title="Community Hub" subtitle="Tuesday, October 24" showHeader={false} wide>
      <div className="space-y-8 pb-28">
        <motion.section className="overflow-hidden rounded-[2.5rem] border border-outline-variant/40 bg-primary/5 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl md:p-10" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row">
            <div className="flex-1 space-y-6">
              <h2 className="font-headline-xl text-[40px] font-bold leading-tight text-on-surface md:text-[48px]">
                Connect with the <span className="text-primary">NutriTrack</span> Tribe
              </h2>
              <p className="max-w-xl text-lg leading-8 text-on-surface-variant">Find your accountability partners, join expert-led challenges, and celebrate every milestone with a community that cheers for you.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-label-md font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95" type="button">
                  <UserPlus size={18} />
                  Find Buddies
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-white px-8 py-3 text-label-md font-bold text-on-surface transition-all hover:bg-surface-container active:scale-95" type="button">
                  <Compass size={18} />
                  Global Feed
                </button>
              </div>
            </div>
            <motion.div className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[2rem] border border-outline-variant/40 bg-white/80 p-8 shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl md:w-1/3" whileHover={{ y: -4, rotateX: 3 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
              <Users className="relative h-28 w-28 text-primary/20 transition-transform duration-500 group-hover:scale-110" />
            </motion.div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <section>
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Active Health Challenges</h3>
                <button className="font-bold text-primary hover:underline" type="button">View All</button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {challenges.map((challenge, index) => (
                  <CommunityChallengeCard challenge={challenge} index={index} key={challenge.title} />
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Community Success &amp; Wins</h3>
              <CommunityFeedPost />
            </section>
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <NutritionGlassCard>
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Top Streaks</h3>
                <Trophy className="text-warning-yellow" size={28} />
              </div>
              <div className="space-y-4">
                {leaderboard.map((item) => (
                  <CommunityRankItem item={item} key={item.rank} />
                ))}
              </div>
              <button className="mt-8 w-full rounded-xl border border-outline-variant/30 py-3 text-label-sm font-bold text-on-surface-variant transition-all hover:bg-surface-container" type="button">
                View Full Leaderboard
              </button>
            </NutritionGlassCard>

            <NutritionGlassCard>
              <h3 className="mb-8 font-headline-md text-headline-md font-bold text-on-surface">Suggested Buddies</h3>
              <div className="space-y-8">
                {buddies.map((buddy) => (
                  <CommunityBuddyItem buddy={buddy} key={buddy.name} />
                ))}
              </div>
            </NutritionGlassCard>

            <motion.section className="achievement-gradient relative overflow-hidden rounded-[2rem] p-8 text-white shadow-xl transition-transform hover:scale-[1.01]" whileHover={{ y: -3 }}>
              <div className="absolute -right-10 -top-10 opacity-20">
                <span className="font-headline-xl text-[160px] leading-none">"</span>
              </div>
              <div className="relative z-10">
                <Lightbulb className="mb-4 h-10 w-10" />
                <p className="mb-8 font-headline-md text-headline-md italic leading-snug">"Alone we track, together we transform. Your tribe is your greatest nutrition hacks."</p>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-10 rounded-full bg-white/40" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Community Wisdom</p>
                </div>
              </div>
            </motion.section>
          </aside>
        </div>

        <motion.button className="group fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl transition-all hover:scale-110 active:scale-95" type="button" aria-label="New Story" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.35, type: 'spring', stiffness: 220 }}>
          <Plus size={36} />
          <span className="pointer-events-none absolute right-full mr-4 hidden whitespace-nowrap rounded-xl bg-[#213145] px-4 py-2 text-label-md font-bold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
            New Story
          </span>
        </motion.button>
      </div>
    </ProPage>
  )
}

function CommunityChallengeCard({ challenge, index }) {
  const badgeColor = challenge.badgeTone === 'purple' ? '#a855f7' : '#f97316'

  return (
    <motion.article className="group cursor-pointer rounded-[2rem] border border-outline-variant/40 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl transition-all hover:-translate-y-1" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.35 }}>
      <div className="relative mb-6 h-44 overflow-hidden rounded-2xl bg-mint-surface">
        {challenge.image ? (
          <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" src={challenge.image} alt={challenge.title} loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Apple className="h-16 w-16 text-primary/20 transition-transform duration-700 group-hover:scale-110" />
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white" style={{ backgroundColor: badgeColor }}>{challenge.badge}</div>
      </div>
      <h4 className="mb-2 font-headline-md text-headline-md font-bold text-on-surface">{challenge.title}</h4>
      <p className="mb-6 line-clamp-2 leading-7 text-on-surface-variant">{challenge.description}</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CommunityAvatarStack countLabel={challenge.participants} />
        <button className="rounded-xl bg-primary-container/20 px-5 py-2 text-label-sm font-bold text-on-primary-container transition-all hover:bg-primary hover:text-white active:scale-[0.98]" type="button">
          Join Challenge
        </button>
      </div>
    </motion.article>
  )
}

function CommunityAvatarStack({ countLabel }) {
  return (
    <div className="flex -space-x-3">
      <img className="h-8 w-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSC7xCK-qAPfiPGiDCGpvqcqQiRVFE3ZwLgPVnM63MUXTtcrABnnBj0hPwh3XpfmJjBjImNbbkBzAeAsEcZoFMt5r7fRezOYlNx4g1U72JO61pz3CevrGK_sTfqo4qKRcNBlFSCxHvpA_NthxUaY4oNHfZFM2imCypitF4G5bWeBDz0inNVizvGPSrwiPf_gb5EPZtGH20kZVxWXT4eZPIPiSc8LuFlZ_JXUL82FH_wodPZEVzWSsG2aqja0mAbYuhMbOgG8RhRl0" alt="Challenge participant" loading="lazy" />
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-surface-container-high text-[10px] font-bold">{countLabel}</div>
    </div>
  )
}

function CommunityFeedPost() {
  return (
    <motion.article className="rounded-[2rem] border border-outline-variant/40 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl transition-all hover:shadow-xl md:p-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.35 }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img className="h-12 w-12 rounded-full border-2 border-primary-container/30 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHi9rfB7p3znkHCNRXjLABna3cN6QDvVRd11U-Tfkv977mxl6myU09Zqby9mbihzReT42o-EYkBmnqkHNAqM2FD3gdK_dt3fNkwRJKZ6wNUjnPqEYe2OZdYwqLo2XDpfriLC1xW_ECZ7ScRhCO8INJWWi5jSvigiccsQPKndHMTxfUZsg8F1ib216ulv9sHCjnBRU83X7lnxbYwa3lOgKxhimCGejOyqaQySeZkjrbib57I6eK40mJwJVY7NwBf6bWKPRrUNKnKEw" alt="Sarah Jenkins" loading="lazy" />
          <div>
            <h5 className="font-bold text-on-surface">Sarah Jenkins</h5>
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">2 hours ago - <span className="text-achievement-purple">Sugar-Free Finisher</span></p>
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-variant" type="button" aria-label="Post actions">
          <MoreHorizontal size={20} />
        </button>
      </div>
      <p className="mb-6 leading-7 text-on-surface">"Just finished my 30-day streak! I have never felt more energetic. Dropped 5 lbs but the mental clarity is the real trophy. Thanks to everyone for the motivation!"</p>
      <div className="mb-6 h-72 overflow-hidden rounded-2xl border border-outline-variant/10 shadow-sm">
        <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeqD7oX7GgoMFp9tFcqdEilitOoAe516IHe57AUMjn8K28vg8nXh2SK8KGNPUhRtwlNUt4a6VKlvuR2dFJfsEa1XvsM7PNKGyg2zf2hmeXdCeTC_2D4GMUwcsQqr1tfGT87Jd_8-F0CmTTFU3EgQARrCKIJUE3Ad-0qcjibS6n-seOuSCvmoUKK1iKImH0gmgxmWfA1HeoL_n9Gw-o1xhMLdBoyFr0nFGFBd34kSTPlt75V394rN_2n9Z3LAEjaGRHkfx3bpd-uwU" alt="Meal Prep" loading="lazy" />
      </div>
      <div className="flex flex-wrap items-center gap-6 border-t border-outline-variant/20 pt-4">
        <button className="flex items-center gap-2 text-label-sm font-bold text-primary transition-all hover:scale-105 active:scale-95" type="button">
          <Heart size={18} fill="currentColor" />
          124 Cheers
        </button>
        <button className="flex items-center gap-2 text-label-sm font-bold text-on-surface-variant transition-all hover:scale-105 hover:text-primary active:scale-95" type="button">
          <MessageCircle size={18} />
          18 Comments
        </button>
        <button className="ml-auto flex items-center gap-2 text-label-sm font-bold text-on-surface-variant transition-colors hover:text-primary" type="button" aria-label="Share post">
          <Share2 size={18} />
        </button>
      </div>
    </motion.article>
  )
}

function CommunityRankItem({ item }) {
  return (
    <motion.div className={`flex cursor-default items-center gap-4 rounded-[1.25rem] p-4 transition-all ${item.top ? 'border border-primary/20 bg-mint-surface shadow-sm hover:scale-[1.02]' : 'hover:bg-surface-container'}`} whileHover={{ x: item.top ? 0 : 3 }}>
      <div className={`w-6 font-metrics-mono text-xl font-bold ${item.top ? 'text-primary' : 'text-on-surface-variant/50'}`}>{item.rank}</div>
      <img className={`h-12 w-12 rounded-full object-cover ${item.top ? 'border-2 border-primary' : ''}`} src={item.avatar} alt={item.name} loading="lazy" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-on-surface">{item.name}</p>
        <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/60">{item.days}</p>
      </div>
      <Flame className={item.top ? 'text-primary' : 'text-energy-orange/50'} size={20} />
    </motion.div>
  )
}

function CommunityBuddyItem({ buddy }) {
  return (
    <div className="flex items-center gap-4">
      <img className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm" src={buddy.avatar} alt={buddy.name} loading="lazy" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-on-surface">{buddy.name}</p>
        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{buddy.meta}</p>
      </div>
      <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-container text-white shadow-md transition-transform hover:scale-110 active:scale-95" type="button" aria-label={`Add ${buddy.name}`}>
        <Plus size={20} />
      </button>
    </div>
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

        <div className="mt-24 grid grid-cols-12 gap-6">
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
      <motion.div className="relative h-72 w-full overflow-hidden rounded-[2rem] shadow-lg" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <img className="h-full w-full object-cover" src={user.bannerUrl} alt="Profile Banner" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </motion.div>

      <div className="absolute -bottom-12 left-4 right-4 flex flex-col gap-4 sm:left-10 sm:right-auto sm:flex-row sm:items-end sm:gap-6">
        <motion.div className="relative z-10 h-32 w-32 overflow-hidden rounded-[2rem] border-4 border-white bg-surface shadow-2xl sm:h-44 sm:w-44 sm:rounded-[2.5rem]" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.35 }}>
          <img className="h-full w-full object-cover" src={user.avatarUrl} alt={user.name} loading="lazy" />
        </motion.div>
        <div className="mb-2 space-y-1 sm:mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-headline-lg text-3xl font-bold text-white drop-shadow-md md:text-headline-lg">{user.name}</h2>
            <span className="flex items-center gap-1 rounded-full border border-achievement-purple/40 bg-achievement-purple/20 px-3 py-1 text-[10px] font-bold tracking-widest text-achievement-purple shadow-sm backdrop-blur-md">
              <Check size={14} />
              PRO MEMBER
            </span>
          </div>
          <p className="flex items-center gap-2 text-white/90 drop-shadow-sm">
            <MapPin size={18} />
            {user.location} - Joined {user.joined}
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 right-4 hidden sm:right-10 sm:block">
        <button className="flex items-center gap-2 rounded-2xl bg-primary px-8 py-3 font-bold text-on-primary shadow-xl transition-all hover:scale-105 active:scale-95" type="button" aria-label="Edit profile">
          <Edit3 size={20} />
          Edit Profile
        </button>
      </div>
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

function ProNotificationsPage({ shellData }) {
  const { data: notifications, setData: setNotifications } = useBackendData(
    () => apiRequest('/api/notifications?limit=20'),
    shellData?.notifications || [],
    [shellData?.notifications?.length]
  )
  const visibleNotifications = notifications.length
    ? notifications
    : [
        { id: 'fallback-1', title: 'Lunch reminder in 30 minutes', created_at: new Date().toISOString() },
        { id: 'fallback-2', title: 'Hydration streak maintained', created_at: new Date().toISOString() },
        { id: 'fallback-3', title: 'Weekly nutrition report ready', created_at: new Date().toISOString() },
        { id: 'fallback-4', title: 'Community challenge updated', created_at: new Date().toISOString() }
      ]

  const markAllRead = async () => {
    const unread = notifications.filter((item) => item.status === 'unread')
    await Promise.all(unread.map((item) => apiRequest(`/api/notifications/${item.id}/read`, { method: 'PATCH' })))
    setNotifications(notifications.map((item) => ({ ...item, status: 'read' })))
  }

  return (
    <ProPage title="Activity Hub" subtitle="Reminders, achievements, reports, and system health signals." action={<button className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white" onClick={markAllRead} type="button">Mark All Read</button>}>
      <div className="grid gap-4">
        {visibleNotifications.map((item, index) => (
          <ProPanel className="flex items-center gap-4 p-4" key={item.id || item.title}>
            <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Bell size={20} />
            </span>
            <div className="min-w-0">
              <h3 className="font-black">{item.title}</h3>
              <p className="text-sm text-on-surface-variant">{item.message || `${index + 1}h ago`}</p>
            </div>
          </ProPanel>
        ))}
      </div>
    </ProPage>
  )
}

function ProHelpPage() {
  return (
    <ProPage title="Help Center" subtitle="Search articles, tutorials, subscriptions, macro tracking, and device sync." action={<button className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white" type="button">Contact Support</button>}>
      <ProPanel className="bg-mint p-8 text-center">
        <h3 className="text-4xl font-black">Apa yang bisa kami bantu?</h3>
        <label className="mx-auto mt-6 flex h-14 max-w-3xl items-center gap-3 rounded-2xl bg-white px-5 text-left shadow-lg">
          <Search className="text-primary" />
          <input className="min-w-0 flex-1 border-0 bg-transparent p-0 focus:ring-0" placeholder="Cari artikel, tutorial, dan lainnya..." />
        </label>
      </ProPanel>
      <div className="grid gap-6 md:grid-cols-4">
        {['Akun', 'Nutrisi', 'Teknis', 'Langganan'].map((item) => (
          <ProPanel key={item}>
            <HelpCircle className="text-primary" />
            <h3 className="mt-4 text-xl font-black">{item}</h3>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">Panduan dan FAQ untuk kategori {item.toLowerCase()}.</p>
          </ProPanel>
        ))}
      </div>
    </ProPage>
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
          showFormMessage(form, 'Login berhasil. Mengalihkan ke dashboard...')
          navigate('/app/dashboard')
        } else if (form.id === 'registerForm') {
          const { fullName, email, password, confirmation } = getFormFields(form)
          if (password !== confirmation) throw new Error('Konfirmasi password belum sama.')
          await register(fullName, email, password === 'nutritrack' ? 'nutritrack123' : password)
          showFormMessage(form, 'Akun berhasil dibuat. Mengalihkan ke onboarding...')
          navigate('/onboarding')
        } else if (form.id === 'forgotForm') navigate('/verify-email')
        else if (form.id === 'resetForm') navigate('/login')
        else navigate('/app/dashboard')
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

function SplashPage() {
  return (
    <AnimatedPage className="splash-page">
      <motion.div className="splash-logo" animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.4 }}>
        <Apple size={58} />
      </motion.div>
      <h1>NutriTrack</h1>
      <p>Halo, Alex. Mari mulai perjalananmu.</p>
      <Link className="primary-link" to="/onboarding">
        Lanjut Onboarding
      </Link>
    </AnimatedPage>
  )
}

export default function App() {
  const location = useLocation()
  const html = referencePages[location.pathname] || (location.pathname.startsWith('/app') ? dashboardHtml : landingHtml)

  if (location.pathname.startsWith('/app') || location.pathname === '/help') {
    return <ProAppLayout />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageMotion}>
        <ReferencePage html={html} />
      </motion.div>
    </AnimatePresence>
  )
}
