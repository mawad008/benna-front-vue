<template>
  <section class="bg-[#138B96] min-h-screen w-full flex items-center justify-center">
    <div class="container mx-auto flex flex-col items-center justify-center text-center py-24 px-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="max-w-2xl">
        <p class="text-2xl text-white">
          {{ $t("successPage.loading") }}
        </p>
        <div class="spinner" aria-label="جاري التحميل"></div>
      </div>

      <!-- Success State -->
      <div v-else-if="isSuccess" class="max-w-2xl flex flex-col items-center justify-center gap-4">
        <h1 class="text-text-2xl md:text-2xl font-bold text-white mb-4">
          {{ $t("successPage.title") }}
        </h1>
        <p class="text-xl lg:text-xl text-white flex items-center gap-2 flex-row">
          {{ $t("successPage.paragraph") }} </p>
          <p> {{ amount }} <img src="/unit.svg" alt="saudi-riyal" class="w-6 h-6"></p>
         <p>{{ $t("successPage.paragraph2") }}</p>
     
        <p class="text-xl lg:text-xl text-white">
          {{ $t("successPage.message") }}
        </p>
        <button @click="goToHome"
          class="bg-white text-[#138B96] font-bold py-4 px-4 rounded-lg hover:bg-gray-200 transition-colors mt-4"
          icon="i-heroicons-arrow-left-20-solid" icon-position="end">
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
import { onMounted, ref, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApi } from "@/composables/api";
import { useI18n } from "vue-i18n";
import { useDonationStore } from "@/stores/donation/donationStore";
import { usePaymentStore } from "@/stores/donation/paymentStore";
import { useDonorStore } from "@/stores/donation/donorStore";

// Define middleware to prevent direct access
// definePageMeta({
//   middleware: ["payment-redirect"]
// });

const { t } = useI18n();
const { locale } = useI18n();
const route = useRoute();
const router = useRouter();
const id = ref<string | null>(route.query.id as string | null);
const status = ref<string | null>(route.query.status as string | null);
const amount = ref<number | null>(
  route.query.amount ? parseFloat(route.query.amount as string) : null
);
const message = ref<string | null>(route.query.message as string | null);
const { post } = useApi();
const donationStore = useDonationStore();
const donorStore = useDonorStore();
const paymentStore = usePaymentStore();
const isLoading = ref(true);
const isSuccess = ref(false);
const errorMessage = ref<string | null>(null);


const isToday = computed(() => {
  try {
    return localStorage.getItem("isToday");
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
});

// Function to map Moyasar error codes to translation keys
const getMoyasarErrorKey = (errorCode: any) => {
  if (!errorCode) return 'DEFAULT';
  // Decode URL encoded characters (+ becomes space in URLs)
  let decodedErrorCode = decodeURIComponent(errorCode);
  // Handle error codes with colon (format: MAIN_ERROR:ADDITIONAL_INFO)
  if (decodedErrorCode.includes(':')) {
    // Extract only the main error code before the colon
    decodedErrorCode = decodedErrorCode.split(':')[0].trim();
  }
  // Replace spaces with underscores for consistency
  decodedErrorCode = decodedErrorCode.replace(/\s+/g, '_');
  // List of known Moyasar error codes (using underscores for consistency)
  const knownErrors = [
    'INSUFFICIENT_FUNDS',
    'DECLINED',
    'BLOCKED',
    'EXPIRED_TRANSACTION',
    'UNSPECIFIED_FAILURE',
    'EXPIRED_CARD',
    'TIMED_OUT',
    'INVALID_SECURITY_CODE',
    'REFERRED',
    'AUTHENTICATION_FAILED',
    'AUTHENTICATION_ATTEMPTED',
    'AUTHENTICATION_NOT_AVAILABLE',
    'AUTHENTICATION_ERROR',
    'VISA_NOT_SUPPORTED',
    'MASTERCARD_NOT_SUPPORTED',
    'CARD_NOT_ENROLLED'
  ];

  // Check if the error code is in our known list
  if (knownErrors.includes(decodedErrorCode)) {
    return decodedErrorCode;
  }

  // Log the error code for debugging
  console.log('Unknown error code:', errorCode, 'Decoded:', decodedErrorCode);

  // Default error message if not found
  return 'DEFAULT';
};

const deductionToken = computed(() => { return localStorage.getItem("deductionToken") });
const updateDeductionRow = computed(() => { return localStorage.getItem("updateDeductionRow") });
const payment_token = computed(() => {
  try {
    const stored = localStorage.getItem("payment");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to parse payment from localStorage", error);
    return null;
  }
});




async function saveTokenOnBackend() {
  // console.log(updateDeductionRow.value);
  if (updateDeductionRow.value) {
    try {
      const response = await post(`/api/update/deduction/${updateDeductionRow.value}?step=1`, {
        moyasar_token: payment_token.value?.source?.token,
        registration_token: deductionToken.value,
        payment_id: id.value,
      });
      localStorage.removeItem("updateDeductionRow");
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await post("/api/create/deduction?step=1", {
        moyasar_token: payment_token.value?.source?.token,
        registration_token: deductionToken.value,
        payment_id: id.value,
      });
      localStorage.removeItem("updateDeductionRow");
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }

  }
}


onMounted(() => {
  if (message.value === "APPROVED" && status.value === "paid") {
    // if (!isToday.value) {
    //   //This Fuction is only used to give the BE the ability to refund the payment with payment ID, But it is not used in the FE
    //   // and only used when the deduction is not starting today
    //   paymentStore.refundPayment(id.value!);
    // }
    isSuccess.value = true;
    isLoading.value = false;
    saveTokenOnBackend();
  } else {
    isLoading.value = false;
    isSuccess.value = false;

    // Get the appropriate error message key
    const errorKey = getMoyasarErrorKey(message.value);
    errorMessage.value = t(`moyasarErrors.${errorKey}`);
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

<style scoped></style>