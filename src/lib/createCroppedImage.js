export default function createCroppedImage(source, crop) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const width = 760
        const height = 520
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        if (!context || !image.width || !image.height) {
          resolve(source)
          return
        }

        const zoom = Number(crop?.zoom) || 1
        const baseScale = Math.max(width / image.width, height / image.height)
        // Ensure the final scale never makes the image smaller than required to cover
        const scale = baseScale * Math.max(1, zoom)

        const renderWidth = Math.round(image.width * scale)
        const renderHeight = Math.round(image.height * scale)

        const px = Number(crop?.x ?? 50) / 100
        const py = Number(crop?.y ?? 50) / 100
        const offsetX = Math.round((width - renderWidth) * px)
        const offsetY = Math.round((height - renderHeight) * py)

        context.fillStyle = '#f7faf8'
        context.fillRect(0, 0, width, height)
        context.drawImage(image, offsetX, offsetY, renderWidth, renderHeight)
        resolve(canvas.toDataURL('image/jpeg', 0.76))
      } catch (err) {
        reject(err)
      }
    }
    image.onerror = () => reject(new Error('Gambar tidak bisa diproses.'))
    image.src = source
  })
}
