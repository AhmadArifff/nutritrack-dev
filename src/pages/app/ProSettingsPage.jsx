import { memo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Check, ChevronRight, CreditCard, Download, Eye, LogOut, Mail, MessageCircle, Moon, Settings, Shield, Smartphone, Sparkles, Sun } from 'lucide-react'
import { apiRequest } from '../../api'

const fallbackSettings = {
  notifications: { push: true, email: true, sms: false },
  privacy: { profileVisibility: 'friends', dataSharing: false },
  account: { plan: 'Pro', language: 'English', theme: 'system' }
}

function ProSettingsPage() {
  const [settings, setSettings] = useState(fallbackSettings)
  const [themeMode, setThemeMode] = useState('system')
  const [language, setLanguage] = useState('English')
  const [toast, setToast] = useState('')

  useEffect(() => {
    let active = true
    apiRequest('/api/settings')
      .then((result) => {
        if (!active) return
        const next = { ...fallbackSettings, ...(result || {}) }
        setSettings(next)
        setThemeMode(next.account?.theme || 'system')
        setLanguage(next.account?.language || 'English')
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  function showToast(message) {
    setToast(message)
    window.clearTimeout(showToast.timer)
    showToast.timer = window.setTimeout(() => setToast(''), 2200)
  }

  async function persist(nextSettings, message) {
    setSettings(nextSettings)
    showToast(message)
    try {
      await apiRequest('/api/settings', { method: 'PUT', body: nextSettings })
    } catch {
      showToast('Preferensi disimpan secara lokal.')
    }
  }

  const notificationRows = [
    ['push', 'Push notifications', 'Meal reminders, streak alerts, and quick nudges.', Smartphone, settings.notifications.push],
    ['email', 'Email summaries', 'Weekly report and nutrition insights in your inbox.', Mail, settings.notifications.email],
    ['sms', 'SMS reminders', 'Short reminders for critical check-ins only.', MessageCircle, settings.notifications.sms]
  ]

  return (
    <motion.main className="mx-auto grid max-w-[1320px] gap-7 px-5 py-7 pb-24 lg:px-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      <section className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_370px]">
        <motion.div className="overflow-hidden rounded-[2rem] border border-outline-variant/35 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.34 }}>
          <div className="grid gap-8 bg-gradient-to-br from-mint-surface via-white to-secondary-fixed/45 p-6 md:grid-cols-[minmax(0,1fr)_220px] md:p-8">
            <div>
              <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary">Settings</span>
              <h2 className="mt-5 font-headline-lg text-4xl font-black leading-tight text-on-surface md:text-5xl">Personalize the NutriTrack experience without changing your core data.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-on-surface-variant">Account, notification, security, and plan controls stay spacious and consistent with the rest of the dashboard layout.</p>
            </div>
            <motion.div className="grid place-items-center" animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="grid h-44 w-44 place-items-center rounded-[2rem] border border-white/60 bg-white/75 shadow-2xl shadow-primary/10 backdrop-blur-xl">
                <Settings className="text-primary" size={74} />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.aside className="rounded-[2rem] border border-outline-variant/35 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12, duration: 0.34 }}>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-energy-orange">Subscription</p>
          <h3 className="mt-2 font-headline-md text-3xl font-black text-on-surface">{settings.account?.plan || 'Pro'} Plan</h3>
          <p className="mt-3 leading-7 text-on-surface-variant">AI meal planning, macro insights, and community challenges are active.</p>
          <div className="mt-6 rounded-2xl bg-mint-surface p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 text-primary" size={20} />
              <p className="text-sm leading-6 text-on-surface-variant">Upgrade messaging now has readable contrast and no overlapping button layers.</p>
            </div>
          </div>
          <button className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-black text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 active:scale-95" type="button" onClick={() => showToast('Plan management opened.')}>
            <CreditCard size={19} />
            Manage plan
          </button>
        </motion.aside>
      </section>

      <section className="grid gap-7 xl:grid-cols-2">
        <SettingsCard eyebrow="General" title="App preferences" icon={Sun}>
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-black text-on-surface">Language</span>
              <select className="h-12 rounded-2xl border border-outline-variant/45 bg-surface-container-low px-4 font-bold text-on-surface outline-none transition focus:border-primary focus:bg-white" value={language} onChange={(event) => {
                const nextLanguage = event.target.value
                setLanguage(nextLanguage)
                persist({ ...settings, account: { ...settings.account, language: nextLanguage } }, 'Language preference updated.')
              }}>
                <option>English</option>
                <option>Bahasa Indonesia</option>
                <option>Spanish</option>
              </select>
            </label>

            <div>
              <p className="mb-3 text-sm font-black text-on-surface">Theme mode</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ['light', 'Light', Sun],
                  ['dark', 'Dark', Moon],
                  ['system', 'System', Settings]
                ].map(([id, label, Icon]) => (
                  <button className={`flex h-12 items-center justify-center gap-2 rounded-2xl border px-4 font-black transition active:scale-95 ${themeMode === id ? 'border-primary bg-primary text-white shadow-lg shadow-primary/15' : 'border-outline-variant/35 bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`} key={id} onClick={() => {
                    setThemeMode(id)
                    persist({ ...settings, account: { ...settings.account, theme: id } }, `${label} theme selected.`)
                  }} type="button">
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SettingsCard>

        <SettingsCard eyebrow="Notifications" title="Reminder channels" icon={Bell}>
          <div className="grid gap-4">
            {notificationRows.map(([key, title, body, Icon, active]) => (
              <div className="flex items-center gap-4 rounded-2xl bg-surface-container-low p-4" key={key}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                  <Icon size={21} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-black text-on-surface">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-on-surface-variant">{body}</p>
                </div>
                <SettingsSwitch checked={active} onChange={() => {
                  const nextSettings = {
                    ...settings,
                    notifications: { ...settings.notifications, [key]: !active }
                  }
                  persist(nextSettings, `${title} updated.`)
                }} />
              </div>
            ))}
          </div>
        </SettingsCard>
      </section>

      <section className="grid gap-7 xl:grid-cols-3">
        <SettingsActionCard title="Privacy" body="Control profile visibility and nutrition data sharing." Icon={Eye} action="Review privacy" />
        <SettingsActionCard title="Security" body="Password, active sessions, and trusted devices." Icon={Shield} action="Open security" />
        <SettingsActionCard title="Data export" body="Download your meal logs, progress data, and reports." Icon={Download} action="Export data" />
      </section>

      <motion.button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-error/20 bg-error-container px-5 font-black text-error shadow-sm transition hover:-translate-y-0.5 md:w-max" type="button" whileTap={{ scale: 0.96 }} onClick={() => showToast('Logout tersedia dari menu profile header.')}>
        <LogOut size={19} />
        Logout
      </motion.button>

      {toast ? (
        <motion.div className="fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full bg-on-surface px-5 py-3 font-bold text-white shadow-2xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}>
          <Check size={18} />
          {toast}
        </motion.div>
      ) : null}
    </motion.main>
  )
}

function SettingsCard({ eyebrow, title, icon: Icon, children }) {
  return (
    <motion.section className="rounded-[2rem] border border-outline-variant/35 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl md:p-7" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34 }} whileHover={{ y: -3 }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          <h3 className="mt-2 font-headline-md text-3xl font-black text-on-surface">{title}</h3>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint-surface text-primary">
          <Icon size={22} />
        </span>
      </div>
      {children}
    </motion.section>
  )
}

function SettingsActionCard({ title, body, Icon, action }) {
  return (
    <motion.article className="rounded-[2rem] border border-outline-variant/35 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34 }} whileHover={{ y: -4 }}>
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-container-low text-primary">
        <Icon size={22} />
      </span>
      <h3 className="mt-5 font-headline-md text-2xl font-black text-on-surface">{title}</h3>
      <p className="mt-2 leading-7 text-on-surface-variant">{body}</p>
      <button className="mt-6 inline-flex items-center gap-2 font-black text-primary" type="button">
        {action}
        <ChevronRight size={18} />
      </button>
    </motion.article>
  )
}

function SettingsSwitch({ checked, onChange }) {
  return (
    <button className={`relative h-8 w-14 shrink-0 rounded-full transition ${checked ? 'bg-primary' : 'bg-outline-variant/50'}`} onClick={onChange} type="button" aria-pressed={checked}>
      <motion.span className="absolute top-1 grid h-6 w-6 place-items-center rounded-full bg-white text-primary shadow-md" animate={{ left: checked ? 26 : 4 }} transition={{ type: 'spring', stiffness: 420, damping: 28 }}>
        {checked ? <Check size={14} /> : null}
      </motion.span>
    </button>
  )
}

export default memo(ProSettingsPage)
