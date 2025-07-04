// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-11-01",
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    // "@nuxtjs/color-mode",
  ],
  colorMode: {
    preference: 'light'
  },
  i18n: {
    locales: [
      {
        language: "en",
        code: "en",
        name: "EN",
        dir: "ltr",
        file: "en.json",
      },
      {
        language: "ar",
        code: "ar",
        name: "AR",
        dir: "rtl",
        file: "ar.json",
      },
    ],
    defaultLocale: "ar",
    langDir: "lang",
    lazy: true,
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: true,
    },
  },
  app: {
    head: {
      title: "Benna | بناء",
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      link: [
        {
          rel: "stylesheet",
          // href: "https://cdn.moyasar.com/mpf/1.15.0/moyasar.css",
          href: "https://unpkg.com/moyasar-payment-form@2.0.14/dist/moyasar.css",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
      script: [
        {
          // src: "https://cdn.moyasar.com/mpf/1.15.0/moyasar.js",
          src: "https://unpkg.com/moyasar-payment-form@2.0.14/dist/moyasar.umd.js",
          type: "text/javascript",
        },
      ],
    },
  },
  css: ["@/assets/main.css"],
  runtimeConfig: {
    public: {
      Moyasar: {
        publishable_api_key: process.env.NODE_ENV === 'development' 
          ? 'pk_test_2Ftd31JoJvPQhbYrKdmyPdr7HsfPVFZF8Q1mEs5e' 
          : 'pk_live_uBjoMEHPt5spU8NzwQFtdHgdjD7ZJJDCVKxjs7RG',
      },
    },
  },
});
