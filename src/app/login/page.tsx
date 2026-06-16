'use client'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <main className="min-h-screen bg-night flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">

        {/* Marca */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-dusk border border-dawn
                          flex items-center justify-center text-3xl">
            🙏
          </div>
          <div className="text-center">
            <h1 className="font-display text-3xl text-cream font-semibold tracking-tight">
              Vida de Oração
            </h1>
            <p className="text-stone text-sm mt-2 leading-relaxed">
              Um lugar para cuidar da sua<br />vida de oração, dia após dia.
            </p>
          </div>
        </div>

        {/* Divisor */}
        <div className="w-full h-px bg-dawn" />

        {/* Botão */}
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3
                       bg-gold text-gold-dim font-semibold text-base
                       py-4 rounded-btn active:scale-95 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Entrar com Google
          </button>

          <p className="text-center text-mist text-xs leading-relaxed">
            Ao entrar, você concorda com o uso dos seus<br />
            dados para personalizar sua experiência.
          </p>
        </div>

      </div>
    </main>
  )
}
