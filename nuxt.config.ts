// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/global.scss'],
  modules: ['@vueuse/nuxt'],
  runtimeConfig: {
    public: {
      API_BASE_URL: 'http://192.168.1.136:3000'
    }
  },
  app: {
    head: {
      script: [
        {
          src: 'https://kit.fontawesome.com/f8ee3158a1.js',
          crossorigin: 'anonymous',
        },
      ],
      titleTemplate: '%s - Hexaturion',
      title: 'Hexaturion',
      htmlAttrs: {
        lang: 'en',
      },
      bodyAttrs: {
        class: 'has-navbar-fixed-top',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  ssr: false,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: false,
          additionalData: '@import "@/assets/styles/variables.scss";',
        },
      },
    },
  },
})
