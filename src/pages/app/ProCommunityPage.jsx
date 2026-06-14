import { memo } from 'react'
import { motion } from 'framer-motion'
import {
  Apple,
  Compass,
  Flame,
  Heart,
  Lightbulb,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Share2,
  Trophy,
  UserPlus,
  Users
} from 'lucide-react'
import { apiRequest } from '../../api'
import { useBackendData } from '../../hooks/useBackendData'

const challenges = [
  {
    title: '7-Day Keto Sprint',
    description: 'Reset your metabolism with our high-fat, low-carb foundation challenge. Expert curated meal plan included.',
    badge: 'Hot',
    badgeTone: 'orange',
    participants: '+1.2k',
    image: '/assets/remote/remote-012-52e5a6df20.png'
  },
  {
    title: 'Sugar-Free Week',
    description: 'Break the cycle of sugar dependency. 7 days of natural energy and clear focus. Join 3,400 others.',
    badge: 'High Impact',
    badgeTone: 'purple',
    participants: '+3k'
  }
]

const leaderboard = [
  {
    rank: '01',
    name: 'Elena Vance',
    days: '42 Days',
    top: true,
    avatar: '/assets/remote/remote-013-e6e85e46b8.png'
  },
  {
    rank: '02',
    name: 'David Chen',
    days: '38 Days',
    avatar: '/assets/remote/remote-014-63752e73b6.png'
  },
  {
    rank: '03',
    name: 'Maria Rossi',
    days: '35 Days',
    avatar: '/assets/remote/remote-015-4cd9764a66.png'
  }
]

const buddies = [
  {
    name: 'Sophie Morel',
    meta: '92% Match - Vegan Focus',
    avatar: '/assets/remote/remote-016-1da1546472.png'
  },
  {
    name: 'James Wilson',
    meta: '88% Match - Keto Pro',
    avatar: '/assets/remote/remote-017-24a1ccbbc5.png'
  }
]

const feedFallback = {
  authorName: 'Sarah Jenkins',
  authorBadge: 'Sugar-Free Finisher',
  authorAvatar: '/assets/remote/remote-018-77400e5ef4.png',
  body: '"Just finished my 30-day streak! I have never felt more energetic. Dropped 5 lbs but the mental clarity is the real trophy. Thanks to everyone for the motivation!"',
  image: '/assets/remote/remote-019-2dfeadae7e.png',
  cheersCount: 124,
  commentsCount: 18
}

function mapCommunityData(payload) {
  return {
    challenges: (payload.challenges || []).map((item) => ({
      title: item.title,
      description: item.description,
      badge: item.badge,
      badgeTone: item.badge_tone || item.badgeTone,
      participants: item.participants_label || item.participants,
      image: item.image_url || item.image
    })),
    leaderboard: (payload.leaderboard || []).map((item, index) => ({
      rank: String(index + 1).padStart(2, '0'),
      name: item.name,
      days: `${item.streak_days || item.streakDays || 0} Days`,
      top: Boolean(item.is_top || item.isTop),
      avatar: item.avatar_url || item.avatar
    })),
    buddies: (payload.buddies || []).map((item) => ({
      name: item.name,
      meta: item.meta || `${item.match_percent || item.matchPercent || 0}% Match - ${item.focus || 'Wellness'}`,
      avatar: item.avatar_url || item.avatar
    })),
    posts: (payload.posts || []).map((item) => ({
      authorName: item.author_name || item.authorName,
      authorBadge: item.author_badge || item.authorBadge,
      authorAvatar: item.author_avatar_url || item.authorAvatar,
      body: item.body,
      image: item.image_url || item.image,
      cheersCount: item.cheers_count || item.cheersCount || 0,
      commentsCount: item.comments_count || item.commentsCount || 0
    }))
  }
}

function ProCommunityPage() {
  const { data } = useBackendData(
    () => apiRequest('/api/community').then(mapCommunityData),
    { challenges, leaderboard, buddies, posts: [feedFallback] },
    []
  )

  return (
    <AppPageShell title="Community Hub" subtitle="Tuesday, October 24" showHeader={false} wide>
      <div className="space-y-8 pb-28">
        <motion.section className="overflow-hidden rounded-[2.5rem] border border-outline-variant/40 bg-primary/5 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl md:p-10" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row">
            <div className="flex-1 space-y-6">
              <h2 className="font-headline-xl text-[40px] font-bold leading-tight text-on-surface md:text-[48px]">
                Connect with the <span className="text-primary">NutriTrack</span> Tribe
              </h2>
              <p className="max-w-xl text-lg leading-8 text-on-surface-variant">Find your accountability partners, join expert-led challenges, and celebrate every milestone with a community that cheers for you.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-label-md font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95" type="button">
                  <UserPlus size={18} />
                  Find Buddies
                </button>
                <button className="flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-white px-8 py-3 text-label-md font-bold text-on-surface transition-all hover:bg-surface-container active:scale-95" type="button">
                  <Compass size={18} />
                  Global Feed
                </button>
              </div>
            </div>
            <motion.div className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[2rem] border border-outline-variant/40 bg-white/80 p-8 shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl md:w-1/3" whileHover={{ y: -4, rotateX: 3 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
              <Users className="relative h-28 w-28 text-primary/20 transition-transform duration-500 group-hover:scale-110" />
            </motion.div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <section>
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Active Health Challenges</h3>
                <button className="font-bold text-primary hover:underline" type="button">View All</button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {data.challenges.map((challenge, index) => <CommunityChallengeCard challenge={challenge} index={index} key={challenge.title} />)}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Community Success &amp; Wins</h3>
              <CommunityFeedPost post={data.posts[0] || feedFallback} />
            </section>
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <GlassCard>
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Top Streaks</h3>
                <Trophy className="text-warning-yellow" size={28} />
              </div>
              <div className="space-y-4">{data.leaderboard.map((item) => <CommunityRankItem item={item} key={item.rank} />)}</div>
              <button className="mt-8 w-full rounded-xl border border-outline-variant/30 py-3 text-label-sm font-bold text-on-surface-variant transition-all hover:bg-surface-container" type="button">View Full Leaderboard</button>
            </GlassCard>

            <GlassCard>
              <h3 className="mb-8 font-headline-md text-headline-md font-bold text-on-surface">Suggested Buddies</h3>
              <div className="space-y-8">{data.buddies.map((buddy) => <CommunityBuddyItem buddy={buddy} key={buddy.name} />)}</div>
            </GlassCard>

            <motion.section className="achievement-gradient relative overflow-hidden rounded-[2rem] p-8 text-white shadow-xl transition-transform hover:scale-[1.01]" whileHover={{ y: -3 }}>
              <div className="absolute -right-10 -top-10 opacity-20"><span className="font-headline-xl text-[160px] leading-none">"</span></div>
              <div className="relative z-10">
                <Lightbulb className="mb-4 h-10 w-10" />
                <p className="mb-8 font-headline-md text-headline-md italic leading-snug">"Alone we track, together we transform. Your tribe is your greatest nutrition hacks."</p>
                <div className="flex items-center gap-3">
                  <div className="h-1 w-10 rounded-full bg-white/40" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Community Wisdom</p>
                </div>
              </div>
            </motion.section>
          </aside>
        </div>

        <motion.button className="group fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl transition-all hover:scale-110 active:scale-95" type="button" aria-label="New Story" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.35, type: 'spring', stiffness: 220 }}>
          <Plus size={36} />
          <span className="pointer-events-none absolute right-full mr-4 hidden whitespace-nowrap rounded-xl bg-[#213145] px-4 py-2 text-label-md font-bold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">New Story</span>
        </motion.button>
      </div>
    </AppPageShell>
  )
}

function AppPageShell({ children, wide = false }) {
  return (
    <motion.main className={`mx-auto grid ${wide ? 'max-w-[1400px]' : 'max-w-[1280px]'} gap-7 px-5 py-7 pb-24 lg:px-8`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.main>
  )
}

function GlassCard({ children }) {
  return (
    <section className="rounded-[2rem] border border-outline-variant/40 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl">
      {children}
    </section>
  )
}

function CommunityChallengeCard({ challenge, index }) {
  const badgeColor = challenge.badgeTone === 'purple' ? '#a855f7' : '#f97316'
  return (
    <motion.article className="group cursor-pointer rounded-[2rem] border border-outline-variant/40 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl transition-all hover:-translate-y-1" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.35 }}>
      <div className="relative mb-6 h-44 overflow-hidden rounded-2xl bg-mint-surface">
        {challenge.image ? <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" src={challenge.image} alt={challenge.title} loading="lazy" /> : <div className="flex h-full items-center justify-center"><Apple className="h-16 w-16 text-primary/20 transition-transform duration-700 group-hover:scale-110" /></div>}
        <div className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white" style={{ backgroundColor: badgeColor }}>{challenge.badge}</div>
      </div>
      <h4 className="mb-2 font-headline-md text-headline-md font-bold text-on-surface">{challenge.title}</h4>
      <p className="mb-6 line-clamp-2 leading-7 text-on-surface-variant">{challenge.description}</p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CommunityAvatarStack countLabel={challenge.participants} />
        <button className="rounded-xl bg-primary-container/20 px-5 py-2 text-label-sm font-bold text-on-primary-container transition-all hover:bg-primary hover:text-white active:scale-[0.98]" type="button">Join Challenge</button>
      </div>
    </motion.article>
  )
}

function CommunityAvatarStack({ countLabel }) {
  return (
    <div className="flex -space-x-3">
      <img className="h-8 w-8 rounded-full border-2 border-white object-cover" src="/assets/remote/remote-020-236ec5b55c.png" alt="Challenge participant" loading="lazy" />
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-surface-container-high text-[10px] font-bold">{countLabel}</div>
    </div>
  )
}

function CommunityFeedPost({ post }) {
  return (
    <motion.article className="rounded-[2rem] border border-outline-variant/40 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl transition-all hover:shadow-xl md:p-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.35 }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img className="h-12 w-12 rounded-full border-2 border-primary-container/30 object-cover" src={post.authorAvatar} alt={post.authorName} loading="lazy" />
          <div>
            <h5 className="font-bold text-on-surface">{post.authorName}</h5>
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">2 hours ago - <span className="text-achievement-purple">{post.authorBadge}</span></p>
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-variant" type="button" aria-label="Post actions"><MoreHorizontal size={20} /></button>
      </div>
      <p className="mb-6 leading-7 text-on-surface">{post.body}</p>
      <div className="mb-6 h-72 overflow-hidden rounded-2xl border border-outline-variant/10 shadow-sm">
        <img className="h-full w-full object-cover" src={post.image} alt="Meal Prep" loading="lazy" />
      </div>
      <div className="flex flex-wrap items-center gap-6 border-t border-outline-variant/20 pt-4">
        <button className="flex items-center gap-2 text-label-sm font-bold text-primary transition-all hover:scale-105 active:scale-95" type="button"><Heart size={18} fill="currentColor" />{post.cheersCount} Cheers</button>
        <button className="flex items-center gap-2 text-label-sm font-bold text-on-surface-variant transition-all hover:scale-105 hover:text-primary active:scale-95" type="button"><MessageCircle size={18} />{post.commentsCount} Comments</button>
        <button className="ml-auto flex items-center gap-2 text-label-sm font-bold text-on-surface-variant transition-colors hover:text-primary" type="button" aria-label="Share post"><Share2 size={18} /></button>
      </div>
    </motion.article>
  )
}

function CommunityRankItem({ item }) {
  return (
    <motion.div className={`flex cursor-default items-center gap-4 rounded-[1.25rem] p-4 transition-all ${item.top ? 'border border-primary/20 bg-mint-surface shadow-sm hover:scale-[1.02]' : 'hover:bg-surface-container'}`} whileHover={{ x: item.top ? 0 : 3 }}>
      <div className={`w-6 font-metrics-mono text-xl font-bold ${item.top ? 'text-primary' : 'text-on-surface-variant/50'}`}>{item.rank}</div>
      <img className={`h-12 w-12 rounded-full object-cover ${item.top ? 'border-2 border-primary' : ''}`} src={item.avatar} alt={item.name} loading="lazy" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-on-surface">{item.name}</p>
        <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/60">{item.days}</p>
      </div>
      <Flame className={item.top ? 'text-primary' : 'text-energy-orange/50'} size={20} />
    </motion.div>
  )
}

function CommunityBuddyItem({ buddy }) {
  return (
    <div className="flex items-center gap-4">
      <img className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm" src={buddy.avatar} alt={buddy.name} loading="lazy" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-on-surface">{buddy.name}</p>
        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{buddy.meta}</p>
      </div>
      <button className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-container text-white shadow-md transition-transform hover:scale-110 active:scale-95" type="button" aria-label={`Add ${buddy.name}`}>
        <Plus size={20} />
      </button>
    </div>
  )
}

export default memo(ProCommunityPage)
