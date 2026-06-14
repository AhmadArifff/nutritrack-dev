import { memo, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Apple, Check, Flame, Plus, Search, Utensils, Droplets, X } from 'lucide-react'
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
  const { data: logs, error: logsError } = useBackendData(() => apiRequest(`/api/food-logs?date=${todayIso()}`), [], [])
  const { data: foods } = useBackendData(() => apiRequest('/api/foods?limit=50'), [], [])
  const { data: planRows, setData: setPlanRows } = useBackendData(() => apiRequest(`/api/meal-plans?from=${requestedPlanDate}&to=${requestedPlanDate}`), [], [requestedPlanDate])
  const [planSaving, setPlanSaving] = useState(false)
  const [planToast, setPlanToast] = useState('')
  const [planForm, setPlanForm] = useState({
    foodId: '',
    foodIds: [],
    mealType: requestedMealType,
    plannedTime: requestedMealType === 'lunch' ? '12:30' : requestedMealType === 'dinner' ? '19:00' : '07:30',
    servingAmount: 1,
    notes: ''
  })
  const mealOrder = ['breakfast', 'lunch', 'dinner', 'afternoon_snack']
  const hasLogs = logs.length > 0
  const selectedPlan = useMemo(() => planRows.find((plan) => plan.id === requestedPlanId), [planRows, requestedPlanId])
  const sortedPlanRows = useMemo(() => [...planRows].sort((a, b) => cleanTime(a.planned_time || a.plannedTime || '99:99').localeCompare(cleanTime(b.planned_time || b.plannedTime || '99:99'))), [planRows])

  useEffect(() => {
    if (!selectedPlan) return
    setPlanForm({
      foodId: selectedPlan.food_id || selectedPlan.foodId || '',
      foodIds: selectedPlan.food_id || selectedPlan.foodId ? [selectedPlan.food_id || selectedPlan.foodId] : [],
      mealType: selectedPlan.meal_type || selectedPlan.mealType || requestedMealType,
      plannedTime: cleanTime(selectedPlan.planned_time || selectedPlan.plannedTime),
      servingAmount: Number(selectedPlan.serving_amount || selectedPlan.servingAmount || 1),
      notes: selectedPlan.notes || ''
    })
  }, [requestedMealType, selectedPlan])

  const selectedFoods = useMemo(() => foods.filter((food) => (planForm.foodIds || []).includes(food.id)), [foods, planForm.foodIds])

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
      items
    }
  }), [sortedPlanRows])
  const historyItems = sortedPlanRows.length ? sortedPlanRows : fallbackRecentItems
  const recentItems = historyItems.slice(0, 3)
  const consumed = sortedPlanRows.length ? groupedPlannerMeals.reduce((total, meal) => total + meal.kcal, 0) : hasLogs ? groupedLogs.reduce((total, meal) => total + meal.kcal, 0) : 1450
  const dailyGoal = 2100
  const remaining = Math.max(dailyGoal - consumed, 0)

  const macroTotals = useMemo(() => {
    const currentRows = sortedPlanRows.filter((item) => item.id !== requestedPlanId)
    const stored = currentRows.reduce((total, item) => ({
      protein: total.protein + Number(item.target_protein_g || item.targetProteinG || 0),
      carbs: total.carbs + Number(item.target_carbs_g || item.targetCarbsG || 0),
      fat: total.fat + Number(item.target_fat_g || item.targetFatG || 0),
      calories: total.calories + Number(item.target_calories || item.targetCalories || 0)
    }), { protein: 0, carbs: 0, fat: 0, calories: 0 })
    const servingAmount = Number(planForm.servingAmount || 1)
    const pending = selectedFoods.reduce((total, food) => ({
      protein: total.protein + Number(food.protein_g || 0) * servingAmount,
      carbs: total.carbs + Number(food.carbohydrates_g || 0) * servingAmount,
      fat: total.fat + Number(food.fat_g || 0) * servingAmount,
      calories: total.calories + Number(food.calories || 0) * servingAmount
    }), { protein: 0, carbs: 0, fat: 0, calories: 0 })
    return {
      protein: stored.protein + pending.protein,
      carbs: stored.carbs + pending.carbs,
      fat: stored.fat + pending.fat,
      calories: stored.calories + pending.calories,
      source: selectedFoods.length ? `${selectedFoods.length} makanan dipilih` : 'Meal planner harian'
    }
  }, [planForm.servingAmount, requestedPlanId, selectedFoods, sortedPlanRows])

  async function saveMealPlan(event) {
    event.preventDefault()
    if (!selectedFoods.length || planSaving) return
    setPlanSaving(true)
    setPlanToast('')
    const servingAmount = Number(planForm.servingAmount || 1)
    const payload = {
      planName: 'Weekly Plan',
      planDate: requestedPlanDate,
      mealType: planForm.mealType,
      plannedTime: planForm.plannedTime,
      servingAmount,
      notes: planForm.notes
    }
    try {
      await Promise.all(selectedFoods.map((food, index) => {
        const body = {
          ...payload,
          foodId: food.id,
          foodName: food.name,
          servingUnit: food.serving_unit || 'porsi',
          targetCalories: Number(food.calories || 0) * servingAmount,
          targetProteinG: Number(food.protein_g || 0) * servingAmount,
          targetCarbsG: Number(food.carbohydrates_g || 0) * servingAmount,
          targetFatG: Number(food.fat_g || 0) * servingAmount
        }
        const shouldUpdate = requestedPlanId && index === 0
        return apiRequest(shouldUpdate ? `/api/meal-plans/${requestedPlanId}` : '/api/meal-plans', {
          method: shouldUpdate ? 'PUT' : 'POST',
          body
        })
      }))
      setPlanRows(await apiRequest(`/api/meal-plans?from=${requestedPlanDate}&to=${requestedPlanDate}`))
      setPlanForm((current) => ({ ...current, foodId: '', foodIds: requestedPlanId ? current.foodIds : [] }))
      setPlanToast(requestedPlanId ? 'Meal plan berhasil diperbarui.' : 'Meal plan berhasil ditambahkan.')
    } catch (error) {
      setPlanToast(error.message || 'Meal plan gagal disimpan.')
    } finally {
      setPlanSaving(false)
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
        selectedFoods={selectedFoods}
        toast={planToast}
        onChange={setPlanForm}
        onSubmit={saveMealPlan}
      />

      <section className="mt-8 grid grid-cols-1 gap-7 xl:grid-cols-12">
        <div className="grid content-start gap-7 xl:col-span-4">
          <LogFoodRecentCard allItems={historyItems} items={recentItems} />
        </div>

        <div className="grid gap-7 xl:col-span-8">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {groupedPlannerMeals.map((meal, index) => (
              <LogFoodMealCard key={meal.mealType} meal={meal} index={index} />
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

function MealPlanBuilderPanel({ foods, form, macroTotals, planDate, planRows, saving, selectedFoods, toast, onChange, onSubmit }) {
  const [foodSearch, setFoodSearch] = useState('')
  const mealTypes = [
    ['breakfast', 'Breakfast'],
    ['morning_snack', 'Morning Snack'],
    ['lunch', 'Lunch'],
    ['afternoon_snack', 'Afternoon Snack'],
    ['dinner', 'Dinner'],
    ['late_snack', 'Late Snack']
  ]
  const dateLabel = new Date(`${planDate}T00:00:00`).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
  const filteredFoods = useMemo(() => {
    const keyword = foodSearch.trim().toLowerCase()
    return foods
      .filter((food) => !keyword || `${food.name} ${food.category || ''} ${food.sub_category || ''}`.toLowerCase().includes(keyword))
      .slice(0, 8)
  }, [foodSearch, foods])
  const selectedIds = form.foodIds || []

  function toggleFood(foodId) {
    onChange((current) => {
      const currentIds = current.foodIds || []
      const exists = currentIds.includes(foodId)
      const nextIds = exists ? currentIds.filter((id) => id !== foodId) : [...currentIds, foodId]
      return { ...current, foodId: nextIds[0] || '', foodIds: nextIds }
    })
  }

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
          <div className="grid gap-3 sm:col-span-2">
            <div>
              <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Search Food Database</h3>
              <label className="relative mt-3 block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                <input className="h-[52px] w-full rounded-2xl border-none bg-surface-container py-3 pl-12 pr-4 font-body-md text-on-surface outline-none ring-1 ring-outline-variant/30 transition-all focus:ring-2 focus:ring-primary" placeholder="Search for chicken, rice, coffee..." value={foodSearch} onChange={(event) => setFoodSearch(event.target.value)} aria-label="Search food database" />
              </label>
            </div>
            <div className="custom-scrollbar grid max-h-72 gap-2 overflow-y-auto pr-1">
              {filteredFoods.map((food) => {
                const active = selectedIds.includes(food.id)
                return (
                  <button className={`flex items-center justify-between gap-3 rounded-2xl border p-3 text-left transition ${active ? 'border-primary bg-mint-surface shadow-sm' : 'border-outline-variant/25 bg-white hover:border-primary/30 hover:bg-surface-container-low'}`} key={food.id} onClick={() => toggleFood(food.id)} type="button">
                    <span className="min-w-0">
                      <strong className="block truncate text-on-surface">{food.name}</strong>
                      <small className="block text-on-surface-variant">{formatNumber(food.calories)} kcal / {food.serving_unit || 'porsi'}</small>
                    </span>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${active ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}>
                      {active ? <Check size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          <label className="grid gap-2">
            <span className="text-sm font-black text-on-surface">Jumlah porsi</span>
            <input className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" min="0.25" step="0.25" type="number" value={form.servingAmount} onChange={(event) => onChange((current) => ({ ...current, servingAmount: event.target.value }))} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-black text-on-surface">Catatan</span>
            <input className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="Contoh: meal prep Senin" value={form.notes} onChange={(event) => onChange((current) => ({ ...current, notes: event.target.value }))} />
          </label>
          <button className="h-12 rounded-2xl bg-primary px-6 font-black text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2" disabled={!selectedFoods.length || saving} type="submit">
            {saving ? 'Menyimpan...' : 'Simpan ke Meal Planner'}
          </button>
          {toast && <p className="rounded-xl bg-mint-surface px-4 py-3 text-sm font-bold text-primary sm:col-span-2">{toast}</p>}
        </div>

        <div className="rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-low p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Preview kandungan</p>
          <h3 className="mt-2 font-headline-md text-xl font-black text-on-surface">{selectedFoods.length ? `${selectedFoods.length} makanan dipilih` : 'Pilih makanan dulu'}</h3>
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

function LogFoodMealCard({ meal, index }) {
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
              <span className="font-metrics-mono">{formatNumber(item.target_calories || item.targetCalories || item.calories || 0)}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-grow flex-col items-center justify-center opacity-60">
          <Utensils className="mb-2 text-outline-variant" size={38} />
          <p className="text-label-sm text-on-surface-variant">No items logged yet</p>
        </div>
      )}

      <p className="mt-auto rounded-xl bg-surface-container-low px-4 py-3 text-center text-sm font-bold text-on-surface-variant">Loaded from selected Meal Planner day</p>
    </motion.article>
  )
}

export default memo(ProLogFoodPage)
