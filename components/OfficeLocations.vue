<template>
  <div
    class="p-6 bg-white rounded-lg shadow-md w-full mx-auto max-w-5xl flex flex-col"
  >
    <!-- Title -->
    <div class="flex items-center gap-2 mb-6">
      <Title
        :title="$t('contactPage.branshsandOffices')"
        badge="i-heroicons-map-pin"
      />
    </div>

    <div class="flex flex-wrap gap-6">
      <!-- Office Selection Buttons  -->
      <div
        class="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-3 overflow-y-auto max-h-[300px] scrollable-list"
      >
        <UButton
          v-for="(office, key) in officeStore.offices"
          :key="key"
          @click="selectedOfficeId = key"
          color="primary"
          block
          :variant="selectedOfficeId === key ? 'solid' : 'outline'"
          class="text-sm py-2"
        >
          {{ office.name }}
        </UButton>
        <USkeleton
          v-if="loading || error"
          class="h-full w-full bg-primary-20"
        />
      </div>

      <!-- Office Details-->
      <div class="w-full flex-1 px-2 sm:px-4 lg:px-6 space-y-5 min-w-0">
        <!-- Address -->
        <div class="flex items-center gap-4">
          <img src="/address.png" alt="Address Icon" class="w-5 h-5" />
          <p class="text-gray-700">{{ selectedOfficeDetails?.location }}</p>
          <USkeleton v-if="loading || error" class="h-5 w-20 bg-primary-20" />
        </div>

        <!-- Working Hours -->
        <div class="flex items-center gap-4">
          <img src="/clock.png" alt="Clock Icon" class="w-5 h-5" />
          <p class="text-sm text-gray-600">
            {{ selectedOfficeDetails?.worktime }}
          </p>
          <USkeleton v-if="loading || error" class="h-5 w-20 bg-primary-20" />
        </div>

        <!-- Contact Information -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <img src="/phone.png" alt="Phone Icon" class="w-4 h-5" />
            <a
              :href="'tel:' + selectedOfficeDetails?.phone"
              class="text-blue-600 hover:underline"
            >
              {{ selectedOfficeDetails?.phone }}
            </a>
            <USkeleton v-if="loading || error" class="h-5 w-20 bg-primary-20" />
          </div>
          <div class="flex items-center gap-4">
            <img src="/email.png" alt="Mail Icon" class="w-5 h-4" />
            <a
              :href="'mailto:' + selectedOfficeDetails?.email"
              class="text-blue-600 hover:underline"
            >
              {{ selectedOfficeDetails?.email }}
            </a>
            <USkeleton v-if="loading || error" class="h-5 w-20 bg-primary-20" />
          </div>
        </div>

        <!-- Social Media Icons -->
        <div class="flex items-center gap-6 space-between mt-4">
          <a
            v-if="social?.facebook"
            :href="
              social.facebook.startsWith('http')
                ? social.facebook
                : 'https://' + social.facebook
            "
            target="_blank"
            rel="noopener"
            title="Facebook"
          >
            <Icon
              name="mdi:facebook"
              size="24"
              class="text-blue-600 hover:text-blue-800"
            />
          </a>
          <a
            v-if="social?.instagram"
            :href="
              social.instagram.startsWith('http')
                ? social.instagram
                : 'https://' + social.instagram
            "
            target="_blank"
            rel="noopener"
            title="Instagram"
          >
            <Icon
              name="mdi:instagram"
              size="24"
              class="text-pink-500 hover:text-pink-700"
            />
          </a>
          <a
            v-if="social?.youtube"
            :href="
              social.youtube.startsWith('http')
                ? social.youtube
                : 'https://' + social.youtube
            "
            target="_blank"
            rel="noopener"
            title="YouTube"
          >
            <Icon
              name="mdi:youtube"
              size="24"
              class="text-red-600 hover:text-red-800"
            />
          </a>
          <a
            v-if="social?.twitter"
            :href="
              social.twitter.startsWith('http')
                ? social.twitter
                : 'https://' + social.twitter
            "
            target="_blank"
            rel="noopener"
            title="X (formerly Twitter)"
          >
            <Icon name="lucide:x" size="24" />
          </a>
        </div>
      </div>

      <!-- Map Section -->
      <div class="w-full md:w-1/2 lg:w-1/3 flex justify-center">
        <div v-if="loading">
          <img
            src="/map-placeholder.png"
            alt="Loading"
            class="w-full h-[300px] rounded-lg shadow-sm"
          />
        </div>
        <div
          v-else
          class="w-full h-[300px] rounded-lg shadow-sm overflow-hidden"
        >
          <div class="w-full h-full" v-html="selectedOfficeDetails?.ifram" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/ui/Title.vue";
import { useOfficeStore } from "@/stores/officeStore";
import { computed, onMounted, ref } from "vue";

const officeStore = useOfficeStore();

const selectedOfficeId = ref(0);
const loading = ref(false);
const error = ref(false);

const social = computed(() => officeStore.social);
onMounted(() => {
  loading.value = true;
  officeStore.fetchOffices();
  officeStore
    .fetchSocial()
    .then(() => {
      loading.value = false;
    })
    .catch(() => {
      error.value = true;
    });
});

const selectedOfficeDetails = computed(
  () => officeStore.offices[selectedOfficeId.value]
);
</script>

<style scoped>
.scrollable-list::-webkit-scrollbar {
  width: 8px;
}

.scrollable-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scrollable-list::-webkit-scrollbar-thumb {
  background: #138b96;
  border-radius: 4px;
}

.scrollable-list::-webkit-scrollbar-thumb:hover {
  background: #138b96;
}

.scrollable-list {
  scrollbar-width: thin;
  scrollbar-color: #138b96 #f1f1f1;
  direction: ltr;
}

:deep iframe {
  width: 100% !important;
  height: 100% !important;
  border: 0;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
