import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Plus } from 'lucide-react'
import { ChallengeCard } from '../components/ChallengeCard'
import { CommentDrawer } from '../components/CommentDrawer'
import { CommunityHero } from '../components/CommunityHero'
import { CommunityEmptyState, CommunityErrorState, CommunitySkeleton } from '../components/CommunityStates'
import { FeedPostCard } from '../components/FeedPostCard'
import { LeaderboardCard } from '../components/LeaderboardCard'
import { NewStoryModal } from '../components/NewStoryModal'
import { SuggestedBuddyCard } from '../components/SuggestedBuddyCard'
import { useCommunityHub } from '../hooks/useCommunityHub'

export default function CommunityPage() {
  const buddiesRef = useRef(null)
  const feedRef = useRef(null)
  const [storyOpen, setStoryOpen] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const {
    overview,
    feed,
    challenges,
    leaderboard,
    suggestedBuddies,
    isLoading,
    isRefreshing,
    error,
    mutationKey,
    toast,
    setToast,
    hasMoreFeed,
    commentDrawer,
    actions
  } = useCommunityHub()

  function scrollTo(ref) {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (isLoading) {
    return (
      <AppPageShell wide>
        <CommunitySkeleton />
      </AppPageShell>
    )
  }

  return (
    <AppPageShell wide>
      <div className="space-y-8 pb-28">
        {error ? <CommunityErrorState message={error} onRetry={() => actions.refreshCommunity()} /> : null}
        {toast ? (
          <button className="fixed right-6 top-24 z-[80] rounded-2xl bg-[#213145] px-5 py-3 text-sm font-bold text-white shadow-xl" type="button" onClick={() => setToast('')}>
            {toast}
          </button>
        ) : null}

        <CommunityHero hero={overview.hero} stats={overview.hero?.stats} onFindBuddies={() => scrollTo(buddiesRef)} onGlobalFeed={() => scrollTo(feedRef)} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <section>
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Active Health Challenges</h3>
                <button className="font-bold text-primary hover:underline disabled:opacity-60" type="button" onClick={() => actions.refreshCommunity({ quiet: true })} disabled={isRefreshing}>
                  {isRefreshing ? 'Refreshing...' : 'View All'}
                </button>
              </div>
              {challenges.length ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {challenges.map((challenge, index) => (
                    <ChallengeCard challenge={challenge} index={index} key={challenge.id || challenge.title} onJoin={actions.joinChallenge} isJoining={mutationKey === `join:${challenge.id}`} />
                  ))}
                </div>
              ) : <CommunityEmptyState title="Belum ada challenge aktif." actionLabel="Refresh" onAction={() => actions.refreshCommunity({ quiet: true })} />}
            </section>

            <section className="space-y-6" ref={feedRef}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Community Success &amp; Wins</h3>
                <button className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-white shadow-lg" type="button" onClick={() => setStoryOpen(true)}>New Story</button>
              </div>
              {feed.length ? feed.map((post) => (
                <FeedPostCard
                  isCheering={mutationKey === `cheer:${post.id}`}
                  key={post.id}
                  post={post}
                  onCheer={actions.toggleCheer}
                  onOpenComments={actions.openComments}
                  onShare={actions.sharePost}
                  onEdit={(p) => setEditingPost(p)}
                  onDelete={(id) => actions.deletePost(id)}
                />
              )) : <CommunityEmptyState title="Belum ada cerita komunitas." actionLabel="Buat Story Pertama" onAction={() => setStoryOpen(true)} />}
              {hasMoreFeed ? (
                <button className="w-full rounded-2xl border border-outline-variant/40 bg-white/80 py-4 font-black text-primary shadow-sm transition hover:bg-mint-surface" type="button" onClick={actions.loadMoreFeed} disabled={mutationKey === 'load-more'}>
                  {mutationKey === 'load-more' ? 'Loading...' : 'Load More'}
                </button>
              ) : null}
            </section>
          </div>

          <aside className="space-y-8 lg:col-span-4" ref={buddiesRef}>
            {leaderboard.length ? <LeaderboardCard items={leaderboard} /> : <CommunityEmptyState title="Leaderboard belum tersedia." />}
            {suggestedBuddies.length ? (
              <SuggestedBuddyCard buddies={suggestedBuddies} mutationKey={mutationKey} onRequestBuddy={actions.requestBuddy} />
            ) : <CommunityEmptyState title="Belum ada rekomendasi buddy." actionLabel="Lengkapi profil" />}

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

        <motion.button className="group fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary shadow-2xl transition-all hover:scale-110 active:scale-95" type="button" aria-label="New Story" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.35, type: 'spring', stiffness: 220 }} onClick={() => setStoryOpen(true)}>
          <Plus size={36} />
          <span className="pointer-events-none absolute right-full mr-4 hidden whitespace-nowrap rounded-xl bg-[#213145] px-4 py-2 text-label-md font-bold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">New Story</span>
        </motion.button>
      </div>

      <NewStoryModal
        open={storyOpen || Boolean(editingPost)}
        initial={editingPost}
        isSubmitting={mutationKey === 'create-post' || mutationKey?.startsWith('update:')}
        onClose={() => { setStoryOpen(false); setEditingPost(null) }}
        onSubmit={async (payload) => {
          if (editingPost) {
            await actions.updatePost(editingPost.id, payload)
            setEditingPost(null)
          } else {
            await actions.createPost(payload)
            setStoryOpen(false)
          }
        }}
      />
      <CommentDrawer drawer={commentDrawer} isSubmitting={mutationKey === `comment:${commentDrawer.post?.id}`} onClose={actions.closeComments} onAddComment={actions.addComment} />
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
