export default defineNuxtConfig({
  app: {
    head: {
      title: 'Led-cube frontend',
      meta: [
        { name: 'description', content: 'Everything about - Nuxt-3' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ]
    }
  },
  runtimeConfig: {
    currencyKey: process.env.CURRENCY_API_KEY
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  //modules: [
  //  // https://go.nuxtjs.dev/axios
  //  '@nuxtjs/axios',
  //],
})
