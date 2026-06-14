import { memo, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Apple, CalendarDays, ChevronLeft, ChevronRight, Clock, Edit3, Flame, Plus, ShoppingBasket, Sparkles, Utensils } from 'lucide-react'
import { apiRequest } from '../../api'
import MealPlanBuilderModal from '../../components/app/MealPlanBuilderModal'
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

const calendarWeekdaysId = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
const defaultMealTimes = {
  breakfast: '07:30',
  morning_snack: '10:00',
  lunch: '12:30',
  afternoon_snack: '15:30',
  dinner: '19:00',
  late_snack: '21:00'
}
const plannerPastDays = 30
const plannerFutureDays = 90
const plannerTodayIndex = plannerPastDays

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

function formatPlannerDateRange(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`)
  if (Number.isNaN(date.getTime())) return 'Tanggal'
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

function cleanTime(value) {
  return String(value || '').slice(0, 5)
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
  const days = Array.from({ length: plannerPastDays + plannerFutureDays + 1 }, (_, index) => {
    const iso = addDaysIso(index - plannerPastDays)
    const date = new Date(`${iso}T00:00:00`)
    return {
      iso,
      day: date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: formatMealDate(iso),
      calories: 0,
      active: index === plannerTodayIndex,
      meals: []
    }
  })

  rows.forEach((plan) => {
    const iso = String(plan.plan_date || plan.planDate || '').slice(0, 10)
    const day = days.find((item) => item.iso === iso)
    if (!day) return
    const calories = Number(plan.target_calories || plan.targetCalories || 0)
    const protein = Number(plan.target_protein_g || plan.targetProteinG || 0)
    const mealType = plan.meal_type || plan.mealType
    day.calories += calories
    day.meals.push({
      id: plan.id,
      mealType,
      type: mealLabel(mealType),
      time: cleanTime(plan.planned_time || plan.plannedTime || defaultMealTimes[mealType]),
      title: plan.food_name || plan.foodName,
      meta: `${formatNumber(calories)} kcal${protein ? ` - ${formatNumber(protein)}g Protein` : ''}`,
      calories,
      protein,
      carbs: Number(plan.target_carbs_g || plan.targetCarbsG || 0),
      fat: Number(plan.target_fat_g || plan.targetFatG || 0)
    })
  })

  days.forEach((day) => {
    day.meals.sort((a, b) => cleanTime(a.time || '99:99').localeCompare(cleanTime(b.time || '99:99')))
  })

  return days
}

function mapShoppingList(rows) {
  if (!rows.length) return shoppingItems
  if (rows[0]?.items) {
    return rows.map((group) => [
      group.group || group.category || 'Pantry',
      (group.items || []).map((item) => ({
        name: item.name || item.foodName || item.food_name,
        amount: item.amount || `${formatNumber(item.totalAmount || item.total_amount)} ${item.unit || 'porsi'}`,
        meals: item.meals || `${item.mealCount || item.meal_count || 1} meal slots`
      }))
    ])
  }
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

function mealToView(meal, index = 0) {
  if (Array.isArray(meal)) {
    return {
      id: `${meal[0]}-${meal[1]}`,
      mealType: index === 0 ? 'breakfast' : index === 1 ? 'lunch' : 'dinner',
      type: meal[0],
      time: index === 0 ? '07:30' : index === 1 ? '12:30' : '19:00',
      title: meal[1],
      meta: meal[2],
      calories: Number(String(meal[2]).match(/\d+/)?.[0] || 0),
      protein: 0,
      carbs: 0,
      fat: 0
    }
  }
  return meal
}

function summarizeMeals(days) {
  return days.reduce((total, day) => {
    day.meals.forEach((rawMeal, index) => {
      const meal = mealToView(rawMeal, index)
      total.calories += Number(meal.calories || 0)
      total.protein += Number(meal.protein || 0)
      total.carbs += Number(meal.carbs || 0)
      total.fat += Number(meal.fat || 0)
    })
    return total
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 })
}

function ProMealPlannerPage() {
  const [selectedIso, setSelectedIso] = useState(addDaysIso(0))
  const [rangeStart, setRangeStart] = useState(plannerTodayIndex)
  const [rangeEnd, setRangeEnd] = useState(plannerTodayIndex + 6)
  const [rangePickMode, setRangePickMode] = useState('start')
  const [builderState, setBuilderState] = useState({ open: false, planDate: addDaysIso(0), mealType: 'breakfast', planId: '' })
  const [refreshToken, setRefreshToken] = useState(0)
  const from = addDaysIso(-plannerPastDays)
  const to = addDaysIso(plannerFutureDays)
  const { data: plannerPlan } = useBackendData(
    () => apiRequest(`/api/meal-plans?from=${from}&to=${to}`).then(mapMealPlans),
    mapMealPlans([]),
    [from, to, refreshToken]
  )
  const plannerOptions = plannerPlan
  const visiblePlan = useMemo(() => {
    const start = Math.min(rangeStart, rangeEnd)
    const end = Math.max(rangeStart, rangeEnd)
    return plannerOptions.slice(start, end + 1)
  }, [plannerOptions, rangeEnd, rangeStart])
  const selectedFrom = visiblePlan[0]?.iso || addDaysIso(0)
  const selectedTo = visiblePlan[visiblePlan.length - 1]?.iso || selectedFrom
  const { data: shoppingData } = useBackendData(
    () => apiRequest(`/api/meal-plans/shopping-list?from=${selectedFrom}&to=${selectedTo}`).then(mapShoppingList),
    shoppingItems,
    [selectedFrom, selectedTo]
  )
  const selected = useMemo(() => plannerPlan.find((day) => day.iso === selectedIso) || visiblePlan[0] || plannerPlan[plannerTodayIndex], [plannerPlan, selectedIso, visiblePlan])
  const plannedDays = visiblePlan.filter((day) => day.calories > 0).length
  const weeklyCalories = visiblePlan.reduce((total, day) => total + day.calories, 0)
  const rangeMacros = useMemo(() => summarizeMeals(visiblePlan), [visiblePlan])

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

  function openBuilder(planDate, mealType = 'breakfast', planId = '') {
    setBuilderState({ open: true, planDate, mealType, planId })
  }

  function closeBuilder() {
    setBuilderState((current) => ({ ...current, open: false }))
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
                <p className="mt-3 text-sm leading-6 text-on-surface-variant">Pilih range tanggal, lalu tambah atau edit menu harian dari Log Food.</p>
              </div>
            </div>
            <div className="grid gap-4 border-t border-outline-variant/25 bg-surface-container-low/70 p-5 sm:grid-cols-3">
              <MetricCard value="2,450" label="Target kcal" tone="text-energy-orange" />
              <MetricCard value="185g" label="Protein goal" tone="text-primary" />
              <MetricCard value={`${plannedDays}/${visiblePlan.length}`} label="Days planned" tone="text-secondary" />
            </div>
          </motion.div>

          <motion.div className="rounded-[2rem] border border-outline-variant/35 bg-white/85 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08, duration: 0.34 }} whileHover={{ y: -3 }}>
            <p className="text-label-md font-bold text-primary">Range Energy</p>
            <p className="mt-3 font-metrics-mono text-4xl font-black text-on-surface">{formatNumber(weeklyCalories)}</p>
            <p className="mt-2 text-on-surface-variant">planned kcal across selected range</p>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-surface-container">
              <motion.div className="h-full rounded-full bg-primary" initial={{ scaleX: 0 }} animate={{ scaleX: Math.min(1, weeklyCalories / Math.max(1, visiblePlan.length * 2450)) }} style={{ transformOrigin: 'left center' }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} />
            </div>
          </motion.div>
        </section>

        <MacroDistributionCard totals={rangeMacros} label={`${formatPlannerDateRange(selectedFrom)} - ${formatPlannerDateRange(selectedTo)}`} />

        <section className="min-w-0 max-w-full overflow-hidden rounded-[2rem] border border-outline-variant/35 bg-white/85 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 border-b border-outline-variant/25 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-headline-md text-2xl font-black text-on-surface">Planning Board</h3>
              <p className="mt-1 text-on-surface-variant">Board mengikuti range tanggal yang dipilih. Tanggal lampau hanya aktif jika punya data meal plan.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex h-11 items-center gap-2 rounded-2xl bg-primary px-5 font-black text-white shadow-[0_14px_30px_rgba(0,110,47,0.18)] transition hover:-translate-y-0.5 active:scale-[0.98]" type="button" onClick={() => openBuilder(selected.iso || addDaysIso(0), 'breakfast')}>
                <Plus size={18} />
                Add Meals
              </button>
            </div>
          </div>

          <DateRangePlanner options={plannerOptions} rangeEnd={rangeEnd} rangePickMode={rangePickMode} rangeStart={rangeStart} onPick={chooseRange} />

          <div className="max-w-full overflow-hidden">
            <div className="custom-scrollbar flex w-full max-w-full snap-x gap-5 overflow-x-auto overscroll-x-contain p-5">
            {visiblePlan.map((day, index) => (
              <DayColumn day={day} index={index} key={day.iso} selected={selectedIso === day.iso} onSelect={() => setSelectedIso(day.iso)} onEdit={openBuilder} />
            ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="grid gap-6 lg:grid-cols-2">
            <ShoppingList shoppingItems={shoppingData} />
            <InsightsPanel />
          </div>
          <SelectedDayCard day={selected} onEdit={openBuilder} />
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
      <MealPlanBuilderModal
        open={builderState.open}
        planDate={builderState.planDate}
        mealType={builderState.mealType}
        planId={builderState.planId}
        onClose={closeBuilder}
        onSaved={() => setRefreshToken((value) => value + 1)}
      />
    </AppPageShell>
  )
}

function DayColumn({ day, index, selected, onSelect, onEdit }) {
  const isEmpty = day.meals.length === 0
  const planDate = day.iso || addDaysIso(index)
  const [expanded, setExpanded] = useState(false)
  const mealsToShow = expanded ? day.meals : day.meals.slice(0, 5)
  const hiddenMeals = Math.max(0, day.meals.length - mealsToShow.length)
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
              <button className="mt-5 inline-flex rounded-2xl bg-primary-container/30 px-6 py-3 font-black text-on-primary-container transition hover:bg-primary hover:text-white active:scale-[0.98]" onClick={() => onEdit(planDate, 'breakfast')} type="button">
                Add Meals
              </button>
            </div>
          </div>
        ) : (
          <>
          {mealsToShow.map((rawMeal, mealIndex) => {
            const meal = mealToView(rawMeal, mealIndex)
            return (
            <div className="group rounded-2xl border border-outline-variant/35 bg-white p-4 transition hover:border-primary/25 hover:shadow-lg" key={meal.id || meal.title}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-on-surface-variant">{meal.time} - {meal.type}</p>
                  <h5 className="mt-3 font-headline-md text-base font-black text-on-surface">{meal.title}</h5>
                  <p className="mt-2 text-sm text-on-surface-variant">{meal.meta}</p>
                  <p className="mt-2 text-xs font-bold text-primary">P {formatNumber(meal.protein)}g - C {formatNumber(meal.carbs)}g - F {formatNumber(meal.fat)}g</p>
                </div>
                <button className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-container text-on-surface-variant opacity-0 transition group-hover:opacity-100 hover:bg-primary hover:text-white" onClick={() => onEdit(planDate, meal.mealType, meal.id || '')} type="button" aria-label={`Edit ${meal.title}`}>
                  <Edit3 size={16} />
                </button>
              </div>
            </div>
            )
          })}
          {day.meals.length > 5 ? (
            <button className="rounded-2xl border border-dashed border-primary/30 bg-mint-surface/70 px-4 py-3 text-sm font-black text-primary transition hover:bg-primary hover:text-white" onClick={() => setExpanded((value) => !value)} type="button">
              {expanded ? 'Hide extra meals' : `Show ${hiddenMeals} more meals`}
            </button>
          ) : null}
          </>
        )}
      </div>
    </motion.article>
  )
}

function DateRangePlanner({ options, rangeStart, rangeEnd, rangePickMode, onPick }) {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [monthOffset, setMonthOffset] = useState(0)
  const start = Math.min(rangeStart, rangeEnd)
  const end = Math.max(rangeStart, rangeEnd)
  const startIso = options[start]?.iso || addDaysIso(start)
  const endIso = options[end]?.iso || addDaysIso(end)
  const monthDate = new Date(`${addDaysIso(0)}T00:00:00`)
  monthDate.setMonth(monthDate.getMonth() + monthOffset)
  const monthTitle = monthDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
  const leadingBlanks = (monthStart.getDay() + 6) % 7
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate()
  const cells = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, day) => new Date(monthDate.getFullYear(), monthDate.getMonth(), day + 1))
  ]
  const optionIndexByIso = options.reduce((acc, day, index) => {
    const iso = day.iso || addDaysIso(index)
    acc[iso] = index
    return acc
  }, {})
  const today = addDaysIso(0)

  function toIso(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
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
          <button className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-left text-sm font-bold text-white shadow-lg shadow-slate-950/10 outline-none transition hover:border-orange-500/70 hover:bg-slate-800 active:scale-[0.99]" onClick={() => setCalendarOpen((value) => !value)} type="button" data-tour="meal-planner-date-filter">
            <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">Tanggal Meal Plan</span>
            <span className="mt-1 block">{formatPlannerDateRange(startIso)} - {formatPlannerDateRange(endIso)}</span>
          </button>

          {calendarOpen ? (
            <motion.div className="absolute left-0 top-full z-40 mt-2 w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 p-4 shadow-2xl shadow-black/40" initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.18 }}>
              <div className="flex items-center justify-between gap-3">
                <button className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-white transition hover:bg-slate-700" onClick={() => setMonthOffset((value) => value - 1)} type="button" aria-label="Bulan sebelumnya">
                  <ChevronLeft size={18} />
                </button>
                <strong className="text-sm capitalize text-white">{monthTitle}</strong>
                <button className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-white transition hover:bg-slate-700" onClick={() => setMonthOffset((value) => value + 1)} type="button" aria-label="Bulan berikutnya">
                  <ChevronRight size={18} />
                </button>
              </div>
              <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase text-slate-500">
                {calendarWeekdaysId.map((weekday) => (
                  <span key={weekday}>{weekday}</span>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1">
                {cells.map((date, cellIndex) => {
                  if (!date) return <span key={`blank-${cellIndex}`} />
                  const iso = toIso(date)
                  const optionIndex = optionIndexByIso[iso]
                  const dayData = optionIndex !== undefined ? options[optionIndex] : null
                  const enabled = optionIndex !== undefined && (iso >= today || (dayData?.meals?.length || 0) > 0)
                  const inRange = enabled && optionIndex >= start && optionIndex <= end
                  const isStart = enabled && optionIndex === rangeStart
                  const isEnd = enabled && optionIndex === rangeEnd
                  const isEdge = isStart || isEnd
                  const className = enabled
                    ? isEdge
                      ? 'bg-orange-500 text-white'
                      : inRange
                        ? 'bg-orange-500/15 text-orange-200'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'cursor-not-allowed bg-slate-950/60 text-slate-700'
                  return (
                    <button className={`h-10 rounded-xl text-sm font-black transition ${className}`} key={iso} onClick={() => enabled && onPick(optionIndex)} disabled={!enabled} type="button">
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-xl bg-slate-800 px-3 py-2 text-xs font-black text-slate-200 transition hover:bg-slate-700" onClick={() => {
                  const todayIndex = optionIndexByIso[addDaysIso(0)]
                  if (todayIndex !== undefined) onPick(todayIndex)
                }} type="button">
                  Hari Ini
                </button>
                <button className="flex-1 rounded-xl bg-orange-500 px-3 py-2 text-xs font-black text-white transition hover:bg-orange-400" onClick={() => setCalendarOpen(false)} type="button">
                  Terapkan
                </button>
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

function MacroDistributionCard({ totals, label }) {
  const macroTotal = Number(totals.protein || 0) + Number(totals.carbs || 0) + Number(totals.fat || 0)
  const pct = (value) => macroTotal ? Math.round((Number(value || 0) / macroTotal) * 100) : 0
  const items = [
    ['Kalori', totals.calories, 'kcal', 'text-primary', 'bg-primary/10'],
    ['Protein', totals.protein, 'g', 'text-[#9e4036]', 'bg-[#9e4036]/10', pct(totals.protein)],
    ['Carbs', totals.carbs, 'g', 'text-secondary', 'bg-secondary/10', pct(totals.carbs)],
    ['Fat', totals.fat, 'g', 'text-energy-orange', 'bg-energy-orange/10', pct(totals.fat)]
  ]
  return (
    <motion.section className="rounded-[2rem] border border-outline-variant/35 bg-white/85 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.34 }} whileHover={{ y: -3 }}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Macro Distribution</p>
          <h3 className="mt-1 font-headline-md text-2xl font-black text-on-surface">Range nutrition cards</h3>
          <p className="mt-1 text-sm font-bold text-on-surface-variant">{label}</p>
        </div>
        <BarChartIcon />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map(([name, value, unit, tone, tint, percent]) => (
          <div className="rounded-[1.5rem] border border-outline-variant/25 bg-surface-container-low p-5" key={name}>
            <div className={`mb-4 inline-flex rounded-2xl px-3 py-2 text-xs font-black uppercase tracking-wide ${tone} ${tint}`}>{name}</div>
            <p className={`font-metrics-mono text-3xl font-black ${tone}`}>{formatNumber(value)} <span className="text-sm text-on-surface-variant">{unit}</span></p>
            {percent !== undefined ? (
              <p className="mt-2 text-sm font-bold text-on-surface-variant">{percent}% dari total macro range</p>
            ) : (
              <p className="mt-2 text-sm font-bold text-on-surface-variant">Total kalori dari tanggal terpilih</p>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  )
}

function BarChartIcon() {
  return (
    <div className="mx-auto mb-3 flex h-14 w-14 items-end justify-center gap-1 rounded-2xl bg-white/80 p-3 text-primary shadow-sm">
      <span className="h-5 w-2 rounded-full bg-primary" />
      <span className="h-8 w-2 rounded-full bg-secondary" />
      <span className="h-6 w-2 rounded-full bg-energy-orange" />
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
              {items.map((item, itemIndex) => (
                <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 shadow-sm" key={`${group}-${item.name}-${itemIndex}`}>
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

function SelectedDayCard({ day, onEdit }) {
  const planDate = day.iso || addDaysIso(0)
  return (
    <motion.aside className="rounded-[2rem] border border-outline-variant/40 bg-white/85 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18, duration: 0.34 }} whileHover={{ y: -4 }}>
      <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-mint-surface text-primary">
        <Apple size={26} />
      </div>
      <p className="text-label-md font-bold text-primary">Selected day</p>
      <h3 className="mt-1 font-headline-md text-2xl font-black text-on-surface">{day.day}</h3>
      <p className="mt-2 text-on-surface-variant">{day.date} - {formatNumber(day.calories)} kcal planned</p>
      <button className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-primary font-black text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 active:scale-[0.98]" onClick={() => onEdit(planDate, 'breakfast')} type="button">
        <Plus size={17} />
        Add meal for this day
      </button>
      <div className="mt-6 grid gap-3">
        {(day.meals.length ? day.meals : [['Open slot', 'Add breakfast, lunch, and dinner', '0 kcal']]).map((rawMeal, index) => {
          const meal = mealToView(rawMeal, index)
          return (
            <div className="rounded-2xl bg-surface-container-low p-4" key={meal.id || meal.title}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-[0.18em] text-primary">{meal.time} - {meal.type}</p>
                  <p className="mt-2 font-black text-on-surface">{meal.title}</p>
                  <p className="mt-1 text-sm text-on-surface-variant">{meal.meta}</p>
                </div>
                {meal.id ? (
                  <button className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-on-surface-variant transition hover:bg-primary hover:text-white" onClick={() => onEdit(planDate, meal.mealType, meal.id)} type="button" aria-label={`Edit ${meal.title}`}>
                    <Edit3 size={15} />
                  </button>
                ) : null}
              </div>
            </div>
          )
        })}
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
