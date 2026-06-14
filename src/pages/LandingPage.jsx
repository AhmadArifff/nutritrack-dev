import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Activity, Apple, ArrowRight, BarChart3, Check, ChevronRight, Droplets, Flame, Menu, Shield, Sparkles, Star, TrendingUp, Utensils, X } from 'lucide-react'

const stats = [
  ['85%', 'Weekly consistency'],
  ['1,640', 'Calories left'],
  ['120g', 'Protein tracked']
]

const steps = [
  ['01', 'Buat profil nutrisi', 'Masukkan target, preferensi makan, alergi, dan gaya hidup.'],
  ['02', 'Log makanan harian', 'Cari makanan, atur porsi, dan pantau kalori real-time.'],
  ['03', 'Ikuti progres sehat', 'Lihat trend berat badan, makro, dan kebiasaan yang makin konsisten.']
]

const features = [
  ['AI meal planning', 'Rencana makan mingguan yang menjaga energi, protein, dan target kalori.', Sparkles],
  ['Macro dashboard', 'Ringkasan kalori, protein, karbohidrat, lemak, fiber, dan hidrasi.', BarChart3],
  ['Progress insight', 'Grafik berat badan, BMI, milestone, dan reminder kebiasaan sehat.', TrendingUp],
  ['Community boost', 'Challenge, streak, dan dukungan komunitas untuk menjaga motivasi.', Activity]
]

const testimonials = [
  ['Sarah K.', 'Meal prep jadi jauh lebih gampang. Saya bisa melihat sisa kalori tanpa ribet.', 'Lost 4.2 kg'],
  ['Dimas R.', 'Dashboardnya enak dibaca dan membantu saya menjaga protein harian.', 'Protein +31%'],
  ['Maya L.', 'Planner mingguan membuat belanja dan jadwal makan lebih rapi.', '21 day streak']
]

function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -50])

  useEffect(() => {
    document.title = 'NutriTrack - Pro Companion'
    document.body.className = 'bg-background text-on-surface font-sans overflow-x-hidden'
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div className="min-h-screen bg-background text-on-surface" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="fixed left-0 top-0 z-[80] h-1 origin-left bg-primary" style={{ scaleX: progressScale }} />
      <header className={`sticky top-0 z-[70] border-b border-outline-variant/25 bg-surface/85 backdrop-blur-xl transition-shadow ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link className="flex items-center gap-3" to="/">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-sm">
              <Apple size={22} />
            </span>
            <span>
              <strong className="block font-headline-md text-xl font-black text-primary">NutriTrack</strong>
              <small className="block text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant/60">Pro Companion</small>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-bold text-on-surface-variant md:flex">
            {['Fitur', 'Cara Kerja', 'Testimoni'].map((item) => (
              <a className="transition hover:text-primary" href={`#${item.toLowerCase().replace(' ', '-')}`} key={item}>{item}</a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link className="rounded-xl px-4 py-2 font-bold text-primary transition hover:bg-mint-surface" to="/login">Login</Link>
            <Link className="rounded-xl bg-primary px-5 py-2.5 font-bold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 active:scale-[0.98]" to="/register">Mulai Gratis</Link>
          </div>

          <button className="grid h-11 w-11 place-items-center rounded-xl bg-surface-container text-on-surface md:hidden" onClick={() => setMobileOpen((value) => !value)} type="button" aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
        {mobileOpen && (
          <div className="border-t border-outline-variant/20 bg-white p-5 md:hidden">
            <div className="grid gap-3">
              {['Fitur', 'Cara Kerja', 'Testimoni'].map((item) => (
                <a className="rounded-xl bg-surface-container-low px-4 py-3 font-bold text-on-surface" href={`#${item.toLowerCase().replace(' ', '-')}`} key={item} onClick={() => setMobileOpen(false)}>{item}</a>
              ))}
              <Link className="rounded-xl bg-primary px-4 py-3 text-center font-bold text-white" to="/register">Mulai Gratis</Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1fr_520px] lg:px-8 lg:py-24">
            <motion.div className="flex flex-col justify-center" style={{ y: heroY }}>
              <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-mint-surface px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-primary">
                <Shield size={16} />
                React PWA Nutrition Companion
              </p>
              <h1 className="font-headline-xl text-[44px] font-black leading-[1.08] text-on-background md:text-[64px]">
                Track nutrition with a dashboard that feels alive.
              </h1>
              <p className="mt-6 max-w-2xl text-body-lg leading-8 text-on-surface-variant">NutriTrack membantu Anda merencanakan makanan, mencatat kalori, membaca makro, dan menjaga progres kesehatan dalam satu aplikasi PWA yang cepat.</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-primary px-7 font-black text-white shadow-xl shadow-primary/20 transition hover:-translate-y-1 active:scale-[0.98]" to="/register">
                  Mulai Perjalananku
                  <ArrowRight size={20} />
                </Link>
                <Link className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-outline-variant/40 bg-white px-7 font-black text-on-surface shadow-sm transition hover:bg-surface-container" to="/login">
                  Lihat Demo
                  <ChevronRight size={20} />
                </Link>
              </div>
              <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
                {stats.map(([value, label], index) => (
                  <motion.div className="rounded-2xl border border-outline-variant/35 bg-white/80 p-4 shadow-sm backdrop-blur" key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + index * 0.06 }}>
                    <p className="font-metrics-mono text-xl font-black text-primary">{value}</p>
                    <p className="mt-1 text-xs font-bold text-on-surface-variant">{label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <HeroPreview />
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-3 lg:px-8" id="fitur">
          <motion.div className="rounded-[2rem] border border-outline-variant/35 bg-white/85 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl md:col-span-2" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
            <p className="mb-2 font-bold text-primary">Daily Fuel</p>
            <h2 className="font-headline-lg text-headline-lg font-black text-on-surface">Small choices compound into visible progress.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-on-surface-variant">Keep your dinner balanced and hydration on track to protect today&apos;s calorie target.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Protein', '120g / 180g', '#9e4036'],
                ['Carbs', '210g / 300g', '#0058be'],
                ['Fiber', '22g / 35g', '#006e2f']
              ].map(([label, value, color], index) => (
                <div className="rounded-2xl bg-surface-container-low p-4" key={label}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <b>{label}</b>
                    <span className="font-metrics-mono text-xs font-black text-on-surface-variant">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-container">
                    <motion.div className="h-full rounded-full" style={{ backgroundColor: color, transformOrigin: 'left center' }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 0.68 + index * 0.05 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="rounded-[2rem] bg-primary p-8 text-white shadow-2xl shadow-primary/20" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} whileHover={{ y: -5 }}>
            <Flame className="mb-8 h-12 w-12" />
            <p className="font-metrics-mono text-5xl font-black">2.4kg</p>
            <p className="mt-3 text-white/85">lost in the last 30 days with consistent meal logging.</p>
          </motion.div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8" id="cara-kerja">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 font-bold text-primary">How it works</p>
            <h2 className="font-headline-lg text-headline-lg font-black text-on-surface">Mulai rapi dalam tiga langkah.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(([number, title, body], index) => (
              <motion.article className="relative rounded-[2rem] border border-outline-variant/35 bg-white/85 p-7 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.08 }} whileHover={{ y: -5 }}>
                <span className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-xl font-black text-white shadow-xl shadow-primary/20">{number}</span>
                <h3 className="font-headline-md text-xl font-black text-on-surface">{title}</h3>
                <p className="mt-3 leading-7 text-on-surface-variant">{body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="bg-surface-container-low py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[420px_1fr] lg:px-8">
            <div>
              <p className="mb-2 font-bold text-primary">Features</p>
              <h2 className="font-headline-lg text-headline-lg font-black text-on-surface">Built for daily nutrition work.</h2>
              <p className="mt-4 leading-7 text-on-surface-variant">Tampilan mengikuti dashboard HTML NutriTrack, tetapi struktur React dibuat modular dan siap scale.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {features.map(([title, body, Icon], index) => (
                <motion.article className="rounded-[1.75rem] border border-outline-variant/35 bg-white/85 p-6 shadow-sm backdrop-blur-xl" key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -4 }}>
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-mint-surface text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-headline-md text-xl font-black text-on-surface">{title}</h3>
                  <p className="mt-3 leading-7 text-on-surface-variant">{body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8" id="testimoni">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 font-bold text-primary">Testimonials</p>
              <h2 className="font-headline-lg text-headline-lg font-black text-on-surface">Loved by people building better habits.</h2>
            </div>
            <div className="flex gap-1 text-warning-yellow" aria-label="5 star rating">
              {[0, 1, 2, 3, 4].map((item) => <Star key={item} size={20} fill="currentColor" />)}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map(([name, quote, result], index) => (
              <motion.article className="rounded-[2rem] border border-outline-variant/35 bg-white/85 p-7 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" key={name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ y: -4 }}>
                <p className="leading-7 text-on-surface-variant">"{quote}"</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <b className="text-on-surface">{name}</b>
                  <span className="rounded-full bg-mint-surface px-3 py-1 text-xs font-black text-primary">{result}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
          <motion.div className="overflow-hidden rounded-[3rem] bg-primary p-8 text-center text-white shadow-2xl shadow-primary/20 md:p-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -4 }}>
            <h2 className="mx-auto max-w-3xl font-headline-lg text-4xl font-black">Ready to make nutrition tracking feel calmer?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/85">Mulai dari onboarding, masuk ke dashboard, lalu catat makanan pertama Anda hari ini.</p>
            <Link className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-white px-8 font-black text-primary shadow-xl transition hover:scale-105 active:scale-[0.98]" to="/register">
              Mulai Gratis
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </section>
      </main>

      <LandingFooter />
    </motion.div>
  )
}

function HeroPreview() {
  return (
    <motion.div className="relative" initial={{ opacity: 0, y: 28, rotateX: -6 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      <motion.div className="absolute -right-5 top-12 z-10 rounded-[1.5rem] border border-white/60 bg-white/85 p-4 shadow-2xl backdrop-blur-xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-energy-orange/10 text-energy-orange"><Flame size={22} /></span>
          <div>
            <p className="font-metrics-mono font-black text-on-surface">650</p>
            <p className="text-xs font-bold text-on-surface-variant">remaining</p>
          </div>
        </div>
      </motion.div>
      <div className="overflow-hidden rounded-[2.5rem] border border-outline-variant/35 bg-white/90 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
        <img className="h-64 w-full rounded-[2rem] object-cover" src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80" alt="Healthy nutrition bowl" loading="lazy" />
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-headline-md text-2xl font-black text-on-surface">Quinoa Power Bowl</p>
            <p className="mt-2 text-on-surface-variant">Balanced lunch - 680 kcal</p>
          </div>
          <span className="rounded-full bg-mint-surface px-3 py-1 text-xs font-black text-primary">Logged</span>
        </div>
        <div className="mt-6 grid gap-3">
          {[
            ['Protein', '44g', '#9e4036'],
            ['Carbs', '58g', '#0058be'],
            ['Hydration', '6/8', '#006e2f']
          ].map(([label, value, color], index) => (
            <div className="rounded-2xl bg-surface-container-low p-4" key={label}>
              <div className="flex items-center justify-between text-sm font-bold">
                <span>{label}</span>
                <span className="font-metrics-mono">{value}</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-surface-container">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: color, transformOrigin: 'left center' }} initial={{ scaleX: 0 }} animate={{ scaleX: 0.65 + index * 0.08 }} transition={{ delay: 0.35 + index * 0.08, duration: 0.8 }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[Utensils, Droplets, Check].map((Icon, index) => (
            <div className="grid h-12 place-items-center rounded-2xl bg-mint-surface text-primary" key={index}>
              <Icon size={20} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function LandingFooter() {
  return (
    <footer className="border-t border-outline-variant/25 bg-surface-container px-5 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Link className="flex items-center gap-3" to="/">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white">
            <Apple size={22} />
          </span>
          <span className="font-headline-md text-xl font-black text-primary">NutriTrack</span>
        </Link>
        <div className="flex flex-wrap gap-6 text-sm font-bold text-on-surface-variant">
          <Link className="hover:text-primary" to="/privacy">Privacy</Link>
          <Link className="hover:text-primary" to="/terms">Terms</Link>
          <Link className="hover:text-primary" to="/help">Help Center</Link>
        </div>
      </div>
    </footer>
  )
}

export default memo(LandingPage)
