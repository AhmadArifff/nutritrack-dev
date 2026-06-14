import { motion } from 'framer-motion'
import { Compass, UserPlus, Users } from 'lucide-react'
import { formatCompactNumber } from '../utils/communityMappers'

export function CommunityHero({ hero, stats, onFindBuddies, onGlobalFeed }) {
  return (
    <motion.section className="overflow-hidden rounded-[2.5rem] border border-outline-variant/40 bg-primary/5 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl md:p-10" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row">
        <div className="flex-1 space-y-6">
          <h2 className="font-headline-xl text-[40px] font-bold leading-tight text-on-surface md:text-[48px]">
            {hero?.title?.replace('NutriTrack Tribe', '') || 'Connect with the '}
            <span className="text-primary">NutriTrack</span> Tribe
          </h2>
          <p className="max-w-xl text-lg leading-8 text-on-surface-variant">{hero?.subtitle}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-label-md font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95" type="button" onClick={onFindBuddies}>
              <UserPlus size={18} />
              Find Buddies
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-white px-8 py-3 text-label-md font-bold text-on-surface transition-all hover:bg-surface-container active:scale-95" type="button" onClick={onGlobalFeed}>
              <Compass size={18} />
              Global Feed
            </button>
          </div>
          <div className="grid max-w-xl gap-3 pt-2 sm:grid-cols-3">
            {[
              [formatCompactNumber(stats?.activeMembers), 'Active members'],
              [formatCompactNumber(stats?.activeChallenges), 'Challenges'],
              [formatCompactNumber(stats?.successPostsThisWeek), 'Wins this week']
            ].map(([value, label]) => (
              <div className="rounded-2xl border border-white/70 bg-white/70 p-3 shadow-sm backdrop-blur-xl" key={label}>
                <p className="font-metrics-mono text-xl font-black text-primary">{value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <motion.div className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[2rem] border border-outline-variant/40 bg-white/80 p-8 shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl md:w-1/3" whileHover={{ y: -4, rotateX: 3 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
          <Users className="relative h-28 w-28 text-primary/20 transition-transform duration-500 group-hover:scale-110" />
        </motion.div>
      </div>
    </motion.section>
  )
}
