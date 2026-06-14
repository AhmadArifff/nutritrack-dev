import { motion } from 'framer-motion'
import { Flame, Trophy } from 'lucide-react'

export function LeaderboardCard({ items }) {
  return (
    <section className="rounded-[2rem] border border-outline-variant/40 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Top Streaks</h3>
        <Trophy className="text-warning-yellow" size={28} />
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <motion.div className={`flex cursor-default items-center gap-4 rounded-[1.25rem] p-4 transition-all ${item.top ? 'border border-primary/20 bg-mint-surface shadow-sm hover:scale-[1.02]' : 'hover:bg-surface-container'}`} key={item.rank} whileHover={{ x: item.top ? 0 : 3 }}>
            <div className={`w-6 font-metrics-mono text-xl font-bold ${item.top ? 'text-primary' : 'text-on-surface-variant/50'}`}>{item.rank}</div>
            <img className={`h-12 w-12 rounded-full object-cover ${item.top ? 'border-2 border-primary' : ''}`} src={item.avatar} alt={item.name} loading="lazy" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-on-surface">{item.name}</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/60">{item.days}</p>
            </div>
            <Flame className={item.top ? 'text-primary' : 'text-energy-orange/50'} size={20} />
          </motion.div>
        ))}
      </div>
      <button className="mt-8 w-full rounded-xl border border-outline-variant/30 py-3 text-label-sm font-bold text-on-surface-variant transition-all hover:bg-surface-container" type="button">View Full Leaderboard</button>
    </section>
  )
}
