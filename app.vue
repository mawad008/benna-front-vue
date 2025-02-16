<template>

    <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

</template>

<script setup>
const i18n = useI18n();
const langCookie = useCookie("i18n_redirected");
onMounted(() => {
  if (!langCookie.value) {
    const userLang = navigator.language.startsWith("ar") ? "ar" : "en";
    i18n.locale.value = userLang;
    langCookie.value = userLang; 
  }
  useHead({
    htmlAttrs: {
      lang: i18n.locale.value == "en" ? "en" : "ar",
      dir: i18n.locale.value == "en" ? "ltr" : "rtl",
    },
  });
});
</script>
