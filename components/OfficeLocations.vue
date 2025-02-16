<template>
  <div class="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
    <!-- Title with Address Icon -->
    <div class="flex items-center gap-2 mb-4">
      <Title title="الفروع والمكاتب" badge="i-heroicons-map-pin" />
    </div>

    <div class="flex flex-wrap md:flex-nowrap gap-6">
      <!-- Office Selection & Details -->
      <div class="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
        <!-- Office Selection Buttons -->
        <div class="flex flex-col gap-2 w-full md:w-[40%]">
          <UButton
            v-for="(office, key) in officeStore.offices"
            :key="key"
            @click="officeStore.setOffice(key)"
            :color="officeStore.selectedOffice === key ? 'primary' : 'gray'"
            block
            variant="outline"
          >
            {{ office.name }}
          </UButton>
        </div>

        <!-- Office Details -->
        <div class="space-y-2 w-full md:w-[60%]">
          <p class="text-gray-700">{{ selectedOfficeDetails.address }}</p>
          <p class="text-sm text-gray-600">
            {{ selectedOfficeDetails.workingHours }}
          </p>

          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2 text-gray-700">
              <i class="i-heroicons-phone"></i>
              {{ selectedOfficeDetails.phone1 }}
            </div>
            <div class="flex items-center gap-2 text-gray-700">
              <i class="i-heroicons-phone"></i>
              {{ selectedOfficeDetails.phone2 }}
            </div>
            <div class="flex items-center gap-2 text-gray-700">
              <i class="i-heroicons-envelope"></i>
              {{ selectedOfficeDetails.email }}
            </div>
          </div>
        </div>
      </div>

      <!-- Map Placeholder -->
      <div class="w-full md:w-1/2">
        <img
          src="/map-placeholder.png"
          alt="Map"
          class="w-full h-auto md:h-full rounded-lg shadow-sm"
        />
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import Title from "@/components/ui/Title.vue";
import { computed } from "vue";
import { useOfficeStore } from "@/stores/officeStore";

const officeStore = useOfficeStore();
const selectedOfficeDetails = computed(
  () => officeStore.offices[officeStore.selectedOffice]
);
</script>
  