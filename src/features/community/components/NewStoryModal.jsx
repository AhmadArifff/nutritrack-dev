import { useState, useEffect } from 'react'
import { Image, Send, X } from 'lucide-react'
import createCroppedImage from '../../../lib/createCroppedImage'
import { validateStoryForm } from '../utils/communityValidators'

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function NewStoryModal({ open, onClose, onSubmit, isSubmitting, initial = null }) {
  const [form, setForm] = useState({ content: '', postType: 'story', visibility: 'public', imageFile: null, imageUrl: '' })
  const [errors, setErrors] = useState({})
  const [previewSrc, setPreviewSrc] = useState('')
  const [imageDraft, setImageDraft] = useState('')
  const [crop, setCrop] = useState({ x: 50, y: 50, zoom: 1 })

  // populate initial when editing
  useEffect(() => {
    if (!initial) return
    setForm({
      content: initial.content || initial.body || '',
      postType: initial.postType || 'story',
      visibility: initial.visibility || 'public',
      imageFile: null,
      imageUrl: initial.imageUrl || initial.image || ''
    })
    setPreviewSrc(initial.imageUrl || initial.image || '')
    setImageDraft(initial.imageUrl || initial.image || '')
  }, [initial])

  useEffect(() => {
    // update preview when user selects file or pastes image URL
    if (form.imageFile) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = String(reader.result || '')
        setImageDraft(result)
        setPreviewSrc(result)
      }
      reader.readAsDataURL(form.imageFile)
      return () => {
        // nothing to revoke for dataURL
      }
    }
    setImageDraft(form.imageUrl || '')
    setPreviewSrc(form.imageUrl || '')
  }, [form.imageFile, form.imageUrl])

  if (!open) return null

  async function submit(event) {
    event.preventDefault()
    const nextErrors = validateStoryForm(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    // generate cropped/resized image if draft exists
    let imageUrl = null
    if (imageDraft) {
      try {
        imageUrl = await createCroppedImage(imageDraft, crop)
      } catch (err) {
        // fallback to raw data url
        imageUrl = imageDraft
      }
    } else {
      imageUrl = form.imageUrl.trim() || null
    }
    try {
      await onSubmit({
        content: form.content.trim(),
        postType: form.postType,
        visibility: form.visibility,
        imageUrl,
        achievementLabel: form.postType === 'win' ? 'Community Win' : 'Community Story'
      })
      setForm({ content: '', postType: 'story', visibility: 'public', imageFile: null, imageUrl: '' })
      setErrors({})
      onClose()
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: err?.message || 'Gagal memposting story.' }))
    }
  }

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-[#071727]/50 px-4 backdrop-blur-sm overflow-y-auto">
      <form className="w-full max-w-xl rounded-[2rem] border border-outline-variant/30 bg-white p-6 shadow-2xl max-h-[92vh] overflow-y-auto" onSubmit={submit}>
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
        <div className="grid gap-3 md:col-span-2">
          <div className="grid gap-2">
            <span className="text-sm font-black text-on-surface">Image URL lokal/online</span>
            <p className="text-xs font-bold leading-5 text-on-surface-variant">Tempel URL gambar atau upload file lokal. Preview di bawah mengikuti crop, posisi, dan zoom sebelum disimpan.</p>
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
              <input className="h-12 rounded-2xl border border-outline-variant/35 bg-white px-4 font-bold outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="https://... atau /assets/..." value={form.imageUrl} onChange={(e) => {
                const val = e.target.value
                setForm((prev) => ({ ...prev, imageUrl: val }))
                setImageDraft(val)
                setPreviewSrc(val)
              }} />
              <label className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-primary/25 bg-mint-surface px-4 font-black text-primary transition hover:bg-primary hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-upload" aria-hidden="true"><path d="M12 13v8"></path><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="m8 17 4-4 4 4"></path></svg>
                Upload gambar
                <input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => {
                  const file = event.target.files?.[0] || null
                  if (file) {
                    if (file.size > 2 * 1024 * 1024) {
                      setErrors((prev) => ({ ...prev, image: 'Ukuran gambar maksimal 2 MB. Pilih file lebih kecil atau kompres.' }))
                      setForm((prev) => ({ ...prev, imageFile: null }))
                      return
                    }
                    setErrors((prev) => ({ ...prev, image: undefined }))
                  }
                  setForm((prev) => ({ ...prev, imageFile: file }))
                }} />
              </label>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface-container-low px-4 py-3 text-xs font-bold text-on-surface-variant">
              <span>{previewSrc ? 'Sumber gambar siap dipreview' : 'Belum ada gambar dipilih'}</span>
              {previewSrc || form.imageFile ? (
                <button className="rounded-full bg-white px-3 py-1 font-black text-error-red transition hover:bg-error-red/10" type="button" onClick={() => {
                  setForm((prev) => ({ ...prev, imageFile: null, imageUrl: '' }))
                  setPreviewSrc('')
                  setImageDraft('')
                  setErrors({})
                }}>Hapus gambar</button>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-low p-4 lg:grid-cols-[260px_minmax(0,1fr)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-mint-surface">
              {previewSrc ? (
                <img
                  src={previewSrc}
                  alt="Preview"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${crop.x}% ${crop.y}%`, transform: `scale(${crop.zoom})`, display: 'block' }}
                />
              ) : (
                <div className="grid h-full place-items-center text-primary">Preview kosong</div>
              )}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
            </div>
            <div className="grid content-center gap-3">
              <p className="text-sm font-black text-on-surface">Crop preview</p>
              <label className="grid gap-2">
                <span className="flex items-center justify-between text-xs font-black uppercase tracking-wide text-on-surface-variant">Posisi X <b className="text-primary">{crop.x}</b></span>
                <input className="accent-primary" type="range" min="0" max="100" step="1" value={crop.x} onChange={(e) => setCrop((c) => ({ ...c, x: Number(e.target.value) }))} />
              </label>
              <label className="grid gap-2">
                <span className="flex items-center justify-between text-xs font-black uppercase tracking-wide text-on-surface-variant">Posisi Y <b className="text-primary">{crop.y}</b></span>
                <input className="accent-primary" type="range" min="0" max="100" step="1" value={crop.y} onChange={(e) => setCrop((c) => ({ ...c, y: Number(e.target.value) }))} />
              </label>
              <label className="grid gap-2">
                <span className="flex items-center justify-between text-xs font-black uppercase tracking-wide text-on-surface-variant">Zoom <b className="text-primary">{crop.zoom}</b></span>
                <input className="accent-primary" type="range" min="1" max="2" step="0.05" value={crop.zoom} onChange={(e) => setCrop((c) => ({ ...c, zoom: Number(e.target.value) }))} />
              </label>
            </div>
          </div>
        </div>
        {errors.general ? <p className="mt-2 text-sm font-bold text-error-red">{errors.general}</p> : null}
        <button className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary font-black text-white shadow-xl transition hover:scale-[1.01] active:scale-[0.98]" type="submit" disabled={isSubmitting}>
          <Send size={18} />
          {isSubmitting ? 'Posting...' : 'Post Story'}
        </button>
      </form>
    </div>
  )
}
