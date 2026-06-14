import { useState } from 'react'
import { Image, Send, X } from 'lucide-react'
import { validateStoryForm } from '../utils/communityValidators'

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function NewStoryModal({ open, onClose, onSubmit, isSubmitting }) {
  const [form, setForm] = useState({ content: '', postType: 'story', visibility: 'public', imageFile: null, imageUrl: '' })
  const [errors, setErrors] = useState({})

  if (!open) return null

  async function submit(event) {
    event.preventDefault()
    const nextErrors = validateStoryForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const imageUrl = form.imageFile ? await fileToDataUrl(form.imageFile) : form.imageUrl.trim() || null
    await onSubmit({
      content: form.content.trim(),
      postType: form.postType,
      visibility: form.visibility,
      imageUrl,
      achievementLabel: form.postType === 'win' ? 'Community Win' : 'Community Story'
    })
    setForm({ content: '', postType: 'story', visibility: 'public', imageFile: null, imageUrl: '' })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-[#071727]/50 px-4 backdrop-blur-sm">
      <form className="w-full max-w-xl rounded-[2rem] border border-outline-variant/30 bg-white p-6 shadow-2xl" onSubmit={submit}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-headline-md text-2xl font-black text-on-surface">New Story</h3>
            <p className="text-sm text-on-surface-variant">Bagikan progress, meal prep, atau kemenangan kecil hari ini.</p>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-surface-container" type="button" onClick={onClose} aria-label="Close new story modal"><X size={20} /></button>
        </div>
        <label className="block">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Story content</span>
          <textarea className="mt-2 min-h-36 w-full resize-none rounded-2xl border border-outline-variant/40 bg-surface px-4 py-3 outline-none focus:ring-4 focus:ring-primary/10" value={form.content} maxLength={500} onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))} placeholder="Hari ini berhasil meal prep untuk 3 hari..." />
          <span className="mt-1 block text-right text-xs font-bold text-on-surface-variant">{form.content.length}/500</span>
          {errors.content ? <span className="text-sm font-bold text-error-red">{errors.content}</span> : null}
        </label>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="text-xs font-black uppercase tracking-widest text-primary">Post type</span>
            <select className="mt-2 h-12 w-full rounded-2xl border border-outline-variant/40 bg-surface px-4 font-bold" value={form.postType} onChange={(event) => setForm((prev) => ({ ...prev, postType: event.target.value }))}>
              <option value="story">Story</option>
              <option value="win">Win</option>
              <option value="meal_prep">Meal Prep</option>
              <option value="challenge_update">Challenge Update</option>
              <option value="progress">Progress</option>
            </select>
          </label>
          <label>
            <span className="text-xs font-black uppercase tracking-widest text-primary">Visibility</span>
            <select className="mt-2 h-12 w-full rounded-2xl border border-outline-variant/40 bg-surface px-4 font-bold" value={form.visibility} onChange={(event) => setForm((prev) => ({ ...prev, visibility: event.target.value }))}>
              <option value="public">Public</option>
              <option value="buddies">Buddies</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>
        <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-outline-variant/50 bg-mint-surface/60 px-4 py-4 text-primary">
          <Image size={20} />
          <span className="font-bold">{form.imageFile ? form.imageFile.name : 'Upload gambar optional, maksimal 2 MB'}</span>
          <input className="hidden" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => setForm((prev) => ({ ...prev, imageFile: event.target.files?.[0] || null }))} />
        </label>
        {errors.image ? <p className="mt-2 text-sm font-bold text-error-red">{errors.image}</p> : null}
        <button className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary font-black text-white shadow-xl transition hover:scale-[1.01] active:scale-[0.98]" type="submit" disabled={isSubmitting}>
          <Send size={18} />
          {isSubmitting ? 'Posting...' : 'Post Story'}
        </button>
      </form>
    </div>
  )
}
