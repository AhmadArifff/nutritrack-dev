import { memo, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Apple, Check, Eye, EyeOff, KeyRound, Lock } from 'lucide-react'

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

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [password, setPassword] = useState('nutritrack')
  const [confirmation, setConfirmation] = useState('nutritrack')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const token = params.get('token') || 'demo-token'
  const strength = useMemo(() => getPasswordStrength(password), [password])

  useEffect(() => {
    document.title = 'Reset Password - NutriTrack'
    document.body.className = ''
  }, [])

  function submit(event) {
    event.preventDefault()
    if (!token) {
      setError('Token reset tidak ditemukan.')
      return
    }
    if (password.length < 8) {
      setError('Password minimal 8 karakter.')
      return
    }
    if (password !== confirmation) {
      setError('Konfirmasi password tidak sama.')
      return
    }

    setError('')
    setSubmitting(true)
    window.setTimeout(() => {
      setSuccess(true)
      setSubmitting(false)
      window.setTimeout(() => navigate('/login'), 650)
    }, 420)
  }

  return (
    <motion.main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f7fb] px-6 py-10 font-['Plus_Jakarta_Sans'] text-[#071727]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <div className="absolute left-[-8rem] top-[-8rem] h-72 w-72 rounded-full bg-[#e9f8ef] blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-10rem] h-80 w-80 rounded-full bg-blue-100 blur-3xl" />
      <motion.section className="relative z-10 w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.12)]" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
        <Link className="mb-8 inline-flex items-center gap-3" to="/" aria-label="Kembali ke halaman utama NutriTrack">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#007a35] text-white">
            <Apple size={24} />
          </span>
          <span className="text-2xl font-black text-[#007a35]">NutriTrack</span>
        </Link>

        <div className="mb-7">
          <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#e9f8ef] text-[#007a35]">
            <KeyRound size={28} />
          </div>
          <h1 className="mb-3 text-3xl font-black sm:text-4xl">Reset Kata Sandi</h1>
          <p className="leading-7 text-slate-600">Buat password baru untuk akun NutriTrack. Setelah tersimpan, kamu akan diarahkan kembali ke login.</p>
        </div>

        <form className="space-y-5" id="resetForm" onSubmit={submit} noValidate>
          <RecoveryPasswordInput id="new-password" label="Password baru" placeholder="Password baru" value={password} visible={showPassword} onChange={setPassword} onToggle={() => setShowPassword((current) => !current)} />
          <RecoveryPasswordInput id="confirm-password" label="Konfirmasi password" placeholder="Konfirmasi password" value={confirmation} visible={showConfirmation} onChange={setConfirmation} onToggle={() => setShowConfirmation((current) => !current)} />

          <PasswordStrength strength={strength} />

          {error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700" role="alert">{error}</p> : null}
          {success ? (
            <p className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-[#007a35]" role="status">
              <Check size={18} />
              Password berhasil diubah.
            </p>
          ) : null}

          <button className="h-12 w-full rounded-2xl bg-[#007a35] font-extrabold text-white shadow-lg shadow-green-900/10 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-wait disabled:opacity-75" type="submit" disabled={submitting || success}>
            {submitting ? 'Menyimpan...' : success ? 'Berhasil' : 'Simpan Password'}
          </button>
        </form>
      </motion.section>
    </motion.main>
  )
}

function RecoveryPasswordInput({ id, label, placeholder, value, visible, onChange, onToggle }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="sr-only">{label}</span>
      <span className="relative block">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-11 pr-12 outline-none transition focus:border-[#007a35] focus:ring-4 focus:ring-green-900/10" id={id} required type={visible ? 'text' : 'password'} placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} autoComplete="new-password" />
        <button className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#007a35]" type="button" aria-label={visible ? `Sembunyikan ${label}` : `Tampilkan ${label}`} onClick={onToggle}>
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </span>
    </label>
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

export default memo(ResetPasswordPage)
