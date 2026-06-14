import { memo, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { pageMotion } from '../lib/pageMotion'

function SplashPage() {
  useEffect(() => {
    document.title = 'Splash - NutriTrack'
    document.body.className = ''
  }, [])

  return (
    <motion.main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-100 px-6 font-['Plus_Jakarta_Sans']" {...pageMotion}>
      <motion.div className="absolute left-[12%] top-[18%] h-24 w-24 rounded-full bg-green-200/50 blur-2xl" animate={useReducedMotion() ? {} : { y: [0, -18, 0], scale: [1, 1.12, 1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-[16%] right-[14%] h-32 w-32 rounded-full bg-blue-200/60 blur-3xl" animate={useReducedMotion() ? {} : { y: [0, 18, 0], scale: [1, 1.1, 1] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.section className="relative z-10 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
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
    <motion.div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-[32px] bg-[#007a35] text-white shadow-2xl shadow-green-900/20" animate={reduceMotion ? { scale: 1, rotate: 0 } : { scale: [1, 1.08, 1], rotate: [0, 8, 0], rotateY: [0, 12, 0] }} transition={reduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}>
      <Sparkles className="absolute -right-3 -top-3 text-[#007a35]" fill="white" size={24} />
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
    <Link className={`inline-flex items-center gap-2 rounded-2xl bg-[#007a35] px-7 py-3 font-extrabold text-white shadow-xl shadow-green-900/15 transition hover:scale-105 active:scale-95 ${highlighted ? 'ring-4 ring-green-200' : ''}`} to="/onboarding" onClick={rememberSplash}>
      Lanjut Onboarding
      <ArrowRight size={18} />
    </Link>
  )
})

export default memo(SplashPage)
