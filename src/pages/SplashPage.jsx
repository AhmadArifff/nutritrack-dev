import { memo, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { pageMotion } from '../lib/pageMotion'

function SplashPage() {
  useEffect(() => {
    document.title = 'Splash - NutriTrack'
    document.body.className = ''
  }, [])

  return (
    <motion.main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-100 px-6 font-['Plus_Jakarta_Sans']" {...pageMotion}>
      <motion.section className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <SplashLogo />
        <motion.h1 className="mb-3 text-4xl font-black text-[#007a35]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>NutriTrack</motion.h1>
        <motion.p className="mb-8 text-slate-600" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>Halo, Alex. Mari mulai perjalanan sehatmu.</motion.p>
        <SplashCta />
      </motion.section>
    </motion.main>
  )
}

const SplashLogo = memo(function SplashLogo() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-[32px] bg-[#007a35] text-white shadow-2xl shadow-green-900/20" animate={reduceMotion ? { scale: 1, rotate: 0 } : { scale: [1, 1.08, 1], rotate: [0, 8, 0] }} transition={reduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}>
      <span className="material-symbols-outlined text-7xl" aria-hidden="true">nutrition</span>
    </motion.div>
  )
})

const SplashCta = memo(function SplashCta() {
  const [highlighted, setHighlighted] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setHighlighted(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  const rememberSplash = useCallback(() => {
    try {
      localStorage.setItem('nutritrack.hasSeenSplash', 'true')
    } catch {
      // Splash should continue even when storage is unavailable.
    }
  }, [])

  return (
    <Link className={`inline-flex rounded-2xl bg-[#007a35] px-7 py-3 font-extrabold text-white transition hover:scale-105 active:scale-95 ${highlighted ? 'ring-4 ring-green-200' : ''}`} to="/onboarding" onClick={rememberSplash}>
      Lanjut Onboarding
    </Link>
  )
})

export default memo(SplashPage)
