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
  // Always set Arabic as default language on first load
  if (!langCookie.value || langCookie.value !== "ar") {
    i18n.locale.value = "ar";
    langCookie.value = "ar";
  }
  localStorage.setItem("nuxt-color-mode", "light");
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
#__nuxt,
html,
body,
:root {
  height: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>
