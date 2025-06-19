export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.includes('/thanks')) {
    // Check if the user is being redirected from a payment process
    // by verifying the presence of required query parameters
    const hasPaymentParams = to.query.id && to.query.status;
    if (!hasPaymentParams) {
      // Get the current locale from the URL
      const locale = to.path.startsWith('/en') ? 'en' : 'ar';
      return navigateTo(`/${locale}`);
    }
  }
});