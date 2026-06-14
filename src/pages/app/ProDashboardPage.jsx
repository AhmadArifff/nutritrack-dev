import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Apple, Check, Droplets, Flame, Plus, Sparkles, Utensils } from 'lucide-react'

function formatNumber(value, fallback = '0') {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(number)
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

  const macroCards = useMemo(() => [
    { label: 'Protein', Icon: Flame, color: '#9e4036', tint: 'rgba(255, 218, 213, 0.74)', data: macros.protein },
    { label: 'Carbs', Icon: Apple, color: '#0058be', tint: 'rgba(216, 226, 255, 0.78)', data: macros.carbs },
    { label: 'Fats', Icon: Droplets, color: '#f97316', tint: 'rgba(249, 115, 22, 0.12)', data: macros.fat },
    { label: 'Fiber', Icon: Activity, color: '#006e2f', tint: 'rgba(0, 110, 47, 0.1)', data: macros.fiber }
  ], [macros.carbs, macros.fat, macros.fiber, macros.protein])

  const scheduleCards = useMemo(() => {
    const getMeal = (mealType) => schedule.find((item) => item.mealType === mealType)
    return [
      {
        key: 'breakfast',
        title: 'Breakfast',
        time: '7:30 AM',
        meal: 'Avocado Toast',
        subtitle: `${formatNumber(getMeal('breakfast')?.calories || 420)} kcal`,
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=420&q=80',
        done: Number(getMeal('breakfast')?.loggedItems || 1) > 0
      },
      {
        key: 'lunch',
        title: 'Lunch',
        time: '12:30 PM',
        meal: 'Quinoa Power Bowl',
        subtitle: `${formatNumber(getMeal('lunch')?.calories || 680)} kcal`,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=420&q=80',
        done: Number(getMeal('lunch')?.loggedItems || 1) > 0
      },
      {
        key: 'snack',
        title: 'Snack',
        time: '3:00 PM',
        meal: 'Green Apple & Nuts',
        subtitle: 'Planned',
        image: null,
        done: Number(getMeal('afternoon_snack')?.loggedItems || 0) > 0
      },
      {
        key: 'dinner',
        title: 'Dinner',
        time: '7:00 PM',
        meal: 'Salmon & Asparagus',
        subtitle: 'Planned',
        image: null,
        done: Number(getMeal('dinner')?.loggedItems || 0) > 0
      }
    ]
  }, [schedule])

  return (
    <motion.main className="pro-dashboard-page mx-auto max-w-[1400px] space-y-section-gap px-5 py-7 pb-28 lg:px-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      <section className="grid grid-cols-12 gap-6">
        <DashboardGlassCard className="col-span-12 flex min-h-[468px] flex-col items-center justify-center rounded-[2rem] p-8 lg:col-span-5">
          <div className="mb-4 flex w-full items-start justify-between gap-4">
            <div>
              <h3 className="font-headline-md text-headline-md font-black text-on-surface">Daily Fuel</h3>
              <p className="mt-1 text-label-md text-on-surface-variant">Energy balance overview</p>
            </div>
            <div className="rounded-full bg-primary-container/20 px-3 py-1 text-label-sm font-bold text-on-primary-container">{formatNumber(calories.progress)}% Goal</div>
          </div>
          <DashboardCalorieRing progress={calories.progress} remaining={calories.remaining} />
          <div className="mt-4 grid w-full grid-cols-2 gap-4">
            <DashboardMetricTile label="Consumed" value={`${formatNumber(calories.consumed)} kcal`} />
            <DashboardMetricTile label="Target" value={`${formatNumber(calories.target)} kcal`} />
          </div>
        </DashboardGlassCard>

        <div className="col-span-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
          {macroCards.map((macro, index) => <DashboardMacroCard key={macro.label} {...macro} delay={index * 0.06} />)}
        </div>
      </section>

      <DashboardGlassCard className="rounded-[2rem] p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-headline-md text-headline-md font-black text-on-surface">Today's Schedule</h3>
            <p className="mt-1 text-label-md text-on-surface-variant">{scheduleCards.length} meals planned - {completedMeals} completed</p>
          </div>
          <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-label-md font-bold text-white shadow-lg shadow-primary/20" to="/app/log-food">
            <Plus size={18} /> Log New Meal
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {scheduleCards.map((item, index) => <DashboardScheduleCard key={item.key} item={item} delay={index * 0.05} />)}
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
              <p className="text-label-sm uppercase text-on-surface-variant">Current - BMI {formatNumber(weight.bmi || 23.8)}</p>
            </div>
          </div>
          <DashboardWeightTrend />
          <div className="mt-6 grid grid-cols-3 gap-4">
            <DashboardMetricTile label="Start" value="76.0 kg" />
            <DashboardMetricTile label="Current" value={`${formatNumber(weight.weightKg || 74.2)} kg`} />
            <DashboardMetricTile label="Goal" value="70.0 kg" />
          </div>
        </DashboardGlassCard>

        <motion.aside className="achievement-gradient col-span-12 flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[2rem] p-8 text-white shadow-xl shadow-orange-500/10 lg:col-span-4" whileHover={{ y: -4, rotateX: 2, rotateY: -2 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur"><Sparkles size={24} /></span>
            <span className="font-metrics-mono text-sm font-bold text-white/80">Daily Wisdom</span>
          </div>
          <div>
            <p className="font-headline-md text-3xl font-black leading-tight">Small choices compound into visible progress.</p>
            <p className="mt-4 text-sm leading-6 text-white/82">Keep your dinner balanced and hydration on track to protect today's calorie rhythm.</p>
          </div>
        </motion.aside>
      </section>
    </motion.main>
  )
}

function DashboardGlassCard({ children, className = '' }) {
  return (
    <motion.section className={`glass-card min-w-0 border border-outline-variant/30 bg-white/80 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl ${className}`} whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
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
        <motion.circle cx="128" cy="128" r="104" fill="none" stroke="#006e2f" strokeLinecap="round" strokeWidth="18" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: dashOffset }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} />
      </svg>
      <motion.div className="absolute inset-8 rounded-full bg-primary/5 shadow-[inset_0_0_28px_rgba(0,110,47,0.08)]" animate={{ scale: [1, 1.035, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
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
    <motion.article className="glass-card flex min-h-[220px] min-w-0 flex-col justify-between rounded-[1.5rem] border border-outline-variant/30 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.32 }} whileHover={{ y: -4, scale: 1.01 }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: tint, color }}><Icon size={21} strokeWidth={2.2} /></div>
        <span className="font-metrics-mono text-label-sm font-bold text-on-surface-variant">{formatNumber(consumed)}g / {formatNumber(target)}g</span>
      </div>
      <div className="mt-8">
        <h4 className="font-headline-md text-lg font-black text-on-surface">{label}</h4>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-surface-container">
          <motion.div className="h-full rounded-full" style={{ backgroundColor: color, transformOrigin: 'left center', width: `${pct}%` }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: delay + 0.12, duration: 0.85, ease: [0.22, 1, 0.36, 1] }} />
        </div>
      </div>
    </motion.article>
  )
}

function DashboardScheduleCard({ item, delay = 0 }) {
  return (
    <motion.article className={`w-72 shrink-0 rounded-2xl border p-4 ${item.done ? 'border-primary/10 bg-mint-surface/70' : 'border-dashed border-outline-variant/50 bg-white/70'}`} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.3 }} whileHover={{ y: -4 }}>
      {item.image ? <img className="h-32 w-full rounded-xl object-cover" src={item.image} alt={item.meal} /> : <div className="grid h-32 w-full place-items-center rounded-xl bg-surface-container"><Utensils className="text-on-surface-variant/40" size={34} /></div>}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-label-md text-label-sm uppercase tracking-[0.14em] text-primary">{item.title}</p>
          <h4 className="mt-1 font-headline-md text-lg font-black text-on-surface">{item.meal}</h4>
          <p className="mt-2 text-label-md text-on-surface-variant">{item.time} - {item.subtitle}</p>
        </div>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${item.done ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}>{item.done ? <Check size={17} /> : <Plus size={17} />}</span>
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
        {bars.map((height, index) => <motion.div className="flex-1 rounded-t-xl bg-primary/20" key={height} initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ delay: index * 0.05, duration: 0.6 }} />)}
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 208" preserveAspectRatio="none" aria-hidden="true">
        <motion.path d={`M 42 ${points[0]} C 120 ${points[1]}, 160 ${points[2]}, 220 ${points[3]} S 350 ${points[4]}, 450 ${points[5]} S 610 ${points[6]}, 678 38`} fill="none" stroke="#006e2f" strokeLinecap="round" strokeWidth="8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} />
      </svg>
      <div className="absolute bottom-5 left-5 right-5 flex justify-between font-metrics-mono text-xs font-bold text-on-surface-variant/70">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => <span key={day}>{day}</span>)}
      </div>
    </div>
  )
}

export default memo(ProDashboardPage)
