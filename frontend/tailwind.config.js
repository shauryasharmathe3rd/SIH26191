/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: {
            950: '#070F1E',
            900: '#0B192C',
            800: '#14274E',
            700: '#1E3E62',
            600: '#2A5584',
          },
          slate: {
            900: '#0F172A',
            800: '#1E293B',
            700: '#334155',
            600: '#475569',
            500: '#64748B',
            400: '#94A3B8',
            300: '#CBD5E1',
            200: '#E2E8F0',
            100: '#F1F5F9',
            50: '#F8FAFC',
          },
          saffron: {
            DEFAULT: '#D97706',
            dark: '#B45309',
            light: '#FDE68A',
            50: '#FFFBEB',
          },
          alert: {
            critical: '#DC2626',
            high: '#EA580C',
            warning: '#D97706',
            moderate: '#CA8A04',
            low: '#059669',
            info: '#0284C7',
          },
          accent: {
            cyan: '#06B6D4',
            emerald: '#10B981',
            blue: '#2563EB',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'gov-sm': '0 1px 2px 0 rgba(11, 25, 44, 0.05)',
        'gov': '0 1px 3px 0 rgba(11, 25, 44, 0.1), 0 1px 2px -1px rgba(11, 25, 44, 0.1)',
        'gov-md': '0 4px 6px -1px rgba(11, 25, 44, 0.1), 0 2px 4px -2px rgba(11, 25, 44, 0.1)',
        'gov-lg': '0 10px 15px -3px rgba(11, 25, 44, 0.1), 0 4px 6px -4px rgba(11, 25, 44, 0.1)',
        'gov-inset': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'subtle-pulse': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'critical-pulse': 'criticalPulse 1.5s infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        criticalPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.03)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
