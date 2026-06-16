import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'

export const metadata = { title: 'Rosário — Vida de Oração' }

export default function RosarioPage() {
  return (
    <div className="min-h-screen bg-night">
      <Header title="Rosário" />

      <main className="max-w-lg mx-auto px-5 py-6 pb-24 flex flex-col items-center justify-center gap-4"
            style={{ minHeight: 'calc(100dvh - 57px - 64px)' }}>
        <span className="text-5xl">📿</span>
        <p className="font-display text-xl text-cream font-semibold text-center">
          Em breve
        </p>
        <p className="text-stone text-sm text-center leading-relaxed max-w-xs">
          O guia do Rosário está sendo preparado.<br />
          Volte em breve.
        </p>
      </main>

      <BottomNav />
    </div>
  )
}
