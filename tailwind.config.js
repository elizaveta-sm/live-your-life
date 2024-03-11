/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    // screens: {
    //   'sm': '800px',
    // },

    // colors: {
    //   'light-yellow': '#FFF6AE',
    //   'light-pink': '#FFABF8',
    // },

    fontFamily: {
      body: ['Khula', 'sans-serif'],
      h2: ['Roboto Slab', 'serif'],
    },

    extend: {
      // spacing: {
      //   '128': '32rem',
      //   '144': '36rem',
      // },
      // borderRadius: {
      //   '4xl': '2rem',
      // }
    }
  },

  plugins: [
    require('flowbite/plugin'),
    require('preline/plugin'),
  ],
}

