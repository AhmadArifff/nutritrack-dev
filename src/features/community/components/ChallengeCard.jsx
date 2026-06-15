import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Apple, Check, ChevronRight, Gift, Trophy } from 'lucide-react'

const badgeColors = {
  high_impact: '#a855f7',
  premium: '#a855f7',
  hot: '#f97316',
  new: '#006e2f'
}

export function ChallengeCard({ challenge, index, onJoin, isJoining }) {
  const badgeColor = badgeColors[challenge.badgeVariant] || badgeColors.hot
  const joined = challenge.isJoined
  const premiumBlocked = challenge.isPremium && !joined
  const progress = challenge.progress || {}
  const progressPercent = Math.min(Number(progress.percent || 0), 100)

  return (
    <motion.article className="group rounded-[2rem] border border-outline-variant/40 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl transition-all hover:-translate-y-1" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.35 }}>
      <div className="relative mb-6 h-44 overflow-hidden rounded-2xl bg-mint-surface">
        {challenge.imageUrl ? <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" src={challenge.imageUrl} alt={challenge.title} loading="lazy" /> : <div className="flex h-full items-center justify-center"><Apple className="h-16 w-16 text-primary/20 transition-transform duration-700 group-hover:scale-110" /></div>}
        <div className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white" style={{ backgroundColor: badgeColor }}>{challenge.badgeLabel}</div>
        {joined ? <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary shadow-lg">Day {progress.currentDay || 1}</div> : null}
      </div>
      <h4 className="mb-2 font-headline-md text-headline-md font-bold text-on-surface">{challenge.title}</h4>
      <p className="mb-6 line-clamp-2 leading-7 text-on-surface-variant">{challenge.description}</p>
      {joined ? (
        <div className="mb-5 rounded-2xl bg-mint-surface/70 p-4">
          <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-wider text-primary">
            <span>{progress.completedTasks || 0}/{progress.totalTasks || 0} tasks</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white">
            <motion.div className="h-full rounded-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.6 }} />
          </div>
        </div>
      ) : (
        <div className="mb-5 grid gap-2 rounded-2xl bg-surface-container-low p-4 text-sm font-bold text-on-surface-variant">
          <span className="flex items-center gap-2"><Gift size={16} className="text-energy-orange" /> Unlock daily tasks and challenge feed</span>
          <span className="flex items-center gap-2"><Trophy size={16} className="text-achievement-purple" /> {challenge.reward?.badge || 'Challenge badge'} + {challenge.reward?.points || 100} pts</span>
        </div>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex -space-x-3">
          <img className="h-8 w-8 rounded-full border-2 border-white object-cover" src="/assets/remote/remote-020-236ec5b55c.png" alt="Challenge participant" loading="lazy" />
          <div className="flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-white bg-surface-container-high px-2 text-[10px] font-bold">{challenge.participantLabel}</div>
        </div>
        {joined ? (
          <Link className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2 text-label-sm font-bold text-white transition-all hover:scale-105 active:scale-[0.98]" to={challenge.nextUrl}>
            Continue Challenge <ChevronRight size={16} />
          </Link>
        ) : (
          <button
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2 text-label-sm font-bold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 ${premiumBlocked ? 'bg-energy-orange text-white' : 'bg-primary-container/20 text-on-primary-container hover:bg-primary hover:text-white'}`}
            type="button"
            disabled={isJoining}
            onClick={() => onJoin(challenge.id)}
          >
            {isJoining ? 'Joining...' : premiumBlocked ? 'Upgrade Required' : 'Join Challenge'} {!isJoining ? <Check size={16} /> : null}
          </button>
        )}
      </div>
    </motion.article>
  )
}
