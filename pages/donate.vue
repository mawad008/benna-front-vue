<template>
  <Hero />
  <div class="container lg:mt-10 md:mt-20">
    <!-- Auth Loading -->
    <div v-if="authStore.loading" class="text-center text-gray-500 my-4">
      جاري التحقق من تسجيل الدخول...
    </div>

    <!-- Authenticated User View -->
    <div v-else-if="authStore.isLoggedIn">
      <!-- Logout -->
      <div class="flex justify-end mb-4">
        <button
          @click="authStore.logout"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          تسجيل الخروج
        </button>
      </div>

      <!-- Deductions Loading -->
      <div
        v-if="deductionsStore.loading"
        class="text-center text-gray-500 my-4"
      >
        جاري تحميل التبرعات...
      </div>

      <!-- Deductions Error -->
      <div v-else-if="deductionsStore.error" class="text-center my-4">
        <div
          class="bg-red-50 border-l-4 border-red-500 p-4 max-w-md mx-auto flex"
        >
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3 text-sm text-red-700">
            <h3 class="font-medium text-red-800">
              {{
                deductionsStore.error === "يرجى تسجيل الدخول لعرض التبرعات"
                  ? "تسجيل الدخول مطلوب"
                  : "تعذر الاتصال بالخادم"
              }}
            </h3>
            <p class="mt-2">{{ deductionsStore.error }}</p>
            <p class="mt-2">
              <button
                v-if="
                  deductionsStore.error === 'يرجى تسجيل الدخول لعرض التبرعات'
                "
                @click="openLoginModal"
                class="font-medium text-red-700 hover:text-red-600 underline"
              >
                تسجيل الدخول
              </button>
              <button
                v-else
                @click="retryFetchDeductions"
                class="font-medium text-red-700 hover:text-red-600 underline"
              >
                إعادة المحاولة
              </button>
            </p>
          </div>
        </div>
      </div>

      <!-- Deductions Table or Empty State -->
      <DonationTable
        v-else-if="deductionsStore.deductions.length > 0"
        :deductions="deductionsStore.deductions"
      />
      <NoDeducation v-else />
    </div>

    <!-- Unauthenticated User View -->
    <div v-else>
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

const retryFetchDeductions = () => {
  deductionsStore.clearError();
  deductionsStore.fetchDeductions(true);
};

onMounted(() => {
  authStore.init();
  if (authStore.isLoggedIn) {
    deductionsStore.fetchDeductions(true);
  } else {
    isLoginOpen.value = true;
  }
});
</script>

