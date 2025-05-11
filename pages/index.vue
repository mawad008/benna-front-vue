<template>
  <Hero />
  <div class="flex flex-col items-center bg-gray-50 py-12">
    <div class="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 gap-8">
      <template v-if="!showPayment">
        <DonationCard />
        <DonorNameCard />
        <div class="mt-4 md:w-[50%] lg:w-[48%] w-full">
          <UButton
            class="w-full bg-[#138B96] text-white font-bold py-3 rounded-lg text-center"
            @click="isLoggedIn() ? handleDonation() : openLoginModal()"
            color="primary"
            variant="solid"
            block
          >
            ادفع الان
          </UButton>
        </div>
      </template>

      <template v-else>
        <MoyasarPayment />
      </template>
    </div>
  </div>

  <SuccessModal ref="successModalRef" />
  <LoginModal v-if="isLoginOpen" ref="loginModalRef" />
</template>

<script setup>
import Hero from "@/components/ui/Hero.vue";
import DonationCard from "@/components/cards/DonationCard.vue";
import DonorNameCard from "@/components/cards/DonorNameCard.vue";
import SuccessModal from "@/components/modals/SuccessModal.vue";
import { useDonationStore } from "@/stores/donation/donationStore";
import { useRegisterStore } from '@/stores/register';
import MoyasarPayment from "@/components/cards/MoyasarPayment.vue";
import LoginModal from "@/components/modals/LoginModal.vue";
definePageMeta({
  layout: "default",
});

const donationStore = useDonationStore();
const successModalRef = ref(null);
const loginModalRef = ref(null);
const showPayment = ref(false);
const isLoginOpen = ref(false);

const handleDonation = async () => {
  showPayment.value = true;
  await donationStore.submitDonation();
  if (!donationStore.submissionError) {
    showPayment.value = false;
    isLoginOpen.value = true;
  }
};

const isLoggedIn = () => {
  if(localStorage.getItem('token')){
    return true;
  }
}
const openLoginModal = () => {
  const store = useRegisterStore();
  if (store) store.step = 0;
  isLoginOpen.value = true;
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
