'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useSession } from '@/components/SupabaseProvider'

type State = 'idle' | 'loading' | 'done'

export function PrayButton() {
  const session = useSession()
  const [state, setState] = useState<State>('idle')

  const handlePray = async () => {
    if (!session || state !== 'idle') return
    setState('loading')

    const today = new Date().toISOString().split('T')[0]

    const { error } = await supabase
      .from('prayer_logs')
      .upsert(
        { user_id: session.user.id, prayed_at: today },
        { onConflict: 'user_id,prayed_at' }
      )

    setState(error ? 'idle' : 'done')
  }

  if (!session) return null

  if (state === 'done') {
    return (
      <button
        disabled
        className="w-full py-4 rounded-xl bg-success text-white font-semibold
                   text-base cursor-default transition-all duration-300"
      >
        ✓ Orado
      </button>
    )
  }

  return (
    <button
      onClick={handlePray}
      disabled={state === 'loading'}
      className="w-full py-4 rounded-xl bg-gold text-gold-dim font-semibold
                 text-base active:scale-95 transition-all duration-200
                 disabled:opacity-60 disabled:cursor-not-allowed
                 animate-pray-pulse"
    >
      {state === 'loading' ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-gold-dim border-t-transparent
                           rounded-full animate-spin" />
          Salvando…
        </span>
      ) : (
        '🙏 Orei esta oração'
      )}
    </button>
  )
}
