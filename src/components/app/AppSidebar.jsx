import { memo } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Apple, HelpCircle, LogOut, Sparkles } from 'lucide-react'

function AppSidebar({ currentPath, mobileOpen, navItems, onCloseMobile, onLogout }) {
  return (
    <motion.aside
      className={`pro-sidebar fixed left-0 top-0 z-[60] flex h-dvh w-[272px] flex-col overflow-y-auto border-r border-outline-variant/20 bg-surface-container-low p-4 shadow-md transition-transform duration-300 ${mobileOpen ? 'pro-sidebar-open' : ''}`}
      initial={false}
    >
      <div className="flex min-h-12 items-center gap-3">
        <Link className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-primary text-on-primary" to="/app/dashboard">
          <Apple size={22} />
        </Link>
        <div className="min-w-0">
          <p className="truncate font-headline-md text-[22px] font-black leading-none text-primary">NutriTrack</p>
          <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-outline">Pro Companion</p>
        </div>
        <button className="ml-auto grid h-9 w-9 place-items-center rounded-full text-on-surface-variant lg:hidden" onClick={onCloseMobile} type="button" aria-label="Close menu">
          <LogOut size={18} />
        </button>
      </div>

      <nav className="mt-8 grid gap-2">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = currentPath === to ||
            (to === '/app/foods' && currentPath.startsWith('/app/foods/')) ||
            (to === '/app/community' && currentPath.startsWith('/app/community/'))
          return (
            <NavLink
              className={({ isActive }) =>
                `group flex min-h-11 items-center gap-3 rounded-xl px-4 text-label-md font-bold transition-all duration-200 ${isActive || active ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface'}`
              }
              key={to}
              onClick={onCloseMobile}
              to={to}
            >
              <Icon className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
              <span className="truncate">{label}</span>
            </NavLink>
          )
        })}
      </nav>

      <motion.div
        className="upgrade-card-react mt-auto flex-shrink-0 overflow-hidden rounded-2xl border border-secondary/10 bg-gradient-to-br from-secondary-container/80 to-secondary/20 p-4 shadow-sm"
        whileHover={{ y: -3 }}
      >
        <Sparkles className="text-primary" size={22} />
        <p className="mt-3 font-extrabold text-on-background">Upgrade to Premium</p>
        <p className="mt-1 text-xs leading-5 text-on-surface-variant">AI meal plans, smart reports, and deeper analytics.</p>
        <button className="mt-3 h-9 w-full rounded-xl bg-primary text-xs font-black text-on-primary shadow-lg shadow-primary/20" type="button">
          Get Started
        </button>
      </motion.div>

      <div className="mt-3 grid flex-shrink-0 gap-2">
        <NavLink className={({ isActive }) => `flex min-h-10 items-center gap-3 rounded-xl px-4 text-label-md font-bold transition ${isActive ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} to="/help">
          <HelpCircle size={20} />
          <span>Help Center</span>
        </NavLink>
        <button className="flex min-h-10 items-center gap-3 rounded-xl px-4 text-left text-label-md font-bold text-on-surface-variant transition hover:text-error-red" onClick={onLogout} type="button">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  )
}

export default memo(AppSidebar)
