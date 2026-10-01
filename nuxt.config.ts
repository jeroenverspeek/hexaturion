// https://nuxt.com/docs/api/configuration/nuxt-config
import { apps } from "./catalog";

export default defineNuxtConfig({
  compatibilityDate: "2026-07-26",
  devtools: { enabled: true },
  css: ["~/assets/styles/global.scss"],
  modules: ["@vueuse/nuxt"],
  runtimeConfig: {
    public: {
      API_BASE_URL: "http://192.168.1.136:3000",
      //API_BASE_URL: 'https://cors-anywhere.herokuapp.com/http://192.168.1.136:3000'
    },
  },
  app: {
    head: {
      script: [
        {
          src: "https://kit.fontawesome.com/f8ee3158a1.js",
          crossorigin: "anonymous",
        },
      ],
      titleTemplate: "%s - Hexaturion",
      title: "Hexaturion",
      htmlAttrs: {
        lang: "en",
      },
      bodyAttrs: {
        class: "has-navbar-fixed-top",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  ssr: false,
  nitro: {
    prerender: {
      // a page per app, so that its address also works when opened directly
      routes: apps.map((app) => `/apps/${app.id}`),
    },
  },
});
