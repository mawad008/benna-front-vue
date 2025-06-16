<template>
  <Hero />
  <div class="container lg:mt-10 md:mt-20">
    <!-- Loading State -->
    <div
      v-if="isLoading || deductionHistoryStore.loading"
      class="text-center text-gray-500 h-[calc(100vh-200px)] flex items-center justify-center"
    >
      <div class="spinner" aria-label="جاري التحميل"></div>
    </div>
    <div
      v-else-if="deductionHistoryStore.deductionHistory.length === 0"
      class="text-center text-gray-500 my-4 h-[calc(50vh-100px)] flex items-center justify-center text-2xl font-medium flex-col gap-4"
    >
      {{ $t("deductionPage.noDeductions") }}

      <button
        @click="router.push('/campaigns')"
        class="bg-[#138B96] text-white font-bold py-2 px-2 rounded-lg hover:bg-[#138B96]/80 transition-colors mt-4 text-[16px]"
        :icon="icon"
        icon-position="end"
      >
        {{ $t("deductionPage.goBack") }}
      </button>
    </div>
    <div v-else class="lg:mt-10 md:mt-20">
      <!-- <div class="mt-10 md:mt-0 lg:mt-0">
      <UBreadcrumb :links="links" />
    </div> -->
      <div class="flex items-center gap-2">
        <UButton
          color="primary"
          variant="solid"
          :icon="icon"
          @click="router.push('/campaigns')"
        >
        </UButton>
        <h1 class="font-janna font-bold text-dark text-[20px] leading-[37.2px]">
          <!-- {{ deductionsStore.getCampaignName() }}
             -->
          {{ $t("deductionPage.title") }}
        </h1>
      </div>
      <br />
      <DeductionsTable :deductions="deductionHistoryStore.deductionHistory" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from "@/components/ui/Hero.vue";
import DeductionsTable from "@/components/tables/DeductionsTable.vue";
import { useRoute } from "vue-router";
import { useDeductionHistoryStore } from "@/stores/deductions";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

definePageMeta({ layout: "default" });
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);
const campaign_id = route.params.id;
const deductionHistoryStore = useDeductionHistoryStore();
const { locale } = useI18n();

const icon = computed(() => {
  return locale.value === "ar"
    ? "i-heroicons-arrow-right-20-solid"
    : "i-heroicons-arrow-left-20-solid";
});



onMounted(() => {
  isLoading.value = true;
  deductionHistoryStore.fetchDeductions(Number(campaign_id));
  isLoading.value = false;
});
const { t } = useI18n();

// const links = [
//   {
//     label: t("campaignsPage.links.home"),
//     to: "/",
//   },
//   {
//     label: t("campaignsPage.links.campaigns"),
//     to: "/campaigns",
//   },
//   {
//     label: t("campaignsPage.links.deductions"),
//     to: `/deduction/${campaign_id}`,
//   },
// ];
</script>

<style scoped>
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #138b96;
}
</style>
