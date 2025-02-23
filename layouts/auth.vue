<template>
  <div>
    <slot />
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { useHead } from "#app";

const route = useRoute();
const websiteName = "Benaa";

useHead({
  title: computed(() => {
    const pageTitle =
      {
        "/": "Register",
      }[route.path] || "Page";
    return `${websiteName} - ${pageTitle}`;
  }),
});
</script>
  <style lang="">
</style>