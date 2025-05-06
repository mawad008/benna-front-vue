// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',
  modules:["@pinia/nuxt" , "@nuxt/ui" , "@nuxtjs/tailwindcss" , "@nuxtjs/i18n", ],
  i18n: {
    locales: [
      // {
      //   code: "en",
      //   language: "en",
      //   name: "EN",
      //   dir: "ltr",
      //   file: "en.json",
      // },
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
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected", 
      redirectOn: "root", 
      alwaysRedirect: false, 
      
    },
    vueI18n: './i18n.config.ts'
  },
  app:{
    head:{
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      link:[
        // { rel: "icon", type: "image/svg", href: "/fav.svg" },
        { rel: "stylesheet", href: "https://cdn.moyasar.com/mpf/1.15.0/moyasar.css" },
      ],
      script: [
        { src: "https://cdn.moyasar.com/mpf/1.15.0/moyasar.js" , type: "text/javascript" },
      ],
    },
  },
  // router: {
  //   middleware: ['loading.global'],
  // },
  css: [
    "@/assets/main.css"
  ]
})
