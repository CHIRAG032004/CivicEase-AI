export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { navy: { 900: '#0B1F3A', 800: '#12305A', 700: '#1B4275' }, teal: { 600: '#0B7F8B', 500: '#0E9AA7', 100: '#D6F1F3' }, saffron: { 500: '#F4A024', 100: '#FDEBCB' }, paper: '#F6F8FB' },
    fontFamily: { display: ['"Source Serif 4"', 'Georgia', 'serif'], body: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'] }
  } },
  plugins: []
};
