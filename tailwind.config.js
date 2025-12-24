/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb',
        primary: {
          DEFAULT: '#0B4EA2',
          dark: '#0A3D8A',
        },
        secondary: {
          DEFAULT: '#FF4A2D',
          dark: '#E6392A',
        },
        accent: {
          yellow: '#F7B500',
          green: '#00A97A',
          blue: '#2A74D6',
        },
        sidebar: {
          DEFAULT: '#1A1A1A',
          hover: '#2A2A2A',
          active: '#2A2A2A',
        },
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

