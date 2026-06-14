import { memo } from 'react'
import { motion } from 'framer-motion'
import { Activity, Apple, Check, Droplets, Dumbbell, Edit3, Flame, Gauge, Lock, MapPin, Share2, Sparkles, TrendingUp, Trophy } from 'lucide-react'
import { apiRequest } from '../../api'
import { useBackendData } from '../../hooks/useBackendData'

const user = {
  name: 'Alex Rivera',
  location: 'San Francisco, CA',
  joined: 'Jan 2023',
  avatarUrl:
    '/assets/remote/remote-005-1b1a2cd48e.png',
  bannerUrl:
    '/assets/remote/remote-006-34c9c8c9d5.png',
  bio:
    'Nutrition enthusiast and marathon runner. Focused on high-protein plant-based diets and optimizing recovery times. Currently training for the Big Sur International Marathon.',
  tags: ['MarathonRunner', 'PlantBased', 'BioHacking']
}

function mapProfile(profile) {
  return {
    ...user,
    name: profile.full_name || profile.fullName || user.name,
    location: profile.location || user.location,
    joined: profile.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : user.joined,
    avatarUrl: profile.avatar_url || profile.avatarUrl || user.avatarUrl,
    currentWeightKg: profile.current_weight_kg || profile.currentWeightKg,
    targetWeightKg: profile.target_weight_kg || profile.targetWeightKg,
    targetCalories: profile.target_calories || profile.targetCalories,
    streakDays: profile.streak_days || profile.streakDays,
    totalPoints: profile.total_points || profile.totalPoints
  }
}

function ProProfilePage() {
  const { data: profileUser } = useBackendData(() => apiRequest('/api/profile').then(mapProfile), user, [])

  return (
    <motion.main className="mx-auto grid max-w-[1400px] gap-7 px-5 py-7 pb-24 lg:px-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      <ProfileHero user={profileUser} />

      <section className="grid gap-7 xl:grid-cols-12">
        <ProfileBioCard user={profileUser} />
        <ProfileHealthStatsCard user={profileUser} />
        <ProfileRecordsCard />
        <ProfileBadgesCard />
      </section>

      <ProfileWeeklyConsistency />

      <motion.button className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-energy-orange text-white shadow-[0_20px_50px_rgba(249,115,22,0.3)] transition-all hover:scale-110 active:scale-95 lg:bottom-8 lg:right-8" type="button" aria-label="Share profile" initial={{ scale: 0, rotate: -35 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.35, type: 'spring', stiffness: 220 }}>
        <Share2 className="h-6 w-6 transition-transform group-hover:rotate-12" />
        <span className="pointer-events-none absolute right-20 hidden -translate-x-4 whitespace-nowrap rounded-xl bg-on-surface px-5 py-2 text-sm font-bold text-white opacity-0 shadow-lg transition-all group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          Share Profile
        </span>
      </motion.button>
    </motion.main>
  )
}

function ProfileHero({ user }) {
  return (
    <section className="relative">
      <motion.div className="relative min-h-[430px] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(15,23,42,0.16)] sm:min-h-[380px]" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <img className="absolute inset-0 h-full w-full object-cover" src={user.bannerUrl} alt="Profile Banner" loading="lazy" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/75 via-black/28 to-transparent" />

        <motion.div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col gap-5 sm:bottom-8 sm:left-8 sm:right-8 sm:flex-row sm:items-end sm:gap-6" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.35 }}>
          <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-[2rem] border-4 border-white bg-surface shadow-xl sm:h-36 sm:w-36 sm:rounded-[2.5rem]">
            <img className="h-full w-full object-cover" src={user.avatarUrl} alt={user.name} loading="lazy" />
          </div>
          <div className="min-w-0 flex-1 space-y-2 pb-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-headline-lg text-3xl font-black text-white drop-shadow-lg md:text-5xl">{user.name}</h1>
              <span className="flex items-center gap-1 rounded-full border border-white/25 bg-white/20 px-3 py-1 text-[10px] font-bold tracking-widest text-white shadow-sm backdrop-blur-md">
                <Check size={14} />
                PRO MEMBER
              </span>
            </div>
            <p className="flex items-center gap-2 text-white/90 drop-shadow">
              <MapPin size={18} />
              {user.location} - Joined {user.joined}
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3 font-bold text-primary shadow-xl transition-all hover:scale-105 hover:bg-mint-surface active:scale-95" type="button" aria-label="Edit profile">
            <Edit3 size={20} />
            Edit Profile
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ProfileGlassCard({ children, className = '' }) {
  return (
    <motion.section className={`rounded-[2rem] border border-outline-variant/35 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-7 ${className}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34 }} whileHover={{ y: -4 }}>
      {children}
    </motion.section>
  )
}

function ProfileBioCard({ user }) {
  return (
    <ProfileGlassCard className="xl:col-span-4">
      <h2 className="mb-5 flex items-center gap-3 font-headline-md text-2xl font-black text-on-surface">
        <Activity className="text-primary" size={28} />
        Bio
      </h2>
      <p className="leading-7 text-on-surface-variant">{user.bio}</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {user.tags.map((tag) => (
          <span className="rounded-xl border border-primary/10 bg-mint-surface px-4 py-1.5 text-sm font-bold text-primary" key={tag}>#{tag}</span>
        ))}
      </div>
    </ProfileGlassCard>
  )
}

function ProfileHealthStatsCard({ user }) {
  const currentWeight = Number(user.currentWeightKg || 76.5)
  const targetWeight = Number(user.targetWeightKg || 74)
  const progress = Math.max(0, Math.min(100, Math.round((targetWeight / currentWeight) * 100)))
  return (
    <ProfileGlassCard className="xl:col-span-8">
      <h2 className="mb-8 flex items-center gap-3 font-headline-md text-2xl font-black text-on-surface">
        <Gauge className="text-energy-orange" size={28} />
        Health Stats at a Glance
      </h2>
      <div className="grid gap-7 md:grid-cols-[240px_minmax(0,1fr)]">
        <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-outline-variant/20 bg-surface-container-low p-6 text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-wider text-on-surface-variant">Current BMI</p>
          <ProfileBmiGauge value={22.4} progress={75} />
          <p className="mt-4 font-black text-primary">Healthy Range</p>
        </div>
        <div className="rounded-[1.5rem] border border-outline-variant/20 bg-surface-container-low p-6">
          <p className="mb-6 text-sm font-black uppercase tracking-wider text-on-surface-variant">Weight vs Goal</p>
          <div className="space-y-6">
            <div>
              <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row">
                <span className="text-lg font-black">Current: {currentWeight.toFixed(1)} kg</span>
                <span className="text-lg font-black text-energy-orange">Goal: {targetWeight.toFixed(1)} kg</span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-white">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-energy-orange" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.9, ease: 'easeOut' }} />
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 pt-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-2 shadow-sm">
                <TrendingUp className="text-primary" size={20} />
                <span className="font-bold">-2.5kg this month</span>
              </div>
              <span className="rounded-full bg-primary/10 px-4 py-2 font-black text-primary">{progress}% of Goal</span>
            </div>
          </div>
        </div>
      </div>
    </ProfileGlassCard>
  )
}

function ProfileBmiGauge({ value, progress }) {
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="h-28 w-28 -rotate-90">
        <circle className="text-white" cx="56" cy="56" fill="transparent" r={radius} stroke="currentColor" strokeWidth="10" />
        <motion.circle className="text-primary" cx="56" cy="56" fill="transparent" r={radius} stroke="currentColor" strokeDasharray={circumference} strokeLinecap="round" strokeWidth="10" initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 0.9, ease: 'easeOut' }} />
      </svg>
      <span className="absolute font-metrics-mono text-[34px] font-black text-primary">{value.toFixed(1)}</span>
    </div>
  )
}

function ProfileRecordsCard() {
  const records = [
    { label: 'Longest Streak', value: '42 Days', Icon: Flame, tone: ['rgba(249,115,22,0.1)', '#f97316'] },
    { label: 'Calories Burned', value: '1,240 kcal', Icon: Sparkles, tone: ['rgba(0,110,47,0.1)', '#006e2f'] },
    { label: 'Avg Daily Activity', value: '78 Minutes', Icon: Dumbbell, tone: ['rgba(168,85,247,0.1)', '#a855f7'] }
  ]
  return (
    <ProfileGlassCard className="border-l-8 border-energy-orange xl:col-span-5">
      <h2 className="mb-7 flex items-center gap-3 font-headline-md text-2xl font-black text-on-surface">
        <Trophy className="text-energy-orange" size={28} />
        Personal Records
      </h2>
      <div className="grid gap-4">
        {records.map(({ label, value, Icon, tone }) => (
          <div className="flex items-center gap-5 rounded-[1.5rem] bg-surface-container-low p-4 transition-colors hover:bg-surface-container" key={label}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: tone[0], color: tone[1] }}>
              <Icon size={28} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">{label}</p>
              <p className="font-headline-md text-2xl font-black text-on-surface">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </ProfileGlassCard>
  )
}

function ProfileBadgesCard() {
  const badges = [
    { label: 'Early Bird', title: 'Early Riser (10 Days)', Icon: Trophy, gradient: 'linear-gradient(135deg,#f97316,#eab308)' },
    { label: 'Veggies', title: 'Green Giant (50 Meals)', Icon: Apple, gradient: 'linear-gradient(135deg,#006e2f,#4ae176)' },
    { label: 'Master', title: 'Master (100 Days)', Icon: Trophy, gradient: 'linear-gradient(135deg,#a855f7,#0058be)' },
    { label: 'Hydrated', title: 'Hydration King', Icon: Droplets, gradient: 'linear-gradient(135deg,#60a5fa,#f97316)' }
  ]
  return (
    <ProfileGlassCard className="xl:col-span-7">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 font-headline-md text-2xl font-black text-on-surface">
          <Sparkles className="text-achievement-purple" size={28} />
          Badge Collection
        </h2>
        <button className="rounded-full bg-primary/10 px-4 py-2 font-black text-primary hover:underline" type="button">View All</button>
      </div>
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-5 sm:gap-8">
        {badges.map(({ label, title, Icon, gradient }) => (
          <div className="flex flex-col items-center gap-3" key={label}>
            <motion.div className="group relative flex h-20 w-20 cursor-help items-center justify-center rounded-full shadow-lg" style={{ background: gradient }} whileHover={{ y: -8, scale: 1.1 }}>
              <Icon className="h-10 w-10 text-white" />
              <div className="absolute -bottom-14 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg bg-on-surface px-3 py-1.5 text-[11px] text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">{title}</div>
            </motion.div>
            <p className="text-center text-xs font-black text-on-surface">{label}</p>
          </div>
        ))}
        <div className="flex flex-col items-center gap-3 opacity-40">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-outline">
            <Lock className="h-8 w-8 text-outline" />
          </div>
          <p className="text-center text-xs font-black text-on-surface-variant">Locked</p>
        </div>
      </div>
    </ProfileGlassCard>
  )
}

function ProfileWeeklyConsistency() {
  const days = [
    ['Mon', 80, 'primary'],
    ['Tue', 95, 'primary'],
    ['Wed', 40, 'missed'],
    ['Thu', 75, 'primary'],
    ['Fri', 90, 'primary'],
    ['Sat', 100, 'orange'],
    ['Sun', 65, 'primary']
  ]
  return (
    <ProfileGlassCard className="rounded-[2.5rem]">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-headline-md text-3xl font-black text-on-surface">Weekly Consistency</h2>
          <p className="text-on-surface-variant">Goal completion over the last 7 days</p>
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2.5">
            <span className="h-4 w-4 rounded-full bg-primary shadow-sm" />
            <span className="text-sm font-bold">Goal Met</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-4 w-4 rounded-full bg-surface-container shadow-sm" />
            <span className="text-sm font-bold">Missed</span>
          </div>
        </div>
      </div>
      <div className="flex h-56 items-end justify-between gap-4 px-1 sm:px-4">
        {days.map(([day, height, tone], index) => {
          const bg = tone === 'orange' ? 'rgba(249,115,22,0.4)' : tone === 'missed' ? 'rgba(229,238,255,0.5)' : 'rgba(0,110,47,0.2)'
          const hover = tone === 'orange' ? '#f97316' : tone === 'missed' ? '#e5eeff' : '#006e2f'
          return (
            <div className="group flex flex-1 flex-col items-center gap-4" key={day}>
              <motion.div className="w-full cursor-pointer rounded-t-2xl shadow-sm transition-colors" initial={{ height: 0 }} animate={{ height: `${height}%` }} style={{ backgroundColor: bg }} transition={{ delay: index * 0.12, duration: 0.8, ease: 'easeOut' }} onMouseEnter={(event) => { event.currentTarget.style.backgroundColor = hover }} onMouseLeave={(event) => { event.currentTarget.style.backgroundColor = bg }} />
              <span className={`text-sm font-bold ${tone === 'orange' ? 'text-energy-orange' : 'text-on-surface-variant'}`}>{day}</span>
            </div>
          )
        })}
      </div>
    </ProfileGlassCard>
  )
}

export default memo(ProProfilePage)
