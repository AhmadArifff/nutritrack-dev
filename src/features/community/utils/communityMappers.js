export function formatCompactNumber(value = 0) {
  const number = Number(value) || 0
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`
  if (number >= 1000) return `${(number / 1000).toFixed(number >= 10000 ? 0 : 1)}k`
  return String(number)
}

export function formatRelativeTime(value) {
  if (!value) return 'Just now'
  const diff = Date.now() - new Date(value).getTime()
  const minutes = Math.max(Math.floor(diff / 60000), 0)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hours ago`
  return `${Math.floor(hours / 24)} days ago`
}

export function mapChallengeToCard(item = {}) {
  const participantCount = item.participantCount ?? item.participant_count ?? item.joined_count ?? 0
  const reward = item.reward || {}
  const progress = item.progress || {}
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl || item.image_url || item.image,
    iconName: item.iconName || item.icon_name || 'nutrition',
    badgeLabel: item.badgeLabel || item.badge_label || item.badge || 'New',
    badgeVariant: item.badgeVariant || item.badge_variant || (item.badgeTone === 'purple' ? 'high_impact' : 'hot'),
    category: item.category || 'Community Wellness',
    difficulty: item.difficulty || 'medium',
    durationDays: Number(item.durationDays || item.duration_days || 7),
    participantCount,
    participantLabel: item.participantLabel || item.participants || `+${formatCompactNumber(participantCount)}`,
    isJoined: Boolean(item.isJoined || item.is_joined),
    isPremium: Boolean(item.isPremium || item.is_premium),
    status: item.status || item.member_status || (item.isJoined || item.is_joined ? 'joined' : 'available'),
    progress: {
      percent: Number(progress.percent || item.progress_percent || 0),
      totalTasks: Number(progress.totalTasks || item.total_tasks || 0),
      completedTasks: Number(progress.completedTasks || item.completed_tasks || 0),
      currentDay: Number(progress.currentDay || item.current_day || 1),
      earnedPoints: Number(progress.earnedPoints || item.earned_points || 0)
    },
    reward: {
      points: Number(reward.points || item.reward_points || 100),
      badge: reward.badge || item.reward_badge || `${item.title || 'Challenge'} Badge`,
      achievementCode: reward.achievementCode || item.reward_achievement_code || 'CHALLENGE_FINISHER'
    },
    nextUrl: item.nextUrl || item.next_url || `/app/community/challenges/${item.id}`
  }
}

export function mapPostToCard(item = {}) {
  return {
    id: item.id,
    authorId: item.author?.id || item.author_id || item.authorId || item.user_id || item.userId,
    authorName: item.author?.name || item.author_name || item.authorName || 'NutriTrack Member',
    authorAvatarUrl: item.author?.avatarUrl || item.author_avatar_url || item.authorAvatar || '/assets/remote/remote-018-77400e5ef4.png',
    achievementLabel: item.author?.badge || item.achievementLabel || item.achievement_label || item.author_badge || item.authorBadge || 'Community Member',
    content: item.content || item.body || '',
    imageUrl: item.imageUrl || item.image_url || item.image,
    postType: item.postType || item.post_type || 'story',
    relatedChallengeId: item.relatedChallengeId || item.related_challenge_id,
    createdAt: item.createdAt || item.created_at,
    cheersCount: item.cheersCount ?? item.cheers_count ?? 0,
    commentsCount: item.commentsCount ?? item.comments_count ?? 0,
    sharesCount: item.sharesCount ?? item.shares_count ?? 0,
    hasCheered: Boolean(item.hasCheered || item.has_cheered || item.is_cheered)
  }
}

export function mapBuddyToCard(item = {}) {
  const score = item.matchScore ?? item.match_percent ?? 0
  const focus = item.focusLabel || item.focus || item.meta || 'Wellness Focus'
  return {
    id: item.id,
    name: item.name,
    avatarUrl: item.avatarUrl || item.avatar_url || item.avatar || '/assets/remote/remote-016-1da1546472.png',
    matchScore: score,
    focusLabel: focus,
    meta: item.meta || `${score}% Match - ${focus}`,
    connectionStatus: item.connectionStatus || (item.is_connected ? 'pending' : 'none')
  }
}

export function mapLeaderboardItem(item = {}, index = 0) {
  const streak = item.currentStreak ?? item.current_streak ?? item.streak_days ?? 0
  return {
    rank: String(item.rank || index + 1).padStart(2, '0'),
    name: item.name || item.full_name,
    days: item.metricLabel || `${streak} Days`,
    top: Boolean(item.isTop || item.is_top || index === 0),
    avatar: item.avatarUrl || item.avatar_url || item.avatar || '/assets/remote/remote-013-e6e85e46b8.png'
  }
}

export function mapOverview(payload = {}) {
  return {
    hero: payload.hero || {
      title: 'Connect with the NutriTrack Tribe',
      subtitle: 'Find your accountability partners, join expert-led challenges, and celebrate every milestone with a community that cheers for you.',
      stats: { activeMembers: 0, activeChallenges: 0, successPostsThisWeek: 0 }
    },
    challenges: (payload.activeChallenges || payload.challenges || []).map(mapChallengeToCard),
    feed: (payload.feedPreview || payload.posts || []).map(mapPostToCard),
    leaderboard: (payload.leaderboard || []).map(mapLeaderboardItem),
    buddies: (payload.suggestedBuddies || payload.buddies || []).map(mapBuddyToCard),
    myCommunityStats: payload.myCommunityStats || {}
  }
}
