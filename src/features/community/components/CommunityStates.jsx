export function CommunitySkeleton() {
  return (
    <div className="grid animate-pulse gap-8">
      <div className="h-80 rounded-[2.5rem] bg-surface-container-low" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-96 rounded-[2rem] bg-surface-container-low" />
        <div className="h-96 rounded-[2rem] bg-surface-container-low" />
      </div>
    </div>
  )
}

export function CommunityEmptyState({ title, actionLabel, onAction }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-outline-variant/50 bg-white/70 p-8 text-center text-on-surface-variant">
      <p className="font-bold text-on-surface">{title}</p>
      {actionLabel ? <button className="mt-4 rounded-xl bg-primary px-5 py-2 font-bold text-white" type="button" onClick={onAction}>{actionLabel}</button> : null}
    </div>
  )
}

export function CommunityErrorState({ message, onRetry }) {
  return (
    <div className="rounded-[2rem] border border-error-red/20 bg-error-red/10 p-5 text-error-red">
      <p className="font-bold">{message || 'Community data gagal dimuat.'}</p>
      <button className="mt-3 rounded-xl bg-white px-4 py-2 font-bold text-error-red" type="button" onClick={onRetry}>Coba Lagi</button>
    </div>
  )
}
