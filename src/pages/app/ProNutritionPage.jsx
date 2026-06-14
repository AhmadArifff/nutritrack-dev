import { memo, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Apple, BarChart3, Droplets, Flame, Leaf, Plus, Sparkles, Utensils } from 'lucide-react'

function formatNumber(value, fallback = '0') {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(number)
}

const nutritionMacros = [
  { label: 'Protein', consumed: 120, target: 180, unit: 'g', color: '#9e4036', tint: 'rgba(255, 218, 213, 0.72)', Icon: Flame },
  { label: 'Carbs', consumed: 210, target: 300, unit: 'g', color: '#0058be', tint: 'rgba(216, 226, 255, 0.9)', Icon: Apple },
  { label: 'Fats', consumed: 45, target: 75, unit: 'g', color: '#f97316', tint: 'rgba(249, 115, 22, 0.12)', Icon: Droplets },
  { label: 'Fiber', consumed: 22, target: 35, unit: 'g', color: '#006e2f', tint: 'rgba(0, 110, 47, 0.1)', Icon: Leaf }
]

const nutrientRows = [
  ['Vitamin C', 88, 'Citrus, berries, bell peppers', '#006e2f'],
  ['Iron', 64, 'Spinach, tofu, lean beef', '#9e4036'],
  ['Calcium', 72, 'Greek yogurt and fortified milk', '#0058be'],
  ['Magnesium', 54, 'Nuts, oats, dark greens', '#a855f7']
]

const qualityItems = [
  ['Whole food score', '82%', 'Your meals lean clean with strong produce coverage.', Leaf, 'text-primary bg-mint-surface'],
  ['Protein timing', '3/4', 'Add a protein anchor to your afternoon snack.', Utensils, 'text-tertiary bg-tertiary-fixed/60'],
  ['Hydration rhythm', '6 cups', 'Two cups left before dinner for a smoother finish.', Droplets, 'text-secondary bg-secondary-fixed']
]

function ProNutritionPage() {
  const [waterCups, setWaterCups] = useState(6)
  const dailyCalories = { consumed: 1450, target: 2100 }
  const calorieProgress = Math.min(100, Math.round((dailyCalories.consumed / dailyCalories.target) * 100))
  const averageMacroProgress = useMemo(() => {
    const total = nutritionMacros.reduce((sum, item) => sum + Math.min(100, (item.consumed / item.target) * 100), 0)
    return Math.round(total / nutritionMacros.length)
  }, [])

  return (
    <motion.main className="mx-auto grid max-w-[1360px] gap-7 px-5 py-7 pb-24 lg:px-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      <section className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_390px]">
        <motion.div className="overflow-hidden rounded-[2rem] border border-outline-variant/35 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.34 }} whileHover={{ y: -3 }}>
          <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1fr)_260px] md:p-8">
            <div className="min-w-0">
              <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary">Nutrition Intelligence</span>
              <h2 className="mt-5 max-w-2xl font-headline-lg text-4xl font-black leading-tight text-on-surface md:text-5xl">Balance macros, micronutrients, and hydration in one clean view.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-on-surface-variant">The dashboard-style nutrition panel keeps the original NutriTrack data visible while giving every element enough room to breathe.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  ['Consumed', dailyCalories.consumed, 'kcal', 'text-primary'],
                  ['Daily goal', dailyCalories.target, 'kcal', 'text-energy-orange'],
                  ['Macro score', averageMacroProgress, '%', 'text-secondary']
                ].map(([label, value, unit, tone]) => (
                  <div className="rounded-2xl bg-surface-container-low p-4" key={label}>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-on-surface-variant">{label}</p>
                    <p className={`mt-2 font-headline-md text-2xl font-black ${tone}`}>{formatNumber(value)} <span className="text-sm text-on-surface-variant">{unit}</span></p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid place-items-center">
              <motion.div className="relative grid h-56 w-56 place-items-center rounded-full bg-surface-container-lowest shadow-inner" animate={{ rotate: [0, 2, -2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="absolute inset-4 rounded-full" style={{ background: `conic-gradient(#006e2f 0 ${calorieProgress}%, #e5eeff ${calorieProgress}% 100%)` }} />
                <div className="relative grid h-40 w-40 place-items-center rounded-full bg-white text-center shadow-xl">
                  <div>
                    <p className="font-headline-md text-4xl font-black text-primary">{calorieProgress}%</p>
                    <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-on-surface-variant">Fuel target</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <HydrationPanel waterCups={waterCups} onAdd={() => setWaterCups((value) => Math.min(8, value + 1))} />
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {nutritionMacros.map((macro, index) => (
          <NutritionMacroCard item={macro} index={index} key={macro.label} />
        ))}
      </section>

      <section className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_390px]">
        <motion.div className="rounded-[2rem] border border-outline-variant/35 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-7" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.34 }}>
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Micronutrient Map</p>
              <h3 className="mt-2 font-headline-md text-3xl font-black text-on-surface">Vitamin & mineral coverage</h3>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary-fixed text-secondary">
              <BarChart3 size={24} />
            </div>
          </div>
          <div className="grid gap-4">
            {nutrientRows.map(([label, value, source, color]) => (
              <div className="rounded-2xl bg-surface-container-low p-4" key={label}>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-black text-on-surface">{label}</p>
                    <p className="mt-1 text-sm text-on-surface-variant">{source}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-on-surface shadow-sm">{value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white">
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: color }} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ delay: 0.25, duration: 0.75, ease: 'easeOut' }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.aside className="rounded-[2rem] border border-outline-variant/35 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22, duration: 0.34 }}>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Food Quality</p>
          <h3 className="mt-2 font-headline-md text-3xl font-black text-on-surface">Daily coaching</h3>
          <div className="mt-6 grid gap-4">
            {qualityItems.map(([title, value, body, Icon, tone]) => (
              <motion.div className="rounded-2xl bg-surface-container-low p-4" key={title} whileHover={{ x: 4 }}>
                <div className="flex gap-4">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tone}`}>
                    <Icon size={22} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black text-on-surface">{title}</p>
                      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-primary">{value}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-on-surface-variant">{body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </section>
    </motion.main>
  )
}

function HydrationPanel({ waterCups, onAdd }) {
  return (
    <motion.aside className="rounded-[2rem] border border-outline-variant/35 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12, duration: 0.34 }} whileHover={{ y: -3 }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-secondary">Hydration</p>
          <h3 className="mt-2 font-headline-md text-3xl font-black text-on-surface">{waterCups}/8 cups</h3>
        </div>
        <motion.button className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-white shadow-lg shadow-secondary/20 transition hover:scale-105 disabled:opacity-50" disabled={waterCups >= 8} onClick={onAdd} type="button" whileTap={{ scale: 0.92 }} aria-label="Add water cup">
          <Plus size={22} />
        </motion.button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div className={`h-16 rounded-2xl border ${index < waterCups ? 'border-secondary bg-secondary-fixed text-secondary' : 'border-outline-variant/35 bg-surface-container-low text-on-surface-variant'}`} key={index} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}>
            <div className="grid h-full place-items-center">
              <Droplets size={22} fill={index < waterCups ? 'currentColor' : 'none'} />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-mint-surface p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 text-primary" size={20} />
          <p className="text-sm leading-6 text-on-surface-variant">Your hydration pace is strongest before lunch. Keep the last two cups away from bedtime for better sleep quality.</p>
        </div>
      </div>
    </motion.aside>
  )
}

function NutritionMacroCard({ item, index }) {
  const progress = Math.min(100, Math.round((item.consumed / item.target) * 100))
  const Icon = item.Icon
  return (
    <motion.article className="rounded-[2rem] border border-outline-variant/35 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * index, duration: 0.34 }} whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}>
      <div className="mb-14 flex items-start justify-between gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ backgroundColor: item.tint, color: item.color }}>
          <Icon size={23} />
        </span>
        <p className="text-sm font-black text-on-surface-variant">{formatNumber(item.consumed)} / {formatNumber(item.target)}{item.unit}</p>
      </div>
      <h3 className="font-headline-md text-2xl font-black text-on-surface">{item.label}</h3>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-surface-container">
        <motion.div className="h-full rounded-full" style={{ backgroundColor: item.color }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ delay: 0.18 + index * 0.05, duration: 0.8, ease: 'easeOut' }} />
      </div>
      <p className="mt-3 text-sm font-bold text-on-surface-variant">{progress}% of daily target</p>
    </motion.article>
  )
}

export default memo(ProNutritionPage)
