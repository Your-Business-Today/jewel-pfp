/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#15171B',
          2: '#1C1F25',
          3: '#23262E'
        },
        paper: {
          DEFAULT: '#F2F1EC',
          2: '#E9E7E0'
        },
        signal: '#E8501E',
        muted: {
          dark: '#9BA0A8',
          light: '#565B63'
        }
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        widest2: '0.22em'
      }
    }
  },
  plugins: []
};
