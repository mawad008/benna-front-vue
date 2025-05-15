<template>
  <Hero />
  <div class="container lg:mt-10 md:mt-20">
    <div>
      <UBreadcrumb :links="links" />
    </div>
    <br />
    <br />
    <div class="flex items-center gap-2">
      <UButton color="primary" variant="solid" icon="i-heroicons-arrow-right" @click="navigateTo('/campaign')">
      </UButton>
      <h1 class="font-janna font-bold text-dark text-[20px] leading-[37.2px]">
        {{ campaignsStore.getCampaignName(Number(campaign_id)) }}
      </h1>
    </div>
    <br />
    <DeductionsTable :deductions="deductionsStore.deductions"/>
  </div>
</template>

<script setup lang="ts">
import Hero from "@/components/ui/Hero.vue";
import DeductionsTable from "@/components/DeductionsTable.vue";
import { useRoute } from "vue-router";
import { useCampaignsStore } from "@/stores/compaigns";
import { useDeductionsStore } from "@/stores/deductions";

const deductionsStore = useDeductionsStore();

onMounted(async () => {
  await deductionsStore.fetchDeductions(campaign_id);
});
definePageMeta({ layout: "default" });

const route = useRoute();

const campaign_id = route.params.id;
// console.log(campaign_id);

const campaignsStore = useCampaignsStore();


const links = [
  {
    label: "الرئيسية",
    href: "/",
    link: true,
    onClick: () => {
      navigateTo("/");
    },
  },
  {
    label: "سجل الحملات",
    href: "/campaigns",
    link: true,
    onClick: () => {
      navigateTo("/campaigns");
    },
  },
  {
    label: "عرض الاستقطاعات",
    href: `/deduction/${campaign_id}`,
    link: true,
    onClick: () => {
      navigateTo(`/deduction/${campaign_id}`);
    },
  },
];

</script>
