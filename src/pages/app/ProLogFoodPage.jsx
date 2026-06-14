import { memo, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Apple, Check, Flame, Plus, Utensils, Droplets, X } from 'lucide-react'
import { apiRequest } from '../../api'
import { getTodayOrdinalLabel } from '../../utils/dateLabels'

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function cleanTime(value, fallback = '07:30') {
  return String(value || fallback).slice(0, 5)
}

function formatNumber(value, fallback = '0') {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(number)
}

function mealLabel(mealType = '') {
  const labels = {
    breakfast: 'Breakfast',
    morning_snack: 'Morning Snack',
    lunch: 'Lunch',
    afternoon_snack: 'Snack',
    dinner: 'Dinner'
  }
  return labels[mealType] || mealType.replaceAll('_', ' ')
}

function useBackendData(fetcher, fallback, deps = []) {
  const [data, setData] = useState(fallback)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetcher()
      .then((result) => {
        if (active) {
          setData(result)
          setError('')
        }
      })
      .catch(() => {
        if (active) setError('')
      })

    return () => {
      active = false
    }
  }, deps)

  return { data, setData, error }
}

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

const fallbackRecentItems = [
  { id: 'recent-coffee', food_name: 'Black Coffee', meal_type: 'breakfast', serving_unit: '1 cup', calories: 2 },
  { id: 'recent-omelette', food_name: 'Omelette with Spinach', meal_type: 'breakfast', serving_unit: '2 eggs', calories: 240 },
  { id: 'recent-apple', food_name: 'Fuji Apple', meal_type: 'afternoon_snack', serving_unit: '1 medium', calories: 95 }
]

const mealStyles = [
  { title: 'Breakfast', color: '#006e2f', border: 'border-l-primary', Icon: Activity, target: 630 },
  { title: 'Lunch', color: '#0058be', border: 'border-l-secondary', Icon: Utensils, target: 680 },
  { title: 'Dinner', color: '#a855f7', border: 'border-l-achievement-purple', Icon: Droplets, target: 650 },
  { title: 'Snacks', color: '#f97316', border: 'border-l-energy-orange', Icon: Apple, target: 350 }
]

function ProLogFoodPage() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const requestedPlanDate = params.get('planDate') || todayIso()
  const { data: logs, error: logsError } = useBackendData(() => apiRequest(`/api/food-logs?date=${requestedPlanDate}`), [], [requestedPlanDate])
  const { data: planRows, setData: setPlanRows } = useBackendData(() => apiRequest(`/api/meal-plans?from=${requestedPlanDate}&to=${requestedPlanDate}`), [], [requestedPlanDate])
  const [reminders, setReminders] = useState([])
  const [planToast, setPlanToast] = useState('')
  const mealOrder = ['breakfast', 'lunch', 'dinner', 'afternoon_snack']
  const hasLogs = logs.length > 0
  const sortedPlanRows = useMemo(() => [...planRows].sort((a, b) => cleanTime(a.planned_time || a.plannedTime || '99:99').localeCompare(cleanTime(b.planned_time || b.plannedTime || '99:99'))), [planRows])

  const groupedLogs = useMemo(() => mealOrder.map((mealType) => {
    const backendItems = logs.filter((log) => (log.meal_type || log.mealType) === mealType)
    const items = backendItems.length ? backendItems : hasLogs ? [] : htmlMealFallback[mealType]
    return {
      mealType,
      kcal: items.reduce((total, item) => total + Number(item.calories || 0), 0),
      items
    }
  }), [hasLogs, logs])

  const groupedPlannerMeals = useMemo(() => mealOrder.map((mealType) => {
    const items = sortedPlanRows.filter((plan) => (plan.meal_type || plan.mealType) === mealType)
    return {
      mealType,
      kcal: items.reduce((total, item) => total + Number(item.target_calories || item.targetCalories || item.calories || 0), 0),
      consumedKcal: items.filter((item) => item.is_completed || item.isCompleted).reduce((total, item) => total + Number(item.target_calories || item.targetCalories || item.calories || 0), 0),
      items
    }
  }), [sortedPlanRows])
  const historyItems = sortedPlanRows.length ? sortedPlanRows : fallbackRecentItems
  const recentItems = historyItems.slice(0, 3)
  const completedPlanRows = useMemo(() => sortedPlanRows.filter((plan) => plan.is_completed || plan.isCompleted), [sortedPlanRows])
  const consumed = sortedPlanRows.length ? completedPlanRows.reduce((total, item) => total + Number(item.target_calories || item.targetCalories || item.calories || 0), 0) : hasLogs ? groupedLogs.reduce((total, meal) => total + meal.kcal, 0) : 1450
  const dailyGoal = 2100
  const remaining = Math.max(dailyGoal - consumed, 0)
  const todayLabel = getTodayOrdinalLabel()
  const consumedMacros = useMemo(() => completedPlanRows.reduce((total, item) => ({
    calories: total.calories + Number(item.target_calories || item.targetCalories || 0),
    protein: total.protein + Number(item.target_protein_g || item.targetProteinG || 0),
    carbs: total.carbs + Number(item.target_carbs_g || item.targetCarbsG || 0),
    fat: total.fat + Number(item.target_fat_g || item.targetFatG || 0)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 }), [completedPlanRows])

  async function toggleMealConsumed(plan) {
    const nextCompleted = !(plan.is_completed || plan.isCompleted)
    setPlanRows((current) => current.map((item) => item.id === plan.id ? { ...item, is_completed: nextCompleted, isCompleted: nextCompleted } : item))
    try {
      await apiRequest(`/api/meal-plans/${plan.id}/complete`, {
        method: 'PATCH',
        body: { completed: nextCompleted }
      })
      setPlanRows(await apiRequest(`/api/meal-plans?from=${requestedPlanDate}&to=${requestedPlanDate}`))
      setPlanToast(nextCompleted ? `${plan.food_name || plan.foodName} ditandai sudah dimakan.` : `${plan.food_name || plan.foodName} dikembalikan ke rencana makan.`)
    } catch (error) {
      setPlanRows(await apiRequest(`/api/meal-plans?from=${requestedPlanDate}&to=${requestedPlanDate}`))
      setPlanToast(error.message || 'Gagal mengubah status makan.')
    }
  }

  useEffect(() => {
    let active = true
    async function loadReminders() {
      try {
        const data = await apiRequest(`/api/meal-plans/reminders?date=${requestedPlanDate}`)
        if (active) setReminders(data.items || [])
      } catch {
        if (active) setReminders([])
      }
    }
    loadReminders()
    const interval = window.setInterval(loadReminders, 60_000)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [requestedPlanDate])

  return (
    <motion.main
      className="mx-auto max-w-[1280px] px-5 py-7 pb-28 lg:px-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_386px] lg:items-center">
        <div>
          <h1 className="font-headline-lg text-[34px] font-black leading-tight text-on-surface md:text-[42px]">Daily Food Log</h1>
          <p className="mt-2 font-body-md text-on-surface-variant">{todayLabel}</p>
          {logsError && <p className="mt-3 rounded-xl bg-error-red/10 px-4 py-2 text-sm font-bold text-error-red">{logsError}</p>}
        </div>
        <LogFoodSummaryCard consumed={consumed} dailyGoal={dailyGoal} remaining={remaining} />
      </section>

      <LogFoodReminderStack reminders={reminders} />
      <ConsumedMacroCards macros={consumedMacros} plannedCount={sortedPlanRows.length} completedCount={completedPlanRows.length} toast={planToast} />

      <section className="mt-8 grid grid-cols-1 gap-7 xl:grid-cols-12">
        <div className="grid content-start gap-7 xl:col-span-4">
          <LogFoodRecentCard allItems={historyItems} items={recentItems} />
        </div>

        <div className="grid gap-7 xl:col-span-8">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {groupedPlannerMeals.map((meal, index) => (
              <LogFoodMealCard key={meal.mealType} meal={meal} index={index} onToggle={toggleMealConsumed} />
            ))}
          </div>
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
    <motion.div className="grid w-full grid-cols-3 gap-2 rounded-[2rem] border border-outline-variant/30 bg-surface-container-high px-4 py-5 shadow-sm sm:gap-4 sm:px-7" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08, duration: 0.34 }}>
      {items.map(([label, value, color], index) => (
        <div className="flex min-w-0 items-center justify-center gap-4" key={label}>
          {index > 0 && <div className="hidden h-10 w-px bg-outline-variant/50 sm:block" />}
          <div className="min-w-0 text-center">
            <span className={`block font-metrics-mono text-xl font-black ${color}`}>{formatNumber(value)}</span>
            <span className="text-[11px] uppercase tracking-wide text-on-surface-variant">{label}</span>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

function LogFoodReminderStack({ reminders }) {
  if (!reminders.length) return null
  return (
    <div className="mt-6 grid gap-3">
      {reminders.map((reminder) => (
        <motion.div className={`rounded-2xl border px-5 py-4 shadow-sm ${reminder.urgency === 'before' ? 'border-energy-orange/25 bg-energy-orange/10 text-energy-orange' : 'border-error-red/25 bg-error-red/10 text-error-red'}`} key={reminder.mealPlanId} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-black uppercase tracking-[0.18em]">{reminder.urgency === 'before' ? '3-minute reminder' : 'Meal time reminder'}</p>
          <h3 className="mt-1 font-headline-md text-lg font-black">{reminder.title}</h3>
          <p className="mt-1 text-sm font-bold opacity-80">{reminder.message}</p>
        </motion.div>
      ))}
    </div>
  )
}

function ConsumedMacroCards({ macros, plannedCount, completedCount, toast }) {
  const cards = [
    ['Kalori', macros.calories, 'kcal', 'text-primary', 'bg-primary/10'],
    ['Protein', macros.protein, 'g', 'text-[#9e4036]', 'bg-[#9e4036]/10'],
    ['Carbs', macros.carbs, 'g', 'text-secondary', 'bg-secondary/10'],
    ['Fat', macros.fat, 'g', 'text-energy-orange', 'bg-energy-orange/10']
  ]

  return (
    <motion.section className="mt-8 rounded-[2rem] border border-outline-variant/35 bg-white/85 p-5 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl md:p-6" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.34 }}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Consumed from Meal Planner</p>
          <h2 className="mt-1 font-headline-md text-2xl font-black text-on-surface">Makan yang sudah dimakan hari ini</h2>
          <p className="mt-1 text-sm font-bold text-on-surface-variant">{completedCount} dari {plannedCount} menu meal planner sudah dicentang di Log Food.</p>
        </div>
        {toast ? <span className="rounded-2xl bg-mint-surface px-4 py-3 text-sm font-bold text-primary">{toast}</span> : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value, unit, tone, tint]) => (
          <div className="rounded-[1.5rem] border border-outline-variant/25 bg-surface-container-low p-5" key={label}>
            <span className={`inline-flex rounded-2xl px-3 py-2 text-xs font-black uppercase tracking-wide ${tone} ${tint}`}>{label}</span>
            <p className={`mt-4 font-metrics-mono text-3xl font-black ${tone}`}>{formatNumber(value)} <span className="text-sm text-on-surface-variant">{unit}</span></p>
            <p className="mt-2 text-sm font-bold text-on-surface-variant">Terhitung dari item yang sudah dicentang.</p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

function LogFoodRecentCard({ allItems, items }) {
  const [historyOpen, setHistoryOpen] = useState(false)
  return (
    <motion.section className="rounded-[1.75rem] border border-outline-variant/45 bg-white/85 p-5 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.06)] backdrop-blur-xl" whileHover={{ y: -3 }}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Recent History</h3>
        <button className="text-label-sm font-bold text-primary hover:underline" onClick={() => setHistoryOpen(true)} type="button">View All</button>
      </div>
      <div className="custom-scrollbar grid max-h-[420px] gap-3 overflow-y-auto pr-1">
        {items.map((item, index) => (
          <LogFoodRecentItem item={item} index={index} key={item.id || item.food_name || item.name || index} />
        ))}
      </div>
      {historyOpen && <MealHistoryModal items={allItems} onClose={() => setHistoryOpen(false)} />}
    </motion.section>
  )
}

function LogFoodRecentItem({ item, index }) {
  const tones = [
    { bg: 'bg-mint-surface/60', border: 'border-primary/10', iconBg: 'bg-primary-container/20', iconText: 'text-primary', Icon: Activity },
    { bg: 'bg-surface-container-low', border: 'border-outline-variant/20', iconBg: 'bg-secondary/10', iconText: 'text-secondary', Icon: Flame },
    { bg: 'bg-surface-container-low', border: 'border-outline-variant/20', iconBg: 'bg-energy-orange/10', iconText: 'text-energy-orange', Icon: Apple }
  ]
  const tone = tones[index % tones.length]
  const name = item.food_name || item.foodName || item.name || 'Food item'
  const meal = mealLabel(item.meal_type || item.mealType || item.category || 'afternoon_snack')
  const serving = item.serving_unit || item.servingUnit || item.serving || item.meal_type || '1 serving'
  const Icon = tone.Icon

  return (
    <motion.article className={`flex min-h-[72px] items-center gap-3 rounded-2xl border p-3 transition-all hover:shadow-sm ${tone.bg} ${tone.border}`} whileHover={{ x: 2 }}>
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone.iconBg} ${tone.iconText}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-label-md font-bold text-on-surface">{name}</p>
        <p className="text-label-sm text-on-surface-variant">{meal} - {serving}</p>
      </div>
      <div className="text-right">
        <p className="font-metrics-mono font-bold text-on-surface">{formatNumber(item.target_calories || item.targetCalories || item.calories || 0)} <span className="text-[10px] uppercase">kcal</span></p>
      </div>
    </motion.article>
  )
}

function MealHistoryModal({ items, onClose }) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <motion.section className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-outline-variant/30 bg-white p-5 shadow-2xl md:p-7" initial={{ opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Recent History</p>
            <h2 className="mt-2 font-headline-md text-2xl font-black text-on-surface">Semua makanan meal planner hari ini</h2>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-surface-container text-on-surface-variant transition hover:bg-error-red/10 hover:text-error-red" onClick={onClose} type="button" aria-label="Close history">
            <X size={20} />
          </button>
        </div>
        <div className="grid gap-3">
          {items.length ? items.map((item, index) => (
            <LogFoodRecentItem item={item} index={index} key={item.id || item.food_name || item.name || index} />
          )) : (
            <div className="rounded-2xl bg-surface-container-low p-5 text-center font-bold text-on-surface-variant">Belum ada makanan di meal planner tanggal ini.</div>
          )}
        </div>
      </motion.section>
    </div>
  )
}

function LogFoodMealCard({ meal, index, onToggle }) {
  const style = mealStyles[index]
  const Icon = style.Icon
  const hasItems = meal.items.length > 0
  const pct = style.target ? Math.min(100, Math.round((meal.consumedKcal / style.target) * 100)) : 0

  return (
    <motion.article className={`flex min-h-[230px] flex-col rounded-[2rem] border-l-4 bg-white/85 p-5 shadow-sm ring-1 ring-outline-variant/25 backdrop-blur-xl transition-all hover:shadow-md ${style.border}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.32 }} whileHover={{ y: -4 }}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icon style={{ color: style.color }} size={22} />
          <h4 className="font-headline-md text-lg font-black text-on-surface">{style.title}</h4>
        </div>
        <div className="text-right">
          {hasItems ? (
            <>
              <p className="font-metrics-mono text-lg font-bold text-on-surface">{formatNumber(meal.consumedKcal)} <span className="text-xs font-normal uppercase text-on-surface-variant">kcal</span></p>
              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">consumed / {formatNumber(meal.kcal)} planned</p>
              <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-surface-container">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: style.color, width: `${pct}%`, transformOrigin: 'left center' }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.65 }} />
              </div>
            </>
          ) : (
            <p className="font-metrics-mono text-lg font-bold italic text-on-surface-variant">Waiting... <span className="text-xs font-normal uppercase">kcal</span></p>
          )}
        </div>
      </div>

      {hasItems ? (
        <div className="mb-5 grid flex-grow gap-2">
          {meal.items.slice(0, 5).map((item, itemIndex) => (
            <button className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-left text-sm transition ${item.is_completed || item.isCompleted ? 'border-primary/20 bg-mint-surface text-primary' : 'border-outline-variant/25 bg-surface-container-low text-on-surface-variant hover:border-primary/25'}`} key={item.id || item.food_name || item.name || itemIndex} onClick={() => onToggle?.(item)} type="button">
              <span className="min-w-0">
                <span className="block truncate font-bold">{item.food_name || item.foodName || item.name}</span>
                <small className="block text-xs opacity-80">{cleanTime(item.planned_time || item.plannedTime || '00:00')} - {item.is_completed || item.isCompleted ? 'Sudah dimakan' : 'Akan dimakan'}</small>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="font-metrics-mono">{formatNumber(item.target_calories || item.targetCalories || item.calories || 0)}</span>
                <span className={`grid h-7 w-7 place-items-center rounded-full ${item.is_completed || item.isCompleted ? 'bg-primary text-white' : 'bg-white text-on-surface-variant'}`}>
                  {item.is_completed || item.isCompleted ? <Check size={15} /> : <Plus size={15} />}
                </span>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-grow flex-col items-center justify-center opacity-60">
          <Utensils className="mb-2 text-outline-variant" size={38} />
          <p className="text-label-sm text-on-surface-variant">No items logged yet</p>
        </div>
      )}

      <p className="mt-auto rounded-xl bg-surface-container-low px-4 py-3 text-center text-sm font-bold text-on-surface-variant">Checklist dari Meal Planner hari ini</p>
    </motion.article>
  )
}

export default memo(ProLogFoodPage)
