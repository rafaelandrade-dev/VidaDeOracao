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

      {/* Header com voltar */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-dawn">
        <Link
          href="/oracoes"
          className="flex items-center gap-1 text-mist text-sm hover:text-stone transition-colors"
        >
          ‹ Orações
        </Link>
        <span className="text-xl">{prayer.icon}</span>
        <div className="w-16" />
      </header>

      <main className="max-w-lg mx-auto px-5 py-6 pb-36 flex flex-col gap-6">

        {/* Título */}
        <div className="animate-fade-up">
          <h1 className="font-display text-2xl text-cream font-semibold">
            {prayer.title}
          </h1>
          <p className="text-stone text-sm mt-1">{prayer.description}</p>
        </div>

        {/* Texto da oração */}
        <div className="bg-dusk rounded-2xl border border-dawn p-6 animate-fade-up">
          <p className="text-cream text-base leading-loose whitespace-pre-line font-body">
            {prayer.text}
          </p>
        </div>

      </main>

      {/* Botão fixo */}
      <div className="fixed bottom-16 left-0 right-0 px-5 pb-2">
        <div className="max-w-lg mx-auto">
          <div className="bg-night/80 backdrop-blur-sm pt-3 rounded-t-2xl">
            <PrayButton label="🙏 Orei esta oração" />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
