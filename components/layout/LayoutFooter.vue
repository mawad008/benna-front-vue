<template>
  <footer class="bg-white text-dark py-4 border-t border-gray-300 ">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm px-4 py-2 gap-2"
    >
      <p>{{ $t("footer.title") }}</p>

      <p class="flex items-center gap-3">
        {{ $t("footer.developed") }}
        <!-- <img src="/WS-logo.png" alt="Webstdy Logo" class="h-5" /> -->

        <a
          title="شركة ويب ستدي لخدمات تصميم و برمجة المواقع و التطبيقات"
          href="https://webstdy.com/ar?utm_source=benna-foorter&amp;utm_medium=referral"
          target="_blank"
          rel="noopener"
        >
          <img
            class="lazyloaded h-5"
            title="شركة ويب ستدي لخدمات تصميم و برمجة المواقع و التطبيقات"
            src="/WS-logo.png"
            alt="شركة ويب ستدي لخدمات تصميم و برمجة المواقع و التطبيقات"
            data-src="https://webstdy.com/CDN/cr.png"
          />
        </a>
      </p>

      <div class="flex items-center gap-2">
        <p>{{ $t("footer.app-download") }}</p>
        <img src="/apple-store.png" alt="Apple Store" class="h-5" />
        <img src="/google-play.png" alt="Google Play" class="h-5" />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useApi } from "@/composables/api";

const { locale } = useI18n();
const { get } = useApi(locale.value);

// onMounted(async () => {
//   try {
//     const res = await get("/social");
//   } catch (error) {
//     console.error("Error fetching social media links: ", error as string);
//   }
// });
</script>

<style scoped></style>
