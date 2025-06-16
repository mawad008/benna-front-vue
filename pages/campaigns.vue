<template>
  <Hero />
  <div class="container lg:mt-10 md:mt-20">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center text-gray-500 h-[calc(100vh-200px)] flex items-center justify-center">
      <div class="spinner" aria-label="جاري التحميل"></div>
    </div>

    <!-- Not Logged In -->
    <ClientOnly v-if="!authStore.isLoggedIn">
      <div class="flex justify-center h-[calc(100vh-200px)] items-center flex-col gap-4">
        <div class="text-center flex flex-col gap-4">
          <p class="text-gray-600">{{ $t("general.notLoggedIn") }}</p>
          <button @click="openLoginModal" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            {{ $t("general.login") }}
          </button>

          <LoginModal v-if="isLoginOpen" ref="loginModalRef" :isOpen="isLoginOpen" @close="handleModalClose" />
        </div>
      </div>
    </ClientOnly>

    <!-- Logged In -->
    <div v-else>
      <!-- Campaigns Loading -->
      <div v-if="campaignsStore.loading"
        class="text-center text-gray-500 h-[calc(100vh-200px)] flex items-center justify-center font-medium">
        <!-- <p>{{ $t("campaignsPage.loading") }}</p> -->
        <div class="spinner" aria-label="جاري التحميل"></div>
      </div>

      <!-- Campaigns Error -->
      <div v-else-if="campaignsStore.error"
        class="text-center h-[calc(100vh-200px)] flex items-center justify-center font-medium flex-col gap-4">
        <p>{{ $t("general.errorAndRetry") }}</p>
        <button @click="retry" class="mt-2 px-4 py-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M19 8l-4 4h3c0 3.31-2.69 6-6 6c-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6c1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4l4-4H6z">
              <animateTransform attributeName="transform" attributeType="XML" dur="5s" from="360 12 12"
                repeatCount="indefinite" to="0 12 12" type="rotate" />
            </path>
          </svg>
        </button>
      </div>

      <!-- No Campaigns -->
      <div v-else-if="campaignsStore.campaigns.length === 0"
        class="text-center text-gray-500 h-[calc(100vh-200px)] flex items-center justify-center text-2xl font-medium">
        {{ $t("campaignsPage.noCampaigns") }}
      </div>

      <!-- Show Campaigns -->
      <div v-else>
        <div class="mt-10 md:mt-0 lg:mt-0">
          <UBreadcrumb :links="links" />
        </div>
        <br />
        <p class="text-2xl font-bold mb-4 text-dark">
          {{ $t("deductionPage.deductions") }}
        </p>
        <br />
        <CampaignTable :campaigns="campaignsStore.campaigns" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import Hero from "@/components/ui/Hero.vue";
import CampaignTable from "@/components/tables/CampaignTable.vue";
import LoginModal from "@/components/modals/LoginModal.vue";
import { useCampaignsStore } from "@/stores/compaigns";
import { useRegisterStore } from "@/stores/register";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const hasUser = computed(() => registerStore.hasUser);
const { locale } = useI18n();

const campaignsStore = useCampaignsStore();
const authStore = useAuthStore();
const registerStore = useRegisterStore();

const loginModalRef = ref(null);
const isLoginOpen = ref(false);
const isLoading = computed(
  () => (authStore.loading && campaignsStore.loading) || import.meta.server
);

watch(hasUser, () => {
  if (hasUser.value) {
    campaignsStore.fetchCampaigns(locale.value);
  }
});

// console.log(hasUser.value);

onMounted(() => {
  authStore.init();
  if (authStore.isLoggedIn) {
    campaignsStore.fetchCampaigns(locale.value);
  }
});

const openLoginModal = () => {
  registerStore.step = 0;
  isLoginOpen.value = true;
  authStore.init();
};
const handleModalClose = () => {
  isLoginOpen.value = false;
  campaignsStore.error = null;
  if (hasUser.value) {
    campaignsStore.fetchCampaigns(locale.value);
  }
};
const retry = () => {
  campaignsStore.error = null;
  campaignsStore.fetchCampaigns(locale.value);
};
const links = [
  {
    label: t("campaignsPage.links.home"),
    link: true,
    to: "/",
  },
  {
    label: t("campaignsPage.links.deductions"),
    link: true,
    to: "/campaigns",
  },
];
</script>

<style scoped>
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #138b96;
}
</style>
