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
const websiteName = "Benna";



useHead({
  title: computed(() => {
    const pageTitle =
      {
        "/home": "Home",
        "/contact": "Contact",
        "/donate": "Donate",
      }[route.path] || "Page";
    return `${websiteName} - ${pageTitle}`;
  }),
});
</script>