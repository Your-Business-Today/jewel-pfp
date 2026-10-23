/** @type {import('tailwindcss').Config} */
// JPFP Brand Guidelines, Issue 1.2 (16/10/2026): night mode, Inter, Passive Red used once per area.
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#000000', // Passive Black: page ground
          2: '#1A1A1A', // Charcoal: column headers and call-out bodies
          3: '#141414' // input cells
        },
        paper: {
          DEFAULT: '#FFFFFF' // titles, headings, values
        },
        body: '#EDEDED',
        note: '#BFBFBF',
        footer: '#9A9A9A',
        hairline: '#3A3A3A',
        signal: '#D7282E', // Passive Red
        gold: '#C19B52',
        status: {
          red: '#FF0000',
          yellow: '#FFFF00',
          green: '#00B050'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        widest2: '0.22em'
      }
    }
  },
  plugins: []
};
