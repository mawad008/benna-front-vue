<template>
    <div class="flex justify-center w-[70%] h-fit mt-5 mb-5">
      <div class="w-4/5 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
        <!-- Title with Badge -->
        <Title title="اسم المتبرع" badge="2" class="mb-4" />
  
        <!-- Donor Name Input -->
        <div class="mt-4">
          <label class="block text-dark font-bold text-sm mb-2">اسم الاستقطاع</label>
          <UInput 
            v-model="donorStore.donorName" 
            class="w-full border-gray-300 p-2 rounded-lg"
            @blur="donorStore.validateDonor()" 
          />
          <p v-if="donorStore.errors.donorName" class="text-red-500 text-xs mt-1">
            {{ donorStore.errors.donorName }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Title from "@/components/ui/Title.vue";
  import { useDonorStore } from "@/stores/donation/donorStore";
  
  const donorStore = useDonorStore();
  </script>
  