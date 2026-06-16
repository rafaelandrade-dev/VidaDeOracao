import Link from 'next/link'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { prayers } from '@/lib/prayers'

export const metadata = { title: 'Orações — Vida de Oração' }

export default function OracoesPage() {
  return (
    <div className="min-h-screen bg-night">
      <Header title="Orações" />

      <main className="max-w-lg mx-auto px-5 py-6 pb-24 flex flex-col gap-3">

        <p className="text-xs font-medium tracking-widest uppercase text-mist mb-1">
          {prayers.length} orações disponíveis
        </p>

        {prayers.map((prayer) => (
          <Link
            key={prayer.slug}
            href={`/oracoes/${prayer.slug}`}
            className="bg-dusk rounded-2xl border border-dawn p-5
                       flex items-center gap-4
                       active:scale-[0.98] transition-transform duration-150"
          >
            <span className="text-2xl w-8 text-center flex-shrink-0">{prayer.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-cream font-medium text-sm">{prayer.title}</p>
              <p className="text-stone text-xs mt-0.5 truncate">{prayer.description}</p>
            </div>
            <span className="text-mist flex-shrink-0">›</span>
          </Link>
        ))}

      </main>

      <BottomNav />
    </div>
  )
}
