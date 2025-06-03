<template>
  <footer class="bg-white text-dark py-4 border-t border-gray-300">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm px-4 py-2 gap-2 text-center"
    >
      <p>{{ $t("footer.title") }}</p>

      <NuxtLink to="/terms" class="hover:text-primary">{{
        $t("terms")
      }}</NuxtLink>

      <p class="flex items-center gap-3">
        {{ $t("footer.developed") }}
        <a
          title="شركة ويب ستدي لخدمات تصميم و برمجة المواقع و التطبيقات"
          href="https://webstdy.com/ar?utm_source=benna-foorter&amp;utm_medium=referral"
          target="_blank"
          rel="noopener"
        >
          <img
            class="lazyloaded h-5"
            src="/WS-logo.png"
            alt="شركة ويب ستدي لخدمات تصميم و برمجة المواقع و التطبيقات"
          />
        </a>
      </p>

      <div v-if="appLinks" class="flex items-center justify-center gap-2">
        <p class="leading-none">{{ $t("footer.app-download") }}</p>

        <a
          :href="
            appLinks?.google.startsWith('http')
              ? appLinks.google
              : 'https://' + appLinks.google
          "
          target="_blank"
          title="Google Play"
          class="flex items-center"
        >
          <Icon name="mdi:google-play" size="20" class="leading-none" />
        </a>

        <a
          :href="
            appLinks?.apple.startsWith('http')
              ? appLinks.apple
              : 'https://' + appLinks.apple
          "
          target="_blank"
          title="Apple Store"
          class="flex items-center"
        >
          <Icon name="mdi:apple" size="22" class="leading-none" />
        </a>
      </div>
    </div>
  </footer>
</template>


<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useApi } from "@/composables/api";

const { locale } = useI18n();
const { get } = useApi(locale.value);
const appLinks = ref<{ apple: string; google: string } | null>(null);

onMounted(async () => {
  try {
    const res = await get("/api/footer");
    const responseData = res.data as {
      data: { apple: string; google: string };
    };
    const { apple, google } = responseData.data;
    appLinks.value = { apple, google };
  } catch (error) {
    console.error("Error fetching social media links: ", error as string);
  }
});
</script>


<style scoped></style>
