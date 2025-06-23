<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n();

onMounted(() => {
  localStorage.setItem("nuxt-color-mode", "light");
});
useHead({
  htmlAttrs: {
    lang: locale,
    dir: computed(() => (locale.value === "ar" ? "rtl" : "ltr")),
  },
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
