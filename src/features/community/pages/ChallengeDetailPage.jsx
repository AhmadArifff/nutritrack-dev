import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Flame, Gift, Loader2, MessageCircle, RefreshCcw, Send, ShieldCheck, Trophy, Users } from 'lucide-react'
import { communityApi } from '../services/communityApi'
import { mapChallengeToCard, mapPostToCard } from '../utils/communityMappers'
import { FeedPostCard } from '../components/FeedPostCard'
import { NewStoryModal } from '../components/NewStoryModal'
import { CommentDrawer } from '../components/CommentDrawer'

function normalizeDetail(payload = {}) {
  return {
    challenge: mapChallengeToCard(payload.challenge || {}),
    membership: payload.membership || {},
    unlocks: payload.unlocks || [],
    tasks: payload.tasks || [],
    todayTasks: payload.todayTasks || [],
    leaderboard: payload.leaderboard || [],
    feed: (payload.feed || []).map(mapPostToCard)
  }
}

function taskLabel(taskType = '') {
  const labels = {
    food_log: 'Auto from food log',
    water_intake: 'Auto from hydration',
    weight_log: 'Auto from progress',
    challenge_post: 'Auto from challenge post',
    manual: 'Manual check-in'
  }
  return labels[taskType] || 'Challenge task'
}

export default function ChallengeDetailPage() {
  const location = useLocation()
  const id = location.pathname.split('/').filter(Boolean).pop()
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mutationKey, setMutationKey] = useState('')
  const [toast, setToast] = useState('')
  const [storyOpen, setStoryOpen] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [commentDrawer, setCommentDrawer] = useState({ open: false, post: null, comments: [], loading: false, error: '' })

  const loadDetail = useCallback(async ({ sync = false, quiet = false } = {}) => {
    if (!quiet) setLoading(true)
    setError('')
    try {
      const data = sync ? await communityApi.syncChallengeProgress(id) : await communityApi.getChallengeDetail(id)
      setDetail(normalizeDetail(data))
      return data
    } catch (err) {
      setError(err.message || 'Gagal memuat challenge.')
      return null
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    let active = true
    async function start() {
      const data = await communityApi.getChallengeDetail(id).catch((err) => {
        if (active) setError(err.message || 'Gagal memuat challenge.')
        return null
      })
      if (!active) return
      if (data?.membership?.isJoined) {
        const synced = await communityApi.syncChallengeProgress(id).catch(() => data)
        if (active) setDetail(normalizeDetail(synced))
      } else if (data) {
        setDetail(normalizeDetail(data))
      }
      if (active) setLoading(false)
    }
    start()
    return () => { active = false }
  }, [id])

  const challenge = detail?.challenge
  const todayTasks = detail?.todayTasks?.length ? detail.todayTasks : (detail?.tasks || []).filter((task) => task.isToday)
  const completedToday = todayTasks.filter((task) => task.status === 'completed').length
  const timelineDays = useMemo(() => {
    const grouped = new Map()
    for (const task of detail?.tasks || []) {
      const day = Number(task.dayNumber || task.day_number || 1)
      grouped.set(day, [...(grouped.get(day) || []), task])
    }
    return [...grouped.entries()].sort((a, b) => a[0] - b[0])
  }, [detail?.tasks])

  async function handleCheckIn(task) {
    setMutationKey(`task:${task.id}`)
    try {
      const data = await communityApi.checkInChallengeTask(id, task.id, { value: task.targetValue || 1 })
      setDetail(normalizeDetail(data))
      setToast(data.awarded ? 'Challenge selesai. Badge dan points sudah ditambahkan.' : 'Task berhasil diselesaikan.')
    } catch (err) {
      setToast(err.message || 'Gagal check-in task.')
    } finally {
      setMutationKey('')
    }
  }

  async function handleSync() {
    setMutationKey('sync')
    const data = await loadDetail({ sync: true, quiet: true })
    if (data) setToast(data.awarded ? 'Progress tersinkron dan reward terbuka.' : 'Progress challenge sudah tersinkron.')
    setMutationKey('')
  }

  async function toggleCheer(postId) {
    setMutationKey(`cheer:${postId}`)
    try {
      const result = await communityApi.toggleCheer(postId)
      setDetail((prev) => ({
        ...prev,
        feed: prev.feed.map((post) => post.id === postId ? { ...post, hasCheered: Boolean(result.hasCheered), cheersCount: result.cheersCount ?? post.cheersCount } : post)
      }))
    } catch (err) {
      setToast(err.message || 'Gagal memberi cheers.')
    } finally {
      setMutationKey('')
    }
  }

  async function openComments(postId) {
    const post = detail.feed.find((item) => item.id === postId)
    setCommentDrawer({ open: true, post, comments: [], loading: true, error: '' })
    try {
      const data = await communityApi.getComments(postId)
      setCommentDrawer({ open: true, post, comments: data.items || [], loading: false, error: '' })
    } catch (err) {
      setCommentDrawer({ open: true, post, comments: [], loading: false, error: err.message || 'Gagal memuat komentar.' })
    }
  }

  async function addComment(postId, content) {
    setMutationKey(`comment:${postId}`)
    try {
      const result = await communityApi.addComment(postId, { content })
      setCommentDrawer((prev) => ({ ...prev, comments: [result.comment, ...prev.comments] }))
      setDetail((prev) => ({
        ...prev,
        feed: prev.feed.map((post) => post.id === postId ? { ...post, commentsCount: result.commentsCount ?? Number(post.commentsCount || 0) + 1 } : post)
      }))
    } finally {
      setMutationKey('')
    }
  }

  async function sharePost(post) {
    const url = `${window.location.origin}/app/community/post/${post.id}`
    try {
      if (navigator.share) await navigator.share({ title: 'NutriTrack Challenge Update', text: post.content, url })
      else await navigator.clipboard.writeText(url)
      const result = await communityApi.sharePost(post.id)
      setDetail((prev) => ({
        ...prev,
        feed: prev.feed.map((item) => item.id === post.id ? { ...item, sharesCount: result.sharesCount ?? Number(item.sharesCount || 0) + 1 } : item)
      }))
      setToast('Challenge update berhasil dibagikan.')
    } catch (err) {
      setToast(err.message || 'Gagal membagikan post.')
    }
  }

  async function savePost(payload) {
    setMutationKey(editingPost ? `update:${editingPost.id}` : 'create-post')
    try {
      if (editingPost) {
        await communityApi.updatePost(editingPost.id, payload)
      } else {
        await communityApi.createPost({ ...payload, postType: 'challenge_update', relatedChallengeId: id })
      }
      setStoryOpen(false)
      setEditingPost(null)
      await loadDetail({ sync: true, quiet: true })
      setToast('Challenge update tersimpan.')
    } catch (err) {
      setToast(err.message || 'Gagal menyimpan update.')
      throw err
    } finally {
      setMutationKey('')
    }
  }

  async function deletePost(postId) {
    setMutationKey(`delete:${postId}`)
    try {
      await communityApi.deletePost(postId)
      setDetail((prev) => ({ ...prev, feed: prev.feed.filter((post) => post.id !== postId) }))
      setToast('Post berhasil dihapus.')
    } finally {
      setMutationKey('')
    }
  }

  if (loading) {
    return (
      <main className="mx-auto grid max-w-[1400px] gap-7 px-5 py-7 pb-24 lg:px-8">
        <div className="grid min-h-[420px] place-items-center rounded-[2.5rem] bg-white/80">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </main>
    )
  }

  if (error || !challenge) {
    return (
      <main className="mx-auto grid max-w-[900px] gap-7 px-5 py-7 pb-24 lg:px-8">
        <Link className="inline-flex items-center gap-2 font-black text-primary" to="/app/community"><ArrowLeft size={18} /> Back to Community</Link>
        <div className="rounded-[2rem] border border-error-red/20 bg-error-red/10 p-8 text-error-red">{error || 'Challenge tidak ditemukan.'}</div>
      </main>
    )
  }

  return (
    <main className="mx-auto grid max-w-[1400px] gap-7 px-5 py-7 pb-24 lg:px-8">
      {toast ? <button className="fixed right-6 top-24 z-[80] rounded-2xl bg-[#213145] px-5 py-3 text-sm font-bold text-white shadow-xl" type="button" onClick={() => setToast('')}>{toast}</button> : null}
      <Link className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-primary shadow-sm ring-1 ring-outline-variant/30" to="/app/community"><ArrowLeft size={18} /> Back to Community</Link>

      <section className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary via-[#0aa44f] to-energy-orange p-7 text-white shadow-2xl shadow-primary/20 md:p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-widest backdrop-blur-md">{challenge.badgeLabel}</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-widest text-primary">{challenge.status}</span>
            </div>
            <h2 className="font-headline-lg text-4xl font-black md:text-5xl">{challenge.title}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/90">{challenge.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[`${challenge.durationDays} days`, challenge.difficulty, challenge.category, `${challenge.participantLabel} joined`].map((item) => (
                <span className="rounded-2xl border border-white/20 bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur-md" key={item}>{item}</span>
              ))}
            </div>
          </div>
          <motion.div className="rounded-[2rem] border border-white/25 bg-white/15 p-6 text-center backdrop-blur-xl" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="relative mx-auto grid h-40 w-40 place-items-center rounded-full bg-white/15">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.22)" strokeWidth="10" fill="none" />
                <motion.circle cx="50" cy="50" r="42" stroke="#fff" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="264" initial={{ strokeDashoffset: 264 }} animate={{ strokeDashoffset: 264 - (264 * (challenge.progress?.percent || 0)) / 100 }} transition={{ duration: 0.8 }} />
              </svg>
              <strong className="font-metrics-mono text-4xl font-black">{challenge.progress?.percent || 0}%</strong>
            </div>
            <p className="mt-4 font-black">{challenge.progress?.completedTasks || 0}/{challenge.progress?.totalTasks || 0} tasks complete</p>
            <p className="mt-1 text-sm text-white/75">{challenge.progress?.earnedPoints || 0} points earned</p>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-4">
        {[
          ['Current Day', challenge.progress?.currentDay || 1, Flame, 'text-energy-orange bg-energy-orange/10'],
          ['Completed Tasks', `${challenge.progress?.completedTasks || 0}/${challenge.progress?.totalTasks || 0}`, CheckCircle2, 'text-primary bg-primary/10'],
          ['Reward Points', challenge.reward?.points || 100, Gift, 'text-achievement-purple bg-achievement-purple/10'],
          ['Leaderboard', `${detail.leaderboard.length} members`, Users, 'text-blue-600 bg-blue-50']
        ].map(([label, value, Icon, tone]) => (
          <article className="rounded-[2rem] border border-outline-variant/35 bg-white p-5 shadow-sm" key={label}>
            <span className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl ${tone}`}><Icon size={22} /></span>
            <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">{label}</p>
            <strong className="mt-2 block text-2xl font-black text-on-surface">{value}</strong>
          </article>
        ))}
      </section>

      <section className="grid gap-7 lg:grid-cols-[1fr_360px]">
        <div className="space-y-7">
          <section className="rounded-[2.5rem] border border-outline-variant/35 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-headline-md text-2xl font-black text-on-surface">Today's Challenge Tasks</h3>
                <p className="mt-1 text-on-surface-variant">{completedToday}/{todayTasks.length || 0} tasks completed today</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-black text-white shadow-lg transition hover:scale-105" type="button" onClick={handleSync} disabled={mutationKey === 'sync'}>
                <RefreshCcw className={mutationKey === 'sync' ? 'animate-spin' : ''} size={18} /> Sync Progress
              </button>
            </div>
            <div className="grid gap-4">
              {(todayTasks.length ? todayTasks : detail.tasks).map((task) => {
                const done = task.status === 'completed'
                return (
                  <motion.article className={`rounded-[1.5rem] border p-5 transition ${done ? 'border-primary/20 bg-mint-surface' : task.isUnlocked ? 'border-outline-variant/35 bg-white' : 'border-outline-variant/20 bg-surface-container-low opacity-70'}`} key={task.id} layout>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-surface-container px-3 py-1 text-[11px] font-black uppercase tracking-wider text-on-surface-variant">Day {task.dayNumber}</span>
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-primary">{taskLabel(task.taskType)}</span>
                        </div>
                        <h4 className="font-black text-on-surface">{task.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-on-surface-variant">{task.description}</p>
                        <p className="mt-2 text-xs font-black uppercase tracking-widest text-energy-orange">{task.points} pts - target {task.targetValue} {task.targetUnit}</p>
                      </div>
                      {done ? (
                        <span className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-black text-white"><CheckCircle2 size={18} /> Done</span>
                      ) : task.taskType === 'manual' && task.isUnlocked ? (
                        <button className="rounded-2xl bg-primary px-5 py-3 font-black text-white shadow-lg transition hover:scale-105 disabled:opacity-60" type="button" disabled={mutationKey === `task:${task.id}`} onClick={() => handleCheckIn(task)}>
                          {mutationKey === `task:${task.id}` ? 'Saving...' : 'Check In'}
                        </button>
                      ) : (
                        <span className="rounded-2xl border border-outline-variant/35 px-5 py-3 text-center text-sm font-black text-on-surface-variant">{task.isUnlocked ? 'Use Sync' : 'Locked'}</span>
                      )}
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-outline-variant/35 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-headline-md text-2xl font-black text-on-surface">Challenge Feed</h3>
                <p className="mt-1 text-on-surface-variant">Updates shared by members in this challenge.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-black text-white shadow-lg transition hover:scale-105" type="button" onClick={() => setStoryOpen(true)}><Send size={18} /> Share Update</button>
            </div>
            <div className="space-y-5">
              {detail.feed.length ? detail.feed.map((post) => (
                <FeedPostCard key={post.id} post={post} isCheering={mutationKey === `cheer:${post.id}`} onCheer={toggleCheer} onOpenComments={openComments} onShare={sharePost} onEdit={(item) => setEditingPost(item)} onDelete={deletePost} />
              )) : (
                <div className="rounded-[2rem] bg-surface-container-low p-8 text-center">
                  <MessageCircle className="mx-auto mb-3 text-primary" size={36} />
                  <p className="font-black text-on-surface">Belum ada update challenge.</p>
                  <p className="mt-1 text-sm text-on-surface-variant">Bagikan check-in pertama agar komunitas bisa memberi cheers.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-7">
          <section className="rounded-[2.5rem] border border-outline-variant/35 bg-white p-6 shadow-sm">
            <h3 className="font-headline-md text-xl font-black text-on-surface">What You Unlock</h3>
            <div className="mt-5 grid gap-3">
              {detail.unlocks.map((item) => (
                <div className="flex gap-3 rounded-2xl bg-mint-surface/70 p-4" key={item}>
                  <ShieldCheck className="mt-0.5 shrink-0 text-primary" size={20} />
                  <p className="text-sm font-bold leading-6 text-on-surface">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-outline-variant/35 bg-white p-6 shadow-sm">
            <h3 className="font-headline-md text-xl font-black text-on-surface">Challenge Timeline</h3>
            <div className="mt-5 space-y-4">
              {timelineDays.map(([day, tasks]) => (
                <div className="rounded-2xl border border-outline-variant/25 p-4" key={day}>
                  <p className="text-xs font-black uppercase tracking-widest text-primary">Day {day}</p>
                  <p className="mt-1 text-sm font-bold text-on-surface-variant">{tasks.map((task) => task.title).join(' - ')}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-outline-variant/35 bg-white p-6 shadow-sm">
            <h3 className="font-headline-md text-xl font-black text-on-surface">Challenge Leaderboard</h3>
            <div className="mt-5 space-y-3">
              {detail.leaderboard.map((item) => (
                <div className="flex items-center gap-3 rounded-2xl bg-surface-container-low p-3" key={item.userId}>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-sm font-black text-white">#{item.rank}</span>
                  <img className="h-10 w-10 rounded-xl object-cover" src={item.avatarUrl || '/assets/remote/remote-013-e6e85e46b8.png'} alt={item.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-black text-on-surface">{item.name}</p>
                    <p className="text-xs font-bold text-on-surface-variant">{item.completedTasks} tasks - {item.earnedPoints} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <NewStoryModal open={storyOpen || Boolean(editingPost)} initial={editingPost} challengeContext={challenge} isSubmitting={mutationKey === 'create-post' || mutationKey?.startsWith('update:')} onClose={() => { setStoryOpen(false); setEditingPost(null) }} onSubmit={savePost} />
      <CommentDrawer drawer={commentDrawer} isSubmitting={mutationKey === `comment:${commentDrawer.post?.id}`} onClose={() => setCommentDrawer({ open: false, post: null, comments: [], loading: false, error: '' })} onAddComment={addComment} />
    </main>
  )
}
