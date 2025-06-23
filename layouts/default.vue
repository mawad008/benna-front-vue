<template>
  <div class="bg-[#FAFAFA]">
    <!-- <Loader /> -->
    <LayoutNavbar></LayoutNavbar>
    <slot />
    <LayoutFooter></LayoutFooter>
  </div>
</template>

<script setup lang="ts">
import LayoutNavbar from "@/components/layout/LayoutNavbar.vue";
import LayoutFooter from "@/components/layout/LayoutFooter.vue";
// import Loader from "@/components/ui/Loader.vue";

const route = useRoute();
const websiteName = "Benna";



useHead({
  title: computed(() => {
    const pageTitle =
      {
        "/": "Home",
        "/contact": "Contact",
        "/campaigns": "Campaigns",
        "/deductions/:id": "Deductions",
        "/terms": "Terms",
        "/thanks": "Thanks",
      }[route.path] || "";
    return `${websiteName}${pageTitle ? " - " + pageTitle : ""}`;
  }),
});
</script>