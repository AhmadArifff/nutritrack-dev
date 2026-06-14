import { memo, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Apple, BarChart3, Flame, Plus, Search, Settings, Utensils, Droplets } from 'lucide-react'
import { apiRequest } from '../../api'

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
  const requestedMealType = params.get('mealType') || 'breakfast'
  const requestedPlanId = params.get('planId') || ''
  const { data: logs, setData: setLogs, error: logsError } = useBackendData(() => apiRequest(`/api/food-logs?date=${todayIso()}`), [], [])
  const { data: foods } = useBackendData(() => apiRequest('/api/foods?limit=50'), [], [])
  const { data: planRows, setData: setPlanRows } = useBackendData(() => apiRequest(`/api/meal-plans?from=${requestedPlanDate}&to=${requestedPlanDate}`), [], [requestedPlanDate])
  const [saving, setSaving] = useState(false)
  const [planSaving, setPlanSaving] = useState(false)
  const [planToast, setPlanToast] = useState('')
  const [planForm, setPlanForm] = useState({
    foodId: '',
    mealType: requestedMealType,
    plannedTime: requestedMealType === 'lunch' ? '12:30' : requestedMealType === 'dinner' ? '19:00' : '07:30',
    servingAmount: 1,
    notes: ''
  })
  const mealOrder = ['breakfast', 'lunch', 'dinner', 'afternoon_snack']
  const hasLogs = logs.length > 0
  const selectedPlan = useMemo(() => planRows.find((plan) => plan.id === requestedPlanId), [planRows, requestedPlanId])

  useEffect(() => {
    if (!selectedPlan) return
    setPlanForm({
      foodId: selectedPlan.food_id || selectedPlan.foodId || '',
      mealType: selectedPlan.meal_type || selectedPlan.mealType || requestedMealType,
      plannedTime: cleanTime(selectedPlan.planned_time || selectedPlan.plannedTime),
      servingAmount: Number(selectedPlan.serving_amount || selectedPlan.servingAmount || 1),
      notes: selectedPlan.notes || ''
    })
  }, [requestedMealType, selectedPlan])

  const selectedFood = useMemo(() => foods.find((food) => food.id === planForm.foodId), [foods, planForm.foodId])

  const groupedLogs = useMemo(() => mealOrder.map((mealType) => {
    const backendItems = logs.filter((log) => (log.meal_type || log.mealType) === mealType)
    const items = backendItems.length ? backendItems : hasLogs ? [] : htmlMealFallback[mealType]
    return {
      mealType,
      kcal: items.reduce((total, item) => total + Number(item.calories || 0), 0),
      items
    }
  }), [hasLogs, logs])

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

  const macroTotals = useMemo(() => {
    const base = logs.reduce((total, item) => ({
      protein: total.protein + Number(item.protein_g || item.proteinG || 0),
      carbs: total.carbs + Number(item.carbohydrates_g || item.carbohydratesG || 0),
      fat: total.fat + Number(item.fat_g || item.fatG || 0),
      calories: total.calories + Number(item.calories || 0)
    }), { protein: 0, carbs: 0, fat: 0, calories: 0 })
    if (!base.calories && selectedFood) {
      return {
        protein: Number(selectedFood.protein_g || 0) * Number(planForm.servingAmount || 1),
        carbs: Number(selectedFood.carbohydrates_g || 0) * Number(planForm.servingAmount || 1),
        fat: Number(selectedFood.fat_g || 0) * Number(planForm.servingAmount || 1),
        calories: Number(selectedFood.calories || 0) * Number(planForm.servingAmount || 1),
        source: selectedFood.name
      }
    }
    return { ...base, source: selectedFood?.name || 'Daily logs' }
  }, [logs, planForm.servingAmount, selectedFood])

  async function saveMealPlan(event) {
    event.preventDefault()
    if (!selectedFood || planSaving) return
    setPlanSaving(true)
    setPlanToast('')
    const servingAmount = Number(planForm.servingAmount || 1)
    const payload = {
      planName: 'Weekly Plan',
      planDate: requestedPlanDate,
      mealType: planForm.mealType,
      plannedTime: planForm.plannedTime,
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      servingAmount,
      servingUnit: selectedFood.serving_unit || 'porsi',
      targetCalories: Number(selectedFood.calories || 0) * servingAmount,
      targetProteinG: Number(selectedFood.protein_g || 0) * servingAmount,
      targetCarbsG: Number(selectedFood.carbohydrates_g || 0) * servingAmount,
      targetFatG: Number(selectedFood.fat_g || 0) * servingAmount,
      notes: planForm.notes
    }
    try {
      await apiRequest(requestedPlanId ? `/api/meal-plans/${requestedPlanId}` : '/api/meal-plans', {
        method: requestedPlanId ? 'PUT' : 'POST',
        body: payload
      })
      setPlanRows(await apiRequest(`/api/meal-plans?from=${requestedPlanDate}&to=${requestedPlanDate}`))
      setPlanToast(requestedPlanId ? 'Meal plan berhasil diperbarui.' : 'Meal plan berhasil ditambahkan.')
    } catch (error) {
      setPlanToast(error.message || 'Meal plan gagal disimpan.')
    } finally {
      setPlanSaving(false)
    }
  }

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
      className="mx-auto max-w-[1280px] px-5 py-7 pb-28 lg:px-8"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_386px] lg:items-center">
        <div>
          <h1 className="font-headline-lg text-[34px] font-black leading-tight text-on-surface md:text-[42px]">Daily Food Log</h1>
          <p className="mt-2 font-body-md text-on-surface-variant">Tuesday, October 24th, 2023</p>
          {logsError && <p className="mt-3 rounded-xl bg-error-red/10 px-4 py-2 text-sm font-bold text-error-red">{logsError}</p>}
        </div>
        <LogFoodSummaryCard consumed={consumed} dailyGoal={dailyGoal} remaining={remaining} />
      </section>

      <MealPlanBuilderPanel
        foods={foods}
        form={planForm}
        macroTotals={macroTotals}
        planDate={requestedPlanDate}
        planRows={planRows}
        saving={planSaving}
        selectedFood={selectedFood}
        toast={planToast}
        onChange={setPlanForm}
        onSubmit={saveMealPlan}
      />

      <section className="mt-8 grid grid-cols-1 gap-7 xl:grid-cols-12">
        <div className="grid content-start gap-7 xl:col-span-4">
          <LogFoodSearchCard suggestions={foodSuggestions} />
          <LogFoodRecentCard items={recentItems} onAdd={addQuickItem} saving={saving} />
        </div>

        <div className="grid gap-7 xl:col-span-8">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {groupedLogs.map((meal, index) => (
              <LogFoodMealCard key={meal.mealType} meal={meal} index={index} onAdd={addQuickItem} saving={saving} />
            ))}
          </div>
          <LogFoodMacroDistribution totals={macroTotals} />
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

function MealPlanBuilderPanel({ foods, form, macroTotals, planDate, planRows, saving, selectedFood, toast, onChange, onSubmit }) {
  const mealTypes = [
    ['breakfast', 'Breakfast'],
    ['morning_snack', 'Morning Snack'],
    ['lunch', 'Lunch'],
    ['afternoon_snack', 'Afternoon Snack'],
    ['dinner', 'Dinner'],
    ['late_snack', 'Late Snack']
  ]
  const dateLabel = new Date(`${planDate}T00:00:00`).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <motion.section className="mt-8 overflow-hidden rounded-[2rem] border border-primary/15 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.34 }}>
      <div className="grid gap-6 bg-gradient-to-r from-mint-surface via-white to-secondary-fixed/45 p-5 md:grid-cols-[minmax(0,1fr)_300px] md:p-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Meal Planner Builder</p>
          <h2 className="mt-2 font-headline-md text-2xl font-black text-on-surface">Tambahkan atau edit menu untuk {dateLabel}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-on-surface-variant">Pilih waktu, tipe makan, dan makanan dari database. Nilai kalori dan makro otomatis mengikuti data dari menu Foods.</p>
        </div>
        <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-on-surface-variant">Plan hari ini</p>
          <p className="mt-2 font-metrics-mono text-3xl font-black text-primary">{planRows.length}</p>
          <p className="text-sm text-on-surface-variant">meal item tersimpan</p>
        </div>
      </div>

      <form className="grid gap-5 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-6" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-black text-on-surface">Waktu makan</span>
            <input className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" type="time" value={form.plannedTime} onChange={(event) => onChange((current) => ({ ...current, plannedTime: event.target.value }))} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-black text-on-surface">Jenis makan</span>
            <select className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" value={form.mealType} onChange={(event) => onChange((current) => ({ ...current, mealType: event.target.value }))}>
              {mealTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label className="grid gap-2 sm:col-span-2">
            <span className="text-sm font-black text-on-surface">Makanan dari database</span>
            <select className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" value={form.foodId} onChange={(event) => onChange((current) => ({ ...current, foodId: event.target.value }))}>
              <option value="">Pilih makanan...</option>
              {foods.map((food) => <option key={food.id} value={food.id}>{food.name} - {formatNumber(food.calories)} kcal</option>)}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-black text-on-surface">Jumlah porsi</span>
            <input className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" min="0.25" step="0.25" type="number" value={form.servingAmount} onChange={(event) => onChange((current) => ({ ...current, servingAmount: event.target.value }))} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-black text-on-surface">Catatan</span>
            <input className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="Contoh: meal prep Senin" value={form.notes} onChange={(event) => onChange((current) => ({ ...current, notes: event.target.value }))} />
          </label>
          <button className="h-12 rounded-2xl bg-primary px-6 font-black text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2" disabled={!selectedFood || saving} type="submit">
            {saving ? 'Menyimpan...' : 'Simpan ke Meal Planner'}
          </button>
          {toast && <p className="rounded-xl bg-mint-surface px-4 py-3 text-sm font-bold text-primary sm:col-span-2">{toast}</p>}
        </div>

        <div className="rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-low p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Preview kandungan</p>
          <h3 className="mt-2 font-headline-md text-xl font-black text-on-surface">{selectedFood?.name || 'Pilih makanan dulu'}</h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              ['Kalori', macroTotals.calories, 'kcal', 'text-primary'],
              ['Protein', macroTotals.protein, 'g', 'text-[#9e4036]'],
              ['Carbs', macroTotals.carbs, 'g', 'text-secondary'],
              ['Fat', macroTotals.fat, 'g', 'text-energy-orange']
            ].map(([label, value, unit, tone]) => (
              <div className="rounded-2xl bg-white p-4 shadow-sm" key={label}>
                <p className="text-xs font-black uppercase tracking-wide text-on-surface-variant">{label}</p>
                <p className={`mt-1 font-metrics-mono text-xl font-black ${tone}`}>{formatNumber(value)} <span className="text-xs text-on-surface-variant">{unit}</span></p>
              </div>
            ))}
          </div>
        </div>
      </form>
    </motion.section>
  )
}

function LogFoodSearchCard({ suggestions }) {
  return (
    <motion.section className="rounded-[1.75rem] border border-outline-variant/45 bg-white/85 p-5 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.06)] backdrop-blur-xl focus-within:ring-2 focus-within:ring-primary/30" whileHover={{ y: -3 }}>
      <h3 className="mb-4 font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Search Food Database</h3>
      <label className="relative block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
        <input className="h-[52px] w-full rounded-2xl border-none bg-surface-container py-3 pl-12 pr-4 font-body-md text-on-surface outline-none ring-1 ring-outline-variant/30 transition-all focus:ring-2 focus:ring-primary" placeholder="Search for chicken, rice, coffee..." aria-label="Search food database" />
      </label>
      <div className="mt-4 grid gap-2">
        {suggestions.map((food) => (
          <button className="flex items-center justify-between gap-3 rounded-xl p-3 text-left text-sm transition hover:bg-surface-variant/40" key={food.name} type="button">
            <span className="font-bold text-on-surface">{food.name}</span>
            <span className="shrink-0 text-on-surface-variant/70">{formatNumber(food.calories)} kcal / {food.serving}</span>
          </button>
        ))}
      </div>
    </motion.section>
  )
}

function LogFoodRecentCard({ items, onAdd, saving }) {
  return (
    <motion.section className="rounded-[1.75rem] border border-outline-variant/45 bg-white/85 p-5 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.06)] backdrop-blur-xl" whileHover={{ y: -3 }}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Recent History</h3>
        <button className="text-label-sm font-bold text-primary hover:underline" type="button">View All</button>
      </div>
      <div className="custom-scrollbar grid max-h-[420px] gap-3 overflow-y-auto pr-1">
        {items.map((item, index) => (
          <LogFoodRecentItem item={item} index={index} key={item.id || item.food_name || item.name || index} onAdd={onAdd} saving={saving} />
        ))}
      </div>
    </motion.section>
  )
}

function LogFoodRecentItem({ item, index, onAdd, saving }) {
  const tones = [
    { bg: 'bg-mint-surface/60', border: 'border-primary/10', iconBg: 'bg-primary-container/20', iconText: 'text-primary', Icon: Activity },
    { bg: 'bg-surface-container-low', border: 'border-outline-variant/20', iconBg: 'bg-secondary/10', iconText: 'text-secondary', Icon: Flame },
    { bg: 'bg-surface-container-low', border: 'border-outline-variant/20', iconBg: 'bg-energy-orange/10', iconText: 'text-energy-orange', Icon: Apple }
  ]
  const tone = tones[index % tones.length]
  const name = item.food_name || item.foodName || item.name || 'Food item'
  const meal = mealLabel(item.meal_type || item.mealType || item.category || 'afternoon_snack')
  const serving = item.serving_unit || item.servingUnit || item.serving || '1 serving'
  const Icon = tone.Icon

  return (
    <motion.article className={`group relative flex min-h-[72px] items-center gap-3 overflow-hidden rounded-2xl border p-3 transition-all hover:shadow-sm ${tone.bg} ${tone.border}`} whileHover={{ x: 2 }}>
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone.iconBg} ${tone.iconText}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-label-md font-bold text-on-surface">{name}</p>
        <p className="text-label-sm text-on-surface-variant">{meal} - {serving}</p>
      </div>
      <div className="text-right">
        <p className="font-metrics-mono font-bold text-on-surface">{formatNumber(item.calories || 0)} <span className="text-[10px] uppercase">kcal</span></p>
      </div>
      <div className="absolute inset-0 flex translate-x-full items-center justify-center gap-4 bg-primary/95 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
        <button className="rounded-full bg-white/20 p-2 text-white hover:bg-white/40 disabled:opacity-60" onClick={onAdd} disabled={saving} type="button" aria-label={`Add ${name}`}>
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
  const style = mealStyles[index]
  const Icon = style.Icon
  const hasItems = meal.items.length > 0
  const pct = style.target ? Math.min(100, Math.round((meal.kcal / style.target) * 100)) : 0

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
              <p className="font-metrics-mono text-lg font-bold text-on-surface">{formatNumber(meal.kcal)} <span className="text-xs font-normal uppercase text-on-surface-variant">kcal</span></p>
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

      <button className="mt-auto flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-outline-variant/50 py-3 text-on-surface-variant transition-all hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60" onClick={onAdd} disabled={saving} type="button">
        <Plus size={16} />
        <span className="font-label-md text-label-md">{saving ? 'Adding...' : 'Add Item'}</span>
      </button>
    </motion.article>
  )
}

function LogFoodMacroDistribution({ totals }) {
  const macroTotal = Number(totals.protein || 0) + Number(totals.carbs || 0) + Number(totals.fat || 0)
  const pct = (value) => macroTotal ? Math.round((Number(value || 0) / macroTotal) * 100) : 0
  return (
    <motion.section className="relative flex min-h-52 w-full items-center justify-center overflow-hidden rounded-[2rem] border border-outline-variant/30 bg-gradient-to-br from-mint-surface to-surface-container-low p-6 shadow-inner" whileHover={{ y: -3 }}>
      <motion.div className="absolute h-56 w-56 rounded-full border-[18px] border-primary/20" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute h-36 w-36 rounded-full border-[14px] border-secondary/20" animate={{ rotate: -360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }} />
      <div className="relative z-10 text-center">
        <BarChart3 className="mx-auto mb-2 text-primary" size={48} />
        <h3 className="font-headline-md text-xl font-black text-on-primary-container">Macro Distribution</h3>
        <p className="mt-1 text-sm font-bold text-on-surface-variant">{totals.source || 'Daily logs'} - {formatNumber(totals.calories)} kcal</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">Protein: {pct(totals.protein)}% ({formatNumber(totals.protein)}g)</span>
          <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold text-secondary">Carbs: {pct(totals.carbs)}% ({formatNumber(totals.carbs)}g)</span>
          <span className="rounded-full bg-energy-orange/20 px-3 py-1 text-xs font-bold text-energy-orange">Fat: {pct(totals.fat)}% ({formatNumber(totals.fat)}g)</span>
        </div>
      </div>
    </motion.section>
  )
}

export default memo(ProLogFoodPage)
