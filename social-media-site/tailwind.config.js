// noinspection NpmUsedModulesInstalled
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['index.html', 'src/**/*.{vue,js,ts,jsx,tsx}', 'src/App.vue',
    "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    import('flowbite'),
  ],
}

