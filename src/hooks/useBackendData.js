import { useEffect, useState } from 'react'

export function useBackendData(fetcher, fallback, deps = []) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    fetcher()
      .then((nextData) => {
        if (active) setData(nextData || fallback)
      })
      .catch((err) => {
        if (active) setError(err.message || 'Gagal memuat data.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, deps)

  return { data, setData, loading, error }
}
