<template>
  <Hero />
  <div
    v-if="deductionsStore.loading"
    class="text-center text-gray-500 my-4 h-[calc(50vh-100px)] flex items-center justify-center font-medium"
  >
    جاري تحميل سجل الاستقطاعات...
  </div>
  <div
    v-else-if="deductionsStore.deductions.length === 0"
    class="text-center text-gray-500 my-4 h-[calc(50vh-100px)] flex items-center justify-center text-2xl font-medium"
  >
    لا يوجد سجلات حاليا
 
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

definePageMeta({ layout: "default" });
const router = useRouter();
const route = useRoute();

const campaign_id = route.params.id;
const deductionsStore = useDeductionsStore();

onMounted( () => {
   deductionsStore.fetchDeductions(Number(campaign_id));

});


const links = [
  {
    label: "الرئيسية",
    href: "/",
    link: true,
    onClick: () => {
      router.push("/");
    },
  },
  {
    label: "سجل الحملات",
    href: "/campaigns",
    link: true,
    onClick: () => {
      router.push("/campaigns");
    },
  },
  {
    label: "عرض الاستقطاعات",
    href: `/deduction/${campaign_id}`,
    link: true,
    onClick: () => {
      router.push(`/deduction/${campaign_id}`);
    },
  },
];
</script>
