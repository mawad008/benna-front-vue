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
        <p class="text-gray-600">يرجى تسجيل الدخول لعرض الاستقطاعات.</p>
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
  <!-- Campaigns Loading -->
  <div
    v-if="campaignsStore.loading"
    class="text-center text-gray-500 my-4 h-[calc(50vh-100px)] flex items-center justify-center font-medium"
  >
    جاري تحميل سجل الحملات...
  </div>

  <!-- Campaigns Error -->
  <div
    v-else-if="campaignsStore.error"
    class="text-center my-4 h-[calc(50vh-100px)] flex items-center justify-center font-medium"
  >
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
        <p class="mt-2">{{ campaignsStore.error }}</p>
      </div>
    </div>
  </div>

  <!-- No Campaigns -->
  <div
    v-else-if="campaignsStore.campaigns.length === 0"
    class="text-center text-gray-500 my-4 h-[calc(50vh-100px)] flex items-center justify-center text-2xl font-medium"
  >
    لا يوجد سجلات حاليا
 
  </div>

  <!-- Show Campaigns -->
  <div v-else>
    <div>
      <UBreadcrumb :links="links" />
    </div>
    <p class="text-2xl font-bold mb-4 text-primary">
    سجل الحملات
    </p>

    <CampaignTable />
  </div>
</div>
</div>

</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Hero from "@/components/ui/Hero.vue";
import CampaignTable from "@/components/CampaignTable.vue";
import LoginModal from "@/components/modals/LoginModal.vue";
import { useCampaignsStore } from "@/stores/compaigns";
import { useRegisterStore } from "@/stores/register";
import { useAuthStore } from "@/stores/auth";

definePageMeta({ layout: "default" });

const campaignsStore = useCampaignsStore();
const authStore = useAuthStore();
const registerStore = useRegisterStore();

const loginModalRef = ref(null);
const isLoginOpen = ref(false);

const openLoginModal = () => {
  isLoginOpen.value = true;
  registerStore.step = 0;
};
// console.log(campaignsStore.campaigns);
onMounted(async () => {
  await authStore.init();
  if (authStore.isLoggedIn) {
    await campaignsStore.fetchCampaigns();
  }
});



const links = [
  {
    label: "الرئيسية",
    href: "/",
  },
  {

    label: "سجل الحملات",
    href: "/campaigns",
  }
];
</script>
