import { memo, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Flame, Plus, Scale, Trophy } from 'lucide-react'
import { apiRequest } from '../../api'

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function formatNumber(value, fallback = '0') {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(number)
}

function useBackendData(fetcher, fallback, deps = []) {
  const [data, setData] = useState(fallback)

  useEffect(() => {
    let active = true
    fetcher()
      .then((result) => {
        if (active) setData(result)
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, deps)

  return { data, setData }
}

function ProProgressPage() {
  const { data: weights, setData: setWeights } = useBackendData(() => apiRequest('/api/progress/weight?limit=30'), [], [])
  const latest = weights[weights.length - 1] || { weight_kg: 78.5, bmi: 23.8, bmi_category: 'Healthy' }
  const [weight, setWeight] = useState(latest.weight_kg || 78.5)
  const [saving, setSaving] = useState(false)
  const currentWeight = Number(latest.weight_kg || latest.weightKg || 78.5)
  const currentBmi = Number(latest.bmi || 23.8)
  const bmiCategory = latest.bmi_category || latest.bmiCategory || 'Healthy'

  const historyLogs = useMemo(() => {
    if (weights.length) {
      return weights.slice(-5).reverse().map((entry, index, arr) => {
        const entryWeight = Number(entry.weight_kg || entry.weightKg || currentWeight)
        const previous = Number(arr[index + 1]?.weight_kg || arr[index + 1]?.weightKg || entryWeight)
        const rawDate = entry.log_date || entry.logDate || entry.created_at || entry.createdAt || new Date().toISOString()
        return {
          id: entry.id || `${rawDate}-${entryWeight}`,
          date: new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          session: 'Morning Entry',
          time: '7:15 AM',
          weight: entryWeight,
          delta: Number((entryWeight - previous).toFixed(1)),
          photoUrl: entry.photo_url || entry.photoUrl || null
        }
      })
    }

    return [
      {
        id: 'sep-28',
        date: 'Sep 28, 2023',
        session: 'Morning Entry',
        time: '7:15 AM',
        weight: 78.5,
        delta: -0.2,
        photoUrl: '/assets/remote/remote-003-9bc2d6a1af.jpg'
      },
      { id: 'sep-27', date: 'Sep 27, 2023', session: 'Morning Entry', time: '7:30 AM', weight: 78.7, delta: 0.1, photoUrl: null },
      {
        id: 'sep-26',
        date: 'Sep 26, 2023',
        session: 'Morning Entry',
        time: '7:20 AM',
        weight: 78.6,
        delta: -0.4,
        photoUrl: '/assets/remote/remote-004-7059e33400.jpg'
      }
    ]
  }, [currentWeight, weights])

  useEffect(() => {
    if (latest.weight_kg) setWeight(latest.weight_kg)
  }, [latest.weight_kg])

  async function saveWeight(event) {
    event?.preventDefault?.()
    setSaving(true)
    try {
      await apiRequest('/api/progress/weight', {
        method: 'POST',
        body: { weightKg: Number(weight), logDate: todayIso() }
      })
      setWeights(await apiRequest('/api/progress/weight?limit=30'))
    } catch {
      setWeights((current) => [
        ...current,
        { id: `local-${Date.now()}`, weight_kg: Number(weight), bmi: currentBmi, bmi_category: bmiCategory, log_date: todayIso() }
      ])
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.main className="mx-auto grid max-w-[1320px] gap-7 px-5 py-7 pb-24 lg:px-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      <section className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
        <ProgressTrendCard currentWeight={currentWeight} />
        <div className="grid gap-7">
          <ProgressLogWeightCard saving={saving} saveWeight={saveWeight} setWeight={setWeight} weight={weight} />
          <ProgressBmiCard bmi={currentBmi} category={bmiCategory} />
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <ProgressInsightCard Icon={Flame} borderColor="#f97316" label="Target Date" value="Oct 12, 2023" description="Based on your current pace" />
        <ProgressInsightCard Icon={Trophy} borderColor="#a855f7" label="Next Milestone" value="-1.5 kg to go" description="75kg Goal Milestone" />
        <ProgressInsightCard Icon={CalendarDays} borderColor="#0058be" label="Consistency" value="12 Day Streak" description="Daily logging hero" />
      </section>

      <ProgressHistoryCard logs={historyLogs} />

      <button className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl shadow-primary/25 transition-transform active:scale-[0.98] xl:hidden" onClick={saveWeight} type="button" aria-label="Add weight progress">
        <Plus size={26} />
      </button>
    </motion.main>
  )
}

function ProgressGlassCard({ children, className = '', style }) {
  return (
    <motion.section className={`rounded-[2rem] border border-outline-variant/35 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl ${className}`} style={style} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
      {children}
    </motion.section>
  )
}

function ProgressTrendCard({ currentWeight }) {
  return (
    <ProgressGlassCard className="overflow-hidden p-6 md:p-7">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Weight Journey</p>
          <h2 className="mt-2 font-headline-md text-3xl font-black text-on-surface">Progress Trends</h2>
          <p className="mt-2 text-on-surface-variant">You've lost 2.4kg in the last 30 days. Stay consistent!</p>
        </div>
        <div className="flex w-max gap-2 rounded-2xl bg-surface-container-low p-1.5">
          {['1M', '3M', '6M', '1Y'].map((range, index) => (
            <button className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${index === 0 ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} key={range} type="button">
              {range}
            </button>
          ))}
        </div>
      </div>
      <div className="relative flex h-[360px] w-full items-end overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-surface-container-lowest to-mint-surface px-4 pb-4">
        <svg className="h-full w-full text-primary drop-shadow-lg" viewBox="0 0 400 100" preserveAspectRatio="none" role="img" aria-label="Weight trend line chart">
          <defs>
            <linearGradient id="progressChartGradientV2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path d="M0,80 C50,75 100,85 150,60 C200,35 250,45 300,30 C350,15 400,20 450,10 L450,100 L0,100 Z" fill="url(#progressChartGradientV2)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
          <motion.path d="M0,80 C50,75 100,85 150,60 C200,35 250,45 300,30 C350,15 400,20 450,10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} />
          <circle cx="150" cy="60" fill="white" r="4.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="300" cy="30" fill="white" r="4.5" stroke="currentColor" strokeWidth="2" />
        </svg>
        <div className="absolute right-6 top-6 flex flex-col items-end rounded-2xl bg-white/75 px-4 py-3 shadow-sm backdrop-blur-xl">
          <span className="font-metrics-mono text-lg font-black text-primary">{formatNumber(currentWeight)} kg</span>
          <span className="text-sm text-on-surface-variant">Current</span>
        </div>
      </div>
    </ProgressGlassCard>
  )
}

function ProgressLogWeightCard({ weight, setWeight, saveWeight, saving }) {
  return (
    <ProgressGlassCard className="bg-gradient-to-br from-white to-mint-surface p-6">
      <h3 className="mb-4 font-headline-md text-2xl font-black text-on-surface">Log Weight</h3>
      <form className="grid gap-4" onSubmit={saveWeight}>
        <label className="block">
          <span className="mb-2 ml-1 block text-sm font-bold text-on-surface-variant">Current Weight (kg)</span>
          <input className="h-13 w-full rounded-2xl border border-outline-variant/35 bg-white px-4 py-3 font-metrics-mono text-lg font-black text-on-surface outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" onChange={(event) => setWeight(event.target.value)} placeholder="00.0" step="0.1" type="number" value={weight} />
        </label>
        <button className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl font-black text-on-primary shadow-lg transition-all active:scale-[0.98] ${saving ? 'bg-secondary shadow-secondary/20' : 'bg-primary shadow-primary/20 hover:brightness-110'}`} disabled={saving} type="submit">
          {saving ? 'Saving...' : 'Record Progress'}
        </button>
      </form>
    </ProgressGlassCard>
  )
}

function ProgressBmiCard({ bmi, category }) {
  return (
    <ProgressGlassCard className="relative flex min-h-[170px] items-center justify-between overflow-hidden p-6">
      <div className="relative z-10">
        <h3 className="mb-2 text-sm font-black uppercase tracking-wider text-on-surface-variant">Current BMI</h3>
        <div className="flex items-baseline gap-2">
          <span className="font-headline-lg text-4xl font-black text-secondary">{formatNumber(bmi)}</span>
          <span className="font-bold text-on-surface-variant">{category}</span>
        </div>
      </div>
      <div className="relative h-32 w-32">
        <motion.div className="absolute inset-2 rounded-full border-[14px] border-secondary/15" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="absolute inset-8 rounded-full bg-mint-surface" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />
        <Scale className="absolute inset-0 m-auto text-secondary/70" size={34} />
      </div>
    </ProgressGlassCard>
  )
}

function ProgressInsightCard({ Icon, borderColor, label, value, description }) {
  return (
    <ProgressGlassCard className="border-l-4 p-6" style={{ borderLeftColor: borderColor }}>
      <div className="mb-3 flex items-center gap-3">
        <Icon style={{ color: borderColor }} size={23} />
        <span className="font-bold text-on-surface-variant">{label}</span>
      </div>
      <p className="font-headline-md text-2xl font-black text-on-surface">{value}</p>
      <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
    </ProgressGlassCard>
  )
}

function ProgressHistoryCard({ logs }) {
  return (
    <ProgressGlassCard className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-outline-variant/20 p-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">History</p>
          <h3 className="mt-1 font-headline-md text-2xl font-black text-on-surface">History & Logs</h3>
        </div>
        <button className="flex items-center gap-2 font-bold text-primary hover:underline" type="button">
          View All <ArrowRight size={16} />
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
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-high font-bold text-primary">
          <CalendarDays size={22} />
        </div>
        <div>
          <p className="font-black text-on-surface">{log.date}</p>
          <p className="text-sm text-on-surface-variant">{log.session} - {log.time}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-8 sm:justify-end">
        <div className="text-right">
          <p className="font-metrics-mono text-lg font-black text-on-surface">{formatNumber(log.weight)} kg</p>
          <p className={`text-sm font-bold ${delta < 0 ? 'text-error-red' : 'text-primary'}`}>{delta > 0 ? '+' : ''}{formatNumber(delta)} kg</p>
        </div>
        {log.photoUrl ? (
          <button className="h-14 w-14 overflow-hidden rounded-xl border border-outline-variant/30 transition-transform group-hover:scale-110" type="button">
            <img className="h-full w-full object-cover" src={log.photoUrl} alt={`Progress photo from ${log.date}`} />
          </button>
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-dashed border-outline-variant/50 bg-surface-container text-on-surface-variant">
            <Scale size={16} />
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(ProProgressPage)
