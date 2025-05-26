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
    
      <template v-if="!donationStore.showPayment">
    
        <div class="flex flex-col gap-4 animate-in fade-in duration-500">
          <div class="flex justify-end">
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closeModal" />
          </div>
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
            تعديل بيانات الدفع
          </UButton>
        </div>
      </template>

      <template v-if="donationStore.showPayment">
        <CustomPaymentCard class="animate-in zoom-in-95 duration-300" />
      </template>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import { useDonationStore } from "@/stores/donation/donationStore";
import DonationCard from "@/components/cards/DonationCard.vue";
import DonorNameCard from "@/components/cards/DonorNameCard.vue";
import CustomPaymentCard from "../cards/CustomPaymentCard.vue";

const donationStore = useDonationStore();

const props = defineProps({
  row: Object,
  open: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:open"]);

const isOpen = ref(props.open);
watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);
watch(isOpen, (newVal) => {
  emit("update:open", newVal);
});

const closeModal = () => {
  isOpen.value = false;
};

const handleDonation = async () => {
  if (!props.row?.id) return;
  await donationStore.submitDonation(props.row.id);
  if (donationStore.submissionError) {
    donationStore.showPayment = false;
    return;
  }
  donationStore.showPayment = true;
};
</script>

<style scoped>
</style>