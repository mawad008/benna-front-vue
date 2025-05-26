// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
  modules:["@pinia/nuxt" , "@nuxt/ui" , "@nuxtjs/tailwindcss" , "@nuxtjs/i18n","@nuxt/icon" ],
  i18n: {
    locales: [
      {
        code: "en",
        language: "en",
        name: "EN",
        dir: "ltr",
        file: "en.json",
      },
      {
        code: "ar",
        language: "ar",
        name: "AR",
        dir: "rtl",
        file: "ar.json",
      },
    ],
    defaultLocale: "ar",
    lazy: true,
    langDir: "lang",
    legacy:false,
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: false,
    },
  },
  app:{
    head:{
      title: 'Benna | بناء',
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      link:[
        { rel: "stylesheet", href: "https://cdn.moyasar.com/mpf/1.15.0/moyasar.css" },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        { src: "https://cdn.moyasar.com/mpf/1.15.0/moyasar.js" , type: "text/javascript" },
      ],
    },
  },
  css: [
    "@/assets/main.css"
  ]
});