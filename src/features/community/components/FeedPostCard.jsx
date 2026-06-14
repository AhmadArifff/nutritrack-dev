import { motion } from 'framer-motion'
import { Heart, MessageCircle, MoreHorizontal, Share2 } from 'lucide-react'
import { formatRelativeTime } from '../utils/communityMappers'

export function FeedPostCard({ post, onCheer, onOpenComments, onShare, isCheering }) {
  return (
    <motion.article className="rounded-[2rem] border border-outline-variant/40 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl transition-all hover:shadow-xl md:p-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.35 }}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <img className="h-12 w-12 rounded-full border-2 border-primary-container/30 object-cover" src={post.authorAvatarUrl} alt={post.authorName} loading="lazy" />
          <div className="min-w-0">
            <h5 className="truncate font-bold text-on-surface">{post.authorName}</h5>
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">{formatRelativeTime(post.createdAt)} - <span className="text-achievement-purple">{post.achievementLabel}</span></p>
          </div>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-variant" type="button" aria-label="Post actions"><MoreHorizontal size={20} /></button>
      </div>
      <p className="mb-6 leading-7 text-on-surface">{post.content}</p>
      {post.imageUrl ? (
        <div className="mb-6 h-72 overflow-hidden rounded-2xl border border-outline-variant/10 shadow-sm">
          <img className="h-full w-full object-cover" src={post.imageUrl} alt="Community story" loading="lazy" />
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-6 border-t border-outline-variant/20 pt-4">
        <button className={`flex items-center gap-2 text-label-sm font-bold transition-all hover:scale-105 active:scale-95 ${post.hasCheered ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`} type="button" disabled={isCheering} onClick={() => onCheer(post.id)}>
          <Heart size={18} fill={post.hasCheered ? 'currentColor' : 'none'} />
          {post.cheersCount} Cheers
        </button>
        <button className="flex items-center gap-2 text-label-sm font-bold text-on-surface-variant transition-all hover:scale-105 hover:text-primary active:scale-95" type="button" onClick={() => onOpenComments(post.id)}>
          <MessageCircle size={18} />
          {post.commentsCount} Comments
        </button>
        <button className="ml-auto flex items-center gap-2 text-label-sm font-bold text-on-surface-variant transition-colors hover:text-primary" type="button" aria-label="Share post" onClick={() => onShare(post)}>
          <Share2 size={18} />
          {post.sharesCount ? `${post.sharesCount} Shares` : 'Share'}
        </button>
      </div>
    </motion.article>
  )
}
