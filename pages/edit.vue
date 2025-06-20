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
        <h1 class="text-2xl md:text-2xl font-bold text-white mb-4">
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
        <h1 class="text-2xl font-bold text-white mb-4">
          {{ $t("successPage.error") }}
        </h1>
        <p class="text-xl text-white mb-4">
          {{ errorMessage || "يرجى المحاولة مرة أخرى لاحقاً." }}
        </p>
        <button
          @click="retryPayment"
          :disabled="isLoading"
          aria-label="إعادة محاولة الدفع"
          class="bg-white text-[#138B96] font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {{ $t("successPage.retry") }}
        </button>
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

const { locale } = useI18n();
const route = useRoute();
const router = useRouter();
const id = ref<string | null>(route.query.id as string | null);
const token = ref<string | null>(route.query.token as string | null);
const status = ref<string | null>(route.query.status as string | null);
const amount = ref<number | null>(
  route.query.amount ? parseFloat(route.query.amount as string) : null
);
const { post } = useApi();
const donationStore = useDonationStore();
const isLoading = ref(true);
const isSuccess = ref(false);
const errorMessage = ref<string | null>(null);

interface PaymentResponse {
  data: {
    status: string;
  };
}

const createPayment = async () => {
  try {
    isLoading.value = true;
    // if (!id.value || !status.value || !token.value || !amount.value) {
    if (!token.value || !amount.value) {
      throw new Error("معلومات الدفع غير صالحة");
    }
    const response = await post<PaymentResponse>("/api/createPayment", {
      // id: id.value,
      // status: status.value,
      // amount: amount.value,
      token: token.value,
      deduction_id: Number(localStorage.getItem("donation")),
    });
    // console.log(response.data.status);
    // if (response?.data?.status === "paid") {
    isSuccess.value = true;
    // } else {
    //   throw new Error("Payment creation failed: Invalid response");
    // }
  } catch (error: any) {
    console.error("Payment creation failed", error);
    isSuccess.value = false;
    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً";
  } finally {
    isLoading.value = false;
  }
};

const retryPayment = () => {
  errorMessage.value = null;
  isLoading.value = true;
  createPayment();
};

onMounted(() => {
  // if (!id.value || !status.value || !token.value || !amount.value) {
  if (!token.value || !amount.value) {
    isLoading.value = false;
    errorMessage.value = "معلومات الدفع غير كاملة";
    return;
  }
  createPayment();
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
