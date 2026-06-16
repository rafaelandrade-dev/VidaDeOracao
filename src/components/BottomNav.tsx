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
    <nav
      className="fixed bottom-0 left-0 right-0 z-40
                 bg-night border-t border-dawn
                 flex items-center justify-around
                 pb-safe pt-2 px-2"
    >
      {navItems.map((item) => {
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 py-1 px-4 rounded-xl
                        transition-colors duration-150
                        ${isActive ? 'text-gold' : 'text-mist'}`}
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
