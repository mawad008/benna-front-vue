<template>
  <div
    class="p-6 bg-white rounded-lg shadow-md w-full mx-auto max-w-5xl flex flex-col"
  >
    <!-- Title -->
    <div class="flex items-center gap-2 mb-6">
      <Title title="الفروع والمكاتب" badge="i-heroicons-map-pin" />
    </div>

    <div class="flex flex-col lg:flex-row items-start gap-6">
      <!-- Office Selection Buttons  -->
      <div
        class="w-full lg:w-1/4 flex flex-col gap-3 overflow-y-auto h-[300px] scrollable-list"
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
      <div class="flex-1 px-6 space-y-5">
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
            <p class="text-gray-700">{{ selectedOfficeDetails?.phone }}</p>
            <USkeleton v-if="loading || error" class="h-5 w-20 bg-primary-20" />
          </div>
          <div class="flex items-center gap-4">
            <img src="/email.png" alt="Mail Icon" class="w-5 h-4" />
            <p class="text-gray-700">{{ selectedOfficeDetails?.email }}</p>
            <USkeleton v-if="loading || error" class="h-5 w-20 bg-primary-20" />
          </div>
        </div>
      </div>

      <!-- Map Section -->

      <div class="w-full lg:w-1/3 flex justify-center">
        <USkeleton
          v-if="loading || error"
          class="h-[300px] w-full rounded-lg shadow-sm bg-primary-20"
        />
        <div v-else-if="loading">
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
const selectedOfficeId = ref(0);
const loading = ref(false);
const error = ref(false);
const officeStore = useOfficeStore();
onMounted(() => {
  loading.value = true;
  officeStore
    .fetchOffices()
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
