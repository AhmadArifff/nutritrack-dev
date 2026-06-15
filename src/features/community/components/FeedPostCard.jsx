import { motion } from 'framer-motion'
import { Heart, MessageCircle, MoreHorizontal, Share2, Edit3, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { formatRelativeTime } from '../utils/communityMappers'
import { getStoredAuth } from '../../../api'

export function FeedPostCard({ post, onCheer, onOpenComments, onShare, onEdit, onDelete, isCheering }) {
  const [menuOpen, setMenuOpen] = useState(false)
  function toggleMenu() { setMenuOpen((v) => !v) }
  const storedAuth = getStoredAuth()
  const currentUserId = storedAuth?.user?.id || storedAuth?.id
  const isOwner = Boolean(currentUserId && post.authorId && String(currentUserId) === String(post.authorId))
  async function handleDelete() {
    if (!confirm('Hapus post ini? Tindakan ini tidak dapat dibatalkan.')) return
    try {
      await onDelete(post.id)
    } catch (err) {
      // errors handled by parent via toast
    }
  }

  function handleEdit() {
    setMenuOpen(false)
    onEdit && onEdit(post)
  }

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
        <div className="relative">
          {isOwner ? (
            <>
              <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-variant" type="button" aria-label="Post actions" onClick={toggleMenu}><MoreHorizontal size={20} /></button>
              {menuOpen ? (
                <div className="absolute right-0 top-12 z-50 w-40 rounded-lg border border-outline-variant/40 bg-white p-2 shadow-lg">
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-bold hover:bg-surface-container" type="button" onClick={handleEdit}><Edit3 size={16} />Edit</button>
                  <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-error-red hover:bg-error-red/10" type="button" onClick={handleDelete}><Trash2 size={16} />Hapus</button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      <p className="mb-6 leading-7 text-on-surface">{post.content}</p>
      {post.imageUrl ? (
        <div className="mb-6 overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-low shadow-sm">
          <img
            src={post.imageUrl}
            alt="Community story"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
            className="block h-auto max-h-[520px] w-full object-contain"
          />
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
