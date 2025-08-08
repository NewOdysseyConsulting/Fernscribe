import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0EA5E9',
          50: '#E6F7FE',
          100: '#CCEEFD',
          200: '#99DCFB',
          300: '#66CBF9',
          400: '#33B9F7',
          500: '#0EA5E9',
          600: '#0A83BA',
          700: '#07628B',
          800: '#05305E',
          900: '#031F3D',
        },
      },
    },
  },
  plugins: [],
}
export default config