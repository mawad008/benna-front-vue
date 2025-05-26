<template>
  <Hero />
  <div
    v-if="deductionsStore.loading"
    class="text-center text-gray-500 my-4 h-[calc(50vh-100px)] flex items-center justify-center font-medium"
  >
    {{ $t("deductionPage.loading") }}
  </div>
  <div
    v-else-if="deductionsStore.deductions.length === 0"
    class="text-center text-gray-500 my-4 h-[calc(50vh-100px)] flex items-center justify-center text-2xl font-medium flex-col gap-4"
  >
    {{ $t("deductionPage.noDeductions") }}

    <button
      @click="router.push('/campaigns')"
      class="bg-[#138B96] text-white font-bold py-2 px-2 rounded-lg hover:bg-[#138B96]/80 transition-colors mt-4 text-[16px]"
      icon="i-heroicons-arrow-left-20-solid"
      icon-position="end"
    >
      {{ $t("deductionPage.goBack") }}
    </button>
  </div>
  <div v-else class="container lg:mt-10 md:mt-20">
    <div class="mt-10 md:mt-0 lg:mt-0">
      <UBreadcrumb :links="links" />
    </div>
    <br />
    <br />
    <div class="flex items-center gap-2">
      <UButton
        color="primary"
        variant="solid"
        icon="i-heroicons-arrow-right"
        @click="router.push('/campaigns')"
      >
      </UButton>
      <h1 class="font-janna font-bold text-dark text-[20px] leading-[37.2px]">
        {{ deductionsStore.getCampaignName() }}
      </h1>
    </div>
    <br />
    <DeductionsTable :deductions="deductionsStore.deductions" />
  </div>
</template>

<script setup lang="ts">
import Hero from "@/components/ui/Hero.vue";
import DeductionsTable from "@/components/DeductionsTable.vue";
import { useRoute } from "vue-router";
import { useDeductionsStore } from "@/stores/deductions";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

definePageMeta({ layout: "default" });
const router = useRouter();
const route = useRoute();

const campaign_id = route.params.id;
const deductionsStore = useDeductionsStore();

onMounted(() => {
  deductionsStore.fetchDeductions(Number(campaign_id));
});
const { t } = useI18n();

const links = [
  {
    label: t("campaignsPage.links.home"),
    to: "/",
  },
  {
    label: t("campaignsPage.links.campaigns"),
    to: "/campaigns",
  },
  {
    label: t("campaignsPage.links.deductions"),
    to: `/deduction/${campaign_id}`,
  },
];
</script>
