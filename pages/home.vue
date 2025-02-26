<template>
  <Hero />
  <div class=" flex flex-col items-center bg-gray-50 py-12">
    <div class="w-full  flex flex-col items-center px-4 sm:px-6 lg:px-8 gap-8">
      <!-- Cards -->
      <DonationCard />
      <DonorNameCard />
      <PaymentOptionsCard />
     

      <!-- Donation Button -->
      <div class="mt-4 md:w-[50%] lg:w-[48%] sm:w-[100%] ">
        <UButton class="w-full bg-[#138B96] text-white font-bold py-3 rounded-lg text-center" @click="handleDonation"
          color="primary" variant="solid" block>
          تبرع الآن
        </UButton>
      </div>
    </div>
  </div>

  <SuccessModal ref="successModalRef" />
</template>

<script setup>
import Hero from "@/components/ui/Hero.vue";
import DonationCard from "@/components/cards/DonationCard.vue";
import DonorNameCard from "@/components/cards/DonorNameCard.vue";
import SuccessModal from "@/components/modals/SuccessModal.vue";
import { useDonationStore } from "@/stores/donation/donationStore";
import PaymentOptionsCard from "@/components/cards/PaymentOptionsCard.vue";

definePageMeta({
  layout: "default",
});

const donationStore = useDonationStore();
const successModalRef = ref(null);

const handleDonation = async () => {
  await donationStore.submitDonation();
  if (!donationStore.submissionError) {
    successModalRef.value?.openModal();
  }
};
</script>

<style scoped>
button {
  transition: transform 0.2s ease, background-color 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
}
</style>