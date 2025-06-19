export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'ar',
    defaultLocale: "ar",
    lazy: true,
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected", 
      redirectOn: "root", 
      alwaysRedirect: true, 
      cookieSecure: true,
      fallbackLocale: "ar",
    },
  }))