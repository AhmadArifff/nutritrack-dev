import { memo, useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit3, Filter, Heart, ImagePlus, Plus, Search, SlidersHorizontal, Sparkles, UploadCloud, X } from 'lucide-react'
import { apiRequest } from '../../api'
import { useBackendData } from '../../hooks/useBackendData'

const categories = ['Semua', 'Sarapan', 'Lunch', 'Snack']

const foodCatalog = [
  {
    id: 'gado-gado',
    name: 'Gado-Gado',
    category: 'Lunch',
    calories: 320,
    protein: 12,
    carbs: 38,
    fat: 14,
    image: '/assets/remote/remote-024-f6dccbf5cf.jpg'
  },
  {
    id: 'nasi-ayam-panggang',
    name: 'Nasi Ayam Panggang',
    category: 'Lunch',
    calories: 520,
    protein: 34,
    carbs: 58,
    fat: 16,
    image: '/assets/remote/remote-025-1db2c7b8be.jpg'
  },
  {
    id: 'oatmeal-pisang',
    name: 'Oatmeal Pisang',
    category: 'Sarapan',
    calories: 290,
    protein: 10,
    carbs: 51,
    fat: 5,
    image: '/assets/remote/remote-026-2ff0f98ad6.jpg'
  },
  {
    id: 'greek-yogurt-parfait',
    name: 'Greek Yogurt Parfait',
    category: 'Snack',
    calories: 240,
    protein: 18,
    carbs: 26,
    fat: 6,
    image: '/assets/remote/remote-027-abd2e5dab0.jpg'
  },
  {
    id: 'tempe-bakar',
    name: 'Tempe Bakar',
    category: 'Lunch',
    calories: 180,
    protein: 16,
    carbs: 12,
    fat: 8,
    image: '/assets/remote/remote-028-14295192f8.jpg'
  }
]

const categoryLabels = {
  breakfast: 'Sarapan',
  lunch: 'Lunch',
  dinner: 'Lunch',
  snack: 'Snack',
  drink: 'Snack'
}

const foodImages = [
  '/assets/remote/remote-024-f6dccbf5cf.jpg',
  '/assets/remote/remote-025-1db2c7b8be.jpg',
  '/assets/remote/remote-026-2ff0f98ad6.jpg',
  '/assets/remote/remote-027-abd2e5dab0.jpg',
  '/assets/remote/remote-028-14295192f8.jpg'
]

function mapBackendFood(food, index) {
  return {
    id: food.id,
    name: food.name,
    category: categoryLabels[food.category] || food.category || 'Lunch',
    calories: food.calories,
    protein: food.protein_g,
    carbs: food.carbohydrates_g,
    fat: food.fat_g,
    fiber: food.fiber_g,
    sugar: food.sugar_g,
    sodium: food.sodium_mg,
    servingUnit: food.serving_unit,
    servingSizeG: food.serving_size_g,
    subCategory: food.sub_category,
    categoryValue: food.category,
    isCustom: Boolean(food.is_custom),
    image: food.image_url || foodImages[index % foodImages.length]
  }
}

function formatNumber(value, fallback = '0') {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(number)
}

function ProFoodsPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [search, setSearch] = useState('')
  const [foodModal, setFoodModal] = useState({ open: false, food: null })
  const [foodToast, setFoodToast] = useState('')
  const { data: foods, setData: setFoods } = useBackendData(
    () => apiRequest('/api/foods?limit=500').then((rows) => rows.map(mapBackendFood)),
    foodCatalog,
    []
  )
  const visibleFoods = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    return foods.filter((food) => {
      const matchesCategory = activeCategory === 'Semua' || food.category === activeCategory
      const matchesSearch = !keyword || food.name.toLowerCase().includes(keyword) || food.category.toLowerCase().includes(keyword)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, foods, search])

  return (
    <AppPageShell wide>
      <div className="space-y-8 pb-28">
        <GlassCard className="overflow-hidden p-0">
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_330px] lg:items-end">
            <div>
              <p className="mb-2 text-label-md font-bold text-primary">Database makanan Indonesia</p>
              <h2 className="font-headline-lg text-[34px] font-black leading-tight text-on-surface md:text-[42px]">Browse Foods</h2>
              <p className="mt-3 max-w-3xl leading-7 text-on-surface-variant">Cari makanan, cek makro, simpan favorit, dan tambahkan ke log harian tanpa keluar dari alur tracking.</p>
            </div>
            <div className="rounded-[1.5rem] border border-primary/10 bg-mint-surface p-5">
              <div className="flex items-center gap-3 text-primary">
                <Sparkles size={22} />
                <b>Smart food match</b>
              </div>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">Rekomendasi makanan akan mengikuti target kalori dan riwayat log pengguna.</p>
            </div>
          </div>

          <div className="border-y border-outline-variant/25 bg-surface-container-low/70 p-4 md:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <label className="flex h-12 min-w-0 items-center gap-3 rounded-full bg-white px-5 shadow-sm ring-1 ring-outline-variant/25 xl:w-[420px]">
                <Search className="h-5 w-5 shrink-0 text-on-surface-variant" />
                <input className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm outline-none ring-0 focus:ring-0" placeholder="Search foods, calories, protein..." type="search" value={search} onChange={(event) => setSearch(event.target.value)} />
              </label>
              <div className="scroll-hide flex gap-3 overflow-x-auto pb-1 xl:pb-0" role="tablist" aria-label="Food categories">
                {categories.map((category) => (
                  <button
                    aria-pressed={activeCategory === category}
                    className={`h-11 shrink-0 rounded-xl px-5 font-black transition-all duration-200 active:scale-[0.98] ${activeCategory === category ? 'bg-primary text-white shadow-md shadow-primary/15' : 'bg-white text-on-surface hover:bg-surface-container'}`}
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    type="button"
                  >
                    {category}
                  </button>
                ))}
                <button className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-on-surface-variant transition hover:bg-surface-container" type="button" aria-label="Advanced filter">
                  <SlidersHorizontal size={19} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2 md:p-8 xl:grid-cols-3">
            {visibleFoods.map((food, index) => (
              <FoodCard food={food} index={index} key={food.id} onEdit={() => setFoodModal({ open: true, food })} />
            ))}

            <motion.button className="flex min-h-[286px] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-primary/40 bg-mint-surface p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-primary/10 active:scale-[0.98]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.32 }} type="button" onClick={() => setFoodModal({ open: true, food: null })}>
              <Plus className="mb-4 h-12 w-12 text-primary" />
              <b className="text-on-surface">Tambah Makanan Custom</b>
              <p className="mt-2 max-w-[230px] text-sm leading-6 text-on-surface-variant">Upload foto, isi serving, dan simpan nutrisi untuk dipakai ulang.</p>
            </motion.button>
          </div>
        </GlassCard>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            ['Favorite Foods', 'Quick-add dari makanan yang sering disimpan.', Heart],
            ['Filters', 'Kategori, kalori, protein, dan tag diet.', Filter],
            ['Skeleton Loading', 'Slot infinite scroll untuk integrasi data backend.', Sparkles]
          ].map(([title, body, Icon], index) => (
            <GlassCard className="p-7" key={title}>
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-surface-container text-primary">
                <Icon size={22} />
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">{title}</h3>
              <p className="mt-3 leading-7 text-on-surface-variant">{body}</p>
              <motion.div className="mt-5 h-2 rounded-full bg-surface-container" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ transformOrigin: 'left center' }} transition={{ delay: index * 0.08, duration: 0.6 }} />
            </GlassCard>
          ))}
        </section>
      </div>
      {foodToast && <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white shadow-xl">{foodToast}</div>}
      {foodModal.open && (
        <FoodFormModal
          food={foodModal.food}
          onClose={() => setFoodModal({ open: false, food: null })}
          onSaved={async (message) => {
            setFoodModal({ open: false, food: null })
            setFoodToast(message)
            window.setTimeout(() => setFoodToast(''), 2200)
            const rows = await apiRequest('/api/foods?limit=500')
            setFoods(rows.map(mapBackendFood))
          }}
        />
      )}
    </AppPageShell>
  )
}

function FoodCard({ food, index, onEdit }) {
  const to = `/app/foods/${food.id}`

  return (
    <motion.article className="relative" initial={{ opacity: 0, y: 18, rotateX: -5 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: index * 0.05, duration: 0.34 }} whileHover={{ y: -5, rotateX: 2 }}>
      <Link className="group block h-full overflow-hidden rounded-[1.75rem] border border-outline-variant/35 bg-white shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-xl active:scale-[0.98]" to={to}>
        <div className="relative h-44 overflow-hidden bg-mint-surface">
          <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" src={food.image} alt={food.name} loading="lazy" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary shadow-sm backdrop-blur">{food.category}</span>
          <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-on-surface-variant shadow-sm backdrop-blur transition group-hover:text-primary" aria-hidden="true">
            <Heart size={17} />
          </span>
        </div>
        <div className="p-5">
          <div className="flex justify-between gap-4">
            <b className="min-w-0 text-lg text-on-surface">{food.name}</b>
            <span className="whitespace-nowrap font-metrics-mono font-black text-primary">{formatNumber(food.calories)} kcal</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-on-surface-variant">
            <span className="rounded-xl bg-surface-container-low px-2 py-2">P {formatNumber(food.protein)}g</span>
            <span className="rounded-xl bg-surface-container-low px-2 py-2">C {formatNumber(food.carbs)}g</span>
            <span className="rounded-xl bg-surface-container-low px-2 py-2">F {formatNumber(food.fat)}g</span>
          </div>
        </div>
      </Link>
      <button className="absolute right-4 top-16 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-on-surface-variant shadow-sm backdrop-blur transition hover:bg-primary hover:text-white" onClick={(event) => {
        event.preventDefault()
        onEdit()
      }} type="button" aria-label={`Edit ${food.name}`}>
        <Edit3 size={16} />
      </button>
    </motion.article>
  )
}

function createCroppedImage(source, crop) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const width = 900
      const height = 620
      canvas.width = width
      canvas.height = height
      const context = canvas.getContext('2d')
      if (!context) {
        resolve(source)
        return
      }
      const scale = Math.max(width / image.width, height / image.height) * Number(crop.zoom || 1)
      const renderWidth = image.width * scale
      const renderHeight = image.height * scale
      const offsetX = (width - renderWidth) * (Number(crop.x || 50) / 100)
      const offsetY = (height - renderHeight) * (Number(crop.y || 50) / 100)
      context.fillStyle = '#f1f8f3'
      context.fillRect(0, 0, width, height)
      context.drawImage(image, offsetX, offsetY, renderWidth, renderHeight)
      resolve(canvas.toDataURL('image/jpeg', 0.84))
    }
    image.onerror = () => reject(new Error('Gambar tidak bisa diproses.'))
    image.src = source
  })
}

function FoodFormModal({ food, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: food?.name || '',
    category: food?.categoryValue || 'lunch',
    subCategory: food?.subCategory || '',
    servingUnit: food?.servingUnit || 'porsi',
    servingSizeG: food?.servingSizeG || 100,
    calories: food?.calories || 0,
    proteinG: food?.protein || 0,
    carbohydratesG: food?.carbs || 0,
    fatG: food?.fat || 0,
    fiberG: food?.fiber || 0,
    sugarG: food?.sugar || 0,
    sodiumMg: food?.sodium || 0,
    imageUrl: food?.image?.startsWith('/assets/') ? '' : food?.image || '',
    tags: ''
    ,
    ingredients: food?.ingredients || []
  })
  const [imageDraft, setImageDraft] = useState(food?.image || '')
  const [imageFileName, setImageFileName] = useState('')
  const [crop, setCrop] = useState({ x: 50, y: 50, zoom: 1 })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const previewImage = imageDraft || form.imageUrl || foodImages[0]

  useEffect(() => {
    // When editing an existing food, fetch full details to get `ingredients`.
    let mounted = true
    async function fetchDetails() {
      if (!food?.id) return
      try {
        const details = await apiRequest(`/api/foods/${food.id}`)
        if (!mounted) return
        setForm((current) => ({ ...current, ingredients: details?.ingredients || current.ingredients || [] }))
        setImageDraft(details?.image_url || details?.image || imageDraft)
      } catch (err) {
        // ignore - keep existing minimal data
      }
    }
    fetchDetails()
    return () => { mounted = false }
  }, [food?.id])

  function addIngredient() {
    setForm((current) => ({ ...current, ingredients: [...(current.ingredients || []), { name: '', quantity: 1, unit: current.servingUnit || 'porsi', category: current.subCategory || current.category || 'Groceries' }] }))
  }

  function updateIngredient(index, key, value) {
    setForm((current) => {
      const copy = (current.ingredients || []).slice()
      copy[index] = { ...copy[index], [key]: value }
      return { ...current, ingredients: copy }
    })
  }

  function removeIngredient(index) {
    setForm((current) => ({ ...current, ingredients: (current.ingredients || []).filter((_, i) => i !== index) }))
  }

  function setCropField(key, value) {
    setCrop((current) => ({ ...current, [key]: Number(value) }))
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result || '')
      setImageDraft(result)
      setField('imageUrl', result)
      setImageFileName(file.name)
      setCrop({ x: 50, y: 50, zoom: 1 })
    }
    reader.readAsDataURL(file)
  }

  function resetImage() {
    setImageDraft('')
    setImageFileName('')
    setField('imageUrl', '')
    setCrop({ x: 50, y: 50, zoom: 1 })
  }

  async function submit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      let imageUrl = form.imageUrl || null
      if (imageDraft && !imageDraft.startsWith('/assets/')) {
        try {
          imageUrl = await createCroppedImage(imageDraft, crop)
        } catch {
          imageUrl = form.imageUrl || imageDraft || null
        }
      }
      const payload = {
        ...form,
        servingSizeG: Number(form.servingSizeG),
        calories: Number(form.calories),
        proteinG: Number(form.proteinG),
        carbohydratesG: Number(form.carbohydratesG),
        fatG: Number(form.fatG),
        fiberG: Number(form.fiberG),
        sugarG: Number(form.sugarG),
        sodiumMg: Number(form.sodiumMg),
        imageUrl,
        tags: form.tags ? form.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : []
      }
      // include ingredients in payload (normalize types)
      if (form.ingredients && form.ingredients.length) {
        payload.ingredients = form.ingredients.map((it) => ({
          name: it.name || '',
          quantity: Number(it.quantity) || 0,
          unit: it.unit || form.servingUnit || 'porsi',
          category: it.category || form.subCategory || form.category || 'Groceries'
        }))
      }
      await apiRequest(food?.id ? `/api/foods/${food.id}` : '/api/foods', {
        method: food?.id ? 'PUT' : 'POST',
        body: payload
      })
      await onSaved(food?.id ? 'Makanan berhasil diperbarui.' : 'Makanan custom berhasil ditambahkan.')
    } catch (err) {
      setError(food?.id && !food?.isCustom ? 'Makanan publik tidak bisa diedit. Buat makanan custom baru untuk versi pribadi.' : err.message || 'Gagal menyimpan makanan.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <motion.form className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-outline-variant/30 bg-white p-5 shadow-2xl md:p-7" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} onSubmit={submit}>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Foods CRUD</p>
            <h2 className="mt-2 font-headline-md text-2xl font-black text-on-surface">{food ? 'Edit makanan' : 'Tambah makanan custom'}</h2>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">Data ini akan dipakai oleh Log Food, Meal Planner, dan detail kandungan makro.</p>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-surface-container text-on-surface-variant transition hover:bg-error-red/10 hover:text-error-red" onClick={onClose} type="button" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FoodInput label="Nama makanan" value={form.name} onChange={(value) => setField('name', value)} required />
          <label className="grid gap-2">
            <span className="text-sm font-black text-on-surface">Kategori</span>
            <select className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" value={form.category} onChange={(event) => setField('category', event.target.value)}>
              {['breakfast', 'lunch', 'dinner', 'snack', 'drink', 'supplement', 'other'].map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <FoodInput label="Sub kategori" value={form.subCategory} onChange={(value) => setField('subCategory', value)} />
          <FoodInput label="Serving unit" value={form.servingUnit} onChange={(value) => setField('servingUnit', value)} />
          <FoodInput label="Serving size (g)" type="number" value={form.servingSizeG} onChange={(value) => setField('servingSizeG', value)} />
          <FoodInput label="Kalori" type="number" value={form.calories} onChange={(value) => setField('calories', value)} required />
          <FoodInput label="Protein (g)" type="number" value={form.proteinG} onChange={(value) => setField('proteinG', value)} />
          <FoodInput label="Carbs (g)" type="number" value={form.carbohydratesG} onChange={(value) => setField('carbohydratesG', value)} />
          <FoodInput label="Fat (g)" type="number" value={form.fatG} onChange={(value) => setField('fatG', value)} />
          <FoodInput label="Fiber (g)" type="number" value={form.fiberG} onChange={(value) => setField('fiberG', value)} />
          <FoodInput label="Sugar (g)" type="number" value={form.sugarG} onChange={(value) => setField('sugarG', value)} />
          <FoodInput label="Sodium (mg)" type="number" value={form.sodiumMg} onChange={(value) => setField('sodiumMg', value)} />
          <div className="grid gap-3 md:col-span-2">
            <div className="grid gap-2">
              <span className="text-sm font-black text-on-surface">Image URL lokal/online</span>
              <p className="text-xs font-bold leading-5 text-on-surface-variant">Tempel URL gambar atau upload file lokal. Preview di bawah mengikuti crop, posisi, dan zoom sebelum disimpan.</p>
              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
                <input className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" value={form.imageUrl} onChange={(event) => {
                  setField('imageUrl', event.target.value)
                  setImageDraft(event.target.value)
                  setImageFileName('')
                }} placeholder="https://... atau /assets/..." />
                <label className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-primary/25 bg-mint-surface px-4 font-black text-primary transition hover:bg-primary hover:text-white">
                  <UploadCloud size={18} />
                  Upload gambar
                  <input className="sr-only" type="file" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-container-low px-4 py-3 text-xs font-bold text-on-surface-variant">
                <span>{imageFileName ? `File lokal: ${imageFileName}` : imageDraft ? 'Sumber gambar siap dipreview' : 'Belum ada gambar dipilih'}</span>
                {imageDraft || form.imageUrl ? (
                  <button className="rounded-full bg-white px-3 py-1 font-black text-error-red transition hover:bg-error-red/10" onClick={resetImage} type="button">
                    Hapus gambar
                  </button>
                ) : null}
              </div>
            </div>
            <div className="grid gap-4 rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-low p-4 lg:grid-cols-[260px_minmax(0,1fr)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-mint-surface">
                {previewImage ? (
                  <img className="h-full w-full object-cover transition duration-300" src={previewImage} alt="Preview makanan" style={{ objectPosition: `${crop.x}% ${crop.y}%`, transform: `scale(${crop.zoom})` }} />
                ) : (
                  <div className="grid h-full place-items-center text-primary">
                    <ImagePlus size={42} />
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
              </div>
              <div className="grid content-center gap-3">
                <p className="text-sm font-black text-on-surface">Crop preview</p>
                <CropSlider label="Posisi X" min="0" max="100" step="1" value={crop.x} onChange={(value) => setCropField('x', value)} />
                <CropSlider label="Posisi Y" min="0" max="100" step="1" value={crop.y} onChange={(value) => setCropField('y', value)} />
                <CropSlider label="Zoom" min="1" max="2" step="0.05" value={crop.zoom} onChange={(value) => setCropField('zoom', value)} />
              </div>
            </div>
          </div>
          <FoodInput label="Tags, pisahkan koma" value={form.tags} onChange={(value) => setField('tags', value)} />
          <div className="md:col-span-2 grid gap-2">
            <span className="text-sm font-black text-on-surface">Ingredients</span>
            <p className="text-xs font-bold leading-5 text-on-surface-variant">Tambah bahan untuk Smart Shopping List. Tidak wajib; biarkan kosong untuk menggunakan nama menu saja.</p>
            <div className="grid gap-2">
              {(form.ingredients || []).map((ing, idx) => (
                <div className="grid grid-cols-12 gap-2" key={idx}>
                  <input className="col-span-5 h-10 rounded-2xl border border-outline-variant/35 bg-white px-3 font-bold outline-none" placeholder="Nama bahan" value={ing.name || ''} onChange={(e) => updateIngredient(idx, 'name', e.target.value)} />
                  <input className="col-span-2 h-10 rounded-2xl border border-outline-variant/35 bg-white px-3 font-bold outline-none" type="number" min={0} value={ing.quantity == null ? '' : ing.quantity} onChange={(e) => updateIngredient(idx, 'quantity', Number(e.target.value))} />
                  <input className="col-span-3 h-10 rounded-2xl border border-outline-variant/35 bg-white px-3 font-bold outline-none" placeholder="Unit (e.g. gram)" value={ing.unit || ''} onChange={(e) => updateIngredient(idx, 'unit', e.target.value)} />
                  <input className="col-span-1 h-10 rounded-2xl border border-outline-variant/35 bg-white px-3 font-bold outline-none" placeholder="Cat" value={ing.category || ''} onChange={(e) => updateIngredient(idx, 'category', e.target.value)} />
                  <button type="button" className="col-span-1 rounded-2xl bg-error-red/10 px-2 font-black text-error-red" onClick={() => removeIngredient(idx)}>Hapus</button>
                </div>
              ))}
              <div>
                <button type="button" className="h-10 rounded-2xl bg-primary px-4 font-black text-white" onClick={addIngredient}>Tambah ingredient</button>
              </div>
            </div>
          </div>
        </div>

        {error && <p className="mt-5 rounded-2xl bg-error-red/10 px-4 py-3 text-sm font-bold text-error-red">{error}</p>}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button className="h-12 rounded-2xl bg-surface-container px-6 font-black text-on-surface transition hover:bg-surface-container-high" onClick={onClose} type="button">Batal</button>
          <button className="h-12 rounded-2xl bg-primary px-7 font-black text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 disabled:opacity-60" disabled={saving} type="submit">{saving ? 'Menyimpan...' : 'Simpan makanan'}</button>
        </div>
      </motion.form>
    </div>
  )
}

function CropSlider({ label, value, onChange, min, max, step }) {
  return (
    <label className="grid gap-2">
      <span className="flex items-center justify-between text-xs font-black uppercase tracking-wide text-on-surface-variant">
        {label}
        <b className="text-primary">{value}</b>
      </span>
      <input className="accent-primary" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function FoodInput({ label, value, onChange, type = 'text', required = false }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-on-surface">{label}</span>
      <input className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function GlassCard({ children, className = '' }) {
  return (
    <motion.section className={`rounded-[2rem] border border-outline-variant/40 bg-white/85 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl ${className}`} whileHover={{ y: -2 }} transition={{ duration: 0.25 }}>
      {children}
    </motion.section>
  )
}

function AppPageShell({ children, wide = false }) {
  return (
    <motion.main className={`mx-auto grid ${wide ? 'max-w-[1400px]' : 'max-w-[1280px]'} gap-7 px-5 py-7 pb-24 lg:px-8`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.main>
  )
}

export default memo(ProFoodsPage)
