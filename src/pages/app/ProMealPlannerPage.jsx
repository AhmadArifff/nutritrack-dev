import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Apple, CalendarDays, Check, ChevronRight, Clock, Flame, Plus, ShoppingBasket, Sparkles, Utensils } from 'lucide-react'
import { apiRequest } from '../../api'
import { useBackendData } from '../../hooks/useBackendData'

const weekPlan = [
  {
    day: 'Monday',
    date: 'Oct 23',
    calories: 2120,
    active: false,
    meals: [
      ['Breakfast', 'Avocado Toast with Poached Egg', '420 kcal - 18g Protein'],
      ['Lunch', 'Quinoa & Roasted Veggie Bowl', '580 kcal - 22g Protein'],
      ['Dinner', 'Salmon Rice Bowl', '760 kcal - 44g Protein']
    ]
  },
  { day: 'Tuesday', date: 'Oct 24', calories: 0, active: true, meals: [] },
  {
    day: 'Wednesday',
    date: 'Oct 25',
    calories: 2240,
    active: false,
    meals: [
      ['Breakfast', 'Greek Yogurt Parfait', '390 kcal - 28g Protein'],
      ['Lunch', 'Turkey & Swiss Wrap', '610 kcal - 36g Protein'],
      ['Dinner', 'Beef Stir-fry with Ginger', '720 kcal - 42g Protein']
    ]
  },
  {
    day: 'Thursday',
    date: 'Oct 26',
    calories: 1980,
    active: false,
    meals: [
      ['Breakfast', 'Berry Oatmeal Bowl', '360 kcal - 14g Protein'],
      ['Lunch', 'Chicken Pesto Pasta', '690 kcal - 38g Protein']
    ]
  },
  {
    day: 'Friday',
    date: 'Oct 27',
    calories: 2180,
    active: false,
    meals: [
      ['Breakfast', 'Protein Smoothie', '340 kcal - 31g Protein'],
      ['Dinner', 'Tofu Curry with Rice', '780 kcal - 34g Protein']
    ]
  },
  { day: 'Saturday', date: 'Oct 28', calories: 0, active: false, meals: [] },
  {
    day: 'Sunday',
    date: 'Oct 29',
    calories: 2050,
    active: false,
    meals: [
      ['Brunch', 'Veggie Omelette Plate', '540 kcal - 32g Protein'],
      ['Dinner', 'Grilled Chicken Salad', '650 kcal - 46g Protein']
    ]
  }
]

const shoppingItems = [
  ['Proteins', [
    { name: 'Chicken breast', amount: '900 g', meals: '3 dinners' },
    { name: 'Greek yogurt', amount: '6 cups', meals: '4 breakfasts' },
    { name: 'Tofu', amount: '450 g', meals: '2 lunches' },
    { name: 'Eggs', amount: '12 pcs', meals: 'toast + omelette' }
  ]],
  ['Produce', [
    { name: 'Avocado', amount: '4 pcs', meals: 'breakfast toast' },
    { name: 'Spinach', amount: '300 g', meals: 'omelette + salad' },
    { name: 'Berries', amount: '500 g', meals: 'parfait bowls' },
    { name: 'Bell pepper', amount: '5 pcs', meals: 'stir-fry prep' }
  ]],
  ['Pantry', [
    { name: 'Brown rice', amount: '1.2 kg', meals: 'rice bowls' },
    { name: 'Oats', amount: '650 g', meals: 'weekday breakfast' },
    { name: 'Pesto', amount: '220 g', meals: 'pasta lunch' },
    { name: 'Peanut sauce', amount: '180 g', meals: 'tofu curry' }
  ]]
]

const insightItems = [
  ['Protein gap', 'Add 25g protein on Tuesday dinner to protect the weekly average.', Flame, 'text-tertiary bg-tertiary-container/20'],
  ['Prep block', 'Batch cook rice and roasted vegetables for 3 lunch slots.', Clock, 'text-secondary bg-secondary-fixed'],
  ['Smart swap', 'Use tofu curry instead of beef stir-fry if Friday calories run high.', Sparkles, 'text-achievement-purple bg-achievement-purple/10']
]

const calendarWeekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function formatNumber(value, fallback = '0') {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(number)
}

function addDaysIso(offset) {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return date.toISOString().slice(0, 10)
}

function formatMealDate(dateValue) {
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return 'Today'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function mealLabel(mealType = '') {
  return {
    breakfast: 'Breakfast',
    morning_snack: 'Morning Snack',
    lunch: 'Lunch',
    afternoon_snack: 'Afternoon Snack',
    dinner: 'Dinner',
    late_snack: 'Late Snack'
  }[mealType] || mealType
}

function mapMealPlans(rows) {
  if (!rows.length) return weekPlan
  const days = Array.from({ length: 7 }, (_, index) => {
    const iso = addDaysIso(index)
    const date = new Date(`${iso}T00:00:00`)
    return {
      iso,
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: formatMealDate(iso),
      calories: 0,
      active: index === 0,
      meals: []
    }
  })

  rows.forEach((plan) => {
    const iso = String(plan.plan_date || plan.planDate || '').slice(0, 10)
    const day = days.find((item) => item.iso === iso)
    if (!day) return
    const calories = Number(plan.target_calories || plan.targetCalories || 0)
    const protein = Number(plan.target_protein_g || plan.targetProteinG || 0)
    day.calories += calories
    day.meals.push([
      mealLabel(plan.meal_type || plan.mealType),
      plan.food_name || plan.foodName,
      `${formatNumber(calories)} kcal${protein ? ` - ${formatNumber(protein)}g Protein` : ''}`
    ])
  })

  return days
}

function mapShoppingList(rows) {
  if (!rows.length) return shoppingItems
  const grouped = rows.reduce((acc, row) => {
    const group = row.category || 'Pantry'
    if (!acc[group]) acc[group] = []
    acc[group].push({
      name: row.foodName || row.food_name,
      amount: `${formatNumber(row.totalAmount || row.total_amount)} ${row.unit || 'porsi'}`,
      meals: `${row.mealCount || row.meal_count || 1} meal slots`
    })
    return acc
  }, {})
  return Object.entries(grouped)
}

function ProMealPlannerPage() {
  const [selectedDay, setSelectedDay] = useState('Tuesday')
  const [rangeStart, setRangeStart] = useState(0)
  const [rangeEnd, setRangeEnd] = useState(6)
  const [rangePickMode, setRangePickMode] = useState('start')
  const [boardView, setBoardView] = useState('week')
  const from = addDaysIso(0)
  const to = addDaysIso(6)
  const { data: plannerPlan } = useBackendData(
    () => apiRequest(`/api/meal-plans?from=${from}&to=${to}`).then(mapMealPlans),
    weekPlan,
    [from, to]
  )
  const { data: shoppingData } = useBackendData(
    () => apiRequest(`/api/meal-plans/shopping-list?from=${from}&to=${to}`).then(mapShoppingList),
    shoppingItems,
    [from, to]
  )
  const selected = useMemo(() => plannerPlan.find((day) => day.day === selectedDay) || plannerPlan[0] || weekPlan[1], [plannerPlan, selectedDay])
  const plannedDays = plannerPlan.filter((day) => day.calories > 0).length
  const weeklyCalories = plannerPlan.reduce((total, day) => total + day.calories, 0)
  const monthPlan = useMemo(() => Array.from({ length: 28 }, (_, index) => {
    const source = plannerPlan[index % plannerPlan.length] || weekPlan[index % weekPlan.length]
    const date = new Date()
    date.setDate(date.getDate() + index)
    return {
      ...source,
      day: `${source.day} ${Math.floor(index / 7) + 1}`,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      active: index === 1
    }
  }), [plannerPlan])
  const plannerOptions = boardView === 'month' ? monthPlan : plannerPlan
  const visiblePlan = useMemo(() => {
    const start = Math.min(rangeStart, rangeEnd)
    const end = Math.max(rangeStart, rangeEnd)
    return plannerOptions.slice(start, end + 1)
  }, [plannerOptions, rangeEnd, rangeStart])

  function setPlannerPreset(id) {
    setBoardView(id)
    setRangeStart(0)
    setRangeEnd(id === 'month' ? monthPlan.length - 1 : 6)
    setRangePickMode('start')
  }

  function chooseRange(index) {
    if (rangePickMode === 'start') {
      setRangeStart(index)
      if (index > rangeEnd) setRangeEnd(index)
      setRangePickMode('end')
    } else {
      setRangeEnd(index)
      if (index < rangeStart) setRangeStart(index)
      setRangePickMode('start')
    }
  }

  return (
    <AppPageShell wide>
      <div className="min-w-0 space-y-8 pb-28">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <motion.div className="overflow-hidden rounded-[2rem] border border-outline-variant/40 bg-white/85 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
            <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_240px] lg:items-end">
              <div>
                <p className="mb-2 text-label-md font-bold text-primary">Weekly Summary</p>
                <h2 className="font-headline-lg text-[34px] font-black leading-tight text-on-surface md:text-[42px]">Meal Architecture</h2>
                <p className="mt-3 max-w-3xl leading-7 text-on-surface-variant">Precision nutrition tailored for your vitality. Manage your week&apos;s macros and energy levels with AI-assisted planning.</p>
              </div>
              <div className="rounded-[1.5rem] bg-mint-surface p-5">
                <div className="flex items-center gap-3 text-primary">
                  <Sparkles size={22} />
                  <b>AI-assisted plan</b>
                </div>
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">Tuesday is empty. Generate a balanced plan or add meals manually.</p>
              </div>
            </div>
            <div className="grid gap-4 border-t border-outline-variant/25 bg-surface-container-low/70 p-5 sm:grid-cols-3">
              <MetricCard value="2,450" label="Target kcal" tone="text-energy-orange" />
              <MetricCard value="185g" label="Protein goal" tone="text-primary" />
              <MetricCard value={`${plannedDays}/7`} label="Days planned" tone="text-secondary" />
            </div>
          </motion.div>

          <motion.div className="rounded-[2rem] border border-outline-variant/35 bg-white/85 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08, duration: 0.34 }} whileHover={{ y: -3 }}>
            <p className="text-label-md font-bold text-primary">Weekly Energy</p>
            <p className="mt-3 font-metrics-mono text-4xl font-black text-on-surface">{formatNumber(weeklyCalories)}</p>
            <p className="mt-2 text-on-surface-variant">planned kcal across the week</p>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-surface-container">
              <motion.div className="h-full rounded-full bg-primary" initial={{ scaleX: 0 }} animate={{ scaleX: weeklyCalories / 17150 }} style={{ transformOrigin: 'left center' }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} />
            </div>
          </motion.div>
        </section>

        <section className="min-w-0 max-w-full overflow-hidden rounded-[2rem] border border-outline-variant/35 bg-white/85 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 border-b border-outline-variant/25 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-headline-md text-2xl font-black text-on-surface">7-Day Planning Board</h3>
              <p className="mt-1 text-on-surface-variant">Pilih rentang seperti booking travel, lalu board menampilkan 7 hari atau mode bulan.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex rounded-2xl bg-surface-container-low p-1">
                {[
                  ['week', '7 Hari'],
                  ['month', 'Bulan']
                ].map(([id, label]) => (
                  <button className={`h-9 rounded-xl px-4 text-sm font-black transition ${boardView === id ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} key={id} onClick={() => setPlannerPreset(id)} type="button">
                    {label}
                  </button>
                ))}
              </div>
              <Link className="inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-5 font-black text-white shadow-[0_14px_30px_rgba(0,110,47,0.18)] transition hover:-translate-y-0.5 active:scale-[0.98]" to="/app/log-food">
                <Plus size={18} />
                Add Meals
              </Link>
            </div>
          </div>

          <DateRangePlanner options={plannerOptions} rangeEnd={rangeEnd} rangePickMode={rangePickMode} rangeStart={rangeStart} onPick={chooseRange} />

          <div className="max-w-full overflow-hidden">
            <div className="custom-scrollbar flex w-full max-w-full snap-x gap-5 overflow-x-auto overscroll-x-contain p-5">
            {visiblePlan.map((day, index) => (
              <DayColumn day={day} index={index} key={day.day} selected={selectedDay === day.day} onSelect={() => setSelectedDay(day.day)} />
            ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="grid gap-6 lg:grid-cols-2">
            <ShoppingList shoppingItems={shoppingData} />
            <InsightsPanel />
          </div>
          <SelectedDayCard day={selected} />
        </section>

        <motion.section className="relative overflow-hidden rounded-[3rem] border border-primary/15 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.28),transparent_28%),linear-gradient(135deg,#006e2f_0%,#0aa44f_42%,#ff8a2a_125%)] p-8 text-white shadow-2xl shadow-primary/25 md:p-10" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.34 }} whileHover={{ y: -4 }}>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-16 left-1/3 h-52 w-52 rounded-full bg-energy-orange/25 blur-3xl" />
          <div className="relative z-10 grid gap-7 lg:grid-cols-[1fr_320px] lg:items-center">
            <div>
              <p className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-white/70">Pantry Inventory Sync</p>
              <h3 className="font-headline-md text-3xl font-black drop-shadow-sm">Smart shopping stays aligned with your pantry.</h3>
              <p className="mt-3 max-w-3xl leading-7 text-white/90">Use planned meals to group grocery items, avoid duplicate ingredients, and keep weekend prep calm.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['12', 'Grocery items'],
                  ['4 pcs', 'Avocado needed'],
                  ['900 g', 'Chicken breast']
                ].map(([value, label]) => (
                  <div className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-md" key={label}>
                    <strong className="block font-metrics-mono text-2xl font-black">{value}</strong>
                    <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-white/75">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/25 bg-white/15 p-4 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-lg">
                  <Sparkles size={22} />
                </span>
                <div>
                  <p className="font-black">Ready to sync</p>
                  <p className="text-sm text-white/75">Pantry stock will update from this meal range.</p>
                </div>
              </div>
              <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 font-black text-primary shadow-xl transition hover:scale-105 hover:bg-mint-surface active:scale-[0.98]" type="button">
                <span>Sync Pantry</span>
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-mint-surface text-primary">
                  <ShoppingBasket size={18} />
                </span>
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </AppPageShell>
  )
}

function DayColumn({ day, index, selected, onSelect }) {
  const isEmpty = day.meals.length === 0
  return (
    <motion.article className={`w-[280px] shrink-0 snap-start overflow-hidden rounded-[1.75rem] border bg-white shadow-sm transition-all ${selected ? 'border-primary/40 ring-2 ring-primary/15' : 'border-outline-variant/35'}`} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index, 8) * 0.035, duration: 0.32 }} whileHover={{ y: -4 }}>
      <button className={`flex w-full items-center justify-between gap-4 border-b px-5 py-5 text-left ${day.active || selected ? 'bg-mint-surface' : 'bg-surface-container-low'}`} onClick={onSelect} type="button">
        <div>
          <p className="font-label-md text-label-md font-black uppercase tracking-[0.18em] text-primary">{day.day}</p>
          <h4 className="mt-1 text-lg font-black text-on-surface">{day.date}</h4>
        </div>
        <span className={`rounded-full px-3 py-1.5 font-metrics-mono text-xs font-black ${isEmpty ? 'bg-surface-container-high text-on-surface-variant' : 'bg-primary text-white'}`}>
          {formatNumber(day.calories)} kcal
        </span>
      </button>

      <div className="grid min-h-[370px] gap-4 p-5">
        {isEmpty ? (
          <div className="grid place-items-center rounded-[1.5rem] border border-dashed border-outline-variant/50 bg-surface-container-lowest/70 p-8 text-center">
            <div>
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-surface-container text-on-surface-variant">
                <Utensils size={32} />
              </div>
              <p className="mt-5 font-bold text-on-surface-variant">Plan is currently empty</p>
              <button className="mt-5 rounded-2xl bg-primary-container/30 px-6 py-3 font-black text-on-primary-container transition hover:bg-primary hover:text-white active:scale-[0.98]" type="button">
                Add Meals
              </button>
            </div>
          </div>
        ) : (
          day.meals.map(([type, title, meta]) => (
            <div className="group rounded-2xl border border-outline-variant/35 bg-white p-4 transition hover:border-primary/25 hover:shadow-lg" key={title}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-on-surface-variant">{type}</p>
                  <h5 className="mt-3 font-headline-md text-base font-black text-on-surface">{title}</h5>
                  <p className="mt-2 text-sm text-on-surface-variant">{meta}</p>
                </div>
                <Check className="h-5 w-5 shrink-0 text-primary opacity-0 transition group-hover:opacity-100" />
              </div>
            </div>
          ))
        )}
      </div>
    </motion.article>
  )
}

function DateRangePlanner({ options, rangeStart, rangeEnd, rangePickMode, onPick }) {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const start = Math.min(rangeStart, rangeEnd)
  const end = Math.max(rangeStart, rangeEnd)
  const dateLabel = (date) => {
    const [month, day] = String(date || '').split(' ')
    return `${day || ''} ${month || ''} 2023`.trim()
  }
  return (
    <div className="border-b border-outline-variant/20 bg-gradient-to-r from-mint-surface via-white to-secondary-fixed/35 px-5 py-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-primary">
            <CalendarDays size={18} />
            Date range filter
          </div>
          <p className="mt-1 text-sm font-bold text-on-surface-variant">Klik field tanggal, lalu pilih tanggal pertama sebagai parameter mulai dan tanggal kedua sebagai parameter selesai.</p>
        </div>
        <div className="relative">
          <button className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-left text-sm font-bold text-white shadow-lg shadow-slate-950/10 outline-none transition hover:border-energy-orange/70 hover:bg-slate-800 active:scale-[0.99]" onClick={() => setCalendarOpen((value) => !value)} type="button">
            <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Tanggal Meal Plan</span>
            <span className="mt-1 block">{dateLabel(options[start]?.date)} - {dateLabel(options[end]?.date)}</span>
          </button>

          {calendarOpen ? (
            <motion.div className="absolute right-0 top-[calc(100%+10px)] z-30 w-full overflow-hidden rounded-[1.5rem] border border-outline-variant/25 bg-white p-4 shadow-2xl shadow-slate-900/15 lg:w-[520px]" initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.18 }}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-on-surface">Pilih rentang tanggal</p>
                  <p className="text-xs font-bold text-on-surface-variant">{rangePickMode === 'start' ? 'Pilih tanggal mulai' : 'Pilih tanggal selesai'}</p>
                </div>
                <span className="rounded-full bg-mint-surface px-3 py-1 text-xs font-black text-primary">{options.length} hari</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {calendarWeekdays.map((weekday) => (
                  <div className="py-1 text-center text-[10px] font-black uppercase tracking-[0.12em] text-on-surface-variant" key={weekday}>{weekday}</div>
                ))}
                {options.map((day, index) => {
                  const inRange = index >= start && index <= end
                  const isStart = index === rangeStart
                  const isEnd = index === rangeEnd
                  const isEdge = isStart || isEnd
                  const dateNumber = day.date.replace(/^[A-Za-z]+\s/, '')
                  return (
                    <button className={`relative min-h-14 rounded-xl border px-2 py-2 text-center transition hover:-translate-y-0.5 active:scale-95 ${isEdge ? 'border-primary bg-primary text-white shadow-md shadow-primary/20' : inRange ? 'border-primary/20 bg-mint-surface text-primary' : 'border-outline-variant/35 bg-white text-on-surface-variant hover:border-primary/25'}`} key={`${day.day}-${day.date}`} onClick={() => onPick(index)} type="button">
                      <span className="block font-metrics-mono text-base font-black">{dateNumber}</span>
                      <span className="mt-1 block text-[9px] font-black uppercase tracking-wide">{day.day.slice(0, 3)}</span>
                      {isEdge ? <span className="mt-1 inline-block rounded-full bg-white/20 px-1.5 py-0.5 text-[9px] font-black">{isStart ? 'Start' : 'End'}</span> : null}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
      <p className="mt-3 text-xs font-bold text-on-surface-variant">Mode pilih: <span className="text-primary">{rangePickMode === 'start' ? 'parameter 1 tanggal mulai' : 'parameter 2 tanggal selesai'}</span></p>
    </div>
  )
}

function MetricCard({ value, label, tone }) {
  return (
    <div className="rounded-2xl bg-white/80 px-4 py-4 text-center shadow-sm">
      <p className={`font-metrics-mono text-2xl font-black ${tone}`}>{value}</p>
      <p className="mt-1 text-xs font-black uppercase tracking-wide text-on-surface-variant">{label}</p>
    </div>
  )
}

function ShoppingList({ shoppingItems }) {
  const totalItems = shoppingItems.reduce((total, [, items]) => total + items.length, 0)
  return (
    <motion.section className="rounded-[2rem] border border-outline-variant/40 bg-white/85 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.34 }} whileHover={{ y: -4 }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-label-md font-bold text-primary">Smart Shopping List</p>
          <h3 className="mt-1 font-headline-md text-2xl font-black text-on-surface">Grocery needs for meal plan</h3>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">{totalItems} bahan dihitung dari jadwal makan mingguan, lengkap dengan qty dan takaran.</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint-surface text-primary">
          <ShoppingBasket size={24} />
        </div>
      </div>
      <div className="grid gap-4">
        {shoppingItems.map(([group, items]) => (
          <div className="rounded-2xl bg-surface-container-low p-4" key={group}>
            <p className="mb-3 font-black text-on-surface">{group}</p>
            <div className="grid gap-2">
              {items.map((item) => (
                <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 shadow-sm" key={item.name}>
                  <span className="min-w-0">
                    <strong className="block truncate text-sm text-on-surface">{item.name}</strong>
                    <small className="block truncate text-xs text-on-surface-variant">{item.meals}</small>
                  </span>
                  <span className="shrink-0 rounded-full bg-mint-surface px-3 py-1 text-xs font-black text-primary">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

function InsightsPanel() {
  return (
    <motion.section className="rounded-[2rem] border border-outline-variant/40 bg-white/85 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.34 }} whileHover={{ y: -4 }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-label-md font-bold text-primary">AI Insights</p>
          <h3 className="mt-1 font-headline-md text-2xl font-black text-on-surface">Planning nudges</h3>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-achievement-purple/10 text-achievement-purple">
          <Sparkles size={24} />
        </div>
      </div>
      <div className="grid gap-3">
        {insightItems.map(([title, body, Icon, tone]) => (
          <div className="flex gap-4 rounded-2xl bg-surface-container-low p-4" key={title}>
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tone}`}>
              <Icon size={20} />
            </span>
            <div>
              <p className="font-black text-on-surface">{title}</p>
              <p className="mt-1 text-sm leading-6 text-on-surface-variant">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

function SelectedDayCard({ day }) {
  return (
    <motion.aside className="rounded-[2rem] border border-outline-variant/40 bg-white/85 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18, duration: 0.34 }} whileHover={{ y: -4 }}>
      <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-mint-surface text-primary">
        <Apple size={26} />
      </div>
      <p className="text-label-md font-bold text-primary">Selected day</p>
      <h3 className="mt-1 font-headline-md text-2xl font-black text-on-surface">{day.day}</h3>
      <p className="mt-2 text-on-surface-variant">{day.date} - {formatNumber(day.calories)} kcal planned</p>
      <div className="mt-6 grid gap-3">
        {(day.meals.length ? day.meals : [['Open slot', 'Add breakfast, lunch, and dinner', '0 kcal']]).map(([type, title, meta]) => (
          <div className="rounded-2xl bg-surface-container-low p-4" key={title}>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-primary">{type}</p>
            <p className="mt-2 font-black text-on-surface">{title}</p>
            <p className="mt-1 text-sm text-on-surface-variant">{meta}</p>
          </div>
        ))}
      </div>
    </motion.aside>
  )
}

function AppPageShell({ children, wide = false }) {
  return (
    <motion.main className={`mx-auto grid ${wide ? 'max-w-[1400px]' : 'max-w-[1280px]'} gap-7 px-5 py-7 pb-24 lg:px-8`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.main>
  )
}

export default memo(ProMealPlannerPage)
