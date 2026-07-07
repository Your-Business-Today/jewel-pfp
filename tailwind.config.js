/** @type {import('tailwindcss').Config} */
// Palette per Jewel Enterprise Brand Guidelines 2026 — Jewel PFP division:
// Passive Red #D7282E (primary) · Passive Black #0D0D0D · Jewel Gold #C09A51 (shared enterprise colour)
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0D0D0D', // Passive Black
          2: '#151517',
          3: '#1D1D21'
        },
        paper: {
          DEFAULT: '#F2F1EC',
          2: '#E9E7E0'
        },
        signal: '#D7282E', // Passive Red
        gold: '#C09A51', // Jewel Gold
        muted: {
          dark: '#9BA0A8',
          light: '#565B63'
        }
      },
      fontFamily: {
        // Switzer — display/headings (brand). Geom Graphic — body/captions (brand);
        // Space Grotesk stands in until the licensed Geom Graphic files are added.
        display: ['Switzer', 'system-ui', 'sans-serif'],
        sans: ['"Geom Graphic"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        label: ['"Geom Graphic"', '"Space Grotesk"', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        widest2: '0.22em'
      }
    }
  },
  plugins: []
};
