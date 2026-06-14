import { apiRequest } from '../../../api'

export const communityApi = {
  getOverview: () => apiRequest('/api/community/overview'),
  getFeed: ({ page = 1, limit = 10, type = 'all' } = {}) =>
    apiRequest(`/api/community/feed?page=${page}&limit=${limit}&type=${encodeURIComponent(type)}`),
  createPost: (payload) => apiRequest('/api/community/posts', { method: 'POST', body: payload }),
  toggleCheer: (postId) => apiRequest(`/api/community/posts/${postId}/cheer`, { method: 'POST' }),
  sharePost: (postId) => apiRequest(`/api/community/posts/${postId}/share`, { method: 'PATCH' }),
  getComments: (postId) => apiRequest(`/api/community/posts/${postId}/comments`),
  addComment: (postId, payload) => apiRequest(`/api/community/posts/${postId}/comments`, { method: 'POST', body: payload }),
  joinChallenge: (challengeId) => apiRequest(`/api/community/challenges/${challengeId}/join`, { method: 'POST' }),
  requestBuddy: (buddyId) => apiRequest(`/api/community/buddies/${buddyId}/request`, { method: 'POST' }),
  getSuggestedBuddies: (limit = 5) => apiRequest(`/api/community/buddies/suggested?limit=${limit}`),
  getLeaderboard: (limit = 10) => apiRequest(`/api/community/leaderboard?type=streak&period=weekly&limit=${limit}`)
}
