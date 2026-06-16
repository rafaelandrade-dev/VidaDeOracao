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
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0]

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
      .gte('prayed_at', sevenDaysAgoStr),
  ])

  const prayedDates = new Set(logs?.map((l) => l.prayed_at) ?? [])
  const prayedToday = prayedDates.has(today)
  const currentStreak = streak?.current_streak ?? 0

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

  return (
    <div className="min-h-screen bg-night">
      <Header title="Vida de Oração" />

      <main className="max-w-lg mx-auto px-5 py-6 pb-24 flex flex-col gap-6">
        <p className="text-stone text-sm">Olá, {firstName} 👋</p>

        {/* Streak */}
        <div className="flex flex-col items-center gap-1 py-4">
          <span
            className={`font-mono text-6xl font-medium transition-colors
              ${currentStreak === 0 ? 'text-mist' : 'text-gold'}
              ${currentStreak >= 7 ? 'animate-gold-glow' : ''}`}
          >
            {currentStreak}
          </span>
          <div className="flex items-center gap-1 text-stone text-sm">
            <span>{currentStreak >= 30 ? '✨' : '🔥'}</span>
            <span>dias seguidos</span>
          </div>
        </div>

        {/* Botão principal */}
        <PrayButton initialDone={prayedToday} label="🙏 Orei hoje" />

        {/* Mini calendário */}
        <div className="bg-dusk rounded-2xl p-5 border border-dawn">
          <p className="text-[10px] font-medium tracking-widest uppercase text-gold mb-4">
            Últimos 7 dias
          </p>
          <div className="flex justify-between">
            {days.map((day) => (
              <div key={day.key} className="flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 rounded-full border-2 transition-colors
                    ${day.prayed ? 'bg-gold border-gold' : 'bg-transparent border-mist'}
                    ${day.isToday ? 'ring-2 ring-gold ring-offset-2 ring-offset-night' : ''}`}
                />
                <span className="text-[10px] text-stone">{day.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acesso rápido às orações */}
        <Link
          href="/oracoes"
          className="bg-dusk rounded-2xl p-5 border border-dawn
                     flex items-center justify-between
                     active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🙏</span>
            <div>
              <p className="text-cream font-medium">Orações</p>
              <p className="text-stone text-sm">7 orações disponíveis</p>
            </div>
          </div>
          <span className="text-mist text-lg">›</span>
        </Link>
      </main>

      <BottomNav />
    </div>
  )
}
