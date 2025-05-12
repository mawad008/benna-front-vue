<template>
  <Hero />
  <div class="container lg:mt-10 md:mt-20">
    <!-- Loading State -->
    <div v-if="authStore.loading" class="text-center text-gray-500 my-4">
      جاري التحقق من تسجيل الدخول...
    </div>

    <!-- Not Logged In -->
    <div v-else-if="!authStore.isLoggedIn" class="flex justify-center h-[calc(50vh-100px)] items-center">
      <LoginModal v-if="isLoginOpen" ref="loginModalRef" />
      <div v-else class="text-center my-4">
        <p class="text-gray-600">يرجى تسجيل الدخول لعرض التبرعات.</p>
        <button
          @click="openLoginModal"
          class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          تسجيل الدخول
        </button> 
      </div>
    </div>

    <!-- Logged In -->
    <div v-else>
      <!-- Deductions Loading -->
      <div v-if="deductionsStore.loading" class="text-center text-gray-500 my-4 h-[calc(50vh-100px)] items-center items-center justify-center flex font-medium">
        جاري تحميل الاستقطاعات...
      </div>
      <div v-else-if="!deductionsStore.loading && !deductionsStore.error" class="text-center text-gray-500 my-4 h-[calc(50vh-100px)] items-center text-2xl justify-center flex font-medium">
        لا يوجد استقطاعات حاليا
      </div>

      <!-- Deductions Error -->
      <div v-else-if="deductionsStore.error" class="text-center my-4 h-[calc(50vh-100px)] items-center items-center justify-center flex font-medium">
        <div class="bg-red-50 border-l-4 border-red-500 p-4 max-w-md mx-auto flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3 text-sm text-red-700">
            <p class="mt-2">{{ deductionsStore.error }}</p>
          </div>
        </div>
      </div>

      <!-- Deductions Content -->
      <DonationTable
        v-else-if="deductionsStore.deductions.length > 0"
        :deductions="deductionsStore.deductions"
      />
      <NoDeducation v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Hero from "@/components/ui/Hero.vue";
import DonationTable from "@/components/DonationTable.vue";
import NoDeducation from "@/components/modals/NoDeducation.vue";
import LoginModal from "@/components/modals/LoginModal.vue";
import { useDeductionsStore } from "@/stores/deductions";
import { useRegisterStore } from "@/stores/register";
import { useAuthStore } from "@/stores/auth";

definePageMeta({ layout: "default" });

const deductionsStore = useDeductionsStore();
const authStore = useAuthStore();
const registerStore = useRegisterStore();

const loginModalRef = ref(null);
const isLoginOpen = ref(false);

const openLoginModal = () => {
  isLoginOpen.value = true;
  registerStore.step = 0;
};

onMounted(() => {
  authStore.init();
  if (authStore.isLoggedIn) {
    deductionsStore.fetchDeductions();
  }
});
</script>
