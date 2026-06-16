'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/',        icon: '🏠', label: 'Início' },
  { href: '/oracoes', icon: '🙏', label: 'Orações' },
  { href: '/rosario', icon: '📿', label: 'Rosário' },
  { href: '/perfil',  icon: '👤', label: 'Perfil' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-night border-t border-dawn
                    flex items-center justify-around pb-safe pt-3 px-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-3 transition-colors
                        ${isActive ? 'text-gold' : 'text-mist'}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
