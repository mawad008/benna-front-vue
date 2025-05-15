<template>
  <div class="bg-[#FAFAFA]">
    <!-- <Loader /> -->
    <LayoutNavbar></LayoutNavbar>
    <slot />
    <LayoutFooter></LayoutFooter>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useHead } from "#app";
import LayoutNavbar from "@/components/layout/LayoutNavbar.vue";
import LayoutFooter from "@/components/layout/LayoutFooter.vue";
// import Loader from "@/components/ui/Loader.vue";

const route = useRoute();
const websiteName = "Benaa";



useHead({
  title: computed(() => {
    const pageTitle =
      {
        "/": "Home",
        "/contact": "Contact",
        "/campaign": "Campaigns",
        "/terms": "Terms",
        "/thanks": "Thanks",
      }[route.path] || "Page";
    return `${websiteName} - ${pageTitle}`;
  }),
});
</script>