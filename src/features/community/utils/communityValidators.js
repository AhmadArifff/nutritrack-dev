export function validateStoryForm({ content = '', imageFile } = {}) {
  const errors = {}
  const text = content.trim()

  if (!text) errors.content = 'Cerita wajib diisi.'
  else if (text.length < 5) errors.content = 'Minimal 5 karakter.'
  else if (text.length > 500) errors.content = 'Maksimal 500 karakter.'

  if (imageFile) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(imageFile.type)) errors.image = 'Format gambar harus JPG, PNG, atau WebP.'
    else if (imageFile.size > 2 * 1024 * 1024) errors.image = 'Maksimal gambar 2 MB.'
  }

  return errors
}

export function validateComment(content = '') {
  const text = content.trim()
  if (!text) return 'Komentar wajib diisi.'
  if (text.length > 280) return 'Maksimal komentar 280 karakter.'
  return ''
}
