<template>
  <div class="p-6 bg-white rounded-lg shadow-md w-[60%] mx-auto">
    <!-- Title with Address Icon -->
    <div class="flex items-center gap-2 mb-4">
      <Title title="الفروع والمكاتب" badge="i-heroicons-map-pin" />
    </div>

    <div class="flex flex-wrap md:flex-nowrap gap-6">
      <!-- Office Selection & Details -->
      <div class="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
        <!-- Office Selection Buttons -->
        <div class="flex flex-col gap-2 w-full md:w-[40%]">
          <UButton v-for="(office, key) in officeStore.offices" :key="key" @click="officeStore.setOffice(key)"
            :color="officeStore.selectedOffice === key ? 'primary' : 'gray'" block variant="outline">
            {{ office.name }}
          </UButton>
        </div>

        <!-- Office Details -->
        <div class="space-y-4 w-full md:w-[60%]">
          <!-- Address -->
          <div class="flex items-center gap-3">
            <div class="p-2 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#138B96" class="size-7">
                <path fill-rule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <p class="text-gray-700">{{ selectedOfficeDetails.address }}</p>
          </div>

          <!-- Working Hours -->
          <div class="flex items-center gap-3">
            <div class="p-2 bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#138B96" class="size-7">
                <path fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <p class="text-sm text-gray-600">{{ selectedOfficeDetails.workingHours }}</p>
          </div>

          <!-- Contact Information -->
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#138B96" class="size-7">
                  <path fill-rule="evenodd"
                    d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-gray-700">{{ selectedOfficeDetails.phone1 }}</p>
            </div>

            <div class="flex items-center gap-3">
              <div class="p-2 bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#138B96" class="size-7">
                  <path fill-rule="evenodd"
                    d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <p class="text-gray-700">{{ selectedOfficeDetails.phone2 }}</p>
            </div>

            <div class="flex items-center gap-3">
              <div class="p-2 bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#138B96" class="size-7">
                  <path
                    d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path
                    d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </div>
              <p class="text-gray-700">{{ selectedOfficeDetails.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Map Placeholder -->
      <div class="w-full md:w-1/2">
        <img src="/map-placeholder.png" alt="Map" class="w-full h-auto md:h-full rounded-lg shadow-sm" />
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