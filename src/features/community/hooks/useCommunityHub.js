import { useCallback, useEffect, useMemo, useState } from 'react'
import { communityApi } from '../services/communityApi'
import { mapBuddyToCard, mapLeaderboardItem, mapOverview, mapPostToCard } from '../utils/communityMappers'

const initialState = {
  hero: {
    title: 'Connect with the NutriTrack Tribe',
    subtitle: 'Find your accountability partners, join expert-led challenges, and celebrate every milestone with a community that cheers for you.',
    stats: { activeMembers: 0, activeChallenges: 0, successPostsThisWeek: 0 }
  },
  challenges: [],
  feed: [],
  leaderboard: [],
  buddies: [],
  myCommunityStats: {}
}

export function useCommunityHub() {
  const [community, setCommunity] = useState(initialState)
  const [feedPage, setFeedPage] = useState(1)
  const [hasMoreFeed, setHasMoreFeed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [mutationKey, setMutationKey] = useState('')
  const [toast, setToast] = useState('')
  const [commentDrawer, setCommentDrawer] = useState({ open: false, post: null, comments: [], loading: false, error: '' })

  const refreshCommunity = useCallback(async ({ quiet = false } = {}) => {
    if (quiet) setIsRefreshing(true)
    else setIsLoading(true)
    setError('')

    try {
      const [overview, feedPageData] = await Promise.all([
        communityApi.getOverview().then(mapOverview),
        communityApi.getFeed({ page: 1, limit: 6 })
      ])
      setCommunity({ ...overview, feed: (feedPageData.items || []).map(mapPostToCard) })
      setFeedPage(1)
      setHasMoreFeed(Boolean(feedPageData.pagination?.hasMore))
    } catch (err) {
      setError(err.message || 'Gagal memuat Community Hub.')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    refreshCommunity()
  }, [refreshCommunity])

  const loadMoreFeed = useCallback(async () => {
    if (!hasMoreFeed || mutationKey === 'load-more') return
    setMutationKey('load-more')
    try {
      const nextPage = feedPage + 1
      const data = await communityApi.getFeed({ page: nextPage, limit: 6 })
      setCommunity((prev) => ({ ...prev, feed: [...prev.feed, ...(data.items || []).map(mapPostToCard)] }))
      setFeedPage(nextPage)
      setHasMoreFeed(Boolean(data.pagination?.hasMore))
    } catch (err) {
      setToast(err.message || 'Gagal memuat feed berikutnya.')
    } finally {
      setMutationKey('')
    }
  }, [feedPage, hasMoreFeed, mutationKey])

  const joinChallenge = useCallback(async (challengeId) => {
    const previous = community.challenges
    setMutationKey(`join:${challengeId}`)
    setCommunity((prev) => ({
      ...prev,
      challenges: prev.challenges.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, isJoined: true, participantCount: Number(challenge.participantCount || 0) + (challenge.isJoined ? 0 : 1), participantLabel: challenge.isJoined ? challenge.participantLabel : `+${Number(challenge.participantCount || 0) + 1}` }
          : challenge
      )
    }))

    try {
      const result = await communityApi.joinChallenge(challengeId)
      setCommunity((prev) => ({
        ...prev,
        challenges: prev.challenges.map((challenge) =>
          challenge.id === challengeId
            ? { ...challenge, isJoined: Boolean(result.isJoined), participantCount: result.participantCount ?? challenge.participantCount, participantLabel: `+${result.participantCount ?? challenge.participantCount}` }
            : challenge
        )
      }))
      setToast('Challenge berhasil diikuti.')
    } catch (err) {
      setCommunity((prev) => ({ ...prev, challenges: previous }))
      setToast(err.message || 'Gagal join challenge.')
    } finally {
      setMutationKey('')
    }
  }, [community.challenges])

  const toggleCheer = useCallback(async (postId) => {
    const previous = community.feed
    const target = previous.find((post) => post.id === postId)
    if (!target) return
    setMutationKey(`cheer:${postId}`)
    setCommunity((prev) => ({
      ...prev,
      feed: prev.feed.map((post) =>
        post.id === postId
          ? { ...post, hasCheered: !post.hasCheered, cheersCount: Math.max(Number(post.cheersCount || 0) + (post.hasCheered ? -1 : 1), 0) }
          : post
      )
    }))

    try {
      const result = await communityApi.toggleCheer(postId)
      setCommunity((prev) => ({
        ...prev,
        feed: prev.feed.map((post) =>
          post.id === postId ? { ...post, hasCheered: Boolean(result.hasCheered), cheersCount: result.cheersCount ?? post.cheersCount } : post
        )
      }))
    } catch (err) {
      setCommunity((prev) => ({ ...prev, feed: previous }))
      setToast(err.message || 'Gagal memberi cheers.')
    } finally {
      setMutationKey('')
    }
  }, [community.feed])

  const openComments = useCallback(async (postId) => {
    const post = community.feed.find((item) => item.id === postId)
    setCommentDrawer({ open: true, post, comments: [], loading: true, error: '' })
    try {
      const data = await communityApi.getComments(postId)
      setCommentDrawer({ open: true, post, comments: data.items || [], loading: false, error: '' })
    } catch (err) {
      setCommentDrawer({ open: true, post, comments: [], loading: false, error: err.message || 'Gagal memuat komentar.' })
    }
  }, [community.feed])

  const closeComments = useCallback(() => {
    setCommentDrawer({ open: false, post: null, comments: [], loading: false, error: '' })
  }, [])

  const addComment = useCallback(async (postId, content) => {
    setMutationKey(`comment:${postId}`)
    try {
      const result = await communityApi.addComment(postId, { content })
      setCommentDrawer((prev) => ({ ...prev, comments: [result.comment, ...prev.comments] }))
      setCommunity((prev) => ({
        ...prev,
        feed: prev.feed.map((post) => post.id === postId ? { ...post, commentsCount: result.commentsCount ?? Number(post.commentsCount || 0) + 1 } : post)
      }))
    } catch (err) {
      setToast(err.message || 'Gagal menambah komentar.')
      throw err
    } finally {
      setMutationKey('')
    }
  }, [])

  const createPost = useCallback(async (payload) => {
    setMutationKey('create-post')
    try {
      const result = await communityApi.createPost(payload)
      const post = mapPostToCard(result.post)
      setCommunity((prev) => ({ ...prev, feed: [post, ...prev.feed] }))
      setToast('Story baru berhasil diposting.')
      return post
    } catch (err) {
      setToast(err.message || 'Gagal membuat story.')
      throw err
    } finally {
      setMutationKey('')
    }
  }, [])

  const updatePost = useCallback(async (postId, payload) => {
    setMutationKey(`update:${postId}`)
    try {
      await communityApi.updatePost(postId, payload)
      setCommunity((prev) => ({
        ...prev,
        feed: prev.feed.map((p) => (p.id === postId ? { ...p, content: payload.content || p.content, imageUrl: payload.imageUrl || p.imageUrl, postType: payload.postType || p.postType, visibility: payload.visibility || p.visibility } : p))
      }))
      setToast('Post berhasil diperbarui.')
    } catch (err) {
      setToast(err.message || 'Gagal memperbarui post.')
      throw err
    } finally {
      setMutationKey('')
    }
  }, [])

  const deletePost = useCallback(async (postId) => {
    setMutationKey(`delete:${postId}`)
    try {
      await communityApi.deletePost(postId)
      setCommunity((prev) => ({ ...prev, feed: prev.feed.filter((p) => p.id !== postId) }))
      setToast('Post berhasil dihapus.')
    } catch (err) {
      setToast(err.message || 'Gagal menghapus post.')
      throw err
    } finally {
      setMutationKey('')
    }
  }, [])

  const requestBuddy = useCallback(async (buddyId) => {
    setMutationKey(`buddy:${buddyId}`)
    const previous = community.buddies
    setCommunity((prev) => ({
      ...prev,
      buddies: prev.buddies.map((buddy) => buddy.id === buddyId ? { ...buddy, connectionStatus: 'pending' } : buddy)
    }))
    try {
      await communityApi.requestBuddy(buddyId)
      setToast('Permintaan buddy terkirim.')
    } catch (err) {
      setCommunity((prev) => ({ ...prev, buddies: previous }))
      setToast(err.message || 'Gagal mengirim buddy request.')
    } finally {
      setMutationKey('')
    }
  }, [community.buddies])

  const sharePost = useCallback(async (post) => {
    const url = `${window.location.origin}/app/community/post/${post.id}`
    try {
      if (navigator.share) await navigator.share({ title: 'NutriTrack Community Post', text: post.content, url })
      else await navigator.clipboard.writeText(url)
      const result = await communityApi.sharePost(post.id)
      setCommunity((prev) => ({
        ...prev,
        feed: prev.feed.map((item) => item.id === post.id ? { ...item, sharesCount: result.sharesCount ?? Number(item.sharesCount || 0) + 1 } : item)
      }))
      setToast(navigator.share ? 'Post berhasil dibagikan.' : 'Link post disalin.')
    } catch (err) {
      setToast(err.message || 'Gagal membagikan post.')
    }
  }, [])

  const actions = useMemo(() => ({
    refreshCommunity,
    loadMoreFeed,
    createPost,
    toggleCheer,
    openComments,
    closeComments,
    addComment,
    joinChallenge,
    requestBuddy,
    sharePost
    , updatePost, deletePost
  }), [addComment, closeComments, createPost, joinChallenge, loadMoreFeed, openComments, refreshCommunity, requestBuddy, sharePost, toggleCheer])

  return {
    overview: community,
    feed: community.feed,
    challenges: community.challenges,
    leaderboard: community.leaderboard.map(mapLeaderboardItem),
    suggestedBuddies: community.buddies.map(mapBuddyToCard),
    isLoading,
    isRefreshing,
    error,
    mutationKey,
    toast,
    setToast,
    hasMoreFeed,
    commentDrawer,
    actions
  }
}
