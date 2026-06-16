import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase-server'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'

export const metadata = { title: 'Perfil — Vida de Oração' }

export default async function PerfilPage() {
  const supabase = await createSupabaseServer()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  const { data: streak } = await supabase
    .from('streaks')
    .select('current_streak, longest_streak')
    .eq('user_id', session.user.id)
    .single()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, avatar_url')
    .eq('id', session.user.id)
    .single()

  const name = profile?.full_name ?? session.user.user_metadata?.full_name ?? 'Usuário'
  const email = profile?.email ?? session.user.email ?? ''
  const avatar = profile?.avatar_url ?? session.user.user_metadata?.avatar_url

  const handleSignOut = async () => {
    'use server'
    const supabaseServer = await createSupabaseServer()
    await supabaseServer.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-night">
      <Header title="Perfil" />

      <main className="max-w-lg mx-auto px-5 py-6 pb-24 flex flex-col gap-6">

        {/* Avatar + nome */}
        <div className="flex items-center gap-4 bg-dusk rounded-2xl border border-dawn p-5">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-14 h-14 rounded-full border-2 border-dawn object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-night border-2 border-dawn
                            flex items-center justify-center text-2xl">
              👤
            </div>
          )}
          <div>
            <p className="text-cream font-medium">{name}</p>
            <p className="text-stone text-xs mt-0.5">{email}</p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-dusk rounded-2xl border border-dawn p-5 flex flex-col items-center gap-1">
            <p className="text-xs font-medium tracking-widest uppercase text-gold">
              Sequência
            </p>
            <span className="font-mono text-4xl font-medium text-gold">
              {streak?.current_streak ?? 0}
            </span>
            <p className="text-stone text-xs">dias seguidos</p>
          </div>
          <div className="bg-dusk rounded-2xl border border-dawn p-5 flex flex-col items-center gap-1">
            <p className="text-xs font-medium tracking-widest uppercase text-mist">
              Recorde
            </p>
            <span className="font-mono text-4xl font-medium text-cream">
              {streak?.longest_streak ?? 0}
            </span>
            <p className="text-stone text-xs">dias seguidos</p>
          </div>
        </div>

        {/* Sair */}
        <form action={handleSignOut}>
          <button
            type="submit"
            className="w-full py-4 rounded-btn border border-dawn text-stone
                       text-sm font-medium active:scale-95 transition-all duration-200"
          >
            Sair da conta
          </button>
        </form>

      </main>

      <BottomNav />
    </div>
  )
}
