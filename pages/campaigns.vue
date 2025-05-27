<template>
  <Hero />
  <div class="container lg:mt-10 md:mt-20">
    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="text-center text-gray-500 h-[calc(100vh-200px)] flex items-center justify-center"
    >
      <div class="spinner" aria-label="جاري التحميل"></div>
    </div>

    <!-- Not Logged In -->
    <ClientOnly v-if="!authStore.isLoggedIn">
      <div
        class="flex justify-center h-[calc(100vh-200px)] items-center flex-col gap-4"
      >
        <div class="text-center flex flex-col gap-4">
          <p class="text-gray-600">{{ $t("general.notLoggedIn") }}</p>
          <button
            @click="openLoginModal"
            class="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {{ $t("general.login") }}
          </button>

          <LoginModal
            v-if="isLoginOpen"
            ref="loginModalRef"
            :isOpen="isLoginOpen"
            @close="handleModalClose"
          />
        </div>
      </div>
    </ClientOnly>

    <!-- Logged In -->
    <div v-else>
      <!-- Campaigns Loading -->
      <div
        v-if="campaignsStore.loading"
        class="text-center text-gray-500 h-[calc(100vh-200px)] flex items-center justify-center font-medium"
      >
        <!-- <p>{{ $t("campaignsPage.loading") }}</p> -->
        <div class="spinner" aria-label="جاري التحميل"></div>
      </div>

      <!-- Campaigns Error -->
      <div
        v-else-if="campaignsStore.error"
        class="text-center h-[calc(100vh-200px)] flex items-center justify-center font-medium flex-col gap-4"
      >
        <p>{{ $t("general.errorAndRetry") }}</p>
        <button @click="retry" class="mt-2 bg-white px-4 py-2 rounded">
          <img src="/refresh.gif" alt="refresh" />
        </button>
      </div>

      <!-- No Campaigns -->
      <div
        v-else-if="campaignsStore.campaigns.length === 0"
        class="text-center text-gray-500 h-[calc(100vh-200px)] flex items-center justify-center text-2xl font-medium"
      >
        {{ $t("campaignsPage.noCampaigns") }}
      </div>

      <!-- Show Campaigns -->
      <div v-else>
        <div class="mt-10 md:mt-0 lg:mt-0">
          <UBreadcrumb :links="links" />
        </div>
        <br />
        <p class="text-2xl font-bold mb-4 text-dark">
          {{ $t("campaignsPage.campaigns") }}
        </p>
        <br />
        <CampaignTable :campaigns="campaignsStore.campaigns" />
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const campaignsStore = useCampaignsStore();
const authStore = useAuthStore();
const registerStore = useRegisterStore();

const loginModalRef = ref(null);
const isLoginOpen = ref(false);
const isLoading = computed(
  () => (authStore.loading && campaignsStore.loading) || import.meta.server
);

onMounted(() => {
  authStore.init();
  if (authStore.isLoggedIn) {
    campaignsStore.fetchCampaigns();
  }
});

watch(
  () => authStore.isLoggedIn,
  (newVal, oldVal) => {
    console.log(`Auth state changed from ${oldVal} to ${newVal}`);
    if (newVal) {
      console.log("User logged in, fetching campaigns...");
      campaignsStore.fetchCampaigns().catch((err) => {
        console.error("Failed to fetch campaigns:", err);
      });
    }
  },
  { immediate: true }
);

const openLoginModal = () => {
  registerStore.step = 0;
  isLoginOpen.value = true;
};
const handleModalClose = () => {
  isLoginOpen.value = false;
  if (authStore.isLoggedIn) {
    campaignsStore.fetchCampaigns();
  }
};
const retry = () => {
  campaignsStore.fetchCampaigns();
};
const links = [
  {
    label: t("campaignsPage.links.home"),
    link: true,
    to: "/",
  },
  {
    label: t("campaignsPage.links.campaigns"),
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
