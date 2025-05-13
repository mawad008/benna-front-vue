<template>
  <UModal v-model="isOpen" @ui:close="closeModal">
    <div class="p-6" ref="modalContent">
      <!-- Title: Edit Donation -->
      <!-- <Title title="تعديل طريقة الاستقطاع" badge="1" class="mb-4" /> -->
      <template v-if="!showPayment" class="flex flex-col items-center">
        <DonationCard class="w-full" />
        <DonorNameCard class="w-full" />

        <!-- Error message -->
        <div
          v-if="donationStore.submissionError"
          class="text-red-600 text-sm text-center"
        >
          {{ donationStore.submissionError }}
        </div>

        <div class="mt-4 md:w-[50%] lg:w-[48%] w-full">
          <UButton
            class="w-full bg-[#138B96] text-white font-bold py-3 rounded-lg text-center"
            :loading="donationStore.loading"
            :disabled="donationStore.loading"
            @click="handleDonation()"
            :loading-text="donationStore.loading ? 'جاري التحقق   ...' : 'جاري التحميل...'
            "
            :loading-color="donationStore.loading ? 'gray' : 'white'"
            color="primary"
            variant="solid"
            block
          >
            نعديل بيانات الدفع
          </UButton>
        </div>
      </template>

      <template v-if="showPayment" class="flex flex-col items-center">
        <!-- <Title title="خيارات الدفع المتاحة" badge="2" class="mb-4 text-end" /> -->

        <MoyasarPayment />
      </template>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import Title from "@/components/ui/Title.vue";
import { ref, defineProps, defineEmits } from "vue";
import { useDonationStore } from "@/stores/donation/donationStore";
import DonationCard from "@/components/cards/DonationCard.vue";
import DonorNameCard from "@/components/cards/DonorNameCard.vue";
import MoyasarPayment from "@/components/cards/MoyasarPayment.vue";

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

const showPayment = ref(false);
const handleDonation = async () => {
  await donationStore.submitDonation();
  showPayment.value = true;
};
const editedRow = ref({ ...props.row });

// const saveChanges = () => {
//   console.log("Saving changes:", editedRow.value);
//   closeModal();
// };
</script>
