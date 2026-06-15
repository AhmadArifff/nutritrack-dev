export default function createCroppedImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const maxWidth = 960
        const maxHeight = 960
        const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height)
        const width = Math.max(1, Math.round(image.width * scale))
        const height = Math.max(1, Math.round(image.height * scale))
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        if (!context || !image.width || !image.height) {
          resolve(source)
          return
        }

        context.drawImage(image, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      } catch (err) {
        reject(err)
      }
    }
    image.onerror = () => reject(new Error('Gambar tidak bisa diproses.'))
    image.src = source
  })
}
