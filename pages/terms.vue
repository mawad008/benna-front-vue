<template>
  <Hero />
  <div class="lg:my-10 md:my-20 my-10 container px-4 mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-primary">{{ $t("termsPage.title") }}</h1>

    <div class="space-y-4">
      <div v-if="termsHtml" v-html="termsHtml" />

      <div v-else class="h-[calc(80vh-200px)] flex items-center justify-center">
        <div class="spinner" aria-label="جاري التحميل"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from "@/components/ui/Hero.vue";
import { useApi } from "@/composables/api";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";

definePageMeta({
  layout: "default",
});

const { locale } = useI18n();
const { get } = useApi(locale.value);
const termsHtml = ref<string | null>(null);

onMounted(async () => {
  try {
    const res = await get("/api/terms");
    const { terms } = res.data.data as any;
    termsHtml.value = terms;
  } catch (error) {
    console.warn(
      "Failed to load terms from API, falling back to static content."
    );
  }
});
</script>

<style scoped>
.prose p {
  margin-bottom: 1rem;
  line-height: 1.8;
}
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #138b96;
}

</style>
