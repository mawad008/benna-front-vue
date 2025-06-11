<template>
  <div class="flex justify-center md:w-[100%] lg:w-[100%] w-full h-fit mb-4">
    <div class="w-full lg:w-4/5 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
      <div class="flex items-center gap-2">
        <UButton color="primary" variant="solid" :icon="icon" @click="donationStore.showPayment = false">
        </UButton>
        <br />
        <!-- Title with Badge -->
        <Title :title="$t('cards.customPaymentCard.title')" badge="3" class="text-end" />
      </div>
      <div class="mysr-form" />
      <p v-if="!donorStore.isStartDateToday()" class="text-center text-yellow-500 text-sm mt-2 py-4 px-2 rounded-lg border border-yellow-500 bg-yellow-50"> 
        <span>*</span>
       {{ $t('paymentWarningMessage') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useDonorStore } from "@/stores/donation/donorStore";
import { useDonationStore } from "@/stores/donation/donationStore";
import Title from "@/components/ui/Title.vue";
import { useI18n } from "vue-i18n";

// props To Get deduction Id From Deduction Table
const props = defineProps({
  rowId: {
    type: Number,

  },
})


const { locale } = useI18n();
const donationStore = useDonationStore();
const donorStore = useDonorStore();

const icon = computed(() => {
  return locale.value === "ar"
    ? "i-heroicons-arrow-right"
    : "i-heroicons-arrow-left";
});

const deductionId = computed(() => {
  if(!props.rowId){
  return Number(localStorage.getItem("donation"));
  }
  return props.rowId;
});

const paymnetAmount = computed(() => {
   // withdrawal one riyal in case of start date is not today
  if(!donorStore.isStartDateToday()){
    return donorStore.withdrawalOneRiyal;
  }
   // withdrawal the actual amount in case of start date is today
  return donorStore.selectedAmount || donorStore.customAmount;
});

const Moyasar = useRuntimeConfig().public.Moyasar;

onMounted(() => {
  window.Moyasar.init({
    element: ".mysr-form",
    amount: Number(paymnetAmount.value) * 100,
    currency: "SAR",
    description: "Donation From " + donorStore.donorName,
    language: locale.value,
    publishable_api_key: Moyasar.publishable_api_key,
    callback_url: `${window.location.origin}/${locale.value}/thanks`,
    methods: ["creditcard", "mada", "visa"],
    tokenize: true,
    credit_card: {
      save_card: true,
    },
    on_completed: async function (payment: any) {
      await saveTokenOnBackend(payment.source.token, payment);
    },
    metadata: {
      deduction_id : deductionId.value,
      user_id : JSON.parse(localStorage.getItem("user")|| "")?.id,
      type: donorStore.recurringType,
      // "1" is the default campaign id
      campaign_id : donationStore.campaign_id || "1",
    },

  });
});

async function saveTokenOnBackend(token: any, payment: any) {
  localStorage.setItem("payment", JSON.stringify(payment));
  const { post } = useApi();
  try {
    const response = await post("/api/createPayment", {
      token: token,
      deduction_id: deductionId.value,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped></style>


