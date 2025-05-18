<template>
  <Hero />
  <div class="container lg:mt-10 md:mt-20">
    <div>
      <UBreadcrumb :links="links" />
    </div>
    <br />
    <br />
    <div class="flex items-center gap-2">
      <UButton
        color="primary"
        variant="solid"
        icon="i-heroicons-arrow-right"
        @click="router.push('/campaign')"
      >
      </UButton>
      <h1 class="font-janna font-bold text-dark text-[20px] leading-[37.2px]">
        {{ campaignName.value }}
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
import { useCampaignsStore } from "@/stores/compaigns";
import { useDeductionsStore } from "@/stores/deductions";
import { onMounted ,ref} from "vue";
import { useRouter } from "vue-router";

definePageMeta({ layout: "default" });
const router = useRouter();
const route = useRoute();
const deductionsStore = useDeductionsStore();
const campaignsStore = useCampaignsStore();
const campaign_id = route.params.id;
const campaignName = ref("");

onMounted(async () => {
  await deductionsStore.fetchDeductions(campaign_id);
  campaignName.value = deductionsStore.deductions?.[0].campaign_name;
});
console.log(campaignName.value);

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
