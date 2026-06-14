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

const challenges = [
  {
    title: '7-Day Keto Sprint',
    description: 'Reset your metabolism with our high-fat, low-carb foundation challenge. Expert curated meal plan included.',
    badge: 'Hot',
    badgeTone: 'orange',
    participants: '+1.2k',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkG6QiMiKBZNiMSsr4m6ISx4oYQMUIJW4Gsb7qZQIuS_e21XEWSQPfp47HVoq20YalHEI_oJd9-_iQtVZmXPcYU9SlCqqupK8Kez7zmIzw_3BH1lKHUnfxvuhGm9bViQNSqegIC9MBH58PoemZW_9McAw1quDkgh1q6mDJMtqyVq6V7Uu6gH6FE9KBSGSWFbRD8RLxlRZDruWj9lO9SawdME5rAzIOw7QdytYftd0qcyMMUZLRURNQFloFeLCtnA_InbD9sDbSotU'
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
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfz-gcdHCC13vC2dVXCHjZoyBYPUW0Yot9uD7FxYjjvKwQszcpTNP__CXZf-XnXgLkvnR4LD0KjsoKeDvzGTso7A3Uae_XhujVYyx0QBcnQJRSzlnLDInIsA17_lrhx_QOVSX8MgEiezUIof6UA0-9Vha5UZZwlVoyehfvE6tH0Rq249AKCg5SwOmLtZ9i1j_fctYIg3nNjQpby1D915EM0VxyxoaPAlgAozI8BG80rrTLS2dnBdfESbxKlDgB7scyyhIGOhi5TC4'
  },
  {
    rank: '02',
    name: 'David Chen',
    days: '38 Days',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw1zLjVPLelW3mlOY53g-6QHryjAZLGOlb2ijqOw2Vskf5OR9UZqSF6TuK-UinRVx474ib49r4YLaxN6PmfinAxpiZe95ZkC6zZt0Sqe02hvnPNe9aXwl7OAmMFVNvRlJK37TcV97gsKGPd6uBot7BL5y5k9RJ-84oNcSc2lqGf9iK_xrY96c7Egg7KRLRNcwlIYNmgHzRx0tmXOeX_Xu43Ef4x3MRkPEMRQaVrg9nes0gCLt4IYFssYTtMXTrXlGCiziYtel-qJE'
  },
  {
    rank: '03',
    name: 'Maria Rossi',
    days: '35 Days',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ0Z2_b0OcAQ4ckVsD9MG5gUHEmBYlUke-c9dp1-3XsODW9E1A4NCB3qAdzfK0IpFNZMkQ6jrDZngi2Q5UuRa_xE3dsOypsE2OYCKQK1xa-B5RgJjbrasip2cUJMMzael5s-ahFgplEfrb1Jofv85KZQ9GZF8uqlVSG6TJKmVjje0MJB4yOJ9Gux_XlhdxAjXr5iLv7lvdNa_n5FicMP_676_MqdBCJmn6xtlhxicaN44Z-pXAv3iAf_BBkeqyepJaAorAMowZSSY'
  }
]

const buddies = [
  {
    name: 'Sophie Morel',
    meta: '92% Match - Vegan Focus',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL_C4t2p95vD1Wgw05Iv-9uIXXZHTRWVY2xzSNy8ViNY2ynYa5P1iiXqRGKz64Pxp1FErdwtNeoDRhvcD_4xxg_K8igwkxW4qcxWEnn51VlnbeCrTV1mR3YD92ySVwxhqelOLQkn8YfkBDMF-2q-Le8rS-ErU-evOkQ136sIRPE-uvzAQnuv0WyJzAcilQ8X0AQLMkwjfkRcl9dsTNhGfdKioEzr3chbp1_2uTVMZ-lu2Vth2gAeteXWaGHcHnIy5ZTzkSA2UwxEc'
  },
  {
    name: 'James Wilson',
    meta: '88% Match - Keto Pro',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR39zPapalQk-Jpn4fH_77ZZJ4dkN7nPTVdmF7CW_Hh4GKTxlpk9aOL3b-we4BXRTEFJbozF7CiNg5EwunWuOAIn7amp1eI_VyA7fZgaZkjSgnCcIU4nlMDTdR1MoDEnur5sTetBkGWYF69HECmU4f742LA5rG_hOE3Y-Tu5yCoNxMa8xQEA8C5JErWzbyp4DrZH91Nfd4raXBnNrs8pcxyPzwymbRJMaHJwqDUcTZEWl5jpw-0llt96pmiG1T6iB6B2OSjUIu59c'
  }
]

function ProCommunityPage() {
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
                {challenges.map((challenge, index) => <CommunityChallengeCard challenge={challenge} index={index} key={challenge.title} />)}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Community Success &amp; Wins</h3>
              <CommunityFeedPost />
            </section>
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <GlassCard>
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Top Streaks</h3>
                <Trophy className="text-warning-yellow" size={28} />
              </div>
              <div className="space-y-4">{leaderboard.map((item) => <CommunityRankItem item={item} key={item.rank} />)}</div>
              <button className="mt-8 w-full rounded-xl border border-outline-variant/30 py-3 text-label-sm font-bold text-on-surface-variant transition-all hover:bg-surface-container" type="button">View Full Leaderboard</button>
            </GlassCard>

            <GlassCard>
              <h3 className="mb-8 font-headline-md text-headline-md font-bold text-on-surface">Suggested Buddies</h3>
              <div className="space-y-8">{buddies.map((buddy) => <CommunityBuddyItem buddy={buddy} key={buddy.name} />)}</div>
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
      <img className="h-8 w-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSC7xCK-qAPfiPGiDCGpvqcqQiRVFE3ZwLgPVnM63MUXTtcrABnnBj0hPwh3XpfmJjBjImNbbkBzAeAsEcZoFMt5r7fRezOYlNx4g1U72JO61pz3CevrGK_sTfqo4qKRcNBlFSCxHvpA_NthxUaY4oNHfZFM2imCypitF4G5bWeBDz0inNVizvGPSrwiPf_gb5EPZtGH20kZVxWXT4eZPIPiSc8LuFlZ_JXUL82FH_wodPZEVzWSsG2aqja0mAbYuhMbOgG8RhRl0" alt="Challenge participant" loading="lazy" />
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-surface-container-high text-[10px] font-bold">{countLabel}</div>
    </div>
  )
}

function CommunityFeedPost() {
  return (
    <motion.article className="rounded-[2rem] border border-outline-variant/40 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl transition-all hover:shadow-xl md:p-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.35 }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img className="h-12 w-12 rounded-full border-2 border-primary-container/30 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHi9rfB7p3znkHCNRXjLABna3cN6QDvVRd11U-Tfkv977mxl6myU09Zqby9mbihzReT42o-EYkBmnqkHNAqM2FD3gdK_dt3fNkwRJKZ6wNUjnPqEYe2OZdYwqLo2XDpfriLC1xW_ECZ7ScRhCO8INJWWi5jSvigiccsQPKndHMTxfUZsg8F1ib216ulv9sHCjnBRU83X7lnxbYwa3lOgKxhimCGejOyqaQySeZkjrbib57I6eK40mJwJVY7NwBf6bWKPRrUNKnKEw" alt="Sarah Jenkins" loading="lazy" />
          <div>
            <h5 className="font-bold text-on-surface">Sarah Jenkins</h5>
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">2 hours ago - <span className="text-achievement-purple">Sugar-Free Finisher</span></p>
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-variant" type="button" aria-label="Post actions"><MoreHorizontal size={20} /></button>
      </div>
      <p className="mb-6 leading-7 text-on-surface">"Just finished my 30-day streak! I have never felt more energetic. Dropped 5 lbs but the mental clarity is the real trophy. Thanks to everyone for the motivation!"</p>
      <div className="mb-6 h-72 overflow-hidden rounded-2xl border border-outline-variant/10 shadow-sm">
        <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeqD7oX7GgoMFp9tFcqdEilitOoAe516IHe57AUMjn8K28vg8nXh2SK8KGNPUhRtwlNUt4a6VKlvuR2dFJfsEa1XvsM7PNKGyg2zf2hmeXdCeTC_2D4GMUwcsQqr1tfGT87Jd_8-F0CmTTFU3EgQARrCKIJUE3Ad-0qcjibS6n-seOuSCvmoUKK1iKImH0gmgxmWfA1HeoL_n9Gw-o1xhMLdBoyFr0nFGFBd34kSTPlt75V394rN_2n9Z3LAEjaGRHkfx3bpd-uwU" alt="Meal Prep" loading="lazy" />
      </div>
      <div className="flex flex-wrap items-center gap-6 border-t border-outline-variant/20 pt-4">
        <button className="flex items-center gap-2 text-label-sm font-bold text-primary transition-all hover:scale-105 active:scale-95" type="button"><Heart size={18} fill="currentColor" />124 Cheers</button>
        <button className="flex items-center gap-2 text-label-sm font-bold text-on-surface-variant transition-all hover:scale-105 hover:text-primary active:scale-95" type="button"><MessageCircle size={18} />18 Comments</button>
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
