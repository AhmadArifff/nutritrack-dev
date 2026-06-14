import { memo, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Activity, Apple, Bell, CalendarDays, Check, ChevronRight, Clock, Dumbbell, Flame, Sparkles, Target, Utensils } from 'lucide-react'

const initialProfile = {
  fullName: 'Alex Rivera',
  age: 29,
  heightCm: 178,
  weightKg: 78.5,
  program: 'lose_weight',
  targetWeightKg: 70,
  pacePerWeekKg: 0.5,
  activityLevel: 'moderate',
  foodPreferences: ['Halal Only', 'Masakan Indonesia'],
  allergyStatus: 'Tidak ada alergi',
  dietType: 'Omnivora',
  notificationsEnabled: true,
  mealSchedule: { breakfast: '07:30', lunch: '12:30', dinner: '19:00' }
}

const programs = [
  ['lose_weight', 'Lose weight', 'Balanced calorie deficit with protein protection.', Flame],
  ['maintain', 'Maintain', 'Keep energy stable while improving food quality.', Activity],
  ['gain_muscle', 'Gain muscle', 'Higher protein and strength-friendly timing.', Dumbbell]
]

const activityLevels = [
  ['light', 'Light', 'Desk work and 1-2 workouts weekly.'],
  ['moderate', 'Moderate', 'Regular walking plus 3-4 workouts.'],
  ['active', 'Active', 'High activity or structured training most days.']
]

const preferenceOptions = ['Halal Only', 'Masakan Indonesia', 'High Protein', 'Low Sugar', 'Vegetarian', 'Meal Prep']

function calculateOnboardingTargets(profile) {
  const weight = Number(profile.weightKg) || 75
  const height = Number(profile.heightCm) || 170
  const age = Number(profile.age) || 28
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5
  const activityFactor = { light: 1.35, moderate: 1.55, active: 1.75 }[profile.activityLevel] || 1.55
  const maintenance = bmr * activityFactor
  const targetCalories = profile.program === 'lose_weight' ? maintenance - 420 : profile.program === 'gain_muscle' ? maintenance + 260 : maintenance
  return {
    calories: Math.round(targetCalories / 50) * 50,
    protein: Math.round(weight * 1.7),
    carbs: Math.round((targetCalories * 0.4) / 4),
    fats: Math.round((targetCalories * 0.28) / 9)
  }
}

function calculateOnboardingProgress(profile) {
  const fields = [
    profile.fullName,
    profile.age,
    profile.heightCm,
    profile.weightKg,
    profile.targetWeightKg,
    profile.program,
    profile.activityLevel,
    profile.dietType,
    profile.allergyStatus,
    profile.mealSchedule.breakfast,
    profile.mealSchedule.lunch,
    profile.mealSchedule.dinner
  ]
  const filled = fields.filter(Boolean).length + Math.min(profile.foodPreferences.length, 3)
  return Math.min(100, Math.round((filled / 15) * 100))
}

function OnboardingPage() {
  const [profile, setProfile] = useState(() => {
    try {
      return { ...initialProfile, ...(JSON.parse(localStorage.getItem('nutritrack.onboarding') || 'null') || {}) }
    } catch {
      return initialProfile
    }
  })
  const { scrollYProgress } = useScroll()
  const summaryY = useTransform(scrollYProgress, [0, 1], [0, 52])
  const summaryScale = useTransform(scrollYProgress, [0, 1], [1, 0.985])
  const targets = useMemo(() => calculateOnboardingTargets(profile), [profile])
  const progress = useMemo(() => calculateOnboardingProgress(profile), [profile])

  useEffect(() => {
    localStorage.setItem('nutritrack.onboarding', JSON.stringify(profile))
  }, [profile])

  function updateProfile(key, value) {
    setProfile((current) => ({ ...current, [key]: value }))
  }

  function updateSchedule(key, value) {
    setProfile((current) => ({ ...current, mealSchedule: { ...current.mealSchedule, [key]: value } }))
  }

  function togglePreference(value) {
    setProfile((current) => {
      const hasPreference = current.foodPreferences.includes(value)
      return {
        ...current,
        foodPreferences: hasPreference
          ? current.foodPreferences.filter((item) => item !== value)
          : [...current.foodPreferences, value]
      }
    })
  }

  return (
    <motion.main className="min-h-screen bg-surface text-on-surface" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.32 }}>
      <header className="sticky top-0 z-40 border-b border-outline-variant/30 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <Link className="flex items-center gap-3" to="/">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-white">
              <Apple size={24} />
            </span>
            <span>
              <strong className="block font-headline-md text-xl font-black text-primary">NutriTrack</strong>
              <small className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Onboarding</small>
            </span>
          </Link>
          <Link className="hidden rounded-2xl border border-outline-variant/35 bg-white px-5 py-3 font-black text-on-surface transition hover:bg-surface-container-low md:inline-flex" to="/app/dashboard">
            Skip
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1280px] gap-8 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:px-8">
        <div className="grid gap-7">
          <motion.section className="overflow-hidden rounded-[2.25rem] border border-outline-variant/35 bg-white shadow-[0_22px_55px_rgba(15,23,42,0.08)]" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }}>
            <div className="grid gap-8 bg-gradient-to-br from-mint-surface via-white to-secondary-fixed/45 p-6 md:grid-cols-[minmax(0,1fr)_250px] md:p-8">
              <div>
                <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary">Setup journey</span>
                <h1 className="mt-5 font-headline-lg text-4xl font-black leading-tight text-on-surface md:text-6xl">Build a nutrition plan that actually fits your day.</h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-on-surface-variant">Isi data inti, pilih preferensi makanan, lalu NutriTrack menyiapkan target harian yang mengikuti pola hidupmu.</p>
              </div>
              <motion.div className="hidden place-items-center md:grid" animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="grid h-52 w-52 place-items-center rounded-[2rem] border border-white/65 bg-white/75 shadow-2xl shadow-primary/10 backdrop-blur-xl">
                  <Target className="text-primary" size={82} />
                </div>
              </motion.div>
            </div>
          </motion.section>

          <OnboardingCard eyebrow="Step 1" title="Personal metrics" icon={Activity}>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Full name" value={profile.fullName} onChange={(value) => updateProfile('fullName', value)} />
              <NumberField label="Age" value={profile.age} onChange={(value) => updateProfile('age', value)} suffix="years" />
              <NumberField label="Height" value={profile.heightCm} onChange={(value) => updateProfile('heightCm', value)} suffix="cm" />
              <NumberField label="Current weight" value={profile.weightKg} onChange={(value) => updateProfile('weightKg', value)} suffix="kg" />
            </div>
          </OnboardingCard>

          <OnboardingCard eyebrow="Step 2" title="Goal and activity" icon={Dumbbell}>
            <div className="grid gap-4 lg:grid-cols-3">
              {programs.map(([id, label, body, Icon]) => (
                <ChoiceButton active={profile.program === id} body={body} Icon={Icon} key={id} label={label} onClick={() => updateProfile('program', id)} />
              ))}
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <NumberField label="Target weight" value={profile.targetWeightKg} onChange={(value) => updateProfile('targetWeightKg', value)} suffix="kg" />
              <NumberField label="Weekly pace" value={profile.pacePerWeekKg} onChange={(value) => updateProfile('pacePerWeekKg', value)} suffix="kg/week" step="0.1" />
            </div>
            <div className="mt-5 grid gap-3">
              {activityLevels.map(([id, label, body]) => (
                <button className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition active:scale-[0.99] ${profile.activityLevel === id ? 'border-primary bg-mint-surface shadow-md shadow-primary/10' : 'border-outline-variant/35 bg-surface-container-low hover:bg-white'}`} key={id} onClick={() => updateProfile('activityLevel', id)} type="button">
                  <span>
                    <strong className="block text-on-surface">{label}</strong>
                    <small className="mt-1 block text-sm leading-6 text-on-surface-variant">{body}</small>
                  </span>
                  {profile.activityLevel === id ? <Check className="text-primary" size={21} /> : null}
                </button>
              ))}
            </div>
          </OnboardingCard>

          <OnboardingCard eyebrow="Step 3" title="Food preferences" icon={Utensils}>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Diet type" value={profile.dietType} onChange={(value) => updateProfile('dietType', value)} />
              <TextField label="Allergy status" value={profile.allergyStatus} onChange={(value) => updateProfile('allergyStatus', value)} />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {preferenceOptions.map((item) => (
                <button className={`rounded-2xl border px-4 py-3 font-black transition active:scale-95 ${profile.foodPreferences.includes(item) ? 'border-primary bg-primary text-white shadow-lg shadow-primary/15' : 'border-outline-variant/35 bg-surface-container-low text-on-surface-variant hover:bg-white'}`} key={item} onClick={() => togglePreference(item)} type="button">
                  {item}
                </button>
              ))}
            </div>
          </OnboardingCard>

          <OnboardingCard eyebrow="Step 4" title="Meal rhythm" icon={CalendarDays}>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['breakfast', 'Breakfast'],
                ['lunch', 'Lunch'],
                ['dinner', 'Dinner']
              ].map(([key, label]) => (
                <label className="grid gap-2" key={key}>
                  <span className="text-sm font-black text-on-surface">{label}</span>
                  <span className="flex h-12 items-center gap-3 rounded-2xl border border-outline-variant/35 bg-surface-container-low px-4 focus-within:border-primary focus-within:bg-white">
                    <Clock size={18} className="text-primary" />
                    <input className="min-w-0 flex-1 bg-transparent font-black text-on-surface outline-none" type="time" value={profile.mealSchedule[key]} onChange={(event) => updateSchedule(key, event.target.value)} />
                  </span>
                </label>
              ))}
            </div>
            <button className={`mt-5 flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition active:scale-[0.99] ${profile.notificationsEnabled ? 'border-primary bg-mint-surface' : 'border-outline-variant/35 bg-surface-container-low'}`} onClick={() => updateProfile('notificationsEnabled', !profile.notificationsEnabled)} type="button">
              <span className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                  <Bell size={20} />
                </span>
                <span>
                  <strong className="block text-on-surface">Meal reminders</strong>
                  <small className="mt-1 block text-sm text-on-surface-variant">Aktifkan notifikasi agar jadwal makan tidak terlewat.</small>
                </span>
              </span>
              {profile.notificationsEnabled ? <Check className="text-primary" size={22} /> : null}
            </button>
          </OnboardingCard>
        </div>

        <motion.aside className="lg:sticky lg:top-28 lg:self-start" style={{ y: summaryY, scale: summaryScale }}>
          <motion.div className="overflow-hidden rounded-[2.25rem] border border-outline-variant/35 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.36 }}>
            <div className="bg-gradient-to-br from-primary to-on-primary-container p-6 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Rencana siap</p>
                  <h2 className="mt-2 font-headline-md text-3xl font-black">Target harian</h2>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
                  <Sparkles size={26} />
                </div>
              </div>
              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/20">
                <motion.div className="h-full rounded-full bg-white" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.7, ease: 'easeOut' }} />
              </div>
              <p className="mt-3 text-sm font-bold text-white/80">{progress}% setup complete</p>
            </div>
            <div className="grid gap-3 p-5">
              {[
                ['Kalori', `${targets.calories.toLocaleString('en-US')} kcal`, Flame],
                ['Protein', `${targets.protein} g`, Dumbbell],
                ['Karbohidrat', `${targets.carbs} g`, Apple],
                ['Lemak', `${targets.fats} g`, DropletsIcon]
              ].map(([label, value, Icon]) => (
                <div className="flex items-center gap-4 rounded-2xl bg-surface-container-low p-4" key={label}>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                    <Icon size={20} />
                  </span>
                  <span>
                    <small className="block text-xs font-black uppercase tracking-[0.16em] text-on-surface-variant">{label}</small>
                    <strong className="mt-1 block text-xl text-on-surface">{value}</strong>
                  </span>
                </div>
              ))}
              <Link className="mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-black text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 active:scale-95" to="/app/dashboard">
                Mulai Perjalananku
                <ChevronRight size={20} />
              </Link>
            </div>
          </motion.div>
        </motion.aside>
      </section>
    </motion.main>
  )
}

function DropletsIcon(props) {
  return <Flame {...props} />
}

function OnboardingCard({ eyebrow, title, icon: Icon, children }) {
  return (
    <motion.section className="rounded-[2rem] border border-outline-variant/35 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-7" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.34 }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          <h2 className="mt-2 font-headline-md text-3xl font-black text-on-surface">{title}</h2>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint-surface text-primary">
          <Icon size={22} />
        </span>
      </div>
      {children}
    </motion.section>
  )
}

function TextField({ label, value, onChange }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-on-surface">{label}</span>
      <input className="h-12 rounded-2xl border border-outline-variant/35 bg-surface-container-low px-4 font-bold text-on-surface outline-none transition focus:border-primary focus:bg-white" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function NumberField({ label, value, onChange, suffix, step = '1' }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-on-surface">{label}</span>
      <span className="flex h-12 items-center gap-3 rounded-2xl border border-outline-variant/35 bg-surface-container-low px-4 focus-within:border-primary focus-within:bg-white">
        <input className="min-w-0 flex-1 bg-transparent font-black text-on-surface outline-none" type="number" step={step} value={value} onChange={(event) => onChange(event.target.value)} />
        <small className="font-bold text-on-surface-variant">{suffix}</small>
      </span>
    </label>
  )
}

function ChoiceButton({ active, label, body, Icon, onClick }) {
  return (
    <motion.button className={`rounded-2xl border p-4 text-left transition active:scale-[0.98] ${active ? 'border-primary bg-mint-surface shadow-md shadow-primary/10' : 'border-outline-variant/35 bg-surface-container-low hover:bg-white'}`} onClick={onClick} type="button" whileHover={{ y: -3 }}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
          <Icon size={20} />
        </span>
        {active ? <Check className="text-primary" size={20} /> : null}
      </div>
      <strong className="block text-on-surface">{label}</strong>
      <small className="mt-2 block text-sm leading-6 text-on-surface-variant">{body}</small>
    </motion.button>
  )
}

export default memo(OnboardingPage)
