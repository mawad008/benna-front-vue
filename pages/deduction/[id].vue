<template>
  <Hero />
  <div class="container lg:mt-10 md:mt-20">
    <div>
      <UBreadcrumb :links="links" />
    </div>
    <p class="text-2xl font-bold mb-4 text-primary">
      {{ campaignsStore.getCampaignName(Number(campaigns_id)) }}
    </p>
    <DeductionsTable />
  </div>
</template>

<script setup lang="ts">
import Hero from "@/components/ui/Hero.vue";
import DeductionsTable from "@/components/DeductionsTable.vue";
import { useRoute } from "vue-router";
import { useCampaignsStore } from "@/stores/compaigns";

definePageMeta({ layout: "default" });

const route = useRoute();

const campaigns_id = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;
// console.log(campaigns_id);

const campaignsStore = useCampaignsStore();

const links = [
  {
    label: "الرئيسية",
    href: "/",
  },
  {
    label: "الحملات",
    href: "/campaigns",
  },
  {
    label: "عرض الاستقطاعات",
    href: `/deduction/${campaigns_id}`,
  },
];
</script>
