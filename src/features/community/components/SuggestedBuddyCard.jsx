import { Plus } from 'lucide-react'

export function SuggestedBuddyCard({ buddies, onRequestBuddy, mutationKey }) {
  return (
    <section className="rounded-[2rem] border border-outline-variant/40 bg-white/80 p-6 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)] backdrop-blur-xl">
      <h3 className="mb-8 font-headline-md text-headline-md font-bold text-on-surface">Suggested Buddies</h3>
      <div className="space-y-8">
        {buddies.map((buddy) => {
          const requested = buddy.connectionStatus && buddy.connectionStatus !== 'none'
          return (
            <div className="flex items-center gap-4" key={buddy.id || buddy.name}>
              <img className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm" src={buddy.avatarUrl} alt={buddy.name} loading="lazy" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-on-surface">{buddy.name}</p>
                <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{buddy.meta}</p>
              </div>
              <button className={`flex h-10 min-w-10 flex-shrink-0 items-center justify-center rounded-full shadow-md transition-transform hover:scale-110 active:scale-95 ${requested ? 'bg-primary text-white' : 'bg-primary-container text-white'}`} type="button" disabled={requested || mutationKey === `buddy:${buddy.id}`} onClick={() => onRequestBuddy(buddy.id)} aria-label={`Add ${buddy.name}`}>
                {requested ? <span className="px-3 text-xs font-bold">Requested</span> : <Plus size={20} />}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
