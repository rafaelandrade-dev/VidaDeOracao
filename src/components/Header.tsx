interface HeaderProps {
  title: string
  action?: React.ReactNode
}

export function Header({ title, action }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-dawn bg-night">
      <h1 className="font-display text-lg text-cream font-semibold tracking-tight">
        {title}
      </h1>
      {action && (
        <div className="text-gold text-sm font-medium">{action}</div>
      )}
    </header>
  )
}
