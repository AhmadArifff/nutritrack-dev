import { memo, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Apple, ArrowLeft, Check, MailCheck, RefreshCcw } from 'lucide-react'
import { getStoredAuth } from '../../api'

function getInitialEmail(params) {
  const queryEmail = params.get('email')
  if (queryEmail) return queryEmail

  try {
    const authEmail = getStoredAuth()?.user?.email || getStoredAuth()?.email
    if (authEmail) return authEmail
    return localStorage.getItem('nutritrack.rememberedEmail') || 'alex@nutritrack.app'
  } catch {
    return 'alex@nutritrack.app'
  }
}

function VerifyEmailPage() {
  const [params] = useSearchParams()
  const email = useMemo(() => getInitialEmail(params), [params])
  const [countdown, setCountdown] = useState(60)
  const [resending, setResending] = useState(false)
  const [resent, setResent] = useState(false)

  useEffect(() => {
    document.title = 'Verify Email - NutriTrack'
    document.body.className = ''
  }, [])

  useEffect(() => {
    if (countdown <= 0) return undefined
    const timer = window.setTimeout(() => setCountdown((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearTimeout(timer)
  }, [countdown])

  function resendEmail() {
    if (countdown > 0 || resending) return
    setResending(true)
    setResent(false)
    window.setTimeout(() => {
      setResending(false)
      setResent(true)
      setCountdown(60)
    }, 520)
  }

  return (
    <motion.main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f7fb] px-6 py-10 font-['Plus_Jakarta_Sans'] text-[#071727]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="absolute left-[-8rem] top-[-8rem] h-72 w-72 rounded-full bg-[#e9f8ef] blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-10rem] h-80 w-80 rounded-full bg-blue-100 blur-3xl" />

      <motion.section className="relative z-10 w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)]" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
        <Link className="mb-8 inline-flex items-center gap-3" to="/" aria-label="Kembali ke halaman utama NutriTrack">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#007a35] text-white">
            <Apple size={24} />
          </span>
          <span className="text-2xl font-black text-[#007a35]">NutriTrack</span>
        </Link>

        <motion.div className="mx-auto mb-7 grid h-24 w-24 place-items-center rounded-[28px] bg-[#e9f8ef] text-[#007a35]" animate={{ y: [0, -7, 0], rotate: [0, 2, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}>
          <MailCheck size={48} />
        </motion.div>

        <h1 className="mb-3 text-3xl font-black sm:text-4xl">Cek email kamu</h1>
        <p className="mx-auto mb-7 max-w-sm leading-7 text-slate-600">
          Kami sudah mengirim link verifikasi ke <strong className="font-extrabold text-[#071727]">{email}</strong>.
        </p>

        <div className="grid gap-3">
          <Link className="flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#007a35] px-5 font-extrabold text-white shadow-lg shadow-green-900/20 transition hover:scale-[1.01] active:scale-[0.99]" to="/onboarding">
            <Check size={19} />
            Saya Sudah Verifikasi
          </Link>
          <Link className="flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 font-extrabold text-slate-700 transition hover:bg-slate-200 active:scale-[0.99]" to="/register">
            <ArrowLeft size={18} />
            Salah email? Kembali
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4" aria-live="polite">
          {countdown > 0 ? (
            <p className="text-sm font-bold text-slate-500">Kirim ulang email tersedia dalam {countdown} detik.</p>
          ) : (
            <button className="inline-flex items-center justify-center gap-2 font-extrabold text-[#007a35] transition hover:underline disabled:cursor-wait disabled:opacity-70" type="button" disabled={resending} onClick={resendEmail}>
              <RefreshCcw className={resending ? 'animate-spin' : ''} size={17} />
              {resending ? 'Mengirim ulang...' : 'Kirim ulang email'}
            </button>
          )}
          {resent ? <p className="mt-2 text-sm font-bold text-[#007a35]">Email verifikasi baru sudah dikirim.</p> : null}
        </div>
      </motion.section>
    </motion.main>
  )
}

export default memo(VerifyEmailPage)
