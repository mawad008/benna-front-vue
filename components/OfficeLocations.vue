<template>
  <div class="p-6 bg-white rounded-lg shadow-md w-full mx-auto max-w-5xl flex flex-col">
    <!-- Title -->
    <div class="flex items-center gap-2 mb-6">
      <Title title="الفروع والمكاتب" badge="i-heroicons-map-pin" />
    </div>

    <div class="flex flex-col lg:flex-row items-start gap-6">
      <!-- Office Selection Buttons  -->
      <div class="w-full lg:w-1/4 flex flex-col gap-3">
        <UButton v-for="(office, key) in officeStore.offices" :key="key" @click="officeStore.setOffice(key)"
          color="primary" block :variant="officeStore.selectedOffice === key ? 'solid' : 'outline'"
          class="text-sm py-2">
          {{ office.name }}
        </UButton>
      </div>

      <!-- Office Details-->
      <div class="flex-1 px-6 space-y-5">
        <!-- Address -->
        <div class="flex items-center gap-4">
          <img src="/address.png" alt="Address Icon" class="w-5 h-5" />
          <p class="text-gray-700">{{ selectedOfficeDetails?.address }}</p>
        </div>

        <!-- Working Hours -->
        <div class="flex items-center gap-4">
          <img src="/clock.png" alt="Clock Icon" class="w-5 h-5" />
          <p class="text-sm text-gray-600">
            {{ selectedOfficeDetails?.workingHours }}
          </p>
        </div>

        <!-- Contact Information -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-4">
            <img src="/phone.png" alt="Phone Icon" class="w-4 h-5" />
            <p class="text-gray-700">{{ selectedOfficeDetails?.phone1 }}</p>
          </div>
          <div class="flex items-center gap-4">
            <img src="/email.png" alt="Mail Icon" class="w-5 h-4" />
            <p class="text-gray-700">{{ selectedOfficeDetails?.email }}</p>
          </div>
          <div class="flex items-center gap-4">
            <img src="/fax.png" alt="Fax Icon" class="w-5 h-5" />
            <p class="text-gray-700">{{ selectedOfficeDetails.fax }}</p>
          </div>

        </div>
      </div>

      <!-- Map Section -->
      <div class="w-full lg:w-1/3 flex justify-center">
        <img src="/map-placeholder.png" alt="Map" class="w-full h-auto rounded-lg shadow-sm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/ui/Title.vue";
import { useOfficeStore } from "@/stores/officeStore";
import { computed } from "vue";

const officeStore = useOfficeStore();
const selectedOfficeDetails = computed(
  () => officeStore.offices[officeStore.selectedOffice]
);


</script>
