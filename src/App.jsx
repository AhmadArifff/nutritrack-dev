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
  Droplets,
  Dumbbell,
  Flame,
  Gauge,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Moon,
  Plus,
  Scale,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Trophy,
  User,
  Utensils
} from 'lucide-react'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

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
  { to: '/app/profile', label: 'Profile', icon: User },
  { to: '/app/settings', label: 'Settings', icon: Settings }
]

const proPageMeta = {
  '/app/dashboard': { title: 'Good Morning, Alex', subtitle: 'Daily fuel and nutrition overview', search: 'Search foods...' },
  '/app/log-food': { title: 'Daily Food Log', subtitle: 'Track meals without breaking flow', search: 'Search foods...' },
  '/app/meal-planner': { title: 'Meal Architecture', subtitle: 'Plan balanced meals for the week', search: 'Search recipes...' },
  '/app/progress': { title: 'Weight Journey', subtitle: "You've lost 2.4kg in the last 30 days", search: 'Search progress...' },
  '/app/nutrition': { title: 'Nutrition Insights', subtitle: 'Macro, hydration, and micronutrient balance', search: 'Search nutrients...' },
  '/app/foods': { title: 'Food Database', subtitle: 'Verified meals and quick logging', search: 'Search foods...' },
  '/app/foods/gado-gado': { title: 'Food Detail', subtitle: 'Gado-gado nutrition breakdown', search: 'Search foods...' },
  '/app/community': { title: 'Community Hub', subtitle: 'Challenges, buddies, and streaks', search: 'Search buddies...' },
  '/app/profile': { title: 'Profile Detail', subtitle: 'Goals, preferences, and achievements', search: 'Search activity...' },
  '/app/settings': { title: 'Settings', subtitle: 'Personalize your NutriTrack experience', search: 'Search settings...' },
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
  const location = useLocation()
  const meta = proPageMeta[location.pathname] || proPageMeta['/app/dashboard']

  useEffect(() => {
    document.title = `${meta.title} - NutriTrack`
    document.body.className = 'bg-background text-on-surface font-sans overflow-x-hidden'
  }, [meta.title])

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
        className={`pro-sidebar fixed left-0 top-0 z-[60] flex h-dvh w-[272px] flex-col border-r border-outline-variant/20 bg-surface-container-low p-4 shadow-md transition-transform duration-300 ${mobileOpen ? 'pro-sidebar-open' : ''}`}
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
          {proNavItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              className={({ isActive }) =>
                `group flex min-h-11 items-center gap-3 rounded-xl px-4 text-label-md font-bold transition-all duration-200 ${isActive ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface'}`
              }
              key={to}
              onClick={() => setMobileOpen(false)}
              to={to}
            >
              <Icon className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        <motion.div
          className="upgrade-card-react mt-auto overflow-hidden rounded-2xl border border-secondary/10 bg-gradient-to-br from-secondary-container/80 to-secondary/20 p-4 shadow-sm"
          whileHover={{ y: -3 }}
        >
          <Sparkles className="text-primary" size={22} />
          <p className="mt-3 font-extrabold text-on-background">Upgrade to Premium</p>
          <p className="mt-1 text-xs leading-5 text-on-surface-variant">AI meal plans, smart reports, and deeper analytics.</p>
              <button className="mt-3 h-9 w-full rounded-xl bg-primary text-xs font-black text-on-primary shadow-lg shadow-primary/20" type="button">
            Get Started
          </button>
        </motion.div>

        <div className="mt-3 grid gap-2">
          <NavLink className="flex min-h-10 items-center gap-3 rounded-xl px-4 text-label-md font-bold text-on-surface-variant transition hover:text-on-surface" to="/help">
            <HelpCircle size={20} />
            <span>Help Center</span>
          </NavLink>
          <NavLink className="flex min-h-10 items-center gap-3 rounded-xl px-4 text-label-md font-bold text-on-surface-variant transition hover:text-error-red" to="/login">
            <LogOut size={20} />
            <span>Logout</span>
          </NavLink>
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
                <img className="h-11 w-11 rounded-full border-2 border-primary-container object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Alex Carter" />
                <span className="hidden text-left lg:block">
                  <strong className="block text-sm font-black">Alex Carter</strong>
                  <small className="block text-xs text-on-surface-variant">Pro Member</small>
                </span>
              </Link>
            </div>
          </div>
        </header>

        <ProAppRoutes />
      </div>
    </div>
  )
}

function ProAppRoutes() {
  const location = useLocation()
  const Page = proRoutes[location.pathname] || ProDashboardPage
  return (
    <AnimatePresence mode="wait">
      <Page key={location.pathname} />
    </AnimatePresence>
  )
}

function ProPage({ children, action, eyebrow = 'NutriTrack PWA', title, subtitle }) {
  return (
    <motion.main
      className="mx-auto grid max-w-[1280px] gap-7 px-5 py-7 pb-24 lg:px-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="pro-section-header flex flex-col gap-4 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest/80 p-5 shadow-sm backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
          <h2 className="mt-2 font-headline-md text-3xl font-black text-on-background">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-on-surface-variant">{subtitle}</p>
        </div>
        {action}
      </section>
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

function ProDashboardPage() {
  return (
    <ProPage
      title="Daily Fuel"
      subtitle="A clean operating view for calories, macro balance, meal schedule, and streaks."
      action={<Link className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-white shadow-lg shadow-primary/20" to="/app/log-food"><Plus size={18} /> Log Meal</Link>}
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_1.35fr]">
        <ProPanel className="relative overflow-hidden">
          <div className="absolute right-6 top-6 rounded-full bg-primary-container/20 px-3 py-1 text-xs font-black text-primary">72% Goal</div>
          <h3 className="font-headline-md text-2xl font-black">Energy Balance</h3>
          <p className="mt-1 text-sm text-on-surface-variant">Calories left today</p>
          <div className="relative mx-auto my-4 h-[300px] max-w-[360px]">
            <FloatingNutritionScene compact />
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="font-metrics-mono text-5xl font-black text-primary">1,640</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-on-surface-variant">Calories Left</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ProMetric label="Consumed" value="1,260 kcal" />
            <ProMetric label="Target" value="2,900 kcal" />
          </div>
        </ProPanel>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            ['Protein', '120g / 180g', 68, '#9e4036', Flame],
            ['Carbs', '210g / 300g', 72, '#0058be', Apple],
            ['Fats', '45g / 75g', 61, '#f97316', Droplets],
            ['Fiber', '22g / 35g', 76, '#007a35', Activity]
          ].map(([label, value, pct, color, Icon], index) => (
            <ProPanel className="grid min-h-[190px] content-between" delay={index * 0.04} key={label}>
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ backgroundColor: `${color}18`, color }}>
                  <Icon size={21} />
                </span>
                <p className="font-metrics-mono text-xs font-black text-on-surface-variant">{value}</p>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-black">{label}</h3>
                <div className="h-3 overflow-hidden rounded-full bg-surface-container">
                  <motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${pct}%` }} style={{ backgroundColor: color }} transition={{ duration: 0.9, delay: 0.15 }} />
                </div>
              </div>
            </ProPanel>
          ))}
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <ProPanel>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-2xl font-black">Today's Schedule</h3>
              <p className="text-sm text-on-surface-variant">4 meals planned, 2 completed</p>
            </div>
            <Link className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-black text-white" to="/app/meal-planner"><CalendarDays size={17} /> Planner</Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {['Breakfast done', 'Lunch done', 'Dinner planned', 'Snack upcoming'].map((item, index) => (
              <motion.div className="rounded-2xl bg-mint p-4" key={item} whileHover={{ scale: 1.02 }}>
                <Check className="text-primary" size={20} />
                <p className="mt-3 font-black">{item}</p>
                <p className="mt-1 text-xs text-on-surface-variant">{index < 2 ? 'Completed' : 'Upcoming'}</p>
              </motion.div>
            ))}
          </div>
        </ProPanel>
        <ProPanel className="pro-accent-card bg-gradient-to-br from-achievement-purple to-energy-orange text-white">
          <Trophy size={28} />
          <h3 className="mt-5 text-2xl font-black">12 Day Streak</h3>
          <p className="mt-2 text-sm leading-6 text-white/78">Consistency is above your monthly average. Keep your dinner light and hydration on track.</p>
        </ProPanel>
      </div>
    </ProPage>
  )
}

function ProMealPlannerPage() {
  const days = [
    ['Monday', 'Oct 23', '2,120 kcal', ['Avocado Toast', 'Quinoa Bowl', 'Salmon Rice']],
    ['Tuesday', 'Oct 24', '1,840 kcal', ['Greek Yogurt', 'Turkey Wrap', 'Beef Stir-fry']],
    ['Wednesday', 'Oct 25', '2,240 kcal', ['Oatmeal Bowl', 'Chicken Salad', 'Tofu Curry']]
  ]
  return (
    <ProPage title="Weekly Meal Plan" subtitle="Balanced weekly planning with clean columns, no cramped cards, and quick actions." action={<button className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white" type="button">Generate Plan</button>}>
      <div className="grid gap-6 lg:grid-cols-3">
        {days.map(([day, date, total, meals], index) => (
          <ProPanel delay={index * 0.05} key={day}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">{day}</p>
                <h3 className="mt-1 text-xl font-black">{date}</h3>
              </div>
              <span className="rounded-full bg-primary px-3 py-1 font-metrics-mono text-xs font-black text-white">{total}</span>
            </div>
            <div className="mt-6 grid gap-4">
              {meals.map((meal) => (
                <motion.div className="rounded-2xl border border-outline-variant/40 bg-white p-4" key={meal} whileHover={{ x: 4 }}>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-on-surface-variant/70">Meal</p>
                  <p className="mt-2 font-black">{meal}</p>
                  <p className="mt-1 text-sm text-on-surface-variant">Balanced macros and fiber target</p>
                </motion.div>
              ))}
            </div>
          </ProPanel>
        ))}
      </div>
      <ProPanel className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h3 className="text-2xl font-black">Grocery Focus</h3>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">Protein, fresh vegetables, and low glycemic carbs for this week's plan.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {['Eggs', 'Greek Yogurt', 'Brown Rice', 'Spinach', 'Chicken Breast', 'Avocado'].map((item) => (
            <span className="rounded-xl bg-surface-container px-4 py-3 text-sm font-bold" key={item}>{item}</span>
          ))}
        </div>
      </ProPanel>
    </ProPage>
  )
}

function ProLogFoodPage() {
  return (
    <ProPage title="Daily Food Log" subtitle="Fast food search, clear meal cards, and stable spacing for repeated logging." action={<button className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white" type="button">Add Item</button>}>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.4fr]">
        <div className="grid gap-6">
          <ProPanel>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Search Food Database</p>
            <label className="mt-4 flex h-12 items-center gap-3 rounded-2xl bg-surface-container px-4">
              <Search size={20} />
              <input className="min-w-0 flex-1 border-0 bg-transparent p-0 focus:ring-0" placeholder="Search for chicken, rice, coffee..." />
            </label>
          </ProPanel>
          <ProPanel>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black">Recent History</h3>
              <button className="text-sm font-black text-primary" type="button">View All</button>
            </div>
            <div className="mt-4 grid gap-3">
              {['Black Coffee', 'Omelette with Spinach', 'Fuji Apple'].map((item, index) => (
                <div className="flex items-center justify-between rounded-2xl bg-surface-container-low p-4" key={item}>
                  <div>
                    <p className="font-black">{item}</p>
                    <p className="text-sm text-on-surface-variant">{index === 0 ? 'Breakfast' : index === 1 ? 'Breakfast' : 'Snack'}</p>
                  </div>
                  <p className="font-metrics-mono font-black">{[2, 240, 95][index]} kcal</p>
                </div>
              ))}
            </div>
          </ProPanel>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ['Breakfast', 420, '#007a35', ['Oatmeal with Blueberries', 'Greek Yogurt']],
            ['Lunch', 680, '#0058be', ['Quinoa Salad with Tofu', 'Hummus & Carrots']],
            ['Dinner', 0, '#a855f7', ['No items logged yet']],
            ['Snacks', 350, '#f97316', ['Mixed Nuts', 'Protein Bar']]
          ].map(([meal, kcal, color, items]) => (
            <ProPanel className="border-l-4" key={meal} style={{ borderLeftColor: color }}>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black">{meal}</h3>
                <p className="font-metrics-mono text-xl font-black">{kcal} <span className="text-xs text-on-surface-variant">kcal</span></p>
              </div>
              <div className="mt-5 grid gap-3">
                {items.map((item) => <p className="text-sm text-on-surface-variant" key={item}>{item}</p>)}
              </div>
              <button className="mt-5 h-10 w-full rounded-xl border border-dashed border-outline-variant text-sm font-black text-on-surface-variant" type="button">+ Add Item</button>
            </ProPanel>
          ))}
        </div>
      </div>
    </ProPage>
  )
}

function ProProgressPage() {
  return (
    <ProPage title="Weight Journey" subtitle="Progress trend, BMI, milestones, and consistency in one calm layout." action={<button className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white" type="button">Record Progress</button>}>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <ProPanel>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-black">Progress Trends</h3>
            <div className="flex rounded-xl bg-surface-container p-1 text-xs font-black">
              {['1M', '3M', '6M', '1Y'].map((item, index) => <span className={`rounded-lg px-3 py-2 ${index === 0 ? 'bg-white text-primary shadow' : 'text-on-surface-variant'}`} key={item}>{item}</span>)}
            </div>
          </div>
          <svg className="mt-8 h-[290px] w-full overflow-visible" viewBox="0 0 720 290" role="img" aria-label="Weight chart">
            <defs>
              <linearGradient id="weightFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#007a35" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#007a35" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M20 210 C120 204 170 216 245 185 C310 158 330 130 405 112 C490 92 560 96 700 70 L700 250 L20 250 Z" fill="url(#weightFill)" />
            <motion.path d="M20 210 C120 204 170 216 245 185 C310 158 330 130 405 112 C490 92 560 96 700 70" fill="none" stroke="#007a35" strokeLinecap="round" strokeWidth="6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1 }} />
            {[245, 405, 560].map((x, index) => <circle cx={x} cy={[185, 112, 96][index]} fill="white" key={x} r="8" stroke="#007a35" strokeWidth="5" />)}
          </svg>
        </ProPanel>
        <div className="grid gap-6">
          <ProPanel className="bg-mint">
            <h3 className="text-xl font-black">Log Weight</h3>
            <label className="mt-5 block text-sm font-bold text-on-surface-variant">Current Weight (kg)</label>
            <input className="mt-2 h-12 w-full rounded-xl border-outline-variant bg-white font-metrics-mono" defaultValue="78.5" />
            <button className="mt-4 h-11 w-full rounded-xl bg-primary font-black text-white" type="button">Record Progress</button>
          </ProPanel>
          <ProPanel>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Current BMI</p>
            <p className="mt-4 text-3xl font-black text-secondary">23.8 <span className="text-sm text-on-surface-variant">Healthy</span></p>
          </ProPanel>
        </div>
      </div>
    </ProPage>
  )
}

function ProNutritionPage() {
  return (
    <ProPage title="Nutrition Analysis" subtitle="3D macro focus, hydration, vitamins, and mineral goals." action={<button className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white" type="button">Export Report</button>}>
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <ProPanel className="min-h-[420px]">
          <h3 className="text-2xl font-black">Macro Distribution</h3>
          <div className="mt-4 h-[320px] rounded-[1.25rem] bg-gradient-to-br from-mint to-secondary-fixed">
            <FloatingNutritionScene />
          </div>
        </ProPanel>
        <div className="grid gap-5">
          {[
            ['Protein', '120g', 72, '#9e4036'],
            ['Carbs', '210g', 68, '#0058be'],
            ['Hydration', '6/8 cups', 75, '#2170e4'],
            ['Vitamin C', '82%', 82, '#f97316']
          ].map(([label, value, pct, color]) => (
            <ProPanel className="p-4" key={label}>
              <div className="flex items-center justify-between">
                <p className="font-black">{label}</p>
                <p className="font-metrics-mono font-black">{value}</p>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-surface-container">
                <motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${pct}%` }} style={{ backgroundColor: color }} transition={{ duration: 0.9 }} />
              </div>
            </ProPanel>
          ))}
        </div>
      </div>
    </ProPage>
  )
}

function ProFoodsPage() {
  const foods = [
    ['Gado-Gado', '320 kcal', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'],
    ['Chicken Rice', '510 kcal', 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80'],
    ['Oatmeal Banana', '280 kcal', 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80']
  ]
  return (
    <ProPage title="Food Database" subtitle="Browse verified foods with clean responsive cards and online assets." action={<button className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white" type="button">Add Food</button>}>
      <div className="grid gap-6 md:grid-cols-3">
        {foods.map(([name, kcal, image], index) => (
          <motion.article className="overflow-hidden rounded-[1.5rem] border border-outline-variant/40 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.07)]" key={name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} whileHover={{ y: -5 }}>
            <img className="h-52 w-full object-cover" src={image} alt={name} />
            <div className="p-5">
              <h3 className="text-xl font-black">{name}</h3>
              <p className="mt-2 font-metrics-mono font-black text-primary">{kcal}</p>
              <Link className="mt-4 inline-flex font-black text-primary" to="/app/foods/gado-gado">Detail nutrisi</Link>
            </div>
          </motion.article>
        ))}
      </div>
    </ProPage>
  )
}

function ProFoodDetailPage() {
  return (
    <ProPage title="Gado-Gado" subtitle="Portion calculator and nutrition breakdown for an Indonesian classic." action={<Link className="h-11 rounded-xl bg-surface-container px-5 py-3 text-sm font-black text-primary" to="/app/foods">Back to Foods</Link>}>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <img className="h-[520px] min-h-0 w-full rounded-[1.75rem] object-cover shadow-[0_24px_70px_rgba(15,23,42,0.16)]" src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1400&q=80" alt="Gado-gado" />
        <ProPanel>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Indonesian food</p>
          <h3 className="mt-3 text-3xl font-black">Gado-Gado</h3>
          <p className="mt-3 leading-7 text-on-surface-variant">Vegetables, tofu, tempeh, egg, and peanut sauce. Great for a fiber-rich lunch.</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <ProMetric label="Calories" value="320" />
            <ProMetric label="Protein" value="12g" />
            <ProMetric label="Carbs" value="38g" />
            <ProMetric label="Fat" value="14g" />
          </div>
          <button className="mt-6 h-12 w-full rounded-xl bg-primary font-black text-white" type="button">Add to Log</button>
        </ProPanel>
      </div>
    </ProPage>
  )
}

function ProCommunityPage() {
  return (
    <ProPage title="Community Hub" subtitle="Challenges, streaks, and support designed with breathing room." action={<button className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white" type="button">Find Buddies</button>}>
      <ProPanel className="pro-accent-card grid gap-8 bg-primary/5 md:grid-cols-[1.2fr_0.8fr] md:p-10">
        <div>
          <h3 className="text-4xl font-black leading-tight">Connect with the <span className="text-primary">NutriTrack</span> Tribe</h3>
          <p className="mt-4 max-w-2xl leading-7 text-on-surface-variant">Join expert-led challenges and celebrate every milestone with accountability partners.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="h-11 rounded-xl bg-primary px-5 font-black text-white" type="button">Find Buddies</button>
            <button className="h-11 rounded-xl bg-white px-5 font-black text-on-background" type="button">Global Feed</button>
          </div>
        </div>
        <div className="grid min-h-[240px] place-items-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
          <User className="h-28 w-28 text-primary/30" />
        </div>
      </ProPanel>
      <div className="grid gap-6 md:grid-cols-3">
        {['Active Health Challenges', 'Top Streaks', 'Global Feed'].map((item, index) => (
          <ProPanel key={item} delay={index * 0.05}>
            <Trophy className="text-warning-yellow" />
            <h3 className="mt-4 text-xl font-black">{item}</h3>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">Interactive community module ready for backend data.</p>
          </ProPanel>
        ))}
      </div>
    </ProPage>
  )
}

function ProProfilePage() {
  return (
    <ProPage title="Profile Detail" subtitle="Health identity, preferences, milestones, and achievement badges." action={<button className="h-11 rounded-xl bg-energy-orange px-5 text-sm font-black text-white" type="button">Share Profile</button>}>
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <ProPanel className="text-center">
          <img className="mx-auto h-28 w-28 rounded-full border-4 border-primary-container object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" alt="Alex Carter" />
          <h3 className="mt-5 text-2xl font-black">Alex Carter</h3>
          <p className="text-on-surface-variant">Pro Member</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <ProMetric label="Weight" value="78.5kg" />
            <ProMetric label="Goal" value="70kg" />
          </div>
        </ProPanel>
        <div className="grid gap-6 md:grid-cols-2">
          {['12 Achievements', 'Food Preference', 'Activity Level', 'Weekly Report'].map((item) => (
            <ProPanel key={item}>
              <Sparkles className="text-primary" />
              <h3 className="mt-4 text-xl font-black">{item}</h3>
              <p className="mt-2 text-sm text-on-surface-variant">Personalized user setting and progress summary.</p>
            </ProPanel>
          ))}
        </div>
      </div>
    </ProPage>
  )
}

function ProSettingsPage() {
  return (
    <ProPage title="Settings" subtitle="Theme, notifications, data export, and privacy controls." action={<button className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white" type="button">Save Changes</button>}>
      <div className="grid gap-6 lg:grid-cols-2">
        {['Light / Dark / System', 'Meal Reminder', 'Hydration Alerts', 'Data Export', 'Privacy Mode', 'Connected Devices'].map((item, index) => (
          <ProPanel className="flex items-center justify-between gap-4" key={item}>
            <div>
              <h3 className="font-black">{item}</h3>
              <p className="mt-1 text-sm text-on-surface-variant">Smooth interactive setting control.</p>
            </div>
            <button className={`h-7 w-12 rounded-full p-1 transition ${index % 2 === 0 ? 'bg-primary' : 'bg-surface-container-high'}`} type="button">
              <motion.span className="block h-5 w-5 rounded-full bg-white shadow" animate={{ x: index % 2 === 0 ? 20 : 0 }} />
            </button>
          </ProPanel>
        ))}
      </div>
    </ProPage>
  )
}

function ProNotificationsPage() {
  return (
    <ProPage title="Activity Hub" subtitle="Reminders, achievements, reports, and system health signals." action={<button className="h-11 rounded-xl bg-primary px-5 text-sm font-black text-white" type="button">Mark All Read</button>}>
      <div className="grid gap-4">
        {['Lunch reminder in 30 minutes', 'Hydration streak maintained', 'Weekly nutrition report ready', 'Community challenge updated'].map((item, index) => (
          <ProPanel className="flex items-center gap-4 p-4" key={item}>
            <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Bell size={20} />
            </span>
            <div className="min-w-0">
              <h3 className="font-black">{item}</h3>
              <p className="text-sm text-on-surface-variant">{index + 1}h ago</p>
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

    const onSubmit = (event) => {
      const form = event.target.closest('form')
      if (!form) return
      event.preventDefault()

      if (form.id === 'loginForm') navigate('/app/dashboard')
      else if (form.id === 'registerForm') navigate('/verify-email')
      else if (form.id === 'forgotForm') navigate('/verify-email')
      else if (form.id === 'resetForm') navigate('/login')
      else navigate('/app/dashboard')
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

    container.addEventListener('click', onClick)
    container.addEventListener('submit', onSubmit)
    collapseBtn?.addEventListener('click', onCollapse)
    hideBtn?.addEventListener('click', onHide)
    mobileMenuBtn?.addEventListener('click', onOpenDrawer)
    drawerBackdrop?.addEventListener('click', onCloseDrawer)

    return () => {
      container.removeEventListener('click', onClick)
      container.removeEventListener('submit', onSubmit)
      collapseBtn?.removeEventListener('click', onCollapse)
      hideBtn?.removeEventListener('click', onHide)
      mobileMenuBtn?.removeEventListener('click', onOpenDrawer)
      drawerBackdrop?.removeEventListener('click', onCloseDrawer)
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
