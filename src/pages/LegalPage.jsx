import { memo, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageMotion } from '../lib/pageMotion'
import { legalDocuments } from '../models/LegalDocument'

function LegalPage({ type }) {
  const page = useMemo(() => legalDocuments[type] ?? legalDocuments.privacy, [type])

  useEffect(() => {
    document.title = page.documentTitle
    document.body.className = ''
  }, [page.documentTitle])

  return (
    <motion.div className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans'] text-slate-900" {...pageMotion}>
      <LegalHeader active={page.type} secondaryLink={page.secondaryLink} />
      <main className="mx-auto max-w-5xl px-6 py-14">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.28em] text-green-700">{page.label}</p>
          <h1 className="mb-6 text-4xl font-black">{page.title}</h1>
          <p className="mb-10 max-w-3xl text-slate-600">{page.intro}</p>
        </motion.div>
        {page.disclaimer && <LegalDisclaimer {...page.disclaimer} />}
        <div className="grid gap-5">
          {page.sections.map(([title, body], index) => (
            <LegalSectionCard title={title} body={body} index={index} key={title} />
          ))}
        </div>
      </main>
    </motion.div>
  )
}

const LegalHeader = memo(function LegalHeader({ secondaryLink }) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-white">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
        <Link className="text-2xl font-black text-green-700 transition hover:text-green-800" to="/">NutriTrack</Link>
        <nav className="flex gap-5 text-sm font-bold" aria-label="Navigasi legal">
          <Link className="transition hover:text-green-700 focus:outline-none focus:ring-4 focus:ring-green-200" to="/login">Login</Link>
          <Link className="transition hover:text-green-700 focus:outline-none focus:ring-4 focus:ring-green-200" to={secondaryLink.to}>{secondaryLink.label}</Link>
        </nav>
      </div>
    </header>
  )
})

const LegalDisclaimer = memo(function LegalDisclaimer({ title, body }) {
  return (
    <motion.div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-900" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34 }}>
      <p className="font-bold">{title}</p>
      <p className="mt-1 text-sm">{body}</p>
    </motion.div>
  )
})

const LegalSectionCard = memo(function LegalSectionCard({ title, body, index }) {
  return (
    <motion.section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.34 }} whileHover={{ y: -4 }}>
      <h2 className="mb-3 text-xl font-black">{title}</h2>
      <p className="text-slate-600">{body}</p>
    </motion.section>
  )
})

export default memo(LegalPage)
