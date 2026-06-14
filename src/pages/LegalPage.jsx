import { memo, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Apple, FileText, Lock, Shield, Sparkles } from 'lucide-react'
import { pageMotion } from '../lib/pageMotion'
import { legalDocuments } from '../models/LegalDocument'

function LegalPage({ type }) {
  const page = useMemo(() => legalDocuments[type] ?? legalDocuments.privacy, [type])

  useEffect(() => {
    document.title = page.documentTitle
    document.body.className = ''
  }, [page.documentTitle])

  return (
    <motion.div className="min-h-screen bg-surface font-['Plus_Jakarta_Sans'] text-on-surface" {...pageMotion}>
      <LegalHeader active={page.type} secondaryLink={page.secondaryLink} />
      <main className="mx-auto grid max-w-5xl gap-8 px-6 py-14">
        <motion.section className="overflow-hidden rounded-[2rem] border border-outline-variant/35 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
          <div className="grid gap-8 bg-gradient-to-br from-mint-surface via-white to-secondary-fixed/45 p-7 md:grid-cols-[minmax(0,1fr)_180px] md:p-8">
            <div>
              <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-primary">{page.label}</p>
              <h1 className="mb-5 text-4xl font-black md:text-5xl">{page.title}</h1>
              <p className="max-w-3xl text-lg leading-8 text-on-surface-variant">{page.intro}</p>
            </div>
            <motion.div className="hidden place-items-center md:grid" animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="grid h-40 w-40 place-items-center rounded-[2rem] bg-white/80 text-primary shadow-xl shadow-primary/10">
                {page.type === 'privacy' ? <Shield size={68} /> : <FileText size={68} />}
              </div>
            </motion.div>
          </div>
        </motion.section>
        {page.disclaimer && <LegalDisclaimer {...page.disclaimer} />}
        <div className="grid gap-5">
          {page.sections.map(([title, body], index) => (
            <LegalSectionCard title={title} body={body} index={index} key={title} />
          ))}
        </div>
        <motion.div className="rounded-[2rem] border border-outline-variant/35 bg-white/80 p-5 text-sm leading-6 text-on-surface-variant shadow-sm" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.34 }}>
          Berlaku untuk pengalaman NutriTrack PWA. Untuk bantuan terkait akun, keamanan, atau data kesehatan, masuk ke Help Center setelah login.
        </motion.div>
      </main>
    </motion.div>
  )
}

const LegalHeader = memo(function LegalHeader({ secondaryLink }) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-outline-variant/30 bg-white/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
        <Link className="flex items-center gap-3 text-primary transition hover:text-on-primary-container" to="/">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white">
            <Apple size={22} />
          </span>
          <span className="text-2xl font-black">NutriTrack</span>
        </Link>
        <nav className="flex gap-5 text-sm font-bold" aria-label="Navigasi legal">
          <Link className="transition hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/10" to="/login">Login</Link>
          <Link className="transition hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/10" to={secondaryLink.to}>{secondaryLink.label}</Link>
        </nav>
      </div>
    </header>
  )
})

const LegalDisclaimer = memo(function LegalDisclaimer({ title, body }) {
  return (
    <motion.div className="rounded-[2rem] border border-energy-orange/20 bg-energy-orange/10 p-5 text-on-surface" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34 }}>
      <p className="font-black text-energy-orange">{title}</p>
      <p className="mt-1 text-sm leading-6 text-on-surface-variant">{body}</p>
    </motion.div>
  )
})

const LegalSectionCard = memo(function LegalSectionCard({ title, body, index }) {
  const icons = [Shield, Lock, Sparkles]
  const Icon = icons[index % icons.length]
  return (
    <motion.section className="rounded-[2rem] border border-outline-variant/35 bg-white/90 p-7 shadow-[0_12px_28px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-md" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.34 }} whileHover={{ y: -4 }}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-black">{title}</h2>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint-surface text-primary">
          <Icon size={20} />
        </span>
      </div>
      <p className="leading-7 text-on-surface-variant">{body}</p>
    </motion.section>
  )
})

export default memo(LegalPage)
