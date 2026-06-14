import { useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { formatRelativeTime } from '../utils/communityMappers'
import { validateComment } from '../utils/communityValidators'

export function CommentDrawer({ drawer, onClose, onAddComment, isSubmitting }) {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  if (!drawer.open) return null

  async function submit(event) {
    event.preventDefault()
    const validation = validateComment(content)
    setError(validation)
    if (validation) return
    await onAddComment(drawer.post.id, content.trim())
    setContent('')
  }

  return (
    <div className="fixed inset-0 z-[90] bg-[#071727]/45 backdrop-blur-sm">
      <aside className="ml-auto flex h-full w-full max-w-md flex-col bg-surface p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-headline-md text-2xl font-black text-on-surface">Comments</h3>
            <p className="text-sm text-on-surface-variant">{drawer.post?.authorName}</p>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-surface-container" type="button" onClick={onClose} aria-label="Close comments"><X size={20} /></button>
        </div>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
          {drawer.loading ? <p className="rounded-2xl bg-white p-4 font-bold text-on-surface-variant">Memuat komentar...</p> : null}
          {drawer.error ? <p className="rounded-2xl bg-error-red/10 p-4 font-bold text-error-red">{drawer.error}</p> : null}
          {!drawer.loading && !drawer.comments.length ? (
            <div className="rounded-2xl border border-dashed border-outline-variant/50 bg-white/70 p-6 text-center">
              <MessageCircle className="mx-auto mb-3 text-primary" />
              <p className="font-bold text-on-surface">Belum ada komentar.</p>
              <p className="text-sm text-on-surface-variant">Jadilah yang pertama memberi dukungan.</p>
            </div>
          ) : null}
          {drawer.comments.map((comment) => (
            <article className="rounded-2xl bg-white p-4 shadow-sm" key={comment.id}>
              <div className="mb-2 flex items-center gap-3">
                <img className="h-9 w-9 rounded-full object-cover" src={comment.author?.avatarUrl || '/assets/remote/remote-018-77400e5ef4.png'} alt={comment.author?.name || 'Member'} />
                <div>
                  <p className="font-bold text-on-surface">{comment.author?.name || 'Member'}</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">{formatRelativeTime(comment.createdAt)}</p>
                </div>
              </div>
              <p className="leading-6 text-on-surface-variant">{comment.content}</p>
            </article>
          ))}
        </div>
        <form className="mt-5 rounded-2xl border border-outline-variant/40 bg-white p-3" onSubmit={submit}>
          <textarea className="min-h-20 w-full resize-none border-0 bg-transparent p-2 outline-none focus:ring-0" value={content} maxLength={280} onChange={(event) => setContent(event.target.value)} placeholder="Tulis komentar..." />
          {error ? <p className="px-2 text-sm font-bold text-error-red">{error}</p> : null}
          <button className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary font-black text-white" type="submit" disabled={isSubmitting}>
            <Send size={17} />
            {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
          </button>
        </form>
      </aside>
    </div>
  )
}
