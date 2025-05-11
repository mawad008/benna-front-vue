<template>
  <Hero />
  <div class="container lg:mt-10 md:mt-20">
    <div v-if="isLoggedIn()">
      <DonationTable v-if="deductionsStore.deductions.length > 0" />
      <NoDeducation v-else />
    </div>
    <div v-else>
      <LoginModal v-if="isLoginOpen" ref="loginModalRef" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Hero from "@/components/ui/Hero.vue";
import DonationTable from "@/components/DonationTable.vue";
import NoDeducation from '@/components/modals/NoDeducation.vue';
import LoginModal from '@/components/modals/LoginModal.vue';

import { useDeductionsStore } from "@/stores/deductions";
import { useRegisterStore } from "@/stores/register";
import { useAuthStore } from "@/stores/auth";

definePageMeta({
  layout: "default",
});

const isLoginOpen = ref(false);
const loginModalRef = ref(null);

const deductionsStore = useDeductionsStore();
const registerStore = useRegisterStore();
const authStore = useAuthStore();

onMounted(() => {
  deductionsStore.fetchDeductions();
  registerStore.step = 0;
});

const isLoggedIn = () => authStore.isLoggedIn;

const openLoginModal = () => {
  registerStore.step = 0;
  isLoginOpen.value = true;
};
</script>
