import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Plus, Search, X } from 'lucide-react'
import { apiRequest } from '../../api'

function cleanTime(value, fallback = '07:30') {
  return String(value || fallback).slice(0, 5)
}

function formatNumber(value, fallback = '0') {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(number)
}

function mealLabel(mealType = '') {
  return {
    breakfast: 'Breakfast',
    morning_snack: 'Morning Snack',
    lunch: 'Lunch',
    afternoon_snack: 'Snack',
    dinner: 'Dinner',
    late_snack: 'Late Snack'
  }[mealType] || mealType.replaceAll('_', ' ')
}

const defaultMealTimes = {
  breakfast: '07:30',
  morning_snack: '10:00',
  lunch: '12:30',
  afternoon_snack: '15:30',
  dinner: '19:00',
  late_snack: '21:00'
}

export default function MealPlanBuilderModal({ open, planDate, mealType = 'breakfast', planId = '', onClose, onSaved }) {
  const [foods, setFoods] = useState([])
  const [planRows, setPlanRows] = useState([])
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [foodSearch, setFoodSearch] = useState('')
  const [form, setForm] = useState({
    foodId: '',
    foodIds: [],
    mealType,
    plannedTime: defaultMealTimes[mealType] || '07:30',
    servingAmount: 1,
    notes: ''
  })

  useEffect(() => {
    if (!open) return undefined
    let active = true
    Promise.all([
      apiRequest('/api/foods?limit=500'),
      apiRequest(`/api/meal-plans?from=${planDate}&to=${planDate}`)
    ]).then(([foodRows, dayPlans]) => {
      if (!active) return
      setFoods(foodRows)
      setPlanRows(dayPlans)
      setToast('')
    }).catch((error) => {
      if (active) setToast(error.message || 'Gagal memuat builder meal planner.')
    })

    return () => {
      active = false
    }
  }, [open, planDate])

  const sortedPlanRows = useMemo(() => [...planRows].sort((a, b) => cleanTime(a.planned_time || a.plannedTime || '99:99').localeCompare(cleanTime(b.planned_time || b.plannedTime || '99:99'))), [planRows])
  const selectedPlan = useMemo(() => sortedPlanRows.find((plan) => plan.id === planId), [planId, sortedPlanRows])
  const selectedPlanGroupRows = useMemo(() => {
    if (!selectedPlan) return []
    return sortedPlanRows.filter((plan) => (plan.meal_type || plan.mealType) === (selectedPlan.meal_type || selectedPlan.mealType) && cleanTime(plan.planned_time || plan.plannedTime) === cleanTime(selectedPlan.planned_time || selectedPlan.plannedTime))
  }, [selectedPlan, sortedPlanRows])

  useEffect(() => {
    if (!open) return
    if (!selectedPlan) {
      setForm({
        foodId: '',
        foodIds: [],
        mealType,
        plannedTime: defaultMealTimes[mealType] || '07:30',
        servingAmount: 1,
        notes: ''
      })
      return
    }

    const groupFoodIds = selectedPlanGroupRows.map((plan) => plan.food_id || plan.foodId).filter(Boolean)
    setForm({
      foodId: groupFoodIds[0] || selectedPlan.food_id || selectedPlan.foodId || '',
      foodIds: groupFoodIds.length ? groupFoodIds : selectedPlan.food_id || selectedPlan.foodId ? [selectedPlan.food_id || selectedPlan.foodId] : [],
      mealType: selectedPlan.meal_type || selectedPlan.mealType || mealType,
      plannedTime: cleanTime(selectedPlan.planned_time || selectedPlan.plannedTime),
      servingAmount: Number(selectedPlan.serving_amount || selectedPlan.servingAmount || 1),
      notes: selectedPlan.notes || ''
    })
  }, [mealType, open, selectedPlan, selectedPlanGroupRows])

  const selectedIds = form.foodIds || []
  const foodOptions = useMemo(() => {
    const existingIds = new Set(foods.map((food) => food.id))
    const missingSelectedRows = selectedPlanGroupRows
      .filter((row) => {
        const rowFoodId = row.food_id || row.foodId || row.id
        return selectedIds.includes(rowFoodId) && !existingIds.has(rowFoodId)
      })
      .map((row) => ({
        id: row.food_id || row.foodId || row.id,
        foodId: row.food_id || row.foodId || null,
        isMealPlanFallback: true,
        name: row.food_name || row.foodName || 'Meal planner item',
        category: row.meal_type || row.mealType || '',
        sub_category: row.serving_unit || row.servingUnit || '',
        serving_unit: row.serving_unit || row.servingUnit || 'porsi',
        calories: Number(row.target_calories || row.targetCalories || row.calories || 0),
        protein_g: Number(row.target_protein_g || row.targetProteinG || 0),
        carbohydrates_g: Number(row.target_carbs_g || row.targetCarbsG || 0),
        fat_g: Number(row.target_fat_g || row.targetFatG || 0)
      }))
    return [...missingSelectedRows, ...foods]
  }, [foods, selectedIds, selectedPlanGroupRows])

  const selectedFoods = useMemo(() => foodOptions.filter((food) => selectedIds.includes(food.id)), [foodOptions, selectedIds])
  const filteredFoods = useMemo(() => {
    const keyword = foodSearch.trim().toLowerCase()
    const selectedRows = foodOptions.filter((food) => selectedIds.includes(food.id))
    const searchRows = foodOptions
      .filter((food) => !keyword || `${food.name} ${food.category || ''} ${food.sub_category || ''}`.toLowerCase().includes(keyword))
      .filter((food) => !selectedIds.includes(food.id))
    return [...selectedRows, ...searchRows]
  }, [foodOptions, foodSearch, selectedIds])

  const macroTotals = useMemo(() => {
    const editingIds = new Set(selectedPlanGroupRows.map((item) => item.id))
    const currentRows = sortedPlanRows.filter((item) => !editingIds.has(item.id))
    const stored = currentRows.reduce((total, item) => ({
      protein: total.protein + Number(item.target_protein_g || item.targetProteinG || 0),
      carbs: total.carbs + Number(item.target_carbs_g || item.targetCarbsG || 0),
      fat: total.fat + Number(item.target_fat_g || item.targetFatG || 0),
      calories: total.calories + Number(item.target_calories || item.targetCalories || 0)
    }), { protein: 0, carbs: 0, fat: 0, calories: 0 })
    const servingAmount = Number(form.servingAmount || 1)
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
      calories: stored.calories + pending.calories
    }
  }, [form.servingAmount, selectedFoods, selectedPlanGroupRows, sortedPlanRows])

  function toggleFood(foodId) {
    setForm((current) => {
      const currentIds = current.foodIds || []
      const exists = currentIds.includes(foodId)
      const nextIds = exists ? currentIds.filter((id) => id !== foodId) : [...currentIds, foodId]
      return { ...current, foodId: nextIds[0] || '', foodIds: nextIds }
    })
  }

  async function saveMealPlan(event) {
    event.preventDefault()
    if (!selectedFoods.length || saving) return
    setSaving(true)
    setToast('')
    const servingAmount = Number(form.servingAmount || 1)
    const payload = {
      planName: 'Weekly Plan',
      planDate,
      mealType: form.mealType,
      plannedTime: form.plannedTime,
      servingAmount,
      notes: form.notes
    }

    try {
      const nextFoodIds = new Set(selectedFoods.map((food) => food.id))
      const existingRowsByFoodId = new Map(selectedPlanGroupRows.map((row) => [row.food_id || row.foodId || row.id, row]))
      const removedRows = selectedPlanGroupRows.filter((row) => !nextFoodIds.has(row.food_id || row.foodId || row.id))
      await Promise.all([
        ...selectedFoods.map((food) => {
          const existingRow = existingRowsByFoodId.get(food.id)
          const keepExistingSchedule = existingRow && existingRow.id !== planId
          const body = {
            ...payload,
            mealType: keepExistingSchedule ? existingRow.meal_type || existingRow.mealType || payload.mealType : payload.mealType,
            plannedTime: keepExistingSchedule ? cleanTime(existingRow.planned_time || existingRow.plannedTime || payload.plannedTime) : payload.plannedTime,
            foodId: food.isMealPlanFallback ? food.foodId : food.id,
            foodName: food.name,
            servingUnit: food.serving_unit || 'porsi',
            targetCalories: Number(food.calories || 0) * servingAmount,
            targetProteinG: Number(food.protein_g || 0) * servingAmount,
            targetCarbsG: Number(food.carbohydrates_g || 0) * servingAmount,
            targetFatG: Number(food.fat_g || 0) * servingAmount
          }
          return apiRequest(existingRow ? `/api/meal-plans/${existingRow.id}` : '/api/meal-plans', {
            method: existingRow ? 'PUT' : 'POST',
            body
          })
        }),
        ...removedRows.map((row) => apiRequest(`/api/meal-plans/${row.id}`, { method: 'DELETE' }))
      ])
      setToast(planId ? 'Meal plan berhasil diperbarui.' : 'Meal plan berhasil ditambahkan.')
      onSaved?.()
      onClose?.()
    } catch (error) {
      setToast(error.message || 'Meal plan gagal disimpan.')
    } finally {
      setSaving(false)
    }
  }

  if (!open) return null

  const dateLabel = new Date(`${planDate}T00:00:00`).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
  const mealTypes = [
    ['breakfast', 'Breakfast'],
    ['morning_snack', 'Morning Snack'],
    ['lunch', 'Lunch'],
    ['afternoon_snack', 'Afternoon Snack'],
    ['dinner', 'Dinner'],
    ['late_snack', 'Late Snack']
  ]

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <motion.section className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[2.25rem] border border-outline-variant/30 bg-white shadow-2xl" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.22 }}>
        <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-mint-surface via-white to-secondary-fixed/45 p-5 md:p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Meal Planner Builder</p>
            <h2 className="mt-2 font-headline-md text-2xl font-black text-on-surface">Pilih menu makan untuk {dateLabel}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-on-surface-variant">Pilih beberapa makanan sekaligus dari database, tentukan jam makan, lalu simpan ke board Meal Planner.</p>
          </div>
          <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/80 text-on-surface-variant shadow-sm transition hover:bg-error-red/10 hover:text-error-red" onClick={onClose} type="button" aria-label="Close meal planner builder">
            <X size={20} />
          </button>
        </div>

        <form className="custom-scrollbar grid max-h-[calc(92vh-120px)] gap-5 overflow-y-auto p-5 md:grid-cols-[1.1fr_0.9fr] md:p-6" onSubmit={saveMealPlan}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-black text-on-surface">Waktu makan</span>
              <input className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" type="time" value={form.plannedTime} onChange={(event) => setForm((current) => ({ ...current, plannedTime: event.target.value }))} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-black text-on-surface">Jenis waktu makan</span>
              <select className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" value={form.mealType} onChange={(event) => setForm((current) => ({ ...current, mealType: event.target.value }))}>
                {mealTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <div className="grid gap-3 sm:col-span-2">
              <div>
                <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Search Food Database</h3>
                <p className="mt-1 text-sm font-bold text-primary">{selectedIds.length} menu dipilih untuk slot {mealLabel(form.mealType)}</p>
                <p className="mt-1 text-xs font-bold text-on-surface-variant">Menampilkan {filteredFoods.length} dari {foodOptions.length} data foods tanpa filter kategori makanan.</p>
                <label className="relative mt-3 block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
                  <input className="h-[52px] w-full rounded-2xl border-none bg-surface-container py-3 pl-12 pr-4 font-body-md text-on-surface outline-none ring-1 ring-outline-variant/30 transition-all focus:ring-2 focus:ring-primary" placeholder="Search for chicken, rice, coffee..." value={foodSearch} onChange={(event) => setFoodSearch(event.target.value)} aria-label="Search food database" />
                </label>
              </div>
              <div className="custom-scrollbar grid max-h-80 gap-2 overflow-y-auto pr-1">
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
              <input className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" min="0.25" step="0.25" type="number" value={form.servingAmount} onChange={(event) => setForm((current) => ({ ...current, servingAmount: event.target.value }))} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-black text-on-surface">Catatan</span>
              <input className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="Contoh: meal prep Senin" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
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
    </div>
  )
}
