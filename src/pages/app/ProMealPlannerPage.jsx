import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, Check, Plus, ShoppingBasket, Sparkles, Utensils } from 'lucide-react'

const days = [
  {
    day: 'Monday',
    date: 'Oct 23',
    calories: '2,120 kcal',
    tone: 'bg-mint-surface border-primary/10',
    meals: [
      ['Breakfast', 'Avocado Toast with Poached Egg', '420 kcal - 18g Protein'],
      ['Lunch', 'Quinoa & Roasted Veggie Bowl', '580 kcal - 22g Protein'],
      ['Dinner', 'Salmon Rice Bowl', '760 kcal - 44g Protein']
    ]
  },
  {
    day: 'Tuesday',
    date: 'Oct 24',
    calories: '0 kcal',
    tone: 'bg-surface-container-low border-outline-variant/30',
    meals: []
  },
  {
    day: 'Wednesday',
    date: 'Oct 25',
    calories: '2,240 kcal',
    tone: 'bg-mint-surface border-primary/10',
    meals: [
      ['Breakfast', 'Greek Yogurt Parfait', '390 kcal - 28g Protein'],
      ['Lunch', 'Turkey & Swiss Wrap', '610 kcal - 36g Protein'],
      ['Dinner', 'Beef Stir-fry with Ginger', '720 kcal - 42g Protein']
    ]
  }
]

function ProMealPlannerPage() {
  return (
    <AppPageShell wide>
      <div className="space-y-8 pb-28">
        <section className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <motion.div className="rounded-[2rem] border border-outline-variant/40 bg-white/80 p-7 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl md:p-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
            <p className="mb-2 text-label-md font-bold text-primary">Weekly Summary</p>
            <h2 className="font-headline-lg text-[32px] font-black leading-tight text-on-surface">Meal Architecture</h2>
            <p className="mt-3 max-w-3xl leading-7 text-on-surface-variant">Precision nutrition tailored for your vitality. Manage your week&apos;s macros and energy levels with AI-assisted planning.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-5 font-black text-white shadow-[0_14px_30px_rgba(0,110,47,0.18)] transition hover:-translate-y-0.5 active:scale-[0.98]" to="/app/log-food">
                <Plus size={20} />
                Add Meals
              </Link>
              <button className="inline-flex h-12 items-center gap-2 rounded-2xl border border-outline-variant/40 bg-white px-5 font-black text-on-surface transition hover:bg-surface-container active:scale-[0.98]" type="button">
                <Sparkles size={20} />
                Generate Plan
              </button>
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <MetricCard value="2,450" label="Target Kcal" tone="text-energy-orange" delay={0.06} />
            <MetricCard value="185g" label="Protein Goal" tone="text-primary" delay={0.12} />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          {days.map((day, index) => (
            <motion.article className="overflow-hidden rounded-[2rem] border border-outline-variant/35 bg-white/85 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" key={day.day} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.36 }} whileHover={{ y: -4 }}>
              <header className={`flex min-h-28 items-center justify-between gap-4 border-b px-6 py-5 ${day.tone}`}>
                <div>
                  <p className="font-label-md text-label-md font-black uppercase tracking-[0.2em] text-primary">{day.day}</p>
                  <h3 className="mt-1 text-lg font-black text-on-surface">{day.date}</h3>
                </div>
                <span className="rounded-full bg-primary px-4 py-1.5 font-metrics-mono text-sm font-black text-white shadow-sm">{day.calories}</span>
              </header>
              <div className="min-h-[360px] space-y-4 p-6">
                {day.meals.length ? (
                  day.meals.map(([type, title, meta]) => (
                    <div className="group rounded-2xl border border-outline-variant/35 bg-white p-5 transition hover:border-primary/25 hover:shadow-lg" key={title}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-on-surface-variant">{type}</p>
                          <h4 className="mt-3 font-headline-md text-lg font-black text-on-surface">{title}</h4>
                          <p className="mt-2 text-on-surface-variant">{meta}</p>
                        </div>
                        <Check className="h-5 w-5 shrink-0 text-primary opacity-0 transition group-hover:opacity-100" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="grid h-[310px] place-items-center rounded-[1.5rem] border border-dashed border-outline-variant/50 bg-surface-container-lowest/70 p-8 text-center">
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
                )}
              </div>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            ['Shopping List', 'Produce, protein, pantry, and supplements grouped for the next grocery run.', ShoppingBasket],
            ['Prep Blocks', 'Batch cooking reminders keep dinner balanced before the day gets busy.', CalendarDays],
            ['Smart Swaps', 'Alternative meals preserve calories while adjusting texture and preference.', Sparkles]
          ].map(([title, body, Icon], index) => (
            <motion.article className="rounded-[2rem] border border-outline-variant/40 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" key={title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + index * 0.06, duration: 0.34 }} whileHover={{ y: -4 }}>
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-mint-surface text-primary">
                <Icon size={24} />
              </div>
              <h3 className="font-headline-md text-xl font-black text-on-surface">{title}</h3>
              <p className="mt-3 leading-7 text-on-surface-variant">{body}</p>
            </motion.article>
          ))}
        </section>
      </div>
    </AppPageShell>
  )
}

function MetricCard({ value, label, tone, delay }) {
  return (
    <motion.div className="rounded-[1.75rem] border border-outline-variant/35 bg-white/85 p-6 text-center shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" initial={{ opacity: 0, y: 18, rotateX: -8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay, duration: 0.36 }} whileHover={{ y: -4, rotateX: 3 }}>
      <p className={`font-metrics-mono text-3xl font-black ${tone}`}>{value}</p>
      <p className="mt-2 text-label-md font-black uppercase text-on-surface-variant">{label}</p>
    </motion.div>
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
