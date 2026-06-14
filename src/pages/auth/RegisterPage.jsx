import { memo, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Apple, Check, ChevronRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { register } from '../../api'

function getPasswordStrength(password) {
  let score = 0
  if (!password) return 0
  if (password.length >= 8) score += 2
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1
  return Math.min(score, 5)
}

function validate(values) {
  const errors = {}
  if (!values.fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi.'
  if (!values.email.trim()) errors.email = 'Email wajib diisi.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Format email tidak valid.'
  if (values.password.length < 8) errors.password = 'Password minimal 8 karakter.'
  if (values.password !== values.confirmPassword) errors.confirmPassword = 'Konfirmasi password tidak sama.'
  if (!values.agreed) errors.agreed = 'Persetujuan syarat dan privasi wajib dicentang.'
  return errors
}

function RegisterPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    fullName: 'Alex Carter',
    email: 'alex@nutritrack.app',
    password: 'nutritrack',
    confirmPassword: 'nutritrack',
    agreed: true
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [touched, setTouched] = useState({})
  const errors = useMemo(() => validate(values), [values])
  const strength = getPasswordStrength(values.password)

  useEffect(() => {
    document.title = 'Register - NutriTrack'
    document.body.className = ''
  }, [])

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
  }

  async function submit(event) {
    event.preventDefault()
    setSubmitted(true)
    setFormError('')
    if (Object.keys(errors).length) return

    setSubmitting(true)
    try {
      await register(values.fullName.trim(), values.email.trim(), values.password)
      navigate('/verify-email')
    } catch (err) {
      const isDemo = values.email.trim() === 'alex@nutritrack.app' && values.password === 'nutritrack'
      if (isDemo) navigate('/verify-email')
      else setFormError(err.message || 'Registrasi gagal. Coba lagi sebentar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.main className="min-h-screen bg-[#f4f7fb] font-['Plus_Jakarta_Sans'] text-[#071727]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative hidden items-end overflow-hidden bg-cover bg-center lg:flex" style={{ backgroundImage: "linear-gradient(180deg, rgba(7,23,39,0.08), rgba(7,23,39,0.78)), url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1500&q=80')" }}>
          <Link className="absolute left-8 top-8 flex items-center gap-3 text-white" to="/">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#007a35]">
              <Apple size={24} />
            </span>
            <span>
              <strong className="block text-2xl font-black leading-none">NutriTrack</strong>
              <small className="block text-[10px] uppercase tracking-[0.28em] text-white/70">Pro Companion</small>
            </span>
          </Link>
          <motion.div className="max-w-2xl p-12 text-white" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.32em] text-green-200">Start smart</p>
            <h1 className="mb-5 text-5xl font-black leading-tight">Bangun rutinitas makan sehat dari hari pertama.</h1>
            <p className="text-lg leading-8 text-white/82">Daftar untuk menyimpan target, meal planner, food log, progress, dan rekomendasi personal dalam satu PWA NutriTrack.</p>
          </motion.div>
        </section>

        <section className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-2xl">
            <Link className="mb-8 inline-flex items-center gap-3 lg:hidden" to="/">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#007a35] text-white">
                <Apple size={24} />
              </span>
              <span>
                <strong className="block text-2xl font-black leading-none text-[#007a35]">NutriTrack</strong>
                <small className="block text-[10px] uppercase tracking-[0.28em] text-slate-500">Pro Companion</small>
              </span>
            </Link>

            <motion.div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-8" initial={{ opacity: 0, y: 18, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}>
              <div className="mb-7 flex items-center justify-between gap-4">
                {[1, 2, 3].map((step) => (
                  <div className="flex flex-1 items-center gap-3" key={step}>
                    <span className={`grid h-9 w-9 place-items-center rounded-full text-sm font-black ${step === 1 ? 'bg-[#007a35] text-white shadow-lg shadow-green-900/20' : 'bg-[#e9f8ef] text-[#007a35]'}`}>{step}</span>
                    {step < 3 ? <span className="h-1 flex-1 rounded-full bg-[#e9f8ef]" /> : null}
                  </div>
                ))}
              </div>

              <div className="mb-7">
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.26em] text-[#007a35]">Create account</p>
                <h1 className="mb-3 text-3xl font-black tracking-tight md:text-4xl">Mulai perjalanan sehatmu</h1>
                <p className="text-slate-500">Isi data dasar untuk membuat akun NutriTrack dan lanjut ke verifikasi email.</p>
              </div>

              <form className="space-y-5" onSubmit={submit} noValidate>
                <div className="grid gap-4 md:grid-cols-2">
                  <AuthField error={(submitted || touched.fullName) && errors.fullName} icon={User} label="Nama Lengkap">
                    <input className={`h-12 w-full rounded-2xl border bg-slate-50 pl-11 pr-4 outline-none transition focus:border-[#007a35] focus:ring-4 focus:ring-green-900/10 ${((submitted || touched.fullName) && errors.fullName) ? 'border-red-400' : 'border-slate-200'}`} value={values.fullName} onBlur={() => setTouched((current) => ({ ...current, fullName: true }))} onChange={(event) => update('fullName', event.target.value)} autoComplete="name" />
                  </AuthField>
                  <AuthField error={(submitted || touched.email) && errors.email} icon={Mail} label="Email">
                    <input className={`h-12 w-full rounded-2xl border bg-slate-50 pl-11 pr-4 outline-none transition focus:border-[#007a35] focus:ring-4 focus:ring-green-900/10 ${((submitted || touched.email) && errors.email) ? 'border-red-400' : 'border-slate-200'}`} type="email" value={values.email} onBlur={() => setTouched((current) => ({ ...current, email: true }))} onChange={(event) => update('email', event.target.value)} autoComplete="email" />
                  </AuthField>
                  <AuthField error={(submitted || touched.password) && errors.password} icon={Lock} label="Password">
                    <PasswordInput shown={showPassword} value={values.password} onBlur={() => setTouched((current) => ({ ...current, password: true }))} onChange={(value) => update('password', value)} onToggle={() => setShowPassword((current) => !current)} />
                  </AuthField>
                  <AuthField error={(submitted || touched.confirmPassword) && errors.confirmPassword} icon={Lock} label="Konfirmasi Kata Sandi">
                    <PasswordInput shown={showConfirmPassword} value={values.confirmPassword} onBlur={() => setTouched((current) => ({ ...current, confirmPassword: true }))} onChange={(value) => update('confirmPassword', value)} onToggle={() => setShowConfirmPassword((current) => !current)} />
                  </AuthField>
                </div>

                <PasswordStrength strength={strength} />

                <label className={`flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6 transition ${submitted && errors.agreed ? 'border-red-300 bg-red-50 text-red-700' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                  <input className="mt-1 rounded border-slate-300 text-[#007a35] focus:ring-[#007a35]" type="checkbox" checked={values.agreed} onChange={(event) => update('agreed', event.target.checked)} />
                  <span>Saya setuju dengan <Link className="font-extrabold text-[#007a35]" to="/terms">Syarat</Link> dan <Link className="font-extrabold text-[#007a35]" to="/privacy">Privasi</Link> NutriTrack.</span>
                </label>

                {formError ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">{formError}</p> : null}

                <button className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#007a35] font-extrabold text-white shadow-lg shadow-green-900/20 transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-wait disabled:opacity-75" type="submit" disabled={submitting}>
                  {submitting ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                  <ChevronRight size={20} />
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-slate-600">Sudah punya akun? <Link className="font-extrabold text-[#007a35]" to="/login">Masuk</Link></p>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.main>
  )
}

function AuthField({ label, icon: Icon, children, error }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <span className="relative mt-2 block">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        {children}
      </span>
      {error ? <p className="mt-2 text-sm font-bold text-red-600">{error}</p> : null}
    </label>
  )
}

function PasswordInput({ value, shown, onChange, onBlur, onToggle }) {
  return (
    <>
      <input className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-12 outline-none transition focus:border-[#007a35] focus:ring-4 focus:ring-green-900/10" type={shown ? 'text' : 'password'} value={value} onBlur={onBlur} onChange={(event) => onChange(event.target.value)} autoComplete="new-password" />
      <button className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#007a35]" type="button" aria-label={shown ? 'Sembunyikan password' : 'Tampilkan password'} onClick={onToggle}>
        {shown ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </>
  )
}

function PasswordStrength({ strength }) {
  const label = strength >= 5 ? 'Kuat' : strength >= 3 ? 'Cukup' : 'Lemah'
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-bold text-slate-600">Kekuatan password</span>
        <strong className="text-[#007a35]">{label}</strong>
      </div>
      <div className="grid grid-cols-5 gap-2" aria-label={`Kekuatan password ${strength} dari 5`}>
        {[0, 1, 2, 3, 4].map((item) => (
          <motion.span className={`h-2 rounded-full ${item < strength ? 'bg-[#007a35]' : 'bg-slate-200'}`} key={item} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: item * 0.04, duration: 0.22 }} />
        ))}
      </div>
    </div>
  )
}

export default memo(RegisterPage)
