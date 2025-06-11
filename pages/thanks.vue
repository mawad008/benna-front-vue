<template>
  <section
    class="bg-[#138B96] min-h-screen w-full flex items-center justify-center"
  >
    <div
      class="container mx-auto flex flex-col items-center justify-center text-center py-24 px-4"
    >
      <!-- Loading State -->
      <div v-if="isLoading" class="max-w-2xl">
        <p class="text-2xl text-white">
          {{ $t("successPage.loading") }}
        </p>
        <div class="spinner" aria-label="جاري التحميل"></div>
      </div>

      <!-- Success State -->
      <div
        v-else-if="isSuccess"
        class="max-w-2xl flex flex-col items-center justify-center gap-4"
      >
        <h1 class="text-text-2xl md:text-2xl font-bold text-white mb-4">
          {{ $t("successPage.title") }}
        </h1>
        <p class="text-xl lg:text-xl text-white">
          {{ $t("successPage.message") }}
        </p>
        <button
          @click="goToHome"
          class="bg-white text-[#138B96] font-bold py-4 px-4 rounded-lg hover:bg-gray-200 transition-colors mt-4"
          icon="i-heroicons-arrow-left-20-solid"
          icon-position="end"
        >
          {{ $t("successPage.goToHome") }}
        </button>
      </div>

      <!-- Error State -->
      <div v-else class="max-w-2xl">
        <h1 class="text-3xl font-bold text-white mb-4">
          {{ $t("successPage.error") }}
        </h1>
        <p class="text-xl text-white mb-4">
          {{ errorMessage || "يرجى المحاولة مرة أخرى لاحقاً." }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApi } from "@/composables/api";
import { useI18n } from "vue-i18n";
import { useDonationStore } from "@/stores/donation/donationStore";
import { usePaymentStore } from "@/stores/donation/paymentStore";

const { locale } = useI18n();
const route = useRoute();
const router = useRouter();
const id = ref<string | null>(route.query.id as string | null);
const status = ref<string | null>(route.query.status as string | null);
const amount = ref<number | null>(
  route.query.amount ? parseFloat(route.query.amount as string) : null
);
const message = ref<string | null>(route.query.message as string | null);
// console.log(message.value);
const { post } = useApi();
const donationStore = useDonationStore();
const paymentStore = usePaymentStore();
const isLoading = ref(true);
const isSuccess = ref(false);
const errorMessage = ref<string | null>(null);


onMounted(() => {
if(message.value === "APPROVED"){
  //This Fuction is only used to give the BE the ability to refund the payment with payment ID, But it is not used in the FE
  paymentStore.refundPayment(id.value!);
  isSuccess.value = true;
  isLoading.value = false;
}else{
  isLoading.value = false;
  isSuccess.value = false;
  errorMessage.value = message.value;
} 


});

const goToHome = () => {
  if (locale.value === "ar") {
    router.push("/ar");
  } else if (locale.value === "en") {
    router.push("/en");
  }
};
</script>

<style scoped>
</style>