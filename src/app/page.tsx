import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseServer } from '@/lib/supabase-server'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { PrayButton } from '@/components/PrayButton'

const DAY_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export default async function HomePage() {
  const supabase = await createSupabaseServer()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  const today = new Date().toISOString().split('T')[0]
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

  const [{ data: streak }, { data: logs }] = await Promise.all([
    supabase
      .from('streaks')
      .select('current_streak, longest_streak')
      .eq('user_id', session.user.id)
      .single(),
    supabase
      .from('prayer_logs')
      .select('prayed_at')
      .eq('user_id', session.user.id)
      .gte('prayed_at', sevenDaysAgo.toISOString().split('T')[0]),
  ])

  const prayedDates = new Set(logs?.map((l) => l.prayed_at) ?? [])
  const prayedToday = prayedDates.has(today)
  const currentStreak = streak?.current_streak ?? 0
  const longestStreak = streak?.longest_streak ?? 0

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    const dateStr = date.toISOString().split('T')[0]
    return {
      key: dateStr,
      label: DAY_LABELS[date.getDay()],
      prayed: prayedDates.has(dateStr),
      isToday: i === 6,
    }
  })

  const firstName = session.user.user_metadata?.full_name?.split(' ')[0] ?? 'você'
  const streakIcon = currentStreak >= 30 ? '✨' : '🔥'

  return (
    <div className="min-h-screen bg-night">
      <Header title="Vida de Oração" />

      <main className="max-w-lg mx-auto px-5 py-6 pb-24 flex flex-col gap-6">

        {/* Saudação */}
        <p className="text-stone text-sm">Olá, {firstName} 👋</p>

        {/* Streak */}
        <div className="bg-dusk rounded-2xl border border-dawn p-6 flex flex-col items-center gap-2">
          <p className="text-xs font-medium tracking-widest uppercase text-gold">
            Sequência atual
          </p>
          <span
            className={`font-mono text-7xl font-medium leading-none
              ${currentStreak === 0 ? 'text-mist' : 'text-gold'}
              ${currentStreak >= 7 ? 'animate-gold-glow' : ''}`}
          >
            {currentStreak}
          </span>
          <div className="flex items-center gap-1.5 text-stone text-sm">
            <span>{streakIcon}</span>
            <span>{currentStreak === 1 ? 'dia seguido' : 'dias seguidos'}</span>
          </div>
          {longestStreak > 0 && (
            <p className="text-xs text-mist mt-1">
              Recorde: {longestStreak} {longestStreak === 1 ? 'dia' : 'dias'}
            </p>
          )}
        </div>

        {/* Botão principal */}
        <PrayButton initialDone={prayedToday} label="🙏 Orei hoje" />

        {/* Mini calendário */}
        <div className="bg-dusk rounded-2xl border border-dawn p-5">
          <p className="text-xs font-medium tracking-widest uppercase text-gold mb-4">
            Últimos 7 dias
          </p>
          <div className="flex justify-between">
            {days.map((day) => (
              <div key={day.key} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full border-2 transition-colors duration-200
                    ${day.prayed ? 'bg-gold border-gold' : 'bg-transparent border-mist'}
                    ${day.isToday
                      ? 'ring-2 ring-gold ring-offset-2 ring-offset-night'
                      : ''}`}
                />
                <span className="text-[10px] text-stone font-medium">{day.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acesso rápido */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium tracking-widest uppercase text-mist">
            Explorar
          </p>
          <Link
            href="/oracoes"
            className="bg-dusk rounded-2xl border border-dawn p-5
                       flex items-center justify-between
                       active:scale-[0.98] transition-transform duration-150"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🙏</span>
              <div>
                <p className="text-cream font-medium text-sm">Orações</p>
                <p className="text-stone text-xs">7 orações tradicionais</p>
              </div>
            </div>
            <span className="text-mist">›</span>
          </Link>

          <Link
            href="/rosario"
            className="bg-dusk rounded-2xl border border-dawn p-5
                       flex items-center justify-between
                       active:scale-[0.98] transition-transform duration-150"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📿</span>
              <div>
                <p className="text-cream font-medium text-sm">Rosário</p>
                <p className="text-stone text-xs">Em breve</p>
              </div>
            </div>
            <span className="text-mist">›</span>
          </Link>
        </div>

      </main>

      <BottomNav />
    </div>
  )
}
