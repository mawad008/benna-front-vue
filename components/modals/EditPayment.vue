<template>
  <UModal
    v-model="isOpen"
    @ui:close="closeModal"
    :transition="true"
    :transition-props="{
      enterActiveClass: 'transition ease-out duration-300 transform',
      enterFromClass: 'opacity-0 scale-95',
      enterToClass: 'opacity-100 scale-100',
      leaveActiveClass: 'transition ease-in duration-200 transform',
      leaveFromClass: 'opacity-100 scale-100',
      leaveToClass: 'opacity-0 scale-95',
    }"
  >
    <div class="p-4 space-y-4 rounded-lg shadow-xl" ref="modalContent">
      <!-- Payment Form State -->
      <template v-if="!donationStore.showPayment && !paymentSuccess">
        <div
          class="flex flex-col gap-4 animate-in fade-in duration-500 relative"
        >
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="absolute top-0 left-0 z-10 hover:bg-gray-200 rounded-full p-2"
            @click="closeModal"
          />
          <DonationCard :row="props?.row" />
          <DonorNameCard />
        </div>

        <!-- Error -->
        <div
          v-if="donationStore.submissionError"
          class="text-red-600 text-sm text-center animate-in slide-in-from-bottom-2"
        >
          {{ donationStore.submissionError }}
        </div>

        <!-- Button -->
        <div class="mt-4 w-full">
          <UButton
            class="w-[50%] mx-auto bg-[#138B96] text-white font-bold py-3 rounded-lg text-center hover:bg-[#0f6f77] transition-colors duration-300"
            :loading="donationStore.loading"
            :disabled="donationStore.loading"
            @click="handleDonation"
            :loading-text="
              donationStore.loading ? 'جاري التحقق ...' : 'جاري التحميل...'
            "
            color="primary"
            variant="solid"
            block
          >
            {{ $t("editPaymentButton") }}
          </UButton>
        </div>
      </template>

      <!-- Payment Card State -->
      <template v-if="donationStore.showPayment && !paymentSuccess">
        <!-- <CustomPaymentCard
          class="animate-in zoom-in-95 duration-300"
          @paymentSuccess="handlePaymentSuccess"
        /> -->
        <MoyasarPayment
          class="animate-in zoom-in-95 duration-300"
          @paymentSuccess="handlePaymentSuccess"
          :rowId="props?.row?.id"
        />
      </template>

      <!-- Success State -->
      <template v-if="paymentSuccess">
        <div class="flex flex-col items-center gap-4 p-6 text-center">
          <div class="flex justify-end w-full">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="closeModal"
            />
          </div>

          <div class="text-green-500 text-5xl">
            <UIcon name="i-heroicons-check-circle" />
          </div>

          <h3 class="text-xl font-bold text-gray-900">شكراً لتبرعك!</h3>

          <p class="text-gray-600">لقد تم استلام تبرعك بنجاح. شكراً لدعمك!</p>

          <UButton
            color="primary"
            variant="solid"
            @click="closeModal"
            class="mt-4"
          >
            إغلاق
          </UButton>
        </div>
      </template>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import { useDonationStore } from "@/stores/donation/donationStore";
import DonationCard from "@/components/cards/DonationCard.vue";
import DonorNameCard from "@/components/cards/DonorNameCard.vue";
// import CustomPaymentCard from "../cards/CustomPaymentCard.vue";
import MoyasarPayment from "../cards/MoyasarPayment.vue";
import { useDeductionHistoryStore } from "@/stores/deductions";

const donationStore = useDonationStore();
const deductionStore = useDeductionHistoryStore();

const props = defineProps({
  row: Object,
  open: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:open"]);

const isOpen = ref(props.open);
const paymentSuccess = ref(false);

watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
    if (newVal) {
      paymentSuccess.value = false;
    }
  }
);

watch(isOpen, (newVal) => {
  emit("update:open", newVal);
});

const closeModal = () => {
  isOpen.value = false;
  paymentSuccess.value = false;
  donationStore.showPayment = false;
};
console.log(props?.row?.id);

const handleDonation = async () => {
  if (!props.row?.id) return;
  await donationStore.updatePayment(props.row.id);
  if (donationStore.submissionError) {
    donationStore.showPayment = false;
    return;
  }
  donationStore.showPayment = true;
};


const handlePaymentSuccess = (paymentData: any) => {
  paymentSuccess.value = true;
  donationStore.showPayment = false;
};
</script>

<style scoped>
</style>