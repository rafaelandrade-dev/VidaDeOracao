export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-night gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-dawn border-t-gold animate-spin" />
      <p className="text-mist text-xs font-medium tracking-widest uppercase">
        Carregando
      </p>
    </div>
  )
}
