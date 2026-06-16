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
        {prayers.map((prayer) => (
          <Link
            key={prayer.slug}
            href={`/oracoes/${prayer.slug}`}
            className="bg-dusk rounded-2xl p-5 flex items-center justify-between
                       border border-dawn active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{prayer.icon}</span>
              <div>
                <p className="text-cream font-medium">{prayer.title}</p>
                <p className="text-stone text-sm">{prayer.description}</p>
              </div>
            </div>
            <span className="text-mist text-lg">›</span>
          </Link>
        ))}
      </main>

      <BottomNav />
    </div>
  )
}
