export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-night">
      <div className="w-8 h-8 rounded-full border-2 border-dawn border-t-gold animate-spin" />
    </div>
  )
}
