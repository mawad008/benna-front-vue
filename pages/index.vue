<template>
  <Hero />
  <div class="flex flex-col items-center bg-gray-50 py-12">
    <div class="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 gap-8 md:w-[50%] lg:w-[48%]">
      <template v-if="!showPayment">
        <DonationCard />
        <DonorNameCard />

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
            @click="authStore.isLoggedIn ? handleDonation() : openLoginModal()"
            :loading-text="
              authStore.loading
                ? 'جاري التحقق من تسجيل الدخول...'
                : 'جاري التحميل...'
            "
            :loading-color="authStore.loading ? 'gray' : 'white'"
            color="primary"
            variant="solid"
            block
          >
            {{ $t('homePayButton') }}
          </UButton>
        </div>
      </template>

      <template v-else>
        <CustomPaymentCard />
        <!-- <MoyasarPayment /> -->
      </template>
    </div>
  </div>

  <LoginModal v-if="isLoginOpen" ref="loginModalRef" @close="isLoginOpen = false" />
</template>

<script setup>
import Hero from "@/components/ui/Hero.vue";
import DonationCard from "@/components/cards/DonationCard.vue";
import DonorNameCard from "@/components/cards/DonorNameCard.vue";
// import MoyasarPayment from "@/components/cards/MoyasarPayment.vue";
import LoginModal from "@/components/modals/LoginModal.vue";
import { useDonationStore } from "@/stores/donation/donationStore";
import { useRegisterStore } from "@/stores/register";
import { useAuthStore } from "@/stores/auth";
import CustomPaymentCard from "@/components/cards/CustomPaymentCard.vue";

definePageMeta({
  layout: "default",
});

const route = useRoute();
const router = useRouter();
const donationStore = useDonationStore();
const authStore = useAuthStore();
const registerStore = useRegisterStore();

const loginModalRef = ref(null);
const showPayment = ref(false);
const isLoginOpen = ref(false);

authStore.init();
onMounted(() => {
  if (route.query.id) {
    const campaignId = route.query.id.split("?")[0];
    donationStore.campaign_id = campaignId;
  }
});


//https://donate.benaa.org.sa/?id=104?name=zain

const handleDonation = async () => {
  await donationStore.submitDonation(donationStore.campaign_id);
  if (donationStore.submissionError) {
    showPayment.value = false;
    isLoginOpen.value = false;
    return;
  }
  showPayment.value = true;
};

const openLoginModal = () => {
  isLoginOpen.value = false;
  nextTick(() => {
    isLoginOpen.value = true;
  });
};

</script>
