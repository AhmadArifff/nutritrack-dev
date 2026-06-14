import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Filter, Heart, Plus, Search, SlidersHorizontal, Sparkles } from 'lucide-react'

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
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'nasi-ayam-panggang',
    name: 'Nasi Ayam Panggang',
    category: 'Lunch',
    calories: 520,
    protein: 34,
    carbs: 58,
    fat: 16,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'oatmeal-pisang',
    name: 'Oatmeal Pisang',
    category: 'Sarapan',
    calories: 290,
    protein: 10,
    carbs: 51,
    fat: 5,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'greek-yogurt-parfait',
    name: 'Greek Yogurt Parfait',
    category: 'Snack',
    calories: 240,
    protein: 18,
    carbs: 26,
    fat: 6,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'tempe-bakar',
    name: 'Tempe Bakar',
    category: 'Lunch',
    calories: 180,
    protein: 16,
    carbs: 12,
    fat: 8,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80'
  }
]

function formatNumber(value, fallback = '0') {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(number)
}

function ProFoodsPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const visibleFoods = useMemo(() => foodCatalog.filter((food) => activeCategory === 'Semua' || food.category === activeCategory), [activeCategory])

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
                <input className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm outline-none ring-0 focus:ring-0" placeholder="Search foods, calories, protein..." type="search" />
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
              <FoodCard food={food} index={index} key={food.id} />
            ))}

            <motion.button className="flex min-h-[286px] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-primary/40 bg-mint-surface p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-primary/10 active:scale-[0.98]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.32 }} type="button">
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
    </AppPageShell>
  )
}

function FoodCard({ food, index }) {
  const to = food.id === 'gado-gado' ? '/app/foods/gado-gado' : '/app/foods/gado-gado'

  return (
    <motion.article initial={{ opacity: 0, y: 18, rotateX: -5 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: index * 0.05, duration: 0.34 }} whileHover={{ y: -5, rotateX: 2 }}>
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
    </motion.article>
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
