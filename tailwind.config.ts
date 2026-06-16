import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        night:       '#0F1B2D',
        dusk:        '#1A2E4A',
        dawn:        '#2C4A6E',
        gold:        '#C9A84C',
        'gold-soft': '#E8C97A',
        'gold-dim':  '#7A6230',
        cream:       '#F5F0E8',
        stone:       '#B8B0A0',
        mist:        '#6B7A8D',
        success:     '#4CAF7D',
        warning:     '#E8A44A',
        error:       '#E05252',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        card: '16px',
        btn:  '12px',
      },
    },
  },
  plugins: [],
}

export default config
