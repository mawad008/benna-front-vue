export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'ar',
    defaultLocale: "ar",
    lazy: true,
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true, // Enable cookie usage
      cookieKey: "i18n_redirected", // Name of the cookie
      redirectOn: "root", // Redirect only on the root path
      alwaysRedirect: false, // Disable to avoid redirecting every visit
    },
    messages: {
      en: {
        home: 'home'
      },
      ar: {
        welcome: 'الرئيسية'
      }
    }
  }))