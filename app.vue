<template>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

</template>

<script setup lang="ts">
const i18n = useI18n();
const route = useRoute();
const langCookie = useCookie("i18n_redirected");

onMounted(() => {
  if (!langCookie.value) {
    const userLang = navigator.language.startsWith("ar") ? "ar" : "en";
    i18n.locale.value = userLang;
    langCookie.value = userLang;
  }
});

watchEffect(() => {
  useHead({
    htmlAttrs: {
      lang: i18n.locale.value,
      dir: i18n.locale.value === "ar" ? "rtl" : "ltr",
    },
  });
});


</script>
<style>
#__nuxt, html,body,:root{
  height: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}


</style>