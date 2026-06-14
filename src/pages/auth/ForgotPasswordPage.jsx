import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Loader2, Mail, ShieldCheck, Sparkles } from 'lucide-react'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submit(event) {
    event.preventDefault()
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setSuccess('')
      setError('Masukkan alamat email yang valid.')
      return
    }

    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      await requestPasswordReset(trimmedEmail)
      setSuccess('Jika email terdaftar, link reset sudah dikirim. Silakan cek inbox atau folder spam.')
    } catch (err) {
      setError(err.message || 'Gagal mengirim link reset. Coba lagi beberapa saat.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.main className="min-h-screen overflow-hidden bg-[#f8fafc] font-['Plus_Jakarta_Sans'] text-slate-950" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_520px]">
        <section className="relative hidden overflow-hidden bg-[#007a35] p-10 text-white lg:block">
          <img className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-soft-light" src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80" alt="" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#003f1d] via-[#007a35] to-[#22c55e]" />
          <motion.div className="absolute right-16 top-16 h-44 w-44 rounded-full border border-white/20" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="absolute bottom-20 left-20 h-64 w-64 rounded-[3rem] border border-white/20 bg-white/10 backdrop-blur-sm" animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <Link className="inline-flex w-fit items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-white/90" to="/">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#007a35]">N</span>
              NutriTrack
            </Link>
            <div className="max-w-xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur">
                <ShieldCheck size={18} />
                Secure recovery
              </p>
              <h1 className="font-black leading-tight tracking-tight text-[56px]">Reset akses akun dengan aman.</h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-white/82">Kami akan mengirim instruksi reset ke email yang terhubung dengan akun NutriTrack.</p>
            </div>
          </div>
        </section>

        <section className="relative flex items-center justify-center px-5 py-10 sm:px-8">
          <motion.div className="w-full max-w-[440px]" initial={{ opacity: 0, y: 24, rotateX: -6 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
            <Link className="mb-8 inline-flex items-center gap-2 rounded-xl font-bold text-[#007a35] transition hover:underline focus:outline-none focus:ring-4 focus:ring-green-900/10" to="/login">
              <ArrowLeft size={18} />
              Kembali ke login
            </Link>

            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
              <motion.div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-[#f0fdf4] text-[#007a35]" animate={{ y: [0, -4, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}>
                <Mail size={27} />
              </motion.div>

              <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#007a35]">
                <Sparkles size={15} />
                Account Recovery
              </p>
              <h1 className="text-3xl font-black tracking-tight text-slate-950">Lupa Kata Sandi</h1>
              <p className="mt-3 leading-7 text-slate-600">Masukkan email akun Anda. Link reset akan dikirim jika akun ditemukan.</p>

              <form className="mt-7 space-y-5" id="forgotForm" onSubmit={submit} noValidate>
                <label className="block" htmlFor="forgot-email">
                  <span className="text-sm font-bold text-slate-700">Email</span>
                  <span className={`mt-2 flex h-[52px] items-center gap-3 rounded-2xl border bg-slate-50 px-4 transition focus-within:border-[#007a35] focus-within:ring-4 focus-within:ring-green-900/10 ${error ? 'border-red-400' : 'border-slate-200'}`}>
                    <Mail className="h-5 w-5 shrink-0 text-slate-400" />
                    <input
                      className="min-w-0 flex-1 border-0 bg-transparent p-0 outline-none ring-0 focus:ring-0"
                      id="forgot-email"
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="nama@email.com"
                      autoComplete="email"
                      inputMode="email"
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? 'forgot-email-error' : success ? 'forgot-email-success' : undefined}
                    />
                  </span>
                  {error && <p className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-600" id="forgot-email-error" role="alert">{error}</p>}
                  {success && (
                    <p className="mt-2 flex items-start gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm font-bold text-[#007a35]" id="forgot-email-success" role="status">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" />
                      {success}
                    </p>
                  )}
                </label>

                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#007a35] font-extrabold text-white shadow-lg shadow-green-900/10 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-wait disabled:opacity-75" type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
                  {submitting ? 'Mengirim...' : 'Kirim Link Reset'}
                </button>
              </form>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.main>
  )
}

async function requestPasswordReset(email) {
  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    if (!response.ok) throw new Error('Permintaan reset belum bisa diproses.')
  } catch (err) {
    if (err instanceof TypeError) {
      await new Promise((resolve) => window.setTimeout(resolve, 360))
      return
    }
    throw err
  }
}

export default memo(ForgotPasswordPage)
