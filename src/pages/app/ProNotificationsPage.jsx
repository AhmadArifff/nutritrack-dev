import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart3, Bell, Check, Share2, Trophy, Utensils, Users } from 'lucide-react'
import { apiRequest } from '../../api'
import { useBackendData } from '../../hooks/useBackendData'

const notificationItems = [
  {
    id: 'meal-lunch',
    type: 'reminders',
    section: 'Meal Reminders',
    sectionTone: 'text-primary',
    title: 'Lunch Time!',
    time: '12:30 PM',
    message: "You haven't logged your Mediterranean salad yet. Stay consistent!",
    Icon: Utensils,
    iconClass: 'bg-mint-surface border-primary/10 text-primary',
    cardClass: 'bg-white border-outline-variant/35',
    read: false,
    actions: [{ label: 'Log Now', className: 'bg-primary text-white hover:bg-on-primary-container', to: '/app/log-food' }]
  },
  {
    id: 'hydration-streak',
    type: 'achievements',
    section: 'Achievements',
    sectionTone: 'text-achievement-purple',
    title: 'Hydration Hero',
    time: '5m ago',
    message: "You've hit your water goal 7 days in a row. New badge unlocked.",
    Icon: Trophy,
    iconClass: 'bg-white border-achievement-purple/30 text-achievement-purple rounded-full shadow-inner',
    cardClass: 'bg-surface-container-low border-achievement-purple/20',
    glowClass: 'bg-achievement-purple/10',
    read: false,
    actions: [
      { label: 'View Badge', className: 'bg-achievement-purple text-white hover:opacity-90', to: '/app/profile' },
      { label: 'Share', icon: Share2, className: 'border border-achievement-purple/30 text-achievement-purple hover:bg-achievement-purple/5' }
    ]
  },
  {
    id: 'weekly-report',
    type: 'reports',
    section: 'Weekly Reports',
    sectionTone: 'text-secondary',
    title: 'Week 4 Analysis',
    time: 'Yesterday',
    message: 'Your protein intake is up by 12% compared to last week. See full breakdown.',
    Icon: BarChart3,
    iconClass: 'bg-secondary-fixed text-secondary border-secondary/10',
    cardClass: 'bg-white border-outline-variant/35',
    read: true,
    actions: [{ label: 'Open Report', className: 'border border-outline-variant text-on-surface-variant hover:bg-surface-container', to: '/app/progress' }]
  },
  {
    id: 'community-keto',
    type: 'community',
    section: 'Community',
    sectionTone: 'text-energy-orange',
    title: '3 friends joined the Keto Challenge',
    time: 'Today',
    message: 'Elena, David, and Maria are starting a new health sprint with you.',
    Icon: Users,
    iconClass: 'bg-energy-orange/10 text-energy-orange border-energy-orange/10',
    cardClass: 'bg-white border-outline-variant/35',
    read: true,
    actions: [{ label: 'Open Community', className: 'border border-outline-variant text-on-surface-variant hover:bg-surface-container', to: '/app/community' }]
  }
]

const filters = [
  ['all', 'All'],
  ['reminders', 'Reminders'],
  ['achievements', 'Achievements'],
  ['reports', 'Reports'],
  ['community', 'Community']
]

function mapNotificationType(type) {
  return {
    meal_reminder: ['reminders', 'Meal Reminders', 'text-primary', Utensils, 'bg-mint-surface border-primary/10 text-primary', [{ label: 'Log Now', className: 'bg-primary text-white hover:bg-on-primary-container', to: '/app/log-food' }]],
    hydration: ['reminders', 'Meal Reminders', 'text-secondary', Bell, 'bg-secondary-fixed text-secondary border-secondary/10', [{ label: 'Open Nutrition', className: 'bg-secondary text-white hover:opacity-90', to: '/app/nutrition' }]],
    achievement: ['achievements', 'Achievements', 'text-achievement-purple', Trophy, 'bg-white border-achievement-purple/30 text-achievement-purple rounded-full shadow-inner', [{ label: 'View Badge', className: 'bg-achievement-purple text-white hover:opacity-90', to: '/app/profile' }]],
    weekly_report: ['reports', 'Weekly Reports', 'text-secondary', BarChart3, 'bg-secondary-fixed text-secondary border-secondary/10', [{ label: 'Open Report', className: 'border border-outline-variant text-on-surface-variant hover:bg-surface-container', to: '/app/progress' }]],
    system: ['community', 'Community', 'text-energy-orange', Users, 'bg-energy-orange/10 text-energy-orange border-energy-orange/10', [{ label: 'Open Community', className: 'border border-outline-variant text-on-surface-variant hover:bg-surface-container', to: '/app/community' }]]
  }[type] || []
}

function mapBackendNotifications(rows) {
  if (!rows.length) return notificationItems
  return rows.map((row) => {
    const [type, section, sectionTone, Icon, iconClass, actions] = mapNotificationType(row.type)
    return {
      id: row.id,
      type,
      section,
      sectionTone,
      title: row.title,
      time: row.created_at ? new Date(row.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Today',
      message: row.message,
      Icon,
      iconClass,
      cardClass: row.status === 'read' ? 'bg-white border-outline-variant/35' : 'bg-surface-container-low border-primary/20',
      read: row.status === 'read',
      actions
    }
  })
}

function ProNotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [readIds, setReadIds] = useState([])
  const { data: notificationData, setData: setNotificationData } = useBackendData(
    () => apiRequest('/api/notifications?limit=50').then(mapBackendNotifications),
    notificationItems,
    []
  )
  const items = useMemo(
    () => notificationData.map((item) => ({ ...item, read: item.read || readIds.includes(item.id) })),
    [notificationData, readIds]
  )
  const filteredItems = activeFilter === 'all' ? items : items.filter((item) => item.type === activeFilter)
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = []
    acc[item.section].push(item)
    return acc
  }, {})
  const unreadCount = items.filter((item) => !item.read).length
  const filterCounts = useMemo(() => filters.reduce((acc, [id]) => {
    acc[id] = id === 'all' ? items.filter((item) => !item.read).length : items.filter((item) => item.type === id && !item.read).length
    return acc
  }, {}), [items])

  return (
    <motion.main className="mx-auto grid max-w-[1280px] gap-7 px-5 py-7 pb-24 lg:px-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      <section className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="overflow-hidden rounded-[2rem] border border-outline-variant/35 bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl">
          <div className="flex flex-col gap-5 border-b border-outline-variant/25 bg-surface-container-lowest p-6 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Activity Hub</p>
              <h2 className="mt-2 font-headline-md text-3xl font-black text-on-surface">Notifications</h2>
              <p className="mt-2 text-on-surface-variant">Manage your health alerts, reminders, reports, and community activity.</p>
            </div>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-primary px-5 font-black text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50" onClick={async () => {
              setReadIds(items.map((item) => item.id))
              setNotificationData((current) => current.map((item) => ({ ...item, read: true })))
              try {
                await apiRequest('/api/notifications/read-all', { method: 'PATCH' })
              } catch {
                // UI stays optimistic; fallback mode may not have a backend.
              }
            }} disabled={!unreadCount} type="button">
              <Check size={18} />
              Mark all read
            </button>
          </div>

          <div className="scroll-hide flex gap-2 overflow-x-auto border-b border-outline-variant/20 bg-surface-container-lowest p-4" role="tablist" aria-label="Notification filters">
            {filters.map(([id, label]) => (
              <button className={`relative shrink-0 rounded-full px-4 py-2 font-label-md text-label-md transition-all active:scale-95 ${activeFilter === id ? 'bg-primary text-white shadow-md' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`} key={id} onClick={() => setActiveFilter(id)} role="tab" aria-selected={activeFilter === id} type="button">
                {label}
                {filterCounts[id] ? (
                  <motion.span className={`ml-2 inline-grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-black ${activeFilter === id ? 'bg-white text-primary' : 'bg-primary text-white'}`} initial={{ scale: 0.7 }} animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
                    {filterCounts[id]}
                  </motion.span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="space-y-7 p-5 md:p-6">
            {Object.entries(groupedItems).map(([section, sectionItems]) => (
              <section key={section}>
                <div className="mb-3 flex items-center justify-between px-1">
                  <h3 className={`font-label-md text-label-md font-black uppercase tracking-wider ${sectionItems[0].sectionTone}`}>{section}</h3>
                  <span className="text-[10px] font-black uppercase tracking-wider text-outline">{sectionItems.filter((item) => !item.read).length || 'No'} new</span>
                </div>
                <div className="space-y-3">
                  {sectionItems.map((item, index) => (
                    <NotificationCard item={item} index={index} key={item.id} onRead={async () => {
                      setReadIds((current) => [...new Set([...current, item.id])])
                      setNotificationData((current) => current.map((entry) => entry.id === item.id ? { ...entry, read: true } : entry))
                      try {
                        await apiRequest(`/api/notifications/${item.id}/read`, { method: 'PATCH' })
                      } catch {
                        // UI stays optimistic; fallback mode may not have a backend.
                      }
                    }} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <aside className="grid content-start gap-6">
          <motion.section className="rounded-[2rem] border border-outline-variant/35 bg-mint-surface p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)]" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08, duration: 0.34 }} whileHover={{ y: -3 }}>
            <div className="relative mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white">
              {unreadCount ? <motion.span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-energy-orange" animate={{ scale: [1, 1.45, 1], opacity: [1, 0.65, 1] }} transition={{ duration: 1.1, repeat: Infinity }} /> : null}
              <Bell size={26} />
            </div>
            <h3 className="font-headline-md text-2xl font-black text-on-surface">{unreadCount} unread alerts</h3>
            <p className="mt-3 leading-7 text-on-surface-variant">Meal logging and hydration reminders are ready to keep today's routine on track.</p>
          </motion.section>

          <motion.section className="rounded-[2rem] border border-outline-variant/35 bg-white/85 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14, duration: 0.34 }} whileHover={{ y: -3 }}>
            <h3 className="font-headline-md text-xl font-black text-on-surface">Priority Focus</h3>
            <div className="mt-5 space-y-3">
              {[
                ['Lunch reminder', 'Log by 1:30 PM', Utensils, 'text-primary bg-mint-surface'],
                ['Streak badge', 'Share milestone', Trophy, 'text-achievement-purple bg-achievement-purple/10'],
                ['Weekly report', 'Review protein trend', BarChart3, 'text-secondary bg-secondary-fixed']
              ].map(([title, body, Icon, tone]) => (
                <div className="flex items-center gap-3 rounded-2xl bg-surface-container-low p-3" key={title}>
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tone}`}>
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-black text-on-surface">{title}</p>
                    <p className="text-sm text-on-surface-variant">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </aside>
      </section>
    </motion.main>
  )
}

function NotificationCard({ item, index, onRead }) {
  const Icon = item.Icon
  return (
    <motion.article className={`group relative overflow-hidden rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md ${item.cardClass}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.25 }} whileHover={{ y: -3 }}>
      {item.glowClass && <div className={`absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl ${item.glowClass}`} />}
      {!item.read && (
        <span className="absolute right-4 top-4 flex h-3 w-3">
          <motion.span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" animate={{ scale: [1, 2.3], opacity: [0.75, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }} />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
        </span>
      )}
      <div className="relative z-10 flex gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center border ${item.iconClass}`}>
          <Icon size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-3">
            <h4 className="font-label-md text-label-md font-black text-on-surface">{item.title}</h4>
            <span className="shrink-0 font-label-sm text-label-sm text-outline">{item.time}</span>
          </div>
          <p className="mb-4 font-label-md text-label-md leading-6 text-on-surface-variant">{item.message}</p>
          <div className="flex flex-wrap gap-2">
            {item.actions.map((action) => {
              const ActionIcon = action.icon
              const className = `rounded-xl px-4 py-2 font-label-md text-label-md font-black transition-all active:scale-95 ${action.className}`
              return action.to ? (
                <Link className={className} key={action.label} to={action.to}>
                  {action.label}
                </Link>
              ) : (
                <button className={className} key={action.label} type="button" aria-label={action.label}>
                  {ActionIcon ? <ActionIcon size={18} /> : action.label}
                </button>
              )
            })}
            {!item.read && (
              <button className="ml-auto inline-flex items-center gap-2 rounded-xl bg-surface-container px-4 py-2 font-label-md text-label-md font-black text-on-surface-variant transition hover:bg-surface-container-high" onClick={onRead} type="button">
                <Check size={16} />
                Read
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default memo(ProNotificationsPage)
