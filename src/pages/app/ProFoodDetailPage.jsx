import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Heart, Plus, Scale, Sparkles, Utensils } from 'lucide-react'

const food = {
  id: 'gado-gado',
  name: 'Gado-Gado',
  category: 'Indonesian',
  tags: ['Vegetarian friendly', 'High fiber', 'Balanced lunch'],
  description: 'Sayuran rebus, tahu, tempe, telur, dan saus kacang. Cocok untuk makan siang kaya serat dengan energi yang stabil.',
  servingLabel: 'plate',
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
  calories: 320,
  protein: 12,
  carbs: 38,
  fat: 14,
  nutrients: [
    ['Fiber', '8g'],
    ['Calcium', '12%'],
    ['Iron', '15%'],
    ['Sodium', '420mg'],
    ['Potassium', '510mg'],
    ['Sugar', '7g'],
    ['Cholesterol', '118mg'],
    ['Vitamin C', '28%']
  ],
  ingredients: ['Kangkung', 'Tauge', 'Tahu', 'Tempe', 'Telur', 'Saus kacang']
}

function formatNumber(value, fallback = '0') {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(number)
}

function ProFoodDetailPage() {
  const [portion, setPortion] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const summary = useMemo(() => [
    ['Kalori', Math.round(food.calories * portion), 'text-primary'],
    ['Protein', `${formatNumber(food.protein * portion)}g`, 'text-on-surface'],
    ['Carbs', `${formatNumber(food.carbs * portion)}g`, 'text-[#0058be]'],
    ['Fat', `${formatNumber(food.fat * portion)}g`, 'text-energy-orange']
  ], [portion])

  return (
    <AppPageShell>
      <div className="mx-auto w-full max-w-[1200px] space-y-8 pb-28">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.28 }}>
          <Link className="inline-flex h-11 items-center gap-2 rounded-2xl bg-surface-container-low px-4 font-bold text-primary transition-colors hover:bg-mint-surface" to="/app/foods">
            <ArrowLeft size={20} />
            Kembali ke database
          </Link>
        </motion.div>

        <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_480px]">
          <motion.div className="group relative min-h-[420px] overflow-hidden rounded-[2.5rem] border border-outline-variant/30 bg-mint-surface shadow-xl md:min-h-[540px]" initial={{ opacity: 0, scale: 0.98, rotateX: -5 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} transition={{ duration: 0.42 }} whileHover={{ y: -4 }}>
            <img className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={food.image} alt={food.name} loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-3 inline-flex rounded-full bg-white/90 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-primary backdrop-blur">{food.category}</p>
                <h1 className="font-headline-lg text-[42px] font-black leading-none text-white drop-shadow-lg md:text-[56px]">{food.name}</h1>
              </div>
              <button className={`grid h-14 w-14 place-items-center rounded-2xl shadow-lg backdrop-blur transition-all active:scale-95 ${isFavorite ? 'bg-primary text-white' : 'bg-white/90 text-on-surface hover:text-primary'}`} type="button" aria-label="Simpan favorit" aria-pressed={isFavorite} onClick={() => setIsFavorite((value) => !value)}>
                <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </motion.div>

          <GlassCard className="p-6 md:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              {food.tags.map((tag) => (
                <span className="rounded-full border border-primary/10 bg-mint-surface px-3 py-1 text-xs font-black uppercase tracking-wider text-primary" key={tag}>{tag}</span>
              ))}
            </div>
            <h2 className="font-headline-lg text-3xl font-black text-on-surface">Nutrition facts</h2>
            <p className="mt-4 leading-7 text-on-surface-variant">{food.description}</p>

            <div className="my-8 grid grid-cols-2 gap-4">
              {summary.map(([label, value, tone], index) => (
                <motion.div className="rounded-2xl bg-surface-container-low p-4" key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <span className="text-sm font-bold text-on-surface-variant">{label}</span>
                  <b className={`mt-1 block font-metrics-mono text-2xl font-black ${tone}`}>{value}</b>
                </motion.div>
              ))}
            </div>

            <label className="mb-6 block rounded-2xl border border-outline-variant/30 bg-white p-5" htmlFor="portion-slider">
              <span className="flex items-center justify-between gap-3 font-black">
                <span className="inline-flex items-center gap-2 text-on-surface"><Scale size={19} /> Porsi</span>
                <span className="font-metrics-mono text-primary">{formatNumber(portion)} {food.servingLabel}</span>
              </span>
              <input className="mt-4 w-full accent-primary" id="portion-slider" type="range" min="1" max="3" step="0.5" value={portion} onChange={(event) => setPortion(Number(event.target.value))} />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary font-extrabold text-white shadow-[0_14px_30px_rgba(0,110,47,0.18)] transition-all hover:-translate-y-0.5 active:scale-[0.98]" to={`/app/log-food?foodId=${food.id}&portion=${portion}`}>
                <Plus size={19} />
                Tambah ke Log
              </Link>
              <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-surface-container font-extrabold text-on-surface transition-all hover:bg-surface-container-high active:scale-[0.98]" type="button">
                <Sparkles size={19} />
                Smart Swap
              </button>
            </div>
          </GlassCard>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <GlassCard className="p-6 md:p-8">
            <h2 className="mb-6 font-headline-md text-headline-md font-bold text-on-surface">Tabel Nutrisi Lengkap</h2>
            <div className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              {food.nutrients.map(([name, value], index) => (
                <motion.div className="rounded-2xl border border-outline-variant/30 bg-white p-4 font-bold text-on-surface shadow-sm" key={name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.035 }}>
                  <span className="block text-on-surface-variant">{name}</span>
                  <b className="mt-1 block font-metrics-mono text-lg text-primary">{value}</b>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-mint-surface text-primary">
              <Utensils size={24} />
            </div>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Ingredients</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {food.ingredients.map((ingredient) => (
                <span className="rounded-xl bg-surface-container-low px-4 py-2 text-sm font-bold text-on-surface" key={ingredient}>{ingredient}</span>
              ))}
            </div>
            <div className="mt-7 rounded-2xl bg-mint-surface p-5">
              <div className="flex items-center gap-2 font-black text-primary">
                <Check size={18} />
                Balanced choice
              </div>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">Cocok untuk hari dengan target protein sedang dan kebutuhan serat tinggi.</p>
            </div>
          </GlassCard>
        </section>
      </div>
    </AppPageShell>
  )
}

function GlassCard({ children, className = '' }) {
  return (
    <motion.section className={`rounded-[2rem] border border-outline-variant/40 bg-white/85 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl ${className}`} whileHover={{ y: -2 }} transition={{ duration: 0.25 }}>
      {children}
    </motion.section>
  )
}

function AppPageShell({ children }) {
  return (
    <motion.main className="mx-auto grid max-w-[1280px] gap-7 px-5 py-7 pb-24 lg:px-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.main>
  )
}

export default memo(ProFoodDetailPage)
