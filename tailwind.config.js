import { blue } from '@radix-ui/colors';

/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    keyframes: {
      hide: {
        from: { opacity: '1' },
        to: { opacity: '0' },
      },
      slideIn: {
        from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        to: { transform: 'translateX(0)' },
      },
      swipeOut: {
        from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
        to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
      },
    },
    animation: {
      hide: 'hide 100ms ease-in',
      slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      swipeOut: 'swipeOut 100ms ease-out',
    },
    extend: {
      colors: {
        ...blue,
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
