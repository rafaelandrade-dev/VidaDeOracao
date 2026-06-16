import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPrayerBySlug, prayers } from '@/lib/prayers'
import { BottomNav } from '@/components/BottomNav'
import { PrayButton } from '@/components/PrayButton'

export function generateStaticParams() {
  return prayers.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const prayer = getPrayerBySlug(params.slug)
  if (!prayer) return {}
  return { title: `${prayer.title} — Vida de Oração` }
}

export default function PrayerPage({ params }: { params: { slug: string } }) {
  const prayer = getPrayerBySlug(params.slug)
  if (!prayer) notFound()

  return (
    <div className="min-h-screen bg-night">
      {/* Header manual com botão voltar */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-dawn">
        <Link href="/oracoes" className="text-mist text-sm flex items-center gap-1">
          ‹ Voltar
        </Link>
        <span className="text-2xl">{prayer.icon}</span>
        <div className="w-12" /> {/* espaçador para centralizar o ícone */}
      </header>

      <main className="max-w-lg mx-auto px-5 py-6 pb-32 flex flex-col gap-6">
        <div className="animate-fade-up">
          <h1 className="font-display text-2xl text-cream font-semibold mb-1">
            {prayer.title}
          </h1>
          <p className="text-stone text-sm">{prayer.description}</p>
        </div>

        <div className="bg-dusk rounded-2xl p-5 border border-dawn animate-fade-up">
          <p className="text-cream text-base leading-relaxed whitespace-pre-line">
            {prayer.text}
          </p>
        </div>
      </main>

      {/* Botão fixo na base, acima da bottom nav */}
      <div className="fixed bottom-16 left-0 right-0 px-5 pb-2 bg-night/90 backdrop-blur-sm">
        <PrayButton />
      </div>

      <BottomNav />
    </div>
  )
}
